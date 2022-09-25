import Error from 'next/error';
import Head from 'next/head';
import { FaTwitter, FaWhatsapp } from 'react-icons/fa';

import style from '../../components/iconButton.module.css';
import receiptController from '../../controllers/receipt.controller';
import initMongoose from '../../utils/initMongoose';

export default function Page({ receipt }: any) {

  if (receipt == null) return <Error statusCode={404}/>

  const text = encodeURIComponent('moin master die alwkejr');
  const url = encodeURIComponent('https://ceipt.app/receipts/' + receipt._id);

  const svgUrl = `https://ceipt.app/api/v1/assets/receipts/${receipt._id}`

  const twitterShareLink = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  const whatsappShareLink = `whatsapp://send?text=${text}`;

  const desc = `${receipt.ownerName}'s Sustainability Receipt`

  return (
    <>
      <Head>
        <meta name="description" content={desc}/>
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
          style={{ width: '100%' }}
        >
          <FaTwitter className={style.iconButton} />
        </a>

        {/* <FaInstagram className={style.iconButton} /> */}

        <a
          href={whatsappShareLink}
          data-action="share/whatsapp/share"
          target="_blank"
          rel="noreferrer"
          style={{ width: '100%' }}
        >
          <FaWhatsapp className={style.iconButton} />
        </a>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ query }: any) => {
  const { id } = query;

  await initMongoose();
  const receipt = await receiptController.getById(id);

  return {
    props: {
      receipt: {
        ...receipt?.toObject(),
        products: receipt.products.map((p: any) => ({
          ...p.toObject(),
          _id: p._id.toString(),
        })),
      },
    },
  };
};
