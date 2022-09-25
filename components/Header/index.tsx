import Link from 'next/link';

import style from './header.module.css';

export default function Header() {
  return (
    <header className={style.header}>
      <Link href="/">
        <a className={style.logo}>
          <img src="/logo.png" alt="Ceipt" className={style.logo} />
        </a>
      </Link>

      <nav className={style.nav}>
        <Link href="#" className={style.headerLink}>
          Imprint
        </Link>

        <Link href="/all" className={style.headerLink}>
          All Receipts
        </Link>
        <Link href="/" className={style.headerLink}>
          Upload Receipt
        </Link>
      </nav>
    </header>
  );
}
