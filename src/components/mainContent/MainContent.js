import { Fragment, useContext, useState } from "react"
import Modal from 'react-modal';
import PomodoroItem from "./PomodoroItem"
import Tasks from "./Tasks"
import styles from "./css/MainContent.module.css"
import TaskContext from "../tasks/task-context";
import ModalContent from "./ModalContent";

Modal.setAppElement('#modal');

const MainContent = ()=>{
    const [moadlActive, setActive] = useState(false)
    
    const taskContext = useContext(TaskContext)
    const [title, setTitle] = useState("")
    const [stage, setStage] = useState(1)


    const openModal = ()=>{
        setActive(true)
    }

    const closeModal = ()=>{
        setActive(false)
        setStage(1)
        setTitle("")

        
    }
    const onTaskHandler = (e)=>{
        setTitle(e.target.value)
    }
    const onStageHandler = (e)=>{
        setStage(e.target.value)
    }
    const onSubmitHandler = (data)=>{
        taskContext.addItem({
            id: Math.floor(Math.random()*1000) + 1,
            title: data.taskTitle,
            activeStage: 0,
            stage: data.stageTitle
        })
        setActive(false)
    }


    return(
        <Fragment>
            <PomodoroItem timer={taskContext.timer}/>
            <Tasks onClickHandler={openModal}/>
            <Modal 
                className={styles.modal}
                isOpen={moadlActive}
                onRequestClose={closeModal}
            >
                <ModalContent 
                            firstClassName={styles.taskTitleInput}
                            placeholder="Add new task..."
                            titleModal="New task"
                            firstTitle="Task Title"
                            lastTitle="Est Pomodoros"
                            btnActionName="Add Task"
                            firstInputType="text"
                            lastInputType="number"
                            firstInputName="taskTitle"
                            lastInputName="stageTitle"
                            lastInputLabel="Est Pomodoros"
                            modalActive={closeModal} 
                            taskHandler={onTaskHandler}
                            stageHandler={onStageHandler}
                            submitHandler={onSubmitHandler}
                            title={title}
                            stage={stage}
                />
            </Modal>
        </Fragment>
    )
}

export default MainContent