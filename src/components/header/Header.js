import Button from "../ui/Button"
import CurrentTime from "./CurrentTime"
import styles from './Header.module.css'

const HeaderMain = ()=>{
    return (
        <header>
            <div className={styles.logo}>
                <h1><a href="/">MyPomodoro</a></h1>
            </div>
            <CurrentTime/>
            <nav>
                <ul className={styles.menu}>
                    <li><Button className={styles.btnCustom}>Настройки</Button></li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderMain