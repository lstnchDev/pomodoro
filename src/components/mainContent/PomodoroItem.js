import { useContext, useEffect, useState } from 'react'
import TaskContext from '../tasks/task-context'
import Button from '../ui/Button'
import Card from '../ui/Card'
import styles from './css/PomodoroItem.module.css'
import clickSound from '../../sound/btnSound.mp3'
import notifSound from '../../sound/notifSound.mp3'
import notifStartSound from '../../sound/notifStartSound.mp3'

const statePomodoro = {
    WORK: "WORK",
    CHILL: "CHILL",
    PAUSE: "PAUSE",
    START: "START",
    STOP: "STOP",

}

const isContinue = "Do you want to extend the task?"

const PomodoroItem = (props)=>{

    const taskContext = useContext(TaskContext)
    const [timeSeconds, setTimer] = useState(taskContext.timerWork)

    const [pomodorState, setPomodorState] = useState(statePomodoro.STOP)
    const [modeState, setModeState] = useState(statePomodoro.WORK)

    const [pomodoroActive, setActiveState] = useState(true)

    /*создаем переменную для перевода в дату и получения времени*/
    const timer = new Date(timeSeconds * 1000).toISOString().substring(14, 19)

    useEffect(()=>{
        
        /*когда таймер заканчивается*/
        if (timeSeconds === 0){
            
            /*проверка последнего сосояния помодоро*/
            if (modeState === statePomodoro.WORK){
                let audio = document.querySelector('.notifSound')
                audio.play()
                
                /*проверка на наличие задач*/
                if (taskContext.items[0]){
                    if (taskContext.items[0].stage - taskContext.items[0].activeStage === 1){
                        taskContext.removeItem(window.confirm(isContinue)) 
                    }else taskContext.removeItem(false)
      
                }        
                setActiveState(false)
                setModeState(statePomodoro.CHILL)
                setTimer(taskContext.timerChill)
            }
            else if (modeState === statePomodoro.CHILL){
                let audio = document.querySelector('.notifStartSound')
                audio.play()
                setActiveState(true)
                setModeState(statePomodoro.WORK)
                setTimer(taskContext.timerWork)
            }
        }
        else{
            if(pomodorState === statePomodoro.START){
                const time = setTimeout(()=>{
                    setTimer(timeSeconds-1)
                }, 1000)

                return ()=> clearInterval(time)
            }else if (pomodorState === statePomodoro.STOP){
                if(pomodoroActive){
                    setTimer(taskContext.timerWork)
                }else setTimer(taskContext.timerChill)
        
            }
        }
    },[timeSeconds, pomodorState, modeState, taskContext, pomodoroActive])
    
    /*кнопка START/STOP*/
    const onStartHandler = ()=> {
        let audio = document.querySelector('.btnSound')
        audio.play()
        if (pomodorState === statePomodoro.START) {
            setPomodorState(statePomodoro.PAUSE)
        }
        else setPomodorState(statePomodoro.START)

    } 

    /*кнопка RESET для сброса таймера и состояния*/
    const onResetHandler = ()=>{
        let audio = document.querySelector('.btnSound')
        audio.play()
        setPomodorState(statePomodoro.STOP)
    }
    /*кнопка SCIP для пропуска актуального состояния*/
    const onSkipHandler = ()=>{
        let audio = document.querySelector('.btnSound')
        audio.play()
        if (modeState === statePomodoro.WORK){
            setModeState(statePomodoro.CHILL)
            setTimer(taskContext.timerChill)
            if (taskContext.items[0]){
                if (taskContext.items[0].stage - taskContext.items[0].activeStage === 1){
                    taskContext.removeItem(window.confirm(isContinue)) 
                }else taskContext.removeItem(false)    
            }

        }
        if (modeState === statePomodoro.CHILL){
            setModeState(statePomodoro.WORK)
            setTimer(taskContext.timerWork)
        }       
        setPomodorState(statePomodoro.STOP)
        setActiveState(!pomodoroActive)

    }
    console.log(pomodorState.STOP)
    return (
        <div>
            <Card className={styles.pomodoroItem}>
                <h1 className={styles.pomodoroTime}>{timer}</h1>
                <div className={styles.btnItems}>
                    <Button onClick={onResetHandler}>RESET</Button>
                    <Button onClick={onStartHandler}>{pomodorState === statePomodoro.START ? statePomodoro.STOP : statePomodoro.START}</Button>
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