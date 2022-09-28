import style from "./input.module.css"

export interface TextInputProps {
    useFormValue: any
    placeholder: string
    field: string
    [key: string]: any
}
export default function TextInput({ useFormValue, placeholder, field, ...props }: TextInputProps) {

    const { register } = useFormValue

    return <input type="text" placeholder={placeholder} className={style.input} {...register(field)} {...props} />
}