import style from './footer.module.css';

export default function Footer() {
  return (
    <div className={style.footer}>
      <span className={style.copyright}>© Ceipt 2022</span>

      <nav className={style.nav}>
        <a href="#" className={style.link}>
          Imprint
        </a>

        <a href="#" className={style.link}>
          Terms of Service
        </a>

        <a href="#" className={style.link}>
          Privacy
        </a>
      </nav>
    </div>
  );
}
