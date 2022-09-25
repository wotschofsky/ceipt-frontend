import Head from 'next/head';
import { FaTwitter, FaWhatsapp } from 'react-icons/fa';

import style from '../../components/iconButton.module.css';
import receiptController from '../../controllers/receipt.controller';
import initMongoose from '../../utils/initMongoose';

export default function Page({ receipt }: any) {
  const text = encodeURIComponent('moin master die alwkejr');
  const url = encodeURIComponent('https://ceipt.app/receipts/' + receipt._id);

  const twitterShareLink = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  const whatsappShareLink = `whatsapp://send?text=${text}`;

  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta name="twitter:site" content="@site_username" /> */}
        <meta name="twitter:title" content="Receipt" />
        <meta name="twitter:description" content="custom thing" />
        {/* <meta name="twitter:creator" content="@creator_username" /> */}
        <meta
          name="twitter:image"
          content={`https://ceipt.app/api/v1/assets/receipts/${receipt._id}`}
        />
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
          src={`/api/v1/assets/receipts/${receipt._id}`}
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
      receipt,
    },
  };
};
