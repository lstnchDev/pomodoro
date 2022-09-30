import { useReducer } from "react"
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
    items: testTask
 }

const ADD_ITEM = "ADD_ITEM"
const REMOVE_ITEM = "REMOVE_ITEM"

const taskReducer = (state, action)=>{
    if(action.type === ADD_ITEM){
        let updateItems = state.items.concat(action.item)
        return {
            items: updateItems
        }
    }
    if (action.type === REMOVE_ITEM){
        console.log(state.items)

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
    const taskContext = {
        items: taskState.items,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }

    return <TaskContext.Provider value={taskContext}>{props.children}</TaskContext.Provider>
}

export default TaskContextProvider