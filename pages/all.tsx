import { useEffect, useState } from "react"
import MiniReceipt from "../components/MiniReceipt"
import apiClient from "../services/apiClient"

export default function Page({receipts}: any) {





    const ding = [2, 1, 2, 2, 3]

    const colors = {

        1: "green",
        2: "orange",
        3: "red"

    }

    return <div>
        {ding.map(i => <span style={{ padding: "1rem" }}><MiniReceipt color={colors[i]} /></span>)}
    </div>
}
export const getServerSideProps = async () => {

    const receipts = await apiClient().getAllReceipts()

    return { props: { receipts } }
}