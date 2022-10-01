import { useContext, useState } from "react"
import Modal from "react-modal"
import TaskContext from "../tasks/task-context"
import Button from "../ui/Button"
import Input from "../ui/Input"
import CurrentTime from "./CurrentTime"
import styles from './Header.module.css'

const HeaderMain = ()=>{

    const [modalActive, setActive] = useState(false)
    const [timer, setTimer] = useState(0)
    const taskContext = useContext(TaskContext)

    const closeModal = (e)=>{
        e.preventDefault()
        setActive(false)
    }

    const openModal = (e)=>{
        e.preventDefault()
        setActive(true)
    }

    const onChangeMinute = (e)=>{
        setTimer(e.target.value)
    }

    const onClickHandler = (e)=>{
        e.preventDefault()
        taskContext.setTimer(timer*60)
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
            <div className={styles.inputTimer}>
                <h2>TIMER SETTING</h2>
                <Input htmlFor='minute' type='number' min='1' max='60' value={timer} onChange={onChangeMinute}></Input>
                <Button onClick={onClickHandler}>OK</Button>
            </div>
            </Modal>
        </header>
    )
}

export default HeaderMain