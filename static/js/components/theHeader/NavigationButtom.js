import {useContext, useEffect, useState} from "react";
import {makeStyles} from "@mui/styles";
import duTheme from "../../assets/theme";
import {
    Box,
    Container,
    Grid,
    Link,
    List,
    ListItem,
    Typography
} from "@mui/material";
import {MediaQueryCheck, IsRtl} from "../../customHook/useGlobal";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const useStyles = makeStyles((theme) => {
    return {
        navigationBottom: {
            position: "fixed",
            bottom: 0,
            zIndex: 200,
            background: theme.palette.common.grey,
            width: "100%",
            padding: `${theme.spacing(3)} ${theme.spacing(4)}`
        },
        segmentLinks: {
            bottom: "48px",
            position: "fixed",
            background: "#fff",
            left: 0,
        }
    }
});

export default function NavigationButtom(props) {
    const { navigationButtomData, activeSegment, langSwitch, modalHandler, toggleLanguageHandler } = props;
    const classes = useStyles();
    const isRtl = IsRtl()

    const [switchSegment, setSwitchSegment] = useState(false);

    const isScreenSmall = MediaQueryCheck("sm")

    useEffect(() => {

    });

    return (
        <>
            { isScreenSmall && (
                <Box className={classes.navigationBottom}>
                    <Grid container direction="row">
                        <Grid item xs={6}>
                            <Link component="button" underline="none" color={duTheme.palette.common.white} onClick={() => setSwitchSegment(!switchSegment)} sx={{display:"flex", alignItems: "center",fontSize: duTheme.typography.body1.fontSize}}>
                                <span>Switch to business</span>
                                <KeyboardArrowUpIcon />
                            </Link>
                        </Grid>
                        <Grid item xs={6} align={isRtl ? "left" : "right"}>
                            <Link component="button" underline="none" color={duTheme.palette.common.white} sx={{padding: `0 ${duTheme.spacing(4)}`, fontSize: duTheme.typography.body1.fontSize}}  onClick={(e) => modalHandler(e, "accessibility")}>
                                <Box component="span" className="small" sx={{fontSize: "75%"}}>A</Box>A
                            </Link>
                            {/*hide lang button for tourist raffle*/}
                            { window.location.pathname.split('/').pop() !== 'win' && (
                            <Link component="button" title={langSwitch} underline="none" color={duTheme.palette.common.white} sx={{fontFamily: isRtl ? "ProximaNova" : "Dubai", fontSize: duTheme.typography.body1.fontSize, lineHeight: 1}} onClick={(e) => toggleLanguageHandler(e)}>{ langSwitch }</Link>
                                )}
                        </Grid>
                    </Grid>

                    {/* mobile segment Links*/}
                    { switchSegment && (
                        <Container maxWidth={false} className={classes.segmentLinks}>
                            <Container className="m-switchbtn-wrap">
                                <Box sx={{textAlign: "right", padding: `${duTheme.spacing(6)} 0 ${duTheme.spacing(3)}`}}>
                                    <Link onClick={() => setSwitchSegment(false)} color={duTheme.palette.common.grey}>
                                        <ClearIcon />
                                    </Link>
                                </Box>


                                <List className="msli">
                                    { navigationButtomData.map((link) =>
                                        <ListItem key={link.name} sx={{borderTop: "1px solid #ddd", width: "100%", padding: `${duTheme.spacing(4)} 0`}}>
                                            <Link href={link.url} className={link.name.toLowerCase() === activeSegment.toLowerCase() ? "active" : ""} underline="none" sx={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                                                <Typography variant="body1" color={duTheme.palette.common.grey}>{link.name}</Typography>
                                                <CheckCircleIcon sx={{display: link.name.toLowerCase() === activeSegment.toLowerCase() ? "block" : "none"}} />
                                            </Link>
                                        </ListItem>
                                    )}
                                </List>
                            </Container>
                        </Container>
                    )}
                </Box>
            )}
        </>
    )
}