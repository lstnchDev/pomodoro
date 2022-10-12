import { Fragment, useState } from "react"
import styles from "./css/BurgerMenu.module.css"
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Popover } from "@mui/material";




const ITEM_HEIGHT = 48;

const BurgerMenu = (props)=>{
    const [burgerState, setBurgerState] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    

    const handleClick = (e)=>{
        setAnchorEl(e.currentTarget)
        setBurgerState(true)
    }


    const onCloseHandler = ()=>setBurgerState(false)

    return (
        <Fragment>

 <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={burgerState ? 'long-menu' : undefined}
        aria-expanded={burgerState ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        className={styles.iconBtn}
      >
        <MoreVertIcon />
      </IconButton>
              
        <Menu
            id="long-menu"
            MenuListProps={{
            'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={burgerState}
            onClose={onCloseHandler}
            PaperProps={{
            style: {
                maxHeight: '20%',
                color: '#FBF2CF',
                backgroundColor: '#A1C298'
            },
            }}
        >
            {[props.options][0].map((option, index) => (
            <MenuItem className={styles.dropdownMenu} key={option}  onClick={(e)=> props.burgerBtnHandler(e,index)}>
                {option}
            </MenuItem>
            ))}

        </Menu>
                {/* <button className={`${styles.btnBurger} ${props.className}`} type={props.type}>
                    <img src={require(`../../img/three-dots.png`)}></img>
            </button> */}
        </Fragment>
    )
}

export default BurgerMenu