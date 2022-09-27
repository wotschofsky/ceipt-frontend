import style from "./input.module.css"

export default function TextInput({ placeholder, useFormValue, field, ...props }: any) {

    const { register } = useFormValue

    return <input type="text" placeholder={placeholder} className={style.input} {...register(field)} {...props} />
}