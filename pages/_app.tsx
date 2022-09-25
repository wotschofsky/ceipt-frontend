import type { AppProps } from 'next/app';

import Header from '../components/Header';
import '../styles/globals.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from '../components/Footer';

library.add(
  faGithub, faTwitter, faInstagram
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer/>
    </div>
  );
}
export default MyApp;
