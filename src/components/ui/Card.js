import styles from "./css/Cards.module.css"

const Card = (props)=>{
    return (
        <div className={`${styles.card} ${props.className}`}>{props.children}</div>
    )
}

export default Card