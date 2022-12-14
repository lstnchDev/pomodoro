import { useContext, useState } from "react"
import Modal from "react-modal"
import ModalContent from "../mainContent/ModalContent"
import TaskContext from "../tasks/task-context"
import Button from "../ui/Button"
import CurrentTime from "./CurrentTime"
import styles from './Header.module.css'

const HeaderMain = ()=>{

    const [modalActive, setActive] = useState(false)
    const taskContext = useContext(TaskContext)

    const [timerWork, setTimerWork] = useState(taskContext.timerWork/60)
    const [timerChill, setTimerChill] = useState(taskContext.timerChill/60)


    const closeModal = (e)=>{
        e.preventDefault()
        setActive(false)
    }

    const openModal = (e)=>{
        e.preventDefault()
        setActive(true)
    }

    const onChangeTimerWork = (e)=>{
        setTimerWork(e.target.value)
    }
    const onChangeTimerChill = (e)=>{
        setTimerChill(e.target.value)
    }
    const onSubmitHandler = (data)=>{
        console.log(data)
        taskContext.setTimer(data.timeWork*60, data.timerChill*60)
        setActive(false)
    }

    return (
        <header>
            <div className={styles.logo}>
                <h1><a href="/">MyPomodoro</a></h1>
            </div>

            {/*получаем актуальное время пользователя*/}
            <CurrentTime/>
            <nav>
                <ul className={styles.menu}>
                    <li><Button onClick={openModal} className={styles.btnCustom}>Настройки</Button></li>
                </ul>
            </nav>

            {/*создается модальное окно с помощью react-modal*/}
            <Modal
                className={styles.modal}
                isOpen={modalActive}
                onRequestClose={closeModal}
            >
             {/*получаем компонент для модального окна*/}
                <ModalContent titleModal="TIMER SETTING"
                                firstTitle="Work Time"
                                lastTitle="Chill Time"
                                btnActionName="Set Time"
                                firstInputType="number"
                                lastInputType="number"
                                firstInputName="timeWork"
                                lastInputName="timerChill"
                                modalActive={closeModal} 
                                taskHandler={onChangeTimerWork}
                                stageHandler={onChangeTimerChill}
                                submitHandler={onSubmitHandler}
                                title={timerWork}
                                stage={timerChill}
                    />
               
            </Modal>
        </header>
    )
}

export default HeaderMain