import UploadBook from '../../components/UploadBook/UploadBook'
import FindBooks from '../../components/FindBooks/FindBooks'
import FileStatus from '../../components/FileStatus/FileStatus'
import SyncedBooks from '../../components/SyncedBooks/SyncedBooks'
import { useConversor } from '../../hooks/useConversor'
import './converter.css'

function Converter() {
    const c = useConversor()

    return (
        <div className="converter-page">
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