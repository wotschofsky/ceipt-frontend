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

library.add(faGithub, faTwitter, faInstagram);

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <>
      <Head>
        <title>Ceipt - Making Shopping Sussier</title>
      </Head>

      <Header />
      <Component {...pageProps} />
      <Footer />


    </>
  );
}
export default MyApp;
