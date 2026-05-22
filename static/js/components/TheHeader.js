import {useState, useContext, useEffect} from "react";
import {DirectionContext} from "../Contexts/DirectionContext";
import {
    Avatar,
    Button,
    Container,
    Grid,
    Link,
    Box,
    List,
    Typography,
    InputAdornment,
    FormControl,
    InputLabel, OutlinedInput, ListItem, Switch, ClickAwayListener
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import duTheme from "../assets/theme";
import {Media, IsRtl, MediaQueryCheck, GetDomain} from "../customHook/useGlobal"
import { useCookies } from "react-cookie"

import {
    Clear as ClearIcon,
    ChevronRight as ChevronRightIcon,
    CancelOutlined as CancelOutlinedIcon,
    Search as SearchIcon,
    Menu as MenuIcon,
    Close as CloseIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

import MenuDialog from "./theHeader/MenuDialog";
import AccessibilityDialog from "./theHeader/AccessibilityDialog";
import SearchDialog from "./theHeader/SearchDialog";
import MyAccountDialog from "./theHeader/MyAccountDialog";
import NavigationButtom from "./theHeader/NavigationButtom";
import { SubHeaderContext } from '../Contexts/SubHeaderContext'
import { useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => {
    return {
        logo: {
            marginRight: theme.direction!=="rtl" && theme.spacing(6),
            marginLeft: theme.direction==="rtl" && theme.spacing(6),
            "& .svgIcon": {
                width: "50px",
                height: "auto",
                display: "block",
                [theme.breakpoints.down("md")]: {
                    width: "40px"
                }
            }
        },
        mainBar: {
            boxShadow: "0 2px 12px rgb(0 0 0 / 5%)"
        },
        activeNav: {

            "& $topBar": {
                [theme.breakpoints.up("md")]: {
                    background: theme.palette.common.grey,
                }
            },
            "& $segmentLink": {
                "& a": {
                    "&.active": {
                        backgroundColor: "#1B1B1B",
                    }
                }
            },
            "& $mainBar": {
                background: "linear-gradient(315deg, #753BBD 0%, #00A9CE 67.21%, #00A9CE 100%)"
            },


            "& $navItemLink": {
                "&.MuiLink-root": {
                    [theme.breakpoints.up("md")]: {
                        color: theme.palette.common.white,
                        "&::after": {
                            background: theme.palette.common.white,
                        },
                    }
                }
            },

            "& $quickLinks": {
                "& .MuiLink-root": {
                    color: theme.palette.common.white,
                    "&::after": {
                        background: theme.palette.common.white,
                    },
                    "&:hover": {
                        "&::after": {
                            opacity: "1",
                        }
                    }
                }
            },
            "& $loggedInBtn": {
                color: theme.palette.common.white,
                "& .MuiTypography-root": {
                    "&::after": {
                        background: theme.palette.common.white,
                    }
                }
            },
            "& $avatar": {
                "&.MuiAvatar-root": {
                    background: theme.palette.common.white,
                    color: theme.palette.common.grey
                }
            },

            "& $myaccount": {

                "& .MuiButton-root": {
                    background: theme.palette.common.white,
                    color: theme.palette.common.violet,
                    "&:hover": {
                        color: theme.palette.common.violet,
                    }
                }
            }
        },
        mainNav: {
            [theme.breakpoints.down("md")]: {
                display: "none"
            }
        },
        opened: {
            display: "block",
            position: "fixed",
            top: 0,
            width: "100%",
            height: "100%",
            zIndex: 200,
            [theme.breakpoints.down("md")]: {
                left: 0,
                background: theme.palette.gradients.magentaVioletAqua,
                overflow: "scroll"
            }
        },
        nav: {
            display: "flex",
            "&.MuiList-root": {
                position: "static",
                [theme.breakpoints.down("md")]: {
                    flexDirection: "column",
                    marginBottom: "48px"
                },
            },
        },
        navItem: {
            "&.MuiListItem-root": {
                ...theme.components.MuiListItem,
                position: "static",
                width: "auto",
                [theme.breakpoints.down("md")]: {
                    // borderBottom: `1px solid ${theme.palette.common.white}`,
                    borderBottom: `1px solid rgba(255,255,255,.25)`,
                    flexDirection: "column",
                    alignItems: "flex-start",
                }
            }
        },
        navItemLink: {
            "&.MuiLink-root": {
                overflow: "hidden",
                position: "relative",
                color: theme.palette.common.white,
                padding: `${theme.spacing(4)} ${theme.spacing(3.5)}`,
                display: "block",
                fontSize: theme.typography.body1.fontSize,
                lineHeight: 1,
                [theme.breakpoints.down("md")]: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%"
                },
                [theme.breakpoints.up("md")]: {
                    color: theme.palette.common.grey,
                    "&::after": {
                        width: `calc(100% - ${theme.spacing(7)})`,
                        borderRadius: theme.spacing(1.5),
                        position: "absolute",
                        bottom: "10px",
                        background: theme.palette.gradients.violetMagenta,
                        content: "''",
                        height: "3px",
                        left: theme.spacing(3.5),
                        opacity: 0,
                    },
                },
                "&:hover": {
                    "&::after": {
                        opacity: 1,
                    }
                }
            }
        },
        isActive: {
            "&.MuiLink-root": {
                "&:after": {
                    opacity: "1",
                }
            }
        },
        quickLinksNav: {
            borderTop: "1px solid rgba(255,255,255,0.15)",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
            marginTop: theme.spacing(15),
            // marginBottom: theme.spacing(5),
            padding: `${theme.spacing(3)} ${theme.spacing(3)}`,
            background: "rgba(248,248,248,0.15)",
            display: "flex",
            justifyContent: "space-evenly",
            "& .MuiButton-outlined": {
                background: "transparent",
                minWidth: "auto",
                border: `2px solid ${theme.palette.common.white}`,
                color: theme.palette.common.white,
                padding: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
                "&:before": {
                    display: "none"
                }
            }
        },
        quickLinks: {
            display: "flex",
            "&.MuiList-root": {
                [theme.breakpoints.down("md")]: {
                    borderTop: `1px solid ${theme.grey["200"]}`,
                    width: "100%",
                    paddingTop: theme.spacing(5),
                    marginTop: theme.spacing(4)
                }
            },
            "& .MuiLink-root": {
                padding: `${theme.spacing(4)} ${theme.spacing(3.5)}`,
                display: "inline-block",
                color: theme.palette.common.grey,
                position: "relative",
                overflow: "hidden",
                // fontSize: theme.direction==="rtl" ? "16px" : theme.typography.body1.fontSize,
                fontSize: theme.typography.body2.fontSize,
                lineHeight: 1,
                "&::after": {
                    width: `calc(100% - ${theme.spacing(7)})`,
                    borderRadius: theme.spacing(1.5),
                    position: "absolute",
                    bottom: "10px",
                    background: theme.palette.gradients.violetMagenta,
                    content: "''",
                    height: "3px",
                    left: "14px",
                    opacity: "0",
                },
                "&:hover": {
                    "&::after": {
                        opacity: "1",
                    }
                }
            },
            "& .MuiButton-root": {
                minWidth: "auto",
                background: theme.palette.gradients.navyVioletAqua,
                color: theme.palette.common.grey,
                // fontSize: theme.direction==="rtl" ? "15px" : theme.typography.body1.fontSize
                fontSize: theme.typography.body2.fontSize,
                padding: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
            }
        },
        loggedInBtn: {
            background: "transparent",
            color: theme.palette.common.grey,
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            display: "flex",
            alignItems: "center",
            "& .MuiTypography-root": {
                ...duTheme.typography.body1,
                position: "relative",
                "&::after": {
                    width: "100%",
                    borderRadius: theme.spacing(1.2),
                    position: "absolute",
                    bottom: "-2px",
                    background: theme.palette.gradients.violetMagenta,
                    content: "''",
                    height: "3px",
                    left: 0,
                    opacity: 0,
                }
            },
            "&:hover": {
                "& .MuiTypography-root": {
                    "&::after": {
                        opacity: 1,
                    }
                },
            },
        },
        avatar: {
            "&.MuiAvatar-root": {
                width: 36, height: 36, background: theme.palette.common.grey, fontSize: theme.typography.body1.fontSize
            }
        },
        myaccount: {
            display: "flex",
            alignItems: "center",
            "& .MuiButton-root": {
                // ...theme.components.MuiButton,
                minWidth: "auto",
                height: "44px",
                paddingLeft: theme.spacing(5),
                paddingRight: theme.spacing(5),
            }
        },

        // topbar
        topBar: {
            [theme.breakpoints.up("md")]: {
                background: "linear-gradient(270deg, #753BBD 17.32%, #00A9CE 66.93%)",
            }
        },
        segmentLink: {
            display: "flex",
            "& .MuiListItem-root": {
                width: "auto",
            },
            "& a": {
                padding: "0px 20px",
                color: theme.palette.common.white,
                lineHeight: "30px",
                fontSize: theme.typography.body2.fontSize,
                height: "30px",
                opacity: .5,
                textDecoration: "none",
                "&.active": {
                    fontWeight: 700,
                    backgroundColor: "#0081ab",
                    cursor: "default",
                    opacity: 1,
                }
            }
        },
    }
});

export default function TheHeader({}) {
    const {showHeader} = useContext(SubHeaderContext)
    const {isRtl, setIsRtl} = useContext(DirectionContext);
    const domain = GetDomain()
    const classes = useStyles();
    let navigate = useNavigate();
    let location = useLocation();

    const dir = isRtl ? "rtl" : "ltr"

    const isScreenSmall = MediaQueryCheck("sm")
    const isScreenMedium = MediaQueryCheck("md")

    let search = window.location.search
    let params = new URLSearchParams(search)
    const touristPlansPage = params.get('touristPlansPage') && params.get('touristPlansPage') === 'true' ? params.get('touristPlansPage') : false

    const headContent = isRtl ? require("../data/header/head-ar.json") : require("../data/header/head-en.json");
    const activeSegment = "personal";
    // const cartItems = 2;
    const [loggedin, setLoggedin] = useState(false);


    const [isMenuMobileActive, setIsMenuMobileActive] = useState(false);

    useEffect(() => {
        function handleResize() {
            setModalOpen(false)
            setMenuActive()
        }
        window.addEventListener('resize', handleResize)
    },[]);

    // accessibility cookies
    const [cookie] = useCookies(["AccessibilityZoom"]);
    useEffect(() => {
        const bodyEle = document.getElementsByTagName('BODY')[0];
        if (cookie.AccessibilityZoom) {
            bodyEle.style.zoom = cookie.AccessibilityZoom + '%';
        }

        if (cookie.Accessibility === "ColorInversion") {
            bodyEle.classList.add('colorInversion')
        }
    },[])

    // readspeaker
    // useEffect(() => {
    //     var oHead = document.getElementsByTagName('HEAD').item(0);
    //     var oScript= document.createElement("script");
    //     oScript.type = "text/javascript";
    //     oScript.src="//f1-as.readspeaker.com/script/8993/ReadSpeaker.js?pids=embhl";
    //     oHead.appendChild(oScript);
    //
    //     // window.rsConf = {params: "//f1-as.readspeaker.com/script/8993/ReadSpeaker.js?pids=embhl"};
    //     // ReadSpeaker.init()
    // }, [])

    const toggleLanguageHandler = (e) => {
        e.preventDefault();
        setIsRtl(!isRtl);
        let currentLocation = window.location.pathname
        let newLocation = isRtl ? currentLocation.replace("/ar/", "/en/") : currentLocation.replace("/en/", "/ar/")
        // navigate(newLocation)
        // window.location.href(domain + newLocation)
        window.location.replace(domain + newLocation)
        setIsMenuMobileActive(false)
    };

    const DuLogo = ({className, isModalOpen}) => {
        return (
            <svg className={className} width="50px" height="51px" viewBox="0 0 50 51" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs>
                    <linearGradient x1="1.11022302e-14%" y1="100%" x2="100%" y2="0%" id="linearGradient-1">
                        <stop stopColor="#00205B" offset="0%"></stop>
                        <stop stopColor="#753BBD" offset="33.8431693%"></stop>
                        <stop stopColor="#00A9CE" offset="67.6863387%"></stop>
                        <stop stopColor="#00A9CE" offset="100%"></stop>
                    </linearGradient>
                </defs>
                <g id="du-logo-new" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Atoms-/-du-logo-/-Squircle-Window-Copy" fill={isModalOpen ? duTheme.palette.common.white : "url(#linearGradient-1)"}>
                        <path d="M44.7227169,0.199802321 L44.9399245,0.204213548 C47.7496518,0.31853461 50,2.64042212 50,5.4777237 L50,5.4777237 L50,44.9222001 L49.9955899,45.1394311 C49.8812992,47.9494541 47.5600184,50.1998023 44.7227169,50.1998023 L44.7227169,50.1998023 L5.27792138,50.1998023 L5.06071254,50.1953923 C2.25095497,50.0811013 0,47.7598128 0,44.9222001 L0,44.9222001 L0,5.4777237 L0.00441122707,5.26051486 C0.118732289,2.45075729 2.44061979,0.199802321 5.27792138,0.199802321 L5.27792138,0.199802321 L44.7227169,0.199802321 Z M44.7227169,1.54010523 L5.27792138,1.54010523 L5.07559084,1.54523847 C2.99796011,1.65089619 1.34030291,3.37428583 1.34030291,5.4777237 L1.34030291,5.4777237 L1.34030291,44.9222001 C1.34030291,47.0934908 3.10663067,48.8598185 5.27792138,48.8598185 L5.27792138,48.8598185 L44.7227169,48.8598185 L44.9250184,48.8546853 C47.002359,48.7490276 48.6600162,47.0256379 48.6600162,44.9222001 L48.6600162,44.9222001 L48.6600162,5.4777237 L48.654883,5.27539316 C48.5492256,3.19776243 46.8258456,1.54010523 44.7227169,1.54010523 L44.7227169,1.54010523 Z M25.053599,11.4300991 L25.231697,11.435189 C26.8227355,11.5263869 28.0825262,12.8317273 28.0825262,14.4316171 L28.0825262,14.4316171 L28.0825262,28.8008783 L28.0874204,29.0088883 C28.1979416,31.3524149 30.1661569,33.2092083 32.5527214,33.2092083 L32.5527214,33.2092083 L32.7621809,33.2044245 C35.1223421,33.0963866 37.0025412,31.171851 37.0037805,28.8008783 L37.0037805,28.8008783 L37.0037805,24.9855785 L37.0089247,24.8097416 C37.1010935,23.2385358 38.4202513,21.9846985 40.0327077,21.9846985 L40.0327077,21.9846985 L40.2097075,21.9898107 C41.7914256,22.081403 43.0568509,23.3921485 43.0568509,24.9855785 L43.0568509,24.9855785 L43.0603592,28.8008783 L43.0563974,29.0831761 C42.9020088,34.7108143 38.257478,39.2205385 32.5527214,39.2205385 L32.5527214,39.2205385 L32.20255,39.2148481 C29.4122929,39.1240433 26.8945565,37.9522895 25.0666753,36.1175769 L25.0666753,36.1175769 L24.8347713,36.3434328 C22.9512049,38.1221732 20.3934204,39.2205385 17.5790345,39.2205385 L17.5790345,39.2205385 L17.2943322,39.2167941 C11.618839,39.0673318 7.07554289,34.4623279 7.07554289,28.8008783 L7.07554289,28.8008783 L7.07931318,28.5185794 C7.22980885,22.8909007 11.866749,18.379942 17.5790345,18.379942 L17.5790345,18.379942 L17.974623,18.3870999 C19.4188962,18.4394697 20.7927315,18.7778741 22.0288179,19.3583303 L22.0288179,19.3583303 L22.0288179,14.4316171 C22.0288179,12.7724721 23.3855681,11.4300991 25.053599,11.4300991 L25.053599,11.4300991 Z M41.6006754,36.3265688 C42.4074199,36.3265688 43.0604077,36.9696677 43.0604077,37.7697133 C43.0604077,38.5723109 42.4074199,39.2189187 41.6006754,39.2189187 C40.7990348,39.2189187 40.142219,38.5723109 40.142219,37.7697133 C40.142219,36.9696677 40.7990348,36.3265688 41.6006754,36.3265688 Z M41.6006754,36.6152615 C40.9547055,36.6152615 40.4334637,37.1285284 40.4334637,37.7697133 C40.4334637,38.4080272 40.9547055,38.931183 41.6006754,38.931183 C42.2463262,38.931183 42.769801,38.4080272 42.769801,37.7697133 C42.769801,37.1285284 42.2463262,36.6152615 41.6006754,36.6152615 Z M41.682881,36.9904982 C41.9824196,36.9904982 42.191044,37.2115634 42.191044,37.4715463 C42.191044,37.6922926 42.0513231,37.8326515 41.8851254,37.892304 L42.2270907,38.5539047 L41.9074552,38.5539047 L41.5862248,37.9344117 L41.3890844,37.9344117 L41.3890844,38.5539047 L41.0962447,38.5539047 L41.0962447,36.9904982 L41.682881,36.9904982 Z M41.6449203,37.2354882 L41.3890844,37.2354882 L41.3890844,37.7056905 L41.6449203,37.7056905 C41.8012291,37.7056905 41.9074552,37.5994643 41.9074552,37.4715463 C41.9074552,37.3388434 41.8012291,37.2354882 41.6449203,37.2354882 Z M17.5790345,24.3852111 L17.3696024,24.3900133 C15.0097517,24.4984638 13.129889,26.4302154 13.129889,28.8008783 C13.129889,31.2415855 15.1219581,33.2092083 17.5790345,33.2092083 L17.5790345,33.2092083 L17.7885198,33.2044245 C20.1489552,33.0963866 22.0288179,31.171851 22.0288179,28.8008783 L22.0288179,28.8008783 L22.023975,28.5928764 C21.9146053,26.2492294 19.9665285,24.3852111 17.5790345,24.3852111 L17.5790345,24.3852111 Z" id="Combined-Shape"></path>
                    </g>
                </g>
            </svg>
        )
    }


    const [isModalOpen, setModalOpen] = useState(false)
    const [navItem, setNavItem] = useState()
    const [menuActive, setMenuActive] = useState()
    const [menuMobileActive, setMenuMobileActive] = useState()
    const modalHandler = (e, modal) => {
        e.stopPropagation()
        let temp = (isModalOpen=== modal && isModalOpen) ? false : modal
        // console.log(temp)
        setModalOpen((modal) => temp)

    };
    const handleClickAway = () => {
        setModalOpen(false)
        setMenuActive()
    };
    const handleMenu = (e, menuitem, id) => {
        if (isScreenSmall) {
            // setMenuMobileActive(id)
            setMenuMobileActive((prev) => {
                return prev === id ? undefined : id
            })
        } else {
            setNavItem(menuitem)
            modalHandler(e, id)
            setMenuActive(id)
        }

    };


    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box>
                    {/*myaccount popup*/}
                    <div>
                        {isModalOpen === "myaccount" ? (<MyAccountDialog {...{ myAccountDialogData: headContent.utilNav.account, modalHandler: modalHandler }} />) : null}
                    </div>

                    {/*accessibility popup*/}
                    <div>
                        {isModalOpen === "accessibility" ? (<AccessibilityDialog {...{ accessibilityDialogData: headContent.accessibility, modalHandler: modalHandler }} />) : null}
                    </div>

                    {/*search popup*/}
                    <div>
                        {isModalOpen === "search" ? (<SearchDialog {...{ searchDialogData: headContent.searchModal, modalHandler: modalHandler }} />) : null}
                    </div>

                    {/*menu for desktop*/}
                    <div>
                        {(Number.isInteger(isModalOpen)) ? (<MenuDialog {...{ menuDialogData: navItem }} />) : null}
                    </div>
                </Box>
            </ClickAwayListener>
                <header className={isModalOpen ? classes.activeNav : undefined}>
                    {/*topbar*/}
                    { isScreenMedium && (
                        <Container className={classes.topBar} disableGutters maxWidth={false}>
                            <Grid container direction="row" alignItems="center" justifyContent="space-between" maxWidth="lg" sx={{margin: "auto"}}>
                                <Grid item sm={4} >
                                    {/*Segment Links*/}
                                    <Box>
                                        <List disablePadding className={classes.segmentLink}>
                                            { headContent.segmentLinks.map((link) =>
                                                <ListItem className={classes.navItem} key={link.name} sx={{p: 0}}>
                                                    <Link href={link.url} title="" className={link.name.toLowerCase() == activeSegment.toLowerCase() ? "active" : undefined} title={link.name}>
                                                        {link.name}
                                                    </Link>
                                                </ListItem>
                                            )}
                                        </List>
                                    </Box>
                                </Grid>
                                <Grid item sm="auto">
                                    <Grid container>
                                        <Grid item>
                                            {/*Search Box*/}
                                            <Link component="button" onClick={(e) => modalHandler(e, "search")}  sx={{padding: 0, marginRight: 0, display: "block", height: "30px" }}>
                                                <SearchIcon sx={{color:"white"}} />
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            {/*Language Switch and accessibility*/}
                                            <Link component="button" underline="none" onClick={(e) => modalHandler(e, "accessibility")} sx={{color: duTheme.palette.common.white, fontSize: duTheme.typography.body1.fontSize, paddingRight: duTheme.spacing(6), paddingLeft: duTheme.spacing(6), lineHeight: "30px"}}>
                                                <Box component="span" className="small" sx={{fontSize: ".75em"}}>A</Box>A
                                            </Link>
                                            {/*hide lang button for tourist raffle*/}
                                            { window.location.pathname.split('/').pop() !== 'win' && (
                                            <Link component="button" title={headContent.langSwitch} underline="none" sx={{fontFamily: isRtl ? "ProximaNova" : "Dubai", color: duTheme.palette.common.white, fontSize: duTheme.typography.body1.fontSize, lineHeight: "30px"}} onClick={(e) => toggleLanguageHandler(e)}>{ headContent.langSwitch }</Link>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Container>
                    )}

                    {/*Main Nav Bar*/}
                    <Container maxWidth={false} className={classes.mainBar} sx={{px: {xs: duTheme.spacing(4), md: duTheme.spacing(0)} }} >
                        <Grid container sx={{ flexDirection: { xs: "column", md: "row"}, py: 4, mx: "auto" }} maxWidth="lg">
                            <Grid item p={0} md={7}>
                                <Grid container>
                                    <Grid item md="auto">
                                        <Box className={classes.logo}>
                                            <Link href="https://www.du.ae/personal">
                                                <DuLogo className="svgIcon" isModalOpen={isModalOpen} />
                                            </Link>
                                        </Box>
                                    </Grid>
                                    <Grid item md className={`${classes.mainNav} ${isMenuMobileActive && classes.opened }`} >
                                        { isScreenSmall && (
                                            <>
                                                <Link sx={{ position: "absolute", top: duTheme.spacing(4), right: duTheme.spacing(4) }} color={duTheme.palette.common.white} onClick={(e) => setIsMenuMobileActive(false)}>
                                                    <CloseIcon  />
                                                </Link>

                                                <Box className={classes.quickLinksNav}>
                                                    { headContent.utilNav.quickLinks.map((link) =>
                                                        <Button key={link.name} variant="outlined" color="primary" href={link.link}>{link.name}</Button>
                                                    )}
                                                </Box>
                                            </>
                                        )}

                                        <List disablePadding className={classes.nav}>
                                            { headContent.mainNav.common.nav.map((navItem) =>
                                                <ListItem className={classes.navItem} key={navItem.id} sx={{p: 0}}>
                                                    <Link component="button" title={navItem.menuLabel} underline="none" className={`${classes.navItemLink} ${menuActive === navItem.id ? classes.isActive : ""}`} onClick={(e) => handleMenu(e, navItem, navItem.id)}>
                                                        {navItem.menuLabel}
                                                        {isScreenSmall ? (menuActive === navItem.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />) : ""}
                                                    </Link>
                                                    {
                                                        (menuMobileActive == navItem.id) && ( <MenuDialog {...{ menuDialogData: navItem }} /> )
                                                    }
                                                </ListItem>
                                            )}
                                        </List>

                                        <NavigationButtom  {...{ navigationButtomData: headContent.segmentLinks, activeSegment: activeSegment, langSwitch: headContent.langSwitch, toggleLanguageHandler: toggleLanguageHandler, modalHandler: modalHandler }} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item p={0} md={5} align="right">
                                {/*util*/}
                                <Box sx={{display: "flex", justifyContent: "flex-end"}}>


                                        { isScreenMedium && (
                                            <List className={classes.quickLinks} sx={{ p: 0, justifyContent: {xs: "space-evenly", md: ""} }}>
                                                {headContent.utilNav.quickLinks.map((link) =>
                                                <ListItem key={link.name} sx={{p: 0, width: "auto"}}>
                                                    <Link href={link.link} title={link.name} underline="none">{link.name}</Link>
                                                </ListItem>
                                            )}
                                            </List>
                                        )}
                                    {(isScreenSmall && showHeader && !touristPlansPage) && (
                                    <List className={classes.quickLinks} sx={{ p: 0, justifyContent: {xs: "space-evenly", md: ""} }}>
                                        {headContent.utilNav.quickLinks.map((link) =>
                                           <ListItem key={link.name} sx={{p: 0, width: "auto"}}>
                                               <Button key={link.name} variant="outlined" color="primary" href={link.link}>{link.name}</Button>
                                           </ListItem>
                                        )}

                                    </List>
                                    )}
                                    {/* myaccount login btn & state */}
                                    { isScreenMedium && (
                                        <Box className={classes.myaccount}>
                                            {!loggedin
                                                ? <Link href={ headContent.utilNav.account.loginBtn.link } underline="none"><Button variant="outlined" color="primary">{ headContent.utilNav.account.loginBtn.text }</Button></Link>
                                                : (
                                                    <Link href="" onClick={(e) => modalHandler(e, "myaccount")} className={classes.loggedInBtn} color="none" underline="none" sx={{pl: 3, pr:0}}>
                                                        <Typography variant="body1" component="span">{ headContent.utilNav.account.loggedinBtn.text }</Typography>
                                                        <Avatar className={classes.avatar} component="span" sx={{ml: 2}}>M</Avatar>
                                                    </Link>
                                                )
                                            }
                                        </Box>
                                    )}


                                    { isScreenSmall && (
                                        <>
                                            {/*menu-icon for mobile screen*/}
                                            <Box sx={{position: "absolute", top: duTheme.spacing(5), right: duTheme.spacing(5) }}>
                                                <Link onClick={(e) => setIsMenuMobileActive(!isMenuMobileActive)}>
                                                    <MenuIcon sx={{ color: duTheme.palette.common.grey }} />
                                                </Link>
                                            </Box>

                                            {/*profile icon for*/}
                                            <Box sx={{position: "absolute", top: duTheme.spacing(5), right: duTheme.spacing(30) }}>
                                                <a href={undefined} onClick={(e) => modalHandler(e, "myaccount")}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23px" height="23px" viewBox="0 0 26 23">
                                                        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" strokeLinejoin="round" strokeLinecap="round">
                                                            <g transform="translate(-205.000000, -17.000000)" stroke="#333333" strokeWidth="1.75">
                                                                <g transform="translate(206.000000, 18.000000)">
                                                                    <path d="M19.3333333,7.21807768 C19.3333333,11.2063076 16.0505464,14.4375 12,14.4375 C7.94945355,14.4375 4.66666667,11.2063076 4.66666667,7.21807768 C4.66666667,3.23119237 7.94945355,0 12,0 C16.0505464,0 19.3333333,3.23119237 19.3333333,7.21807768 Z" id="Stroke-3" />
                                                                    <path d="M24,20.3403966 C22.2401877,16.9936613 17.4023038,14.4375 12.0025597,14.4375 C6.6028157,14.4375 1.75981229,16.9970147 0,20.34375" id="Stroke-5" />
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </a>
                                            </Box>

                                            {/*search-icon for mobile screen*/}
                                            <Box sx={{position: "absolute", top: duTheme.spacing(5), right: duTheme.spacing(17.5) }}>
                                                <Link  onClick={(e) => modalHandler(e, "search")}>
                                                    <SearchIcon sx={{ color: duTheme.palette.common.grey }} />
                                                </Link>
                                            </Box>
                                        </>
                                    )}

                                </Box>
                            </Grid>
                        </Grid>
                    </Container>

                </header>

        </>
    );
}