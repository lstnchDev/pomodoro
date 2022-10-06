import { Fragment, useContext, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import TaskContext from "../tasks/task-context"
import Button from "../ui/Button"
import Input from "../ui/Input"
import styles from "./css/ModalContent.module.css"

const ModalContent = (props)=>{
    const [title, setTitle] = useState("")
    const [stage, setStage] = useState(1)

    const taskContext = useContext(TaskContext)

    const formMethods = useForm({
        mode: "onBlur"
    })
    const {register,
        formState: {
            errors,
        },
        handleSubmit} = formMethods

    const onTaskHandler = (e)=>{
        setTitle(e.target.value)
    }
    const onStageHandler = (e)=>{
        setStage(parseInt(e.target.value))
    }
    const onSubmitHandler = (data)=>{
        taskContext.addItem({
            id: Math.floor(Math.random()*1000) + 1,
            title: data.taskTitle,
            activeStage: 0,
            stage: data.stageTitle
        })
        props.modalActive()
    }


    return (
        <Fragment>
            <h1>New task</h1>
                <FormProvider {...formMethods}>

                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Input {...register("taskTitle", {required:"Please enter task title"})}
                            name="taskTitle" htmlFor="task" type="text" onChange={onTaskHandler} value={title} placeholder='Add new task...'/>
                        <div className={styles.error} >{errors.taskTitle && <p>{errors.taskTitle.message || "Error"}</p>}</div>
                        <Input {...register("stageTitle", {required:"Please enter pomodoro time"})}
                            name="stageTitle" htmlFor="stage" type="number" onChange={onStageHandler} min={1} value={stage}/>
                        <div className={styles.error}>{errors.stageTitle && <p>{errors.stageTitle.message || "Error"}</p>}</div>
                        <Button type='sumbut'>Add</Button>
                        <Button onClick={props.modalActive}>Close</Button>
                    </form>
                </FormProvider>

        </Fragment>
    )
}

export default ModalContent