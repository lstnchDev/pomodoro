import { useContext } from "react"
import TaskContext from "../tasks/task-context"
import BurgerMenu from "../ui/BurgerMenu"
import styles from "./css/ItemTask.module.css"

const options = [
    'Delete',
    'Change Task'
]
const ItemTask = (props)=>{
    const taskContext = useContext(TaskContext)
    const onBurgerBtnHandler = (e, index)=>{
        switch (index){
            case 0: 
                console.log(e.target.childNodes)
                break
            case 1: 
                console.log(2)
                break
            default: 
                console.log(2)
                break
        }
    }
    return (
        <li id={props.id} className={styles.task}>
            <h3>{props.title}</h3>
            <p className={styles.stage}>{props.activeStage}/{props.stage}</p>
            <BurgerMenu burgerBtnHandler={onBurgerBtnHandler} options={options} className={styles.btnColor}/>
        </li>
        
    )
}

export default ItemTask