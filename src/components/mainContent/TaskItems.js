import { Fragment } from "react"
import ItemTask from "./ItemTask"
import styles from "./css/TaskItems.module.css"

const TaskItems = (props)=>{
    return(
        <Fragment >
            <ul><ItemTask title="test"/></ul>
        </Fragment>
    )
}

export default TaskItems