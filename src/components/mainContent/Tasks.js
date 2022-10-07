import { Fragment, useContext } from "react"
import styles from "./css/Tasks.module.css"
import BurgerMenu from "../ui/BurgerMenu"
import Button from "../ui/Button"
import TaskItems from "./TaskItems"
import TaskContext from "../tasks/task-context"

const Tasks = (props)=>{
    const taskContext = useContext(TaskContext)

    /*проверка на наличие задач*/
    const hasItems = taskContext.items.length > 0

    const onClickHandler = ()=> {
        taskContext.removeAll()
    }

    return (
        <Fragment>
            <div className={styles.tasks}>
                <div className={styles.taskHeader}>
                    <h2>Tasks</h2>
                    <Button onClick={props.onClickHandler} className={styles.btnCustom}>New Task</Button>
                    <BurgerMenu onClick={onClickHandler} className={styles.btnColor}/>
                </div>
                {/* если задачи есть, то формируется компонент */}
                {hasItems && <TaskItems items={taskContext.items}/>}
            </div>
        </Fragment>
    )
}

export default Tasks