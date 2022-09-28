import styles from './css/Input.module.css'

const Input = (props)=>{
    return(
        <div>
            <label htmlFor={props.htmlFor}></label>
            <input htmlFor={props.htmlFor} type={props.type} onChange={props.onChange}></input>
        </div>
    )
}

export default Input