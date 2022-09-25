import Head from "next/head"
import { useRouter } from "next/router"
import ReceiptSvg from "../../components/ReceiptSvg"
import apiClient from "../../services/apiClient"

export default function Page({ receipt }: any) {

    return <>
        <Head>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@site_username" />
            <meta name="twitter:title" content="Top 10 Things Ever" />
            <meta name="twitter:description" content="Up than 200 characters." />
            <meta name="twitter:creator" content="@creator_username" />
            <meta name="twitter:image" content="http://placekitten.com/250/250" />
            <meta name="twitter:domain" content="YourDomain.com" />


            <link rel="canonical"
                href="/web/tweet-button" />
        </Head>
        <img src={`/api/v1/assets/receipts/${receipt._id}`} />



        <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("moin master die alwkejr")}&url=${encodeURIComponent("https://google.com/amogus")}`}>
            Tweet</a>
    </>
}

export const getServerSideProps = async ({ query }: any) => {

    const { id } = query

    const receipt = await apiClient().getReceiptById(id);

    return { props: { receipt } }
}



