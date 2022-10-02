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
    const [timeSeconds, setTimer] = useState(taskContext.timer)
    const [pomodorState, setPomodorState] = useState(STOP)
    const [modeState, setModeState] = useState(WORK)

    const timer = new Date(timeSeconds * 1000).toISOString().substring(14, 19)
    useEffect(()=>{
  
        if (timeSeconds === 0){
            if (modeState === WORK){
                // setPomodorState(PAUSE)
                setModeState(CHILL)
                if (taskContext.items[0].stage - taskContext.items[0].activeStage === 1){
                    taskContext.removeItem(window.confirm(isContinue)) 
                }              
                let audio = document.querySelector('.notifSound')
                audio.play()
        
                taskContext.setTimer(120)
            }
            if (modeState === CHILL){
                // setPomodorState(PAUSE)
                setModeState(WORK)
                let audio = document.querySelector('.notifStartSound')
                audio.play()

                taskContext.setTimer(300)
                
            }
        }
        else{
            if(pomodorState === START){
                const time = setTimeout(()=>{
                    setTimer(timeSeconds-1)
                }, 1000)

                return ()=> clearInterval(time)
            }
            else if(pomodorState === STOP) setTimer(taskContext.timer) 
        }
    },[timeSeconds, pomodorState, modeState, taskContext])
    
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

        if (modeState === WORK){
            setModeState(CHILL)
            taskContext.setTimer(120)
            if (taskContext.items[0].stage - taskContext.items[0].activeStage === 1){
                taskContext.removeItem(window.confirm(isContinue)) 
            }

        }
        if (modeState === CHILL){
            setModeState(WORK)
            taskContext.setTimer(300)
        }       
        setPomodorState(STOP)
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