import {useEffect} from "react";
import {makeStyles} from "@mui/styles";
import duTheme from "../../assets/theme";
import {
    Box,
    Container,
    Grid,
    Link,
    List,
    ListItem,
    Typography,
    Switch,
    Avatar,
    Stack
} from "@mui/material";
import {MediaQueryCheck} from "../../customHook/useGlobal";
import ClearIcon from "@mui/icons-material/Clear";
import { useCookies } from "react-cookie";

const useStyles = makeStyles((theme) => {
    return {
        accessibilityDialog: {
            position: "fixed",
            zIndex: "201",
            background: "#fff",
            width: "100%",

            [theme.breakpoints.up("md")]: {
                boxShadow: "0px 30px 20px -26px rgb(0 0 0 / 45%)",
                top: "30px",
            },

            // [theme.breakpoints.up("md")]: {
            //     top: "30px",
            //     height: "calc(100vh - 30px)",
            //     paddingTop: 60,
            //     paddingBottom: 60,
            // },
            [theme.breakpoints.down("md")]: {
                boxShadow: "inset 0px 0px 0 0px #333, 0px -4px 4px 0 rgb(0 0 0 / 20%)",
                bottom: "30px",
                // padding: "60px 20px"
            }

        },
        accBox: {
            [theme.breakpoints.up("md")]: {
                padding: "120px 100px",
            }
        },
        accGridItem: {
            padding: "72px 100px",
            [theme.breakpoints.down("md")]: {
                padding: "36px 50px",
            }
        },


        duResizeText: {
            "&.MuiAvatar-root": {
                border: `2px solid ${theme.palette.primary.main}`,
                background: "transparent",
                color: theme.palette.text.primary,
                cursor: "pointer"
            }
        },
        zoomActive: {
            "&.MuiAvatar-root": {
                background: theme.palette.primary.main,
                color: theme.palette.common.white
            }
        },
        zoomSmall: {
            "&.MuiAvatar-root": {
                width: "32px",
                height: "32px",
                fontSize: "14px"
            }
        }

    }
});

