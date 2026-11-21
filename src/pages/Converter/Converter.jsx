import UploadBook from '../../components/UploadBook/UploadBook'
import FindBooks from '../../components/FindBooks/FindBooks'
import FileStatus from '../../components/FileStatus/FileStatus'
import SyncedBooks from '../../components/SyncedBooks/SyncedBooks'
import { useConversor } from '../../hooks/useConversor'
import { useAvisoSaida } from '../../hooks/useAvisoSaida'
import { usePageTitle } from '../../hooks/usePageTitle'

function Converter() {
    usePageTitle('Conversor')

    // useConversor guarda todo o estado da página (lista de livros, etapa, avisos...)
    const c = useConversor()

    // Há algo que se perderia se a pessoa saísse agora?
    //  - conversão ou transferência em andamento
    //  - livro já convertido, mas ainda não transferido (não ficam guardados)
    const emAndamento = c.itens.some((i) => i.status === 'processing' || i.status === 'transferring')
    const pendentes = c.itens.some((i) => i.status === 'ready')

    // Se for true, o navegador pergunta antes de recarregar ou fechar a aba
    useAvisoSaida(emAndamento || pendentes)

    // page-glow (index.css) dá o fundo com brilhos roxo e dourado, como nas outras páginas.
    // Esta página não usa <Reveal>: é uma ferramenta de trabalho, e animação de entrada só atrapalha.
    return (
        <div className="page-glow">
            <UploadBook onArquivo={c.adicionar} ocupado={c.ocupado} erro={c.erro} />
            <FileStatus
                etapa={c.etapa}
                progresso={c.progresso}
                arquivo={c.arquivoAtual}
                aviso={c.aviso}
            />
            <FindBooks />
            <SyncedBooks books={c.itens} onTransfer={c.transferir} onDelete={c.excluir} />
        </div>
    )
}

export default Converter