import { useFormContext } from 'react-hook-form'
import styles from './css/Input.module.css'

const Input = (props )=>{
    const methods = useFormContext();
    return(
        <div>
            <label htmlFor={props.htmlFor}/>
            <input  {...methods.register(props.name)} htmlFor={props.htmlFor} type={props.type} min={props.min}  max={props.max} onChange={props.onChange} value={props.value} placeholder={props.placeholder}/>
        </div>
    )
}

export default Input