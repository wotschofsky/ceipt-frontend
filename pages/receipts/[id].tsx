import Head from 'next/head';
import { FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

import style from '../../components/iconButton.module.css';
import apiClient from '../../services/apiClient';

export default function Page({ receipt }: any) {
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
          content={`/api/v1/assets/receipts/${receipt._id}`}
        />
        {/* <meta name="twitter:domain" content="YourDomain.com" /> */}
      </Head>

      <div
        style={{
          position: 'relative',
          top: '10rem',
          height: 'calc(100vh - 25rem)',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img src={`/api/v1/assets/receipts/${receipt._id}`} />
      </div>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          'moin master die alwkejr'
        )}&url=${encodeURIComponent(
          'https://ceipt.app/receipts/' + receipt._id
        )}`}
      >
        <FaTwitter className={style.iconButton} />
      </a>

      <FaInstagram className={style.iconButton} />

      <a
        href={`whatsapp://send?text=${encodeURIComponent(
          'moin master die alwkejr'
        )}`}
        data-action="share/whatsapp/share"
        target="_blank"
        rel="noreferrer"
      >
        <FaWhatsapp className={style.iconButton} />
      </a>
    </>
  );
}

export const getServerSideProps = async ({ query }: any) => {
  const { id } = query;

  const receipt = await apiClient().getReceiptById(id);

  return {
    props: {
      receipt,
    },
  };
};
