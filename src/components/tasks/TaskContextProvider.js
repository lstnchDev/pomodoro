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
    timer: 1500
 }

const ADD_ITEM = "ADD_ITEM"
const REMOVE_ITEM = "REMOVE_ITEM"
const SET_TIMER = "SET_TIMER"

const taskReducer = (state, action)=>{
    if(action.type === ADD_ITEM){
        let updateItems = state.items.concat(action.item)
        return {
            items: updateItems
        }
    }
    if (action.type === REMOVE_ITEM){
        const currentTask = state.items[0]

        if(currentTask.activeStage !== currentTask.state){

        }
        let updateItems = state.items.filter(item => item.id !== currentTask.id)
        console.log(state.items)

        return {
            items: state.items
        }
    }
    if (action.type === SET_TIMER){
        return {
            items: state.items,
            timer: action.seconds
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

    const removeItemHandler = (item)=>{
        dispatchTaskAction({
            type: REMOVE_ITEM,
            item: item
        })
    }
    const setTimerHandler = (seconds)=>{
        dispatchTaskAction({
            type: SET_TIMER,
            seconds: seconds
        })
    }
    const taskContext = {
        items: taskState.items,
        timer: taskState.timer,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        setTimer: setTimerHandler
    }

    return <TaskContext.Provider value={taskContext}>{props.children}</TaskContext.Provider>
}

export default TaskContextProvider