export default function AccessibilityDialog(props) {
    const { accessibilityDialogData, modalHandler } = props;
    const classes = useStyles();

    const bodyEle = document.getElementsByTagName('BODY')[0];

    const [cookieZoom, setCookieZoom] = useCookies(["AccessibilityZoom"]);
    const [cookieAccessibility, setCookieAccessibility] = useCookies(["Accessibility"]);

    const maxAge = 24 * 60 * 60

    const isScreenSmall = MediaQueryCheck("sm")
    const isScreenMedium = MediaQueryCheck("md")

    // useEffect(() => {
    //     // var href = window.location.href;
    //     var href = "https://www.du.ae/personal";
    //     var protocol = window.location.protocol;
    //     if(protocol!=='http:' || protocol!=='https:') {
    //         protocol = 'http:';
    //     }
    //
    //     var encoded = encodeURIComponent(href.substring(href.indexOf("//"),href.indexOf("//").length));
    //     document.getElementById("accessibility_en").href= "//app-as.readspeaker.com/cgi-bin/rsent?customerid=8993&lang=en_uk&readid=ContentPlaceHolderMain&url="+protocol+encoded.replace(/%2F/g,"/").replace(/%3A/g,':').replace(/%3A/g,':').replace(/%3F/g,"?").replace(/%3D/g,"=").replace(/%26/g,"&");
    // },[]);

    const contrastToggleHandler = (e) => {
        if (e.target.checked) {
            accessibilityToggle('ColorInversion');
        } else {
            accessibilityToggle('');
        }
        // accessibilityCheck();
    }

    const accessibilityDecreaseZoom = () => {
        let zoom = getCurrentZoom() - 15;
        accessibilityZoom(zoom);
    };
    const accessibilityIncreaseZoom = () => {
        let zoom = getCurrentZoom() + 15;
        accessibilityZoom(zoom);
    };

    function getCurrentZoom() {
        var result = 100;
        if ((document.body.style.zoom).trim().length > 0) {
            var zoomMatch = document.body.style.zoom.match('[0-9]+');
            if (zoomMatch.length > 0) {
                result = parseInt(zoomMatch[0]);
            }
        }
        return result;
    }

    function accessibilityZoom(zoomLevel) {
        var zoom = Math.max(100, Math.min(130, zoomLevel));
        // zoomDecrease.classList.remove('disabled');
        // zoomIncrease.classList.remove('disabled');
        // if (zoom === 100) {
        //     zoomDecrease.classList.add('disabled');
        // } else if (zoom === 130) {
        //     zoomIncrease.classList.add('disabled');
        // }

        setCookieZoom('AccessibilityZoom', zoom, { path: '/', maxAge: maxAge });
        document.body.style.zoom = zoom + '%';
    }

    function accessibilityToggle(schemeName) {
        // var var_SchemeName = cookieAccessibility.Accessibility;
        // const bodyEle = document.getElementsByTagName('BODY')[0];
        if (schemeName === "ColorInversion") {
            accessibilitySetup(schemeName);
            bodyEle.classList.add('colorInversion')
        } else {
            accessibilitySetup('None');
            bodyEle.classList.remove('colorInversion')
        }
    }

    function accessibilitySetup(schemeName) {
        setCookieAccessibility('Accessibility', schemeName, { path: '/', maxAge: maxAge });
    }
    /*function accessibilityCheck() {
        var var_Accessibility = cookieAccessibility.Accessibility;
        switch (var_Accessibility) {
            case 'ColorInversion': {
                bodyEle.classList.add('colorInversion');
            }
            break;
            default: {
                bodyEle.classList.remove('colorInversion');
            }
        }
    }*/

    // function readCookie(cname) {
    //     var name = cname + "=";
    //     var ca = document.cookie.split(';');
    //     for (var i = 0; i < ca.length; i++) {
    //         var c = ca[i];
    //         while (c.charAt(0) === ' ') {
    //             c = c.substring(1);
    //         }
    //         if (c.indexOf(name) === 0) {
    //             return c.substring(name.length, c.length);
    //         }
    //     }
    //     return "";
    // }
    // function writeCookie(cname, cvalue, exdays) {
    //     var d = new Date();
    //     d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    //     var expires = "expires=" + d.toUTCString();
    //     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    // }

    return (
        <>
            <Box className={classes.accessibilityDialog}>
                <Container disableGutters maxWidth="lg">
                    { isScreenSmall && (
                        <Grid container maxWidth="lg" sx={{px: 4, py: 4}}>
                            <Grid item xs={9}>
                                <Typography variant="h3" component="h4" gutterBottom>{accessibilityDialogData.iconTitle}</Typography>
                            </Grid>
                            <Grid align="right" item xs={3}>
                                <Link component="button" onClick={(e) => modalHandler(e, false)} color={duTheme.palette.common.black}>
                                    <ClearIcon />
                                </Link>
                            </Grid>
                        </Grid>
                    )}
                    <Box className={classes.accBox}>
                        <Grid container maxWidth="lg" sx={{mx: "auto"}}>
                            { isScreenMedium && (
                                <Grid item className={classes.accGridItem} md={6} sx={{borderRight: `1px solid ${duTheme.grey["300"]}`}}>
                                    <Box sx={{mb: 8}}>
                                        <Box component="img" src="https://www.du.ae/servlet/duaediscovery/common/discovery/common/images/global-nav/du-accessibility.svg" alt="Accessibility icon" sx={{display: "block"}} />
                                    </Box>
                                    <Typography variant="h4" component="h4" gutterBottom sx={{mb: 5}}>{accessibilityDialogData.iconTitle}</Typography>
                                    <Typography variant="body1" component="p" gutterBottom>
                                        {accessibilityDialogData.overview}
                                    </Typography>
                                </Grid>
                            )}
                            <Grid item className={classes.accGridItem} xs={12} md={6}>
                                <List sx={{py:0}}>
                                    <ListItem sx={{px:0,py:4}}>
                                        <Grid container sx={{alignItems: "center"}} columnSpacing={3}>
                                            <Grid item md={5}>
                                                <Typography variant="body1" component="div">{accessibilityDialogData.resize}</Typography>
                                            </Grid>
                                            <Grid item sx={{ml:2}}>
                                                <Stack direction="row" spacing={2} sx={{display:"flex", alignItems: "center"}}>
                                                    <Avatar className={`${classes.duResizeText} ${classes.zoomActive} ${classes.zoomSmall}`} onClick={() => accessibilityDecreaseZoom()}>A</Avatar>
                                                    <Avatar className={`${classes.duResizeText}`}  onClick={() => accessibilityIncreaseZoom()}>A</Avatar>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    <ListItem sx={{px:0,py:4}}>
                                        <Grid container sx={{alignItems: "center"}} columnSpacing={3}>
                                            <Grid item md={5}>
                                                <Typography variant="body1" component="div">{accessibilityDialogData.contrast}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Switch
                                                    checked={cookieAccessibility.Accessibility === "ColorInversion"}
                                                    onChange={e => { contrastToggleHandler(e)}}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    {/*<ListItem sx={{px:0,py:4}}>
                                        <Grid container sx={{alignItems: "center"}} columnSpacing={3}>
                                            <Grid item md={5}>
                                                <Typography variant="body1" component="div">{accessibilityDialogData.speaker}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <div className="read-speaker-controls">
                                                    <div id="readspeaker_button1" className="rs_skip rsbtn rs_preserve read-speaker-button">
                                                        <a rel="nofollow" id="accessibility_en" className="rsbtn_play"
                                                           title='Listen to the content of the page by clicking on Read Speaker'
                                                           style={{padding: "0px"}}
                                                           href={`//app-as.readspeaker.com/cgi-bin/rsent?customerid=8993&lang=en_uk&readid=ContentPlaceHolderMain&url=${encodeURIComponent( document.location.href )}`}
                                                           data-rsevent-id="rs_356775" role="button">
                                                            <span className="rsbtn_left rsimg rspart">
                                                                <span className="rsbtn_text"><span>Listen</span></span>
                                                            </span>
                                                            <span className="rsbtn_right rsimg rsplay rspart"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </ListItem>*/}
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    )
}