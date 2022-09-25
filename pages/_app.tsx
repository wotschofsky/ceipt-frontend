import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGithub,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import type { AppProps } from 'next/app';

import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/globals.css';

library.add(faGithub, faTwitter, faInstagram);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
export default MyApp;
