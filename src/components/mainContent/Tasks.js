import { Fragment, useContext } from "react"
import styles from "./css/Tasks.module.css"
import BurgerMenu from "../ui/BurgerMenu"
import Button from "../ui/Button"
import TaskItems from "./TaskItems"
import TaskContext from "../tasks/task-context"


const options = [
    'Delete All',
    'Add Task'
]

const Tasks = (props)=>{
    const taskContext = useContext(TaskContext)

    /*проверка на наличие задач*/
    const hasItems = taskContext.items.length > 0

    const onRemoveTask = ()=> {
        taskContext.removeAll()
    }
    const onBurgerBtnHandler = (e,index)=>{
        switch (index){
            case 0: 
                taskContext.removeAll()
                break
            case 1: 
                props.onClickHandler()    
                break
            default: 
                console.log(2)
                break
        }

    }
    return (
        <Fragment>
            <div className={styles.tasks}>
                <div className={styles.taskHeader}>
                    <h2>Tasks</h2>
                    <Button onClick={props.onClickHandler} className={styles.btnCustom}>New Task</Button>
                    <BurgerMenu options={options} burgerBtnHandler={onBurgerBtnHandler} addTask={props.onClickHandler} className={styles.btnColor}/>
                </div>
                {/* если задачи есть, то формируется компонент */}
                {hasItems && <TaskItems items={taskContext.items}/>}
            </div>
        </Fragment>
    )
}

export default Tasks