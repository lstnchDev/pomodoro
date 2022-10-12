import { Fragment } from "react"
import ItemTask from "./ItemTask"
import styles from "./css/TaskItems.module.css"

const TaskItems = (props)=>{

    // получаем массив задач и создаем для каждой контейнер
    const taskItem = props.items.map((item)=> <ItemTask
        key={item.id}
        id={item.id}
        title={item.title}
        activeStage={item.activeStage}
        stage={item.stage}
        
    />)
    
    return(
        <Fragment >
            <ul>{taskItem}</ul>
        </Fragment>
    )
}

export default TaskItems