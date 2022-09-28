import { GetServerSideProps } from 'next';
import Error from 'next/error';
import Head from 'next/head';
import { FaTwitter, FaWhatsapp } from 'react-icons/fa';
import receiptController from '../../controllers/receipt.controller';
import Receipt from '../../definitions/Receipt';

export interface PageProps {
  receipt: Receipt
}
export default function Page({ receipt }: PageProps) {

  if (receipt == null) return <Error statusCode={404} />

  const text = encodeURIComponent('look at my sussy receipt :D');
  const url = encodeURIComponent(`${process.env.NEXT_PUBLIC_API_BASE_URL}/receipts/${receipt._id}`);

  const svgUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/assets/receipts/${receipt._id}`

  const twitterShareLink = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  const whatsappShareLink = `whatsapp://send?text=${text}`;

  const desc = `${receipt.ownerName}'s Sustainability Receipt`

  if (typeof window !== "undefined") alert("kann teilen: " + navigator.canShare({ url: "https://amogus.com", text: "anbei die sache dings", title: "nacken", files: [new File([], "")] }))

  return (
    <>
      <Head>
        <meta name="description" content={desc} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={desc} />
        <meta name="twitter:description" content={`This Shopping Spree cost the Envionment ${receipt.score} kg of CO2`} />
        <meta name="twitter:creator" content={receipt.ownerName} />
        <meta name="twitter:image" content={svgUrl} />
        {/* <meta name="twitter:site" content="@site_username" /> */}
        {/* <meta name="twitter:domain" content="YourDomain.com" /> */}
      </Head>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: '20rem',
        }}
      >
        <img
          src={svgUrl}
          width="100%"
          style={{ paddingBottom: '0.6rem' }}
        />

        <a
          href={twitterShareLink}
          target="_blank"
          rel="noreferrer"
          style={{ width: '100%', paddingBottom: "0.6rem" }}
        >
          <div className="button long primary">
            <FaTwitter />
          </div>
        </a>



        <a
          href={whatsappShareLink}
          data-action="share/whatsapp/share"
          target="_blank"
          rel="noreferrer"
          style={{ width: '100%' }}
        >
          <div className="button long primary">
            <FaWhatsapp />
          </div>
        </a>
        <button onClick={() => navigator.share({ url: "https://amogus.com", text: "anbei die sache dings", title: "nacken", files: [new File([], "")] })}>ballern</button>

      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  const { id } = query;

  const receipt = await receiptController.getById(id as string)

  return {
    props: {
      receipt
    },
  };
};
