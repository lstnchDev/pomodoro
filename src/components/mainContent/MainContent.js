import { Fragment, useContext, useState } from "react"
import Modal from 'react-modal';
import PomodoroItem from "./PomodoroItem"
import Tasks from "./Tasks"
import styles from "./css/MainContent.module.css"
import Button from "../ui/Button";
import Input from "../ui/Input";
import TaskContext from "../tasks/task-context";


Modal.setAppElement('#modal');

const MainContent = ()=>{
    const [moadlActive, setActive] = useState(false)
    const [title, setTitle] = useState("")
    const [stage, setStage] = useState(1)
    const taskContext = useContext(TaskContext)

    const openModal = ()=>{
        setActive(true)
    }

    const closeModal = (e)=>{
        e.preventDefault()
        setActive(false)
    }
    const onSubmitHandler = (e)=>{
        e.preventDefault()
        taskContext.addItem({
            id: Math.floor(Math.random()*1000) + 1,
            title: title,
            stage: stage
        })
        setActive(false)
    }
    const onTaskHandler = (e)=>{
        setTitle(e.target.value)
    }
    const onStageHandler = (e)=>{
        setStage(e.target.value)
    }
    return(
        <Fragment>
            <PomodoroItem/>
            <Tasks onClickHandler={openModal}/>
            <Modal 
                className={styles.modal}
                isOpen={moadlActive}
                onRequestClose={closeModal}
            >
                <h1>New task</h1>
                <form onSubmit={onSubmitHandler}>
                    <Input htmlFor="task" type="text" onChange={onTaskHandler} value={title} placeholder='Add new task...'/>
                    <Input htmlFor="stage" type="number" onChange={onStageHandler} min={1} value={stage}/>

                    <Button type='sumbut'>Add</Button>
                    <Button onClick={closeModal}>Close</Button>
                </form>
            </Modal>
        </Fragment>
    )
}

export default MainContent