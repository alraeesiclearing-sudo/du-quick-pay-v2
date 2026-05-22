import * as React from "react";
import {makeStyles} from "@mui/styles";
import duTheme from "../../assets/theme";
import {MediaQueryCheck} from "../../customHook/useGlobal";
import {
    Button,
    Container,
    Grid,
    Link,
    Box,
    List,
    Typography, Card, ListItem,
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const useStyles = makeStyles((theme) => {
    return {
        myaDialog: {
            position: "absolute",
            zIndex: "200",
            background: "#fff",
            top:"115px",
            boxShadow: "0px 30px 20px -26px rgb(0 0 0 / 45%)",
            [theme.breakpoints.down("md")]: {
                background: "linear-gradient(135.4deg, #C724B1 0%, #753BBD 30.52%, #00A9CE 100%)",
                position: "fixed",
                width: "100%",
                height: "100%",
                top: 0,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 60
            }
        },
        myaCloseIcon: {
            position: "absolute",
            top: theme.spacing(4),
            right: theme.spacing(4),
        },
        myaDialogWrap: {
            [theme.breakpoints.up("md")]: {
                padding: "60px 60px"
            }
        },
        myaGridItem: {
            [theme.breakpoints.up("md")]: {
                paddingTop: 72,
                paddingBottom: 72,
                paddingRight: 100
            }
        },
        myaGridItemManage: {
            [theme.breakpoints.up("md")]: {
                borderLeft: "1px solid #ddd",
                paddingRight: 0,
                paddingLeft: 100
            }
        },
        usfulLinks: {
            "& .MuiLink-root": {
                color: duTheme.palette.primary.contrastText,
                display: "flex",
                justifyContent: "space-between",
                "&:hover": {
                    color: theme.palette.primary.main
                },
                [theme.breakpoints.down("md")]: {
                    width: "100%",
                    flexDirection: "row-reverse",
                },
                [theme.breakpoints.up("md")]: {
                    color: duTheme.palette.text.primary,
                }
            },
            "& .MuiSvgIcon-root": {
                color: duTheme.palette.primary.contrastText,
                [theme.breakpoints.up("md")]: {
                    color: duTheme.palette.primary.main,
                }
            }
        },
        btnLogout: {
            "&.MuiButton-root": {
                [theme.breakpoints.down("md")]: {
                    position: "fixed",
                    bottom: theme.spacing(5),
                    width: "100%"
                }
            }

        }
    }
});

export default function MyAccountDialog(props) {
    const { myAccountDialogData, modalHandler } = props;
    const classes = useStyles();

    const isScreenSmall = MediaQueryCheck("sm")
    const isScreenMedium = MediaQueryCheck("md")

    return (
        <React.Fragment>
            <Container className={classes.myaDialog} disableGutters maxWidth={false}>

                { isScreenSmall && (
                    <>
                        <Box className={classes.myaCloseIcon}>
                            <Link component="button" onClick={(e) => modalHandler(e, false)} sx={{ color: duTheme.palette.common.white }}>
                                <ClearIcon />
                            </Link>
                        </Box>
                        <Typography variant="h3" component="h5" color={duTheme.palette.primary.contrastText} gutterBottom>{myAccountDialogData.title }</Typography>
                    </>
                )}

                <Container disableGutters maxWidth="lg">
                    <Box className={classes.myaDialogWrap}>
                        <Grid container maxWidth="lg" sx={{mx: "auto"}}>
                            { isScreenMedium && (
                            <Grid item md={6} className={classes.myaGridItem}>
                                <Box sx={{mb: 8}}>
                                    <Box component="img" src="https://www.du.ae/servlet/duaediscovery/common/discovery/common/images/global-nav/du-my-account.svg" alt="My Account" sx={{display: "block"}} />
                                </Box>
                                <Typography variant="h3" component="h4" gutterBottom sx={{mb: 5}}>{myAccountDialogData.greeting}, Anthony desktop</Typography>
                                <Typography variant="body1" component="p" gutterBottom sx={{mb: 5}}>
                                    {myAccountDialogData.desc}
                                </Typography>
                                <Button variant="contained" href={myAccountDialogData.dashboardBtn.link}>{myAccountDialogData.dashboardBtn.text}</Button>
                            </Grid>
                            )}
                            <Grid item md={6} className={`${classes.myaGridItem} ${classes.myaGridItemManage}`}>
                                { isScreenSmall && (
                                    <>
                                        <Card sx={{backgroundColor: "rgba(255,255,255,0.2)", border: `2px solid ${duTheme.palette.common.white}`}}>
                                            <Link underline="none" href="https://myaccount.du.ae/servlet/du/en/home.html">
                                                <Grid container sx={{p:5}}>
                                                    <Grid item xs={2}>
                                                        <Box sx={{mb: 8}}>
                                                            <Box component="img" src="https://www.du.ae/servlet/duaediscovery/common/discovery/common/images/global-nav/du-my-account-mobile.svg" alt="My Account" sx={{display: "block"}} />
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={10}>
                                                        <Typography variant="h5" color={duTheme.palette.primary.contrastText} component="div" gutterBottom>{myAccountDialogData.greeting}, Anthony mobile</Typography>
                                                        <Typography variant="body1" color={duTheme.palette.primary.contrastText} component="p">{myAccountDialogData.desc}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Link>
                                        </Card>
                                    </>
                                )}

                                <List className={classes.usfulLinks}>
                                    { myAccountDialogData.usefulLink.map((link, i) =>
                                        <ListItem key={i} sx={{px: 0}}>
                                            <Link href={link.link} underline="none" sx={{py: 2, px: 0, display: "flex"}}>
                                                <ChevronRightIcon fontSize="small" />
                                                <Typography variant="body1" component="div">{link.name}</Typography>
                                            </Link>
                                        </ListItem>
                                    )}
                                </List>
                                <Button variant="outlined" color="secondary" href={myAccountDialogData.logoutBtn.link} className={classes.btnLogout}>
                                    {myAccountDialogData.logoutBtn.text}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Container>
        </React.Fragment>
    );
}