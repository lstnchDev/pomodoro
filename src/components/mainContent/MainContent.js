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

    const openModal = ()=>{
        setActive(true)
    }

    const closeModal = ()=>{
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
                <ModalContent modalActive={closeModal}/>
            </Modal>
        </Fragment>
    )
}

export default MainContent