import MiniReceipt from "../components/MiniReceipt"
import apiClient from "../services/apiClient"

export default function Page({ receipts }: any) {

    return <div>
        {receipts.map(i => <a style={{ padding: "1rem" }} href={`/receipts/${i._id}`}><MiniReceipt color="red" /></a>)}
    </div>
}
export const getServerSideProps = async () => {

    const receipts = await apiClient().getAllReceipts()

    return { props: { receipts } }
}