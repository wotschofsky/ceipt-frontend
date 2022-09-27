import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGithub,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/globals.css';
import '../styles/button.scss';

library.add(faGithub, faTwitter, faInstagram);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ceipt - Making Shopping Sussier</title>
      </Head>

      <Header />
      <div style={{ minHeight: "calc(100vh - 15rem)", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "3rem", paddingBottom: "1rem" }}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}
export default MyApp;
