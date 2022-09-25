import style from './header.module.css';

export default function Header() {
  return (
    <header className={style.header}>
      <img src="/logo.png" className={style.logo} />

      <nav className={style.nav}>
        <a href="#" className={style.headerLink}>
          Imprint
        </a>

        <a href="/all" className={style.headerLink}>
            All Receipts
        </a>
        <a href="/" className={style.headerLink}>
            Upload Receipt
        </a>
      </nav>
    </header>
  );
}
