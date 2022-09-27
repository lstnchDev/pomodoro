import { Fragment } from "react"
import Modal from 'react-modal';
import PomodoroItem from "./PomodoroItem"
import Tasks from "./Tasks"
import styles from "./css/MainContent.module.css"

const MainContent = ()=>{
    return(
        <Fragment>
            <PomodoroItem/>
            <Tasks/>
            <Modal 
                className={styles.modal}
                isOpen={true}
            >
                <h1>Test</h1>
            </Modal>
        </Fragment>
    )
}

export default MainContent