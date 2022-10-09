import { Fragment } from "react"
import { FormProvider, useForm } from "react-hook-form"
import Button from "../ui/Button"
import Input from "../ui/Input"
import styles from "./css/ModalContent.module.css"

const ModalContent = (props)=>{

    // используется react-hook-form для валидации инпутов
    const formMethods = useForm({
        mode: "onBlur"
    })
    const {register,
        formState: {
            errors,
        },
        handleSubmit} = formMethods


    return (
        <Fragment>
            <h1>{props.titleModal}</h1>
                <FormProvider {...formMethods}>
                    <form onSubmit={handleSubmit(props.submitHandler)}>
                        <div className={styles.inputItems}>
                            <Input className={styles.numberInput} {...register(props.firstInputName, {required:"Please enter valid input"})}
                            errors={errors.taskTitle} name={props.firstInputName} htmlFor={props.firstInputName} type={props.firstInputType} onChange={props.taskHandler} value={props.title} placeholder='Add new task...'/>
                            <Input className={styles.numberInput}{...register(props.lastInputName, {required:"Please enter valid input"})}
                            errors={errors.stageTitle} name={props.lastInputName} htmlFor={props.firstInputName} type={props.lastInputType} onChange={props.stageHandler} min={1} value={props.stage}/>

                        </div>
                        <Button className={styles.buttonModal} type='sumbut'>{props.actionName}</Button>
                        <Button className={styles.buttonModal} onClick={props.modalActive}>Close</Button>
                    </form>
                </FormProvider>

        </Fragment>
    )
}

export default ModalContent