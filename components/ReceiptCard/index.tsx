import style from "./receipt.module.css"

export default function ReceiptCard(receipt: any) {

    const items = [
        { name: "Lorem juice", amount: 2, },
        { name: "Ipsum burger", amount: 2 },
        { name: "Dolor pasta", amount: 1 },
        { name: "Sit salad", amount: 1 },
        { name: "Amet cola", amount: 3 },
        { name: "Sus baker", amount: 69 },

        { name: "Sit salad", amount: 1 },
        { name: "Amet cola", amount: 3 },
        { name: "Sus baker", amount: 69 },
        { name: "Sit salad", amount: 1 },
        { name: "Amet cola", amount: 3 },
        { name: "Sus baker", amount: 69 },
        { name: "Sit salad", amount: 1 },
        { name: "Amet cola", amount: 3 },

    ]
    return <div className={style.card}>

        <img src="/receipt-end.svg" className={style.start} />

        <div className={style.body}>

            <h3 className={style.cardTitle}>{receipt.receipt.ownerUserId}</h3>
            <span className={style.cardDate}>23.06.2022</span>

            <div className={style.itemRow}>
                <div className={style["itemRow--amount"]}>QTY</div>
                <div className={style["itemRow--name"]}>DESCRIPTION</div>
                <div className={style["itemRow--status"]}>STATUS</div>
                <div className={style["itemRow--co2"]}>KG CO₂</div>
            </div>

            <div className={style.itemList}>
                {items.map(i => <div className={style.itemRow}>



                    <div className={style["itemRow--amount"]}>{i.amount}</div>
                    <div className={style["itemRow--name"]}>{i.name}</div>
                    <div className={style["itemRow--status"]}>VEGETARIAN</div>
                    <div className={style["itemRow--co2"]}>0.2</div>
                </div>)}
            </div>
        </div>

        <img src="/receipt-end.svg" className={style.end} />


    </div>
}