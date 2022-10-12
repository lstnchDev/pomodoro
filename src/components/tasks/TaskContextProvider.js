import { useReducer } from "react"
import TaskContext from "./task-context"



// базовые значения, если пользователь не установил свои
const DEFAULT_ITEMS = localStorage.getItem('items') != null ? JSON.parse(localStorage.getItem('items')) : []
const DEFAULT_WORK = localStorage.getItem('timerWork') != null ? localStorage.getItem('timerWork') : 1500
const DEFAULT_CHILL = localStorage.getItem('timerChill') != null ? localStorage.getItem('timerChill') : 300

// получаем базовый массив данных
 const defaultTasks = {
    items: DEFAULT_ITEMS,
    timerWork: DEFAULT_WORK,
    timerChill: DEFAULT_CHILL,

 }

const ADD_ITEM = "ADD_ITEM"
const SKIP_ITEM = "SKIP_ITEM"
const REMOVE_ITEM = "REMOVE_ITEM"

const SET_TIMER = "SET_TIMER"
const REMOVE_ALL = "REMOVE_ALL"

const taskReducer = (state, action)=>{
    let updateItems
    switch(action.type){
        case ADD_ITEM: 
            // создаем новый обновленный массив задач
            updateItems = state.items.concat(action.item)
            //добавляем в хранилиззе массив задач
            localStorage.setItem('items', JSON.stringify(updateItems))
            return {
                items: JSON.parse(localStorage.getItem('items')),
                timerWork: state.timerWork,
                timerChill: state.timerChill,
        }
        case SKIP_ITEM:
            //получаем самую раннюю задачу
            const currentTask = state.items[0]

            //увеличиваем помодоро уровень
            currentTask.activeStage++
            updateItems = state.items

            //когда остается последний уровень, то появляется алерт для пользователя с вопросом, 
            //если пользователь нажимает "ОК", то получаем continueTask = true, 
            //то тогда увеличиваем уровень задачи на 1, если пользователь нажимает "Отмена",
            // то continueTask = false и stage остается прежним

            currentTask.stage = action.continueTask ? parseInt(currentTask.stage) + 1 : currentTask.stage

            //если уровень помодоро достиг предела, то данная задача удаляется
            if(currentTask.activeStage === currentTask.stage){
                    updateItems = state.items.filter(item => item.id !== currentTask.id)
            } 
            localStorage.setItem('items', JSON.stringify(updateItems))
            return {
                items: updateItems,
                timerWork: state.timerWork,
                timerChill: state.timerChill,
            }
        case REMOVE_ITEM:
            //удаляем из хранилища все задачи
            updateItems = state.items.filter(item => item.id !== action.id)
            localStorage.setItem('items', JSON.stringify(updateItems))

            return {
                items: updateItems,
                timerWork: state.timerWork,
                timerChill: state.timerChill,
            }
        case REMOVE_ALL:
            //удаляем из хранилища все задачи
            localStorage.removeItem('items')
            return {
                items: [],
                timerWork: state.timerWork,
                timerChill: state.timerChill,
            }
        case SET_TIMER:
                 //обновляем в хранилище данные по времени работы и перерыва
                localStorage.setItem('timerWork', action.timerWorkSeconds)
                localStorage.setItem('timerChill', action.timerChillSeconds)

                return {
                    items: state.items,
                    timerWork: action.timerWorkSeconds,
                    timerChill: action.timerChillSeconds,
                }
        default: 
            return{
                items: state.items,
                timerWork: state.timerWorkSeconds,
                timerChill: state.timerChillSeconds
            }
    
    }
}

const TaskContextProvider = (props)=>{

    const [taskState, dispatchTaskAction] = useReducer(taskReducer, defaultTasks)

    const addItemHandler = (item)=>{
        dispatchTaskAction({
            type: ADD_ITEM,
            item: item
        })
    }

    const skipItemHandler = (continueTask)=>{
        dispatchTaskAction({
            type: SKIP_ITEM,
            continueTask: continueTask
        })
    }
    const removeItemHandler = (id)=>{
        dispatchTaskAction({
            type: REMOVE_ITEM,
            id: id
        })
    }
    const setTimerHandler = (timerWorkSeconds, timerChillSeconds)=>{
        dispatchTaskAction({
            type: SET_TIMER,
            timerWorkSeconds: timerWorkSeconds,
            timerChillSeconds: timerChillSeconds,
        })
    }
    const removeAllHandler = ()=>{
        dispatchTaskAction({
            type: REMOVE_ALL,

        })
    }
    const taskContext = {
        items: taskState.items,
        timerWork: taskState.timerWork,
        timerChill: taskState.timerChill,
        addItem: addItemHandler,
        skipItem: skipItemHandler,
        removeItem: removeItemHandler,
        setTimer: setTimerHandler,
        removeAll: removeAllHandler,

    }

    return <TaskContext.Provider value={taskContext}>{props.children}</TaskContext.Provider>
}

export default TaskContextProvider