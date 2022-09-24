import style from "./button.module.css"

export default function Button({ label, onClick }: any) {

    return <button onClick={onClick} className={style.button}>{label}</button>
}