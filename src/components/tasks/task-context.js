import React from "react"

const TaskContext = React.createContext({
    items: [],
    timer: 0,
    addItem: (item)=>{},
    removeItem: (continueTask)=>{},
    setTimer: (seconds)=>{}
})

export default TaskContext