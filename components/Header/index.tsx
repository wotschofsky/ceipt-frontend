import Image from 'next/future/image';
import Link from 'next/link';

import style from './header.module.css';

export default function Header() {
  return (
    <header className={style.header}>
      <Link href="/">
        <a className={style.logo}>
          <Image src="/logo.png" alt="Ceipt" className={style.logo} width="48" height="48" />
        </a>
      </Link>

      <nav className={style.nav}>
        <Link href="/all">
          <a className={style.headerLink}>
            All Receipts
          </a>
        </Link>
        <Link href="/">
          <a className={style.headerLink}>
            Upload Receipt
          </a>
        </Link>
        <Link href="/about">
          <a className={style.headerLink}>
            About
          </a>
        </Link>
        <a href="#">
          <Image src="/appleComingSoonButton.svg" alt="get us on the app store" width="120" height="40" />
        </a>
      </nav>
    </header>
  );
}
