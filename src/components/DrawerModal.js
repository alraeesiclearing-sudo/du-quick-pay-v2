import {Drawer, Container} from "@mui/material";
import {useState} from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {makeStyles} from "@mui/styles";
const useStyles = makeStyles((theme) => {
    return {
        closeIcon :{
            position: "absolute !important",
            right: 0,
            top: 0,
        }
    }
})
export default function DrawerModal({children, anchor, open, onClose}){
    const classes = useStyles();
return(
    <Drawer anchor={anchor} open={open} onClose={onClose}>
        <Container maxWidth="lg" sx={{py:12}}>
            {children}
            <IconButton aria-label="close" className={classes.closeIcon} onClick={onClose}>
                <CloseIcon />
            </IconButton>
        </Container>
    </Drawer>
)
}
