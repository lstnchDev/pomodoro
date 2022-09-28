import { Fragment, useState } from "react"
import Modal from 'react-modal';
import PomodoroItem from "./PomodoroItem"
import Tasks from "./Tasks"
import styles from "./css/MainContent.module.css"
import Button from "../ui/Button";
import Input from "../ui/Input";


Modal.setAppElement('#modal');

const MainContent = ()=>{
    const [moadlActive, setActive] = useState(false)

    const openModal = ()=>{
        setActive(true)
    }

    const closeModal = ()=>{
        setActive(false)
    }
    const onSubmitHandler = ()=>{
        setActive(false)
    }
    const onTaskHandler = ()=>{
        
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
                    <Input htmlFor="task" type="text" onChange={onTaskHandler}/>
                    <Button onClick={closeModal}>Add</Button>
                    <Button onClick={closeModal}>Close</Button>
                </form>
            </Modal>
        </Fragment>
    )
}

export default MainContent