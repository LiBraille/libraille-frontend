import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaXmark, FaCheck } from 'react-icons/fa6'
import { enviarPedido } from '../../services/orders'
import { MODO_DEMO } from '../../services/config'
import { CODIGO_DEMO } from '../../services/auth'
import { buscarEnderecoPorCep, buscarCepPorEndereco, formatarCep } from '../../services/cep'
import './orderModal.css'

const TIPOS = [
    { valor: 'compra', rotulo: 'Comprar para mim' },
    { valor: 'doacao', rotulo: 'Doar um dispositivo' },
]

const VAZIO = {
    nome: '', email: '', telefone: '', quantidade: '1',
    cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '',
    anonimo: false, mensagem: '',
}

function validar(tipo, v) {
    const e = {}
    if (v.nome.trim().length < 3) e.nome = 'Informe seu nome completo.'
    if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Informe um e-mail válido.'

    const quantidade = Number(v.quantidade)
    if (!Number.isInteger(quantidade) || quantidade < 1) {
        e.quantidade = 'Informe uma quantidade inteira, a partir de 1.'
    }

    if (tipo === 'compra') {
        if (v.telefone.replace(/\D/g, '').length < 10) e.telefone = 'Informe um telefone com DDD.'
        if (v.cep.replace(/\D/g, '').length !== 8) e.cep = 'O CEP deve ter 8 números.'
        if (!v.rua.trim()) e.rua = 'Informe a rua.'
        if (!v.numero.trim()) e.numero = 'Informe o número.'
        if (!v.cidade.trim()) e.cidade = 'Informe a cidade.'
        if (!/^[A-Za-z]{2}$/.test(v.estado)) e.estado = 'Use a sigla, como SP.'
    }
    return e
}

// Junta label, campo e mensagem de erro
function Campo({ id, label, erro, opcional, className = '', ...props }) {
    return (
        <div className={`field ${className}`}>
            <label htmlFor={id}>
                {label}
                {opcional && <span className="field__opt"> (opcional)</span>}
            </label>
            <input
                id={id}
                aria-invalid={erro ? 'true' : undefined}
                aria-describedby={erro ? `${id}-erro` : undefined}
                {...props}
            />
            {erro && <p id={`${id}-erro`} className="field__error">{erro}</p>}
        </div>
    )
}

