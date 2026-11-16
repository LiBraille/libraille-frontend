
import SyncedBooks from "../../components/SyncedBooks/SyncedBooks";
function Convert(){
    return(
        <>
        <SyncedBooks
        books={books}
        onTransfer={handleTransfer}
        onDelete={handleDelete}/>
        </>
    )
}

export default Convert