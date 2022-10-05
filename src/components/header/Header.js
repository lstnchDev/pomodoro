import { useContext, useState } from "react"
import Modal from "react-modal"
import TaskContext from "../tasks/task-context"
import Button from "../ui/Button"
import Input from "../ui/Input"
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
    const onClickHandler = (e)=>{
        e.preventDefault()
        taskContext.setTimer(timerWork*60, timerChill*60)
        setActive(false)
    }

    return (
        <header>
            <div className={styles.logo}>
                <h1><a href="/">MyPomodoro</a></h1>
            </div>
            <CurrentTime/>
            <nav>
                <ul className={styles.menu}>
                    <li><Button onClick={openModal} className={styles.btnCustom}>Настройки</Button></li>
                </ul>
            </nav>
            <Modal
                className={styles.modal}
                isOpen={modalActive}
                onRequestClose={closeModal}
            >
            <div className={styles.timerModal}>
                <h2>TIMER SETTING</h2>
                <div className={styles.inputTimer}>
                    <div className={styles.workTimer}>
                        <h3>Work Time</h3>
                        <Input htmlFor='minuteWork' type='number' min='1' max='60' value={timerWork} onChange={onChangeTimerWork}></Input>
                    </div>
                    <div className={styles.chillTimer}>
                        <h3>Chill Time</h3>
                        <Input htmlFor='minuteChill' type='number' min='1' max='60' value={timerChill} onChange={onChangeTimerChill}></Input>
                </div>

                </div>
                <Button onClick={onClickHandler}>OK</Button>

            </div>
            </Modal>
        </header>
    )
}

export default HeaderMain