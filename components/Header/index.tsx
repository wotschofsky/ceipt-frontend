import style from './header.module.css';

export default function Header() {
  return (
    <header className={style.header}>
      <img src="/logo.png" className={style.logo} />

      <nav>
        <a href="#" className={style.headerLink}>
          Imprint
        </a>
      </nav>
    </header>
  );
}
