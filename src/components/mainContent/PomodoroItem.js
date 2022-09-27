import Button from '../ui/Button'
import Card from '../ui/Card'
import styles from './css/PomodoroItem.module.css'

const PomodoroItem = (props)=>{
    return (
        <div>
            <Card className={styles.pomodoroItem}>
                <h1 className={styles.pomodoroTime}>25:00</h1>
                <div className={styles.btnItems}>
                    <Button>START</Button>
                </div>
            </Card> 
        </div>        
    )
}

export default PomodoroItem