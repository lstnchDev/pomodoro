import { useContext, useEffect, useState } from 'react'
import TaskContext from '../tasks/task-context'
import Button from '../ui/Button'
import Card from '../ui/Card'
import styles from './css/PomodoroItem.module.css'
import clickSound from '../../sound/btnSound.mp3'
import notifSound from '../../sound/notifSound.mp3'
import notifStartSound from '../../sound/notifStartSound.mp3'

const WORK = "WORK"
const CHILL = "CHILL"
const PAUSE = "PAUSE"
const START = "START"
const STOP = "STOP"

const isContinue = "Do you want to extend the task?"

const PomodoroItem = (props)=>{

    const taskContext = useContext(TaskContext)
    const [timeSeconds, setTimer] = useState(taskContext.timerWork)

    const [pomodorState, setPomodorState] = useState(STOP)
    const [modeState, setModeState] = useState(WORK)

    const [pomodoroActive, setActiveState] = useState(true)

    console.log(taskContext)

    const timer = new Date(timeSeconds * 1000).toISOString().substring(14, 19)

    useEffect(()=>{
        
        if (timeSeconds === 0){
            if (modeState === WORK){
                // setPomodorState(PAUSE)
                let audio = document.querySelector('.notifSound')
                audio.play()
                if (taskContext.items[0].stage - taskContext.items[0].activeStage === 1){
                    taskContext.removeItem(window.confirm(isContinue)) 
                }              
                setActiveState(false)
                setModeState(CHILL)
                setTimer(taskContext.timerChill)
            }
            else if (modeState === CHILL){
                // setPomodorState(PAUSE)
                let audio = document.querySelector('.notifStartSound')
                audio.play()
                setActiveState(true)
                setModeState(WORK)
                setTimer(taskContext.timerWork)
            }
        }
        else{
            if(pomodorState === START){
                const time = setTimeout(()=>{
                    setTimer(timeSeconds-1)
                }, 1000)

                return ()=> clearInterval(time)
            }else if (pomodorState === STOP){
                if(pomodoroActive){
                    setTimer(taskContext.timerWork)
                }else setTimer(taskContext.timerChill)
        
            }
        }
    },[timeSeconds, pomodorState, modeState, taskContext, pomodoroActive])
    
    const onStartHandler = ()=> {
        let audio = document.querySelector('.btnSound')
        audio.play()
        if (pomodorState === START) {
            setPomodorState(PAUSE)
        }
        else setPomodorState(START)

    } 
    const onResetHandler = ()=>{
        let audio = document.querySelector('.btnSound')
        audio.play()
        setPomodorState(STOP)
    }
    const onSkipHandler = ()=>{
        let audio = document.querySelector('.btnSound')
        audio.play()
        console.log(taskContext)
        if (modeState === WORK){
            setModeState(CHILL)
            setTimer(taskContext.timerChill)
            if (taskContext.items[0].stage - taskContext.items[0].activeStage === 1){
                taskContext.removeItem(window.confirm(isContinue)) 
            }

        }
        if (modeState === CHILL){
            setModeState(WORK)
            setTimer(taskContext.timerWork)
        }       
        setPomodorState(STOP)
        setActiveState(!pomodoroActive)

    }
    return (
        <div>
            <Card className={styles.pomodoroItem}>
                <h1 className={styles.pomodoroTime}>{timer}</h1>
                <div className={styles.btnItems}>
                    <Button onClick={onResetHandler}>RESET</Button>
                    <Button onClick={onStartHandler}>{pomodorState}</Button>
                    <Button onClick={onSkipHandler}>SKIP</Button>

                </div>
                <audio className='btnSound'
                    src={clickSound}></audio>
                <audio className='notifSound'
                    src={notifSound}></audio>
                <audio className='notifStartSound'
                    src={notifStartSound}></audio>

            </Card> 
        </div>        
    )
}

export default PomodoroItem