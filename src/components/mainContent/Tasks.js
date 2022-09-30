import { Fragment, useContext } from "react"
import styles from "./css/Tasks.module.css"
import BurgerMenu from "../ui/BurgerMenu"
import Button from "../ui/Button"
import TaskItems from "./TaskItems"
import TaskContext from "../tasks/task-context"

const Tasks = (props)=>{
    const taskContext = useContext(TaskContext)
    const hasItems = taskContext.items.length > 0

    return (
        <Fragment>
            <div className={styles.tasks}>
                <div className={styles.taskHeader}>
                    <h2>Tasks</h2>
                    <Button onClick={props.onClickHandler} className={styles.btnCustom}>New Task</Button>
                    <BurgerMenu className={styles.btnColor}/>
                </div>
                {hasItems && <TaskItems items={taskContext.items}/>}
            </div>
        </Fragment>
    )
}

export default Tasks