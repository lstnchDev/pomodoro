import React from "react"

const TaskContext = React.createContext({
    items: [],
    addItem: (item)=>{},
    removeItem: (id)=>{}
})

export default TaskContext