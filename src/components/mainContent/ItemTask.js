import BurgerMenu from "../ui/BurgerMenu"
import styles from "./css/ItemTask.module.css"


const ItemTask = (props)=>{
    return (
        <li className={styles.task}>
            <h3>{props.title}</h3>
            <BurgerMenu className={styles.btnColor}/>
        </li>
        
    )
}

export default ItemTask