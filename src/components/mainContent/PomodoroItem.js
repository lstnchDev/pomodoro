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


const PomodoroItem = (props)=>{
    const taskContext = useContext(TaskContext)

    const [timeSeconds, setTimer] = useState(taskContext.timer)
    const [pomodorState, setPomodorState] = useState(PAUSE)
    const [modeState, setModeState] = useState(WORK)

    const timer = new Date(timeSeconds * 1000).toISOString().substring(14, 19)

    useEffect(()=>{
        if (timeSeconds === 0){
            if (modeState === WORK){
                // setPomodorState(PAUSE)
                setModeState(CHILL)
                taskContext.removeItem()
                let audio = document.querySelector('.notifSound')
                audio.play()
        
                setTimer(60)
            }
            if (modeState === CHILL){
                // setPomodorState(PAUSE)
                setModeState(WORK)
                let audio = document.querySelector('.notifStartSound')
                audio.play()

                setTimer(taskContext.timer)
                
            }
        }
        else{
            if(pomodorState === START){
                const time = setTimeout(()=>{
                    setTimer(timeSeconds-1)
                }, 1000)

                return ()=> clearInterval(time)
            }
        }
    },[timeSeconds, pomodorState, modeState])
    
    const onStartHandler = ()=> {
        let audio = document.querySelector('.btnSound')
        audio.play()
        if (pomodorState === START) {
            console.log('s')
            setModeState(PAUSE)
        }
        else setPomodorState(START)
    }
    return (
        <div>
            <Card className={styles.pomodoroItem}>
                <h1 className={styles.pomodoroTime}>{timer}</h1>
                <div className={styles.btnItems}>
                    <Button onClick={onStartHandler}>{pomodorState}</Button>
                    <audio className='btnSound'
                    src={clickSound}></audio>
                    <audio className='notifSound'
                    src={notifSound}></audio>
                    <audio className='notifStartSound'
                    src={notifStartSound}></audio>

                </div>
            </Card> 
        </div>        
    )
}

export default PomodoroItem