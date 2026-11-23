import UploadBook from '../../components/UploadBook/UploadBook'
import FileStatus from '../../components/FileStatus/FileStatus'
import SyncedBooks from '../../components/SyncedBooks/SyncedBooks'
import { useConversor } from '../../hooks/useConversor'
import { useAvisoSaida } from '../../hooks/useAvisoSaida'
import { usePageTitle } from '../../hooks/usePageTitle'

function Converter() {
    usePageTitle('Conversor')

    // useConversor guarda todo o estado da página (lista de livros, etapa, avisos...)
    // Tudo fica só na memória desta aba: nada é salvo no navegador.
    const c = useConversor()

    // Há algo que se perderia se a pessoa saísse agora?
    const emAndamento = c.itens.some((i) => i.status === 'processing' || i.status === 'transferring')
    const pendentes = c.itens.some((i) => i.status === 'ready')

    // Se for true, o navegador pergunta antes de recarregar ou fechar a aba
    useAvisoSaida(emAndamento || pendentes)

    return (
        <div className="page-glow">
            <UploadBook onArquivo={c.adicionar} ocupado={c.ocupado} erro={c.erro} />
            <FileStatus
                etapa={c.etapa}
                progresso={c.progresso}
                arquivo={c.arquivoAtual}
                aviso={c.aviso}
            />
            <SyncedBooks books={c.itens} onTransfer={c.transferir} />
        </div>
    )
}

export default Converter