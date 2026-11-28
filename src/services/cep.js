// Consulta de CEP e de endereço. APIs públicas, gratuitas e sem chave.
// ViaCEP é a principal; a BrasilAPI é o plano B se a primeira falhar.
// Cuidado de privacidade: o CEP digitado é enviado a esses serviços (a Política de Privacidade precisa citar isso).

const soDigitos = (texto) => texto.replace(/\D/g, '')

// Coloca o traço: 01001000 vira 01001-000
export function formatarCep(valor) {
    const d = soDigitos(valor).slice(0, 8)
    return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d
}

// Devolve o endereço, ou null se o CEP não existe. Lança erro se o serviço falhar.
async function buscarNoViaCep(cep) {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    if (!res.ok) throw new Error('viacep')
    const dados = await res.json()
    if (dados.erro) return null   // CEP inexistente
    return {
        cep: dados.cep,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
    }
}

async function buscarNaBrasilApi(cep) {
    const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)
    if (res.status === 404) return null
    if (!res.ok) throw new Error('brasilapi')
    const dados = await res.json()
    return {
        cep: dados.cep,
        rua: dados.street,
        bairro: dados.neighborhood,
        cidade: dados.city,
        estado: dados.state,
    }
}

// CEP -> endereço
export async function buscarEnderecoPorCep(cepDigitado) {
    const cep = soDigitos(cepDigitado)
    if (cep.length !== 8) throw new Error('O CEP deve ter 8 números.')

    try {
        return await buscarNoViaCep(cep)
    } catch {
        try {
            return await buscarNaBrasilApi(cep)   // plano B
        } catch {
            throw new Error('Não foi possível consultar o CEP agora. Preencha o endereço à mão.')
        }
    }
}

// Endereço -> CEP (para quem não sabe o CEP). Devolve uma lista de até 5 resultados.
export async function buscarCepPorEndereco({ estado, cidade, rua }) {
    const uf = estado.trim().toUpperCase()
    if (!/^[A-Z]{2}$/.test(uf) || cidade.trim().length < 3 || rua.trim().length < 3) {
        throw new Error('Informe a UF (2 letras), a cidade e pelo menos 3 letras da rua.')
    }

    const endereco = `${uf}/${encodeURIComponent(cidade.trim())}/${encodeURIComponent(rua.trim())}`
    let res
    try {
        res = await fetch(`https://viacep.com.br/ws/${endereco}/json/`)
    } catch {
        throw new Error('Não foi possível consultar agora. Tente de novo.')
    }
    if (!res.ok) throw new Error('Não encontramos esse endereço. Confira os dados.')

    const lista = await res.json()
    return lista.slice(0, 5).map((d) => ({
        cep: d.cep,
        rua: d.logradouro,
        bairro: d.bairro,
        cidade: d.localidade,
        estado: d.uf,
    }))
}