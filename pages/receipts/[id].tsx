import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ReceiptSvg from '../../components/ReceiptSvg';
import apiClient from '../../services/apiClient';

export default function Page({ receipt }: any) {
  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@site_username" />
        <meta name="twitter:title" content="Top 10 Things Ever" />
        <meta name="twitter:description" content="Up than 200 characters." />
        <meta name="twitter:creator" content="@creator_username" />
        <meta name="twitter:image" content="http://placekitten.com/250/250" />
        <meta name="twitter:domain" content="YourDomain.com" />

        <link rel="canonical" href="/web/tweet-button" />
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

      {/* <FontAwesomeIcon icon={["fab", "twitter"]} style={{width: "3rem", background: "#222", borderRadius: "2px", padding: "0.5rem", color: "white"}} />

        <FontAwesomeIcon icon={["fab", "instagram"]} style={{width: "3rem", background: "#222", borderRadius: "2px", padding: "0.5rem", color: "white"}} /> */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          'moin master die alwkejr'
        )}&url=${encodeURIComponent('https://google.com/amogus')}`}
      ></a>
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
