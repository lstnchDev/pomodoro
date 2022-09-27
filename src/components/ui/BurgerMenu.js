import styles from "./css/BurgerMenu.module.css"

const BurgerMenu = (props)=>{
    return (
        <button onClick={props.onClick} className={`${styles.btnBurger} ${props.className}`} type={props.type}>
            <img src={require(`../../img/three-dots.png`)}></img>
        </button>
    )
}

export default BurgerMenu