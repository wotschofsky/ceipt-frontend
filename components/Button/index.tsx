import style from './button.module.css';

export default function Button({ label, onClick, ...props }: any) {
  return (
    <button onClick={onClick} className={style.button} {...props}>
      {label}
    </button>
  );
}
