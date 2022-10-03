import { useReducer, useState } from "react"
import TaskContext from "./task-context"


const testTask = [
    {
        id: 1,
        title: "test",
        activeStage: 0,
        stage: 1 
    },
    {
        id: 2,
        title: "chill",
        activeStage: 1,
        stage: 2
    },
]

 const defaultTasks = {
    items: testTask,
    timerWork: 1500,
    timerChill: 300,

 }

const ADD_ITEM = "ADD_ITEM"
const REMOVE_ITEM = "REMOVE_ITEM"
const SET_TIMER = "SET_TIMER"

const taskReducer = (state, action)=>{
    if(action.type === ADD_ITEM){
        let updateItems = state.items.concat(action.item)
        return {
            items: updateItems,
            timerWork: state.timerWork,
            timerChill: state.timerChill,

        }

    }
    if (action.type === REMOVE_ITEM){
        const currentTask = state.items[0]
        currentTask.activeStage++
        console.log(state.items)
        let updateItems = state.items
        currentTask.stage = action.continueTask ? currentTask.stage + 1 : currentTask.stage
        if(currentTask.activeStage === currentTask.stage){
                updateItems = state.items.filter(item => item.id !== currentTask.id)
        } 
        console.log(state.timerChill)

        return {
            items: updateItems,
            timerWork: state.timerWork,
            timerChill: state.timerChill,
        }
    }
    if (action.type === SET_TIMER){
        return {
            items: state.items,
            timerWork: action.timerWorkSeconds,
            timerChill: action.timerChillSeconds,
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

    const removeItemHandler = (continueTask)=>{
        dispatchTaskAction({
            type: REMOVE_ITEM,
            continueTask: continueTask
        })
    }
    const setTimerHandler = (timerWorkSeconds, timerChillSeconds)=>{
        dispatchTaskAction({
            type: SET_TIMER,
            timerWorkSeconds: timerWorkSeconds,
            timerChillSeconds: timerChillSeconds,
        })
    }
    const taskContext = {
        items: taskState.items,
        timerWork: taskState.timerWork,
        timerChill: taskState.timerChill,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        setTimer: setTimerHandler
    }

    return <TaskContext.Provider value={taskContext}>{props.children}</TaskContext.Provider>
}

export default TaskContextProvider