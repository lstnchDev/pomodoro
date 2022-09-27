import { Fragment, useEffect, useState } from "react"
import styles from './CurrentTime.module.css'

const CurrentTime = ()=>{
    const [time, setTime] = useState(new Date().toLocaleTimeString('ru-RU'))
    useEffect(()=>{
        const interval = setInterval(()=>{
            setTime(new Date().toLocaleTimeString('ru-RU'))
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <Fragment >
            <h3 className={styles.time}>{time}</h3>
        </Fragment>
    )
}

export default CurrentTime