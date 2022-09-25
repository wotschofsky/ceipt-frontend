import style from './footer.module.css';
import Link from "next/link";

export default function Footer() {
    return (
        <div className={style.footer}>
            <span className={style.copyright}>© Ceipt 2022</span>

            <nav className={style.nav}>
                <Link href="/imprint">
                    <a className={style.link}>
                        Imprint
                    </a>
                </Link>

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