// "Não sei meu CEP": procura o CEP pelo estado, cidade e rua.
// <details> é um elemento do HTML que abre e fecha sozinho, e já funciona com teclado.
function BuscaCep({ aoEscolher }) {
    const base = useId()
    const [campos, setCampos] = useState({ estado: '', cidade: '', rua: '' })
    const [resultados, setResultados] = useState([])
    const [aviso, setAviso] = useState('')
    const [buscando, setBuscando] = useState(false)

    const mudar = (e) => setCampos((c) => ({ ...c, [e.target.name]: e.target.value }))

    const buscar = async () => {
        setBuscando(true)
        setAviso('')
        setResultados([])
        try {
            const lista = await buscarCepPorEndereco(campos)
            setResultados(lista)
            setAviso(
                lista.length
                    ? `${lista.length} endereço(s) encontrado(s). Escolha o seu.`
                    : 'Nenhum endereço encontrado. Confira a cidade e a rua.'
            )
        } catch (err) {
            setAviso(err.message)
        } finally {
            setBuscando(false)
        }
    }

    // Enter nestes campos faz a busca (e não envia o pedido inteiro)
    const aoTeclar = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            buscar()
        }
    }

    return (
        <details className="cep-busca">
            <summary>Não sei meu CEP</summary>

            <div className="cep-busca__campos" onKeyDown={aoTeclar}>
                <Campo id={`${base}-uf`} name="estado" label="UF" maxLength={2}
                    value={campos.estado} onChange={mudar} />
                <Campo id={`${base}-cidade`} name="cidade" label="Cidade"
                    value={campos.cidade} onChange={mudar} />
                <Campo id={`${base}-rua`} name="rua" label="Rua (parte do nome)" className="is-wide"
                    value={campos.rua} onChange={mudar} />
            </div>

            <button type="button" className="btn btn--ghost" onClick={buscar} disabled={buscando}>
                {buscando ? 'Buscando…' : 'Buscar CEP'}
            </button>

            <p className="order-cep-status" role="status">{aviso}</p>

            {resultados.length > 0 && (
                <ul className="cep-busca__resultados" role="list">
                    {resultados.map((r) => (
                        <li key={`${r.cep}-${r.rua}`}>
                            <button type="button" className="cep-busca__item" onClick={() => aoEscolher(r)}>
                                {r.rua}{r.bairro ? `, ${r.bairro}` : ''} ({r.cidade}/{r.estado}) · CEP {r.cep}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </details>
    )
}

function Formulario({ tipoInicial, aoFechar }) {
    const base = useId()
    const [tipo, setTipo] = useState(tipoInicial)
    const [v, setV] = useState(VAZIO)
    const [erros, setErros] = useState({})
    const [enviando, setEnviando] = useState(false)
    const [erroEnvio, setErroEnvio] = useState('')
    const [pedido, setPedido] = useState(null)   // preenchido quando dá certo
    const [buscandoCep, setBuscandoCep] = useState(false)
    const [avisoCep, setAvisoCep] = useState(null)   // { tipo: 'ok' ou 'erro', texto }
    const sucessoRef = useRef(null)

    const id = (campo) => `${base}-${campo}`
    const compra = tipo === 'compra'

    // Leva o foco para a confirmação, para leitores de tela anunciarem
    useEffect(() => { if (pedido) sucessoRef.current?.focus() }, [pedido])

    const mudar = (e) => {
        const { name, type, checked, value } = e.target
        setV((atual) => ({ ...atual, [name]: type === 'checkbox' ? checked : value }))
    }

    // Consulta o CEP e preenche rua, bairro, cidade e UF (número e complemento a pessoa digita)
    const consultarCep = async (cep) => {
        setBuscandoCep(true)
        try {
            const end = await buscarEnderecoPorCep(cep)
            if (!end) {
                setAvisoCep({ tipo: 'erro', texto: 'CEP não encontrado. Confira o número ou preencha o endereço à mão.' })
                return
            }
            setV((a) => ({
                ...a,
                rua: end.rua || a.rua,
                bairro: end.bairro || a.bairro,
                cidade: end.cidade,
                estado: end.estado,
            }))
            setAvisoCep({ tipo: 'ok', texto: 'Endereço preenchido. Confira os dados e informe o número.' })
        } catch (err) {
            setAvisoCep({ tipo: 'erro', texto: err.message })
        } finally {
            setBuscandoCep(false)
        }
    }

    // Formata o CEP enquanto digita e consulta quando chega a 8 números
    const mudarCep = (e) => {
        const cep = formatarCep(e.target.value)
        setV((a) => ({ ...a, cep }))
        setAvisoCep(null)
        if (cep.replace(/\D/g, '').length === 8) consultarCep(cep)
    }

    // Escolheu um resultado da busca "Não sei meu CEP"
    const escolherEndereco = (end) => {
        setV((a) => ({
            ...a,
            cep: formatarCep(end.cep),
            rua: end.rua || '',
            bairro: end.bairro || '',
            cidade: end.cidade,
            estado: end.estado,
        }))
        setAvisoCep({ tipo: 'ok', texto: 'Endereço preenchido. Confira os dados e informe o número.' })
    }

    const trocarTipo = (novo) => {
        setTipo(novo)
        setErros({})
        setErroEnvio('')
    }

    const enviar = async (e) => {
        e.preventDefault()
        const novosErros = validar(tipo, v)
        setErros(novosErros)

        const primeiro = Object.keys(novosErros)[0]
        if (primeiro) {
            document.getElementById(id(primeiro))?.focus()
            return
        }

        setEnviando(true)
        setErroEnvio('')
        try {
            const dados = {
                tipo,
                nome: v.nome.trim(),
                email: v.email.trim(),
                quantidade: Number(v.quantidade),
                ...(compra
                    ? {
                        telefone: v.telefone,
                        endereco: {
                            cep: v.cep, rua: v.rua, numero: v.numero,
                            complemento: v.complemento, bairro: v.bairro,
                            cidade: v.cidade, estado: v.estado.toUpperCase(),
                        },
                    }
                    : { anonimo: v.anonimo, mensagem: v.mensagem.trim() }),
            }
            setPedido(await enviarPedido(dados))
        } catch (err) {
            setErroEnvio(err.message)
        } finally {
            setEnviando(false)
        }
    }

    /* ---------- Tela de confirmação ---------- */
    if (pedido) {
        return (
            <div className="order-success" ref={sucessoRef} tabIndex={-1} role="status">
                <span className="order-success__icon" aria-hidden="true"><FaCheck /></span>
                <h2>{compra ? 'Pedido recebido!' : 'Obrigado pela doação!'}</h2>

                {pedido.demo ? (
                    <p>
                        Este pedido foi <strong>simulado</strong> (modo demonstração): nenhum dado
                        foi enviado ou guardado, e nenhum e-mail foi disparado.
                    </p>
                ) : (
                    <p>
                        {compra
                            ? 'Enviamos os próximos passos para o seu e-mail, incluindo a ativação da conta.'
                            : 'Entraremos em contato por e-mail para combinar os detalhes da doação.'}
                    </p>
                )}

                {pedido.id && <p className="order-success__id">Código do pedido: {pedido.id}</p>}

                {pedido.demo && (
                    <p>
                        Para testar o resto do site,{' '}
                        <Link to="/ativar" onClick={aoFechar}>ative a conta de teste</Link> com o
                        código {CODIGO_DEMO}.
                    </p>
                )}

                <button type="button" className="btn btn--primary" onClick={aoFechar}>Fechar</button>
            </div>
        )
    }

    /* ---------- Formulário ---------- */
    return (
        <form className="order-form" onSubmit={enviar} noValidate>
            {MODO_DEMO && (
                <p className="order-demo" role="note">
                    <strong>Modo demonstração.</strong> O pedido é simulado: nenhum dado do
                    formulário é enviado ou guardado. Só o CEP é consultado em um serviço público
                    de endereços.
                </p>
            )}

            <fieldset className="order-type">
                <legend className="sr-only">Tipo de pedido</legend>
                {TIPOS.map(({ valor, rotulo }) => (
                    <label key={valor} className="order-type__option">
                        <input
                            type="radio"
                            name="tipo"
                            value={valor}
                            checked={tipo === valor}
                            onChange={() => trocarTipo(valor)}
                        />
                        <span>{rotulo}</span>
                    </label>
                ))}
            </fieldset>

            <p className="order-intro">
                {compra
                    ? 'Preencha os dados para receber o dispositivo no seu endereço.'
                    : 'Sua doação leva um dispositivo a quem precisa. Nós cuidamos da entrega.'}
            </p>

            <div className="order-grid">
                <Campo id={id('nome')} name="nome" label="Nome completo" autoComplete="name"
                    value={v.nome} onChange={mudar} erro={erros.nome} className="is-wide" />
                <Campo id={id('email')} name="email" type="email" label="E-mail" autoComplete="email"
                    value={v.email} onChange={mudar} erro={erros.email} />

                {compra && (
                    <Campo id={id('telefone')} name="telefone" type="tel" inputMode="tel"
                        label="Telefone com DDD" autoComplete="tel"
                        value={v.telefone} onChange={mudar} erro={erros.telefone} />
                )}

                <Campo id={id('quantidade')} name="quantidade" type="number" min="1" step="1" inputMode="numeric"
                    label="Quantidade" value={v.quantidade} onChange={mudar} erro={erros.quantidade} />
            </div>

            {compra ? (
                <fieldset className="order-address">
                    <legend>Endereço de entrega</legend>

                    <Campo id={id('cep')} name="cep" inputMode="numeric" label="CEP"
                        autoComplete="postal-code" maxLength={9}
                        value={v.cep} onChange={mudarCep} erro={erros.cep} />

                    {/* Avisos da consulta de CEP: o leitor de tela anuncia */}
                    <p
                        className={`order-cep-status ${avisoCep?.tipo === 'erro' ? 'is-error' : ''}`}
                        role="status"
                    >
                        {buscandoCep ? 'Buscando endereço…' : avisoCep?.texto}
                    </p>

                    <BuscaCep aoEscolher={escolherEndereco} />

                    <div className="order-grid">
                        <Campo id={id('rua')} name="rua" label="Rua" autoComplete="address-line1"
                            value={v.rua} onChange={mudar} erro={erros.rua} className="is-wide" />
                        <Campo id={id('numero')} name="numero" label="Número"
                            value={v.numero} onChange={mudar} erro={erros.numero} />
                        <Campo id={id('complemento')} name="complemento" label="Complemento" opcional
                            autoComplete="address-line2" value={v.complemento} onChange={mudar} />
                        <Campo id={id('bairro')} name="bairro" label="Bairro" opcional
                            value={v.bairro} onChange={mudar} />
                        <Campo id={id('cidade')} name="cidade" label="Cidade"
                            autoComplete="address-level2" value={v.cidade} onChange={mudar} erro={erros.cidade} />
                        <Campo id={id('estado')} name="estado" label="UF" maxLength={2}
                            autoComplete="address-level1" value={v.estado} onChange={mudar} erro={erros.estado} />
                    </div>
                </fieldset>
            ) : (
                <>
                    <div className="field">
                        <label htmlFor={id('mensagem')}>
                            Mensagem para quem receber<span className="field__opt"> (opcional)</span>
                        </label>
                        <textarea id={id('mensagem')} name="mensagem" rows="3" maxLength={300}
                            value={v.mensagem} onChange={mudar} />
                    </div>
                    <label className="order-check">
                        <input type="checkbox" name="anonimo" checked={v.anonimo} onChange={mudar} />
                        <span>Quero doar de forma anônima (meu nome não será informado a quem receber)</span>
                    </label>
                </>
            )}

            {erroEnvio && <p className="order-error" role="alert">{erroEnvio}</p>}

            <button type="submit" className="btn btn--primary order-submit" disabled={enviando}>
                {enviando ? 'Enviando…' : compra ? 'Finalizar pedido' : 'Confirmar doação'}
            </button>
        </form>
    )
}

export default function OrderModal({ aberto, aoFechar, tipoInicial = 'compra' }) {
    const ref = useRef(null)
    const titleId = useId()

    useEffect(() => {
        const dialog = ref.current
        if (!dialog) return
        if (aberto && !dialog.open) dialog.showModal()
        if (!aberto && dialog.open) dialog.close()
    }, [aberto])

    return (
        <dialog
            ref={ref}
            className="order-modal"
            aria-labelledby={titleId}
            onClose={aoFechar}
            onClick={(e) => e.target === ref.current && aoFechar()}
        >
            <div className="order-modal__box">
                <header className="order-modal__header">
                    <h2 id={titleId}>Solicitar dispositivo</h2>
                    <button type="button" className="order-modal__close" onClick={aoFechar} aria-label="Fechar">
                        <FaXmark aria-hidden="true" />
                    </button>
                </header>

                {/* Só existe com o modal aberto: cada abertura começa com o formulário limpo */}
                {aberto && <Formulario tipoInicial={tipoInicial} aoFechar={aoFechar} />}
            </div>
        </dialog>
    )
}