import { Fragment } from "react"
import styles from "./css/Tasks.module.css"
import BurgerMenu from "../ui/BurgerMenu"
import Button from "../ui/Button"
import TaskItems from "./TaskItems"

const Tasks = (props)=>{
    return (
        <Fragment>
            <div className={styles.tasks}>
                <div className={styles.taskHeader}>
                    <h2>Tasks</h2>
                    <Button onClick={props.onClickHandler} className={styles.btnCustom}>New Task</Button>
                    <BurgerMenu className={styles.btnColor}/>
                </div>
                <TaskItems/>
            </div>
        </Fragment>
    )
}

export default Tasks