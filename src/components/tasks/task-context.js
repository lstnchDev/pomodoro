import React from "react"

const TaskContext = React.createContext({
    items: [],
    timerWork: 0,
    timerChill: 0,
    addItem: (item)=>{},
    removeItem: (continueTask)=>{},
    setTimer: (timerWorkSeconds, timerChillSeconds)=>{}
})

export default TaskContext