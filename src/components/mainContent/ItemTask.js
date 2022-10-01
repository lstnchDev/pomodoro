import BurgerMenu from "../ui/BurgerMenu"
import styles from "./css/ItemTask.module.css"


const ItemTask = (props)=>{
    console.log(props.activeStage, props.stage)
    return (
        <li className={styles.task}>
            <h3>{props.title}</h3>
            <p className={styles.stage}>{props.activeStage}/{props.stage}</p>
            <BurgerMenu className={styles.btnColor}/>
        </li>
        
    )
}

export default ItemTask