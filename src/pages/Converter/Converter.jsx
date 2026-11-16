import FileStatus from "../../components/FileStatus/FileStatus"
import UploadBook from "../../components/UploadBook/UploadBook"
import SyncedBooks from "../../components/SyncedBooks/SyncedBooks";

function Converter(){
    return(
        <>
        <UploadBook />
        <FileStatus />
        <SyncedBooks
                books={books}
                onTransfer={handleTransfer}
                onDelete={handleDelete}/>
        </>
    )
}

export default Converter