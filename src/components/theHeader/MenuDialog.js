import * as React from "react";
import {makeStyles} from "@mui/styles";

import {Box, Button, Grid, Link, List, Typography, ListItem, Chip} from "@mui/material";
import {MediaQueryCheck, IsRtl} from "../../customHook/useGlobal";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const useStyles = makeStyles((theme) => {
    return {
        menu: {
            width: "100%",
            background: theme.palette.common.white,
            zIndex: "200",
            [theme.breakpoints.up("md")]: {
                position: "absolute",
                top:"115px",
                left: "0",
                boxShadow: "0px 30px 20px -26px rgb(0 0 0 / 45%)",
                minHeight: "590px",
                maxHeight: "65vh",
                paddingTop: theme.spacing(10)
            }
        },
        menuList: {
            "&.MuiList-root": {
                padding: 0,
                [theme.breakpoints.down("md")]: {
                    padding: `0 0 0 ${theme.spacing(4)}`
                },
                "& .MuiListItem-root": {
                    padding: 0,
                    margin: `${theme.spacing(5)} 0`,
                    "& .MuiLink-root": {
                        color: theme.palette.common.grey,
                        fontSize: theme.typography.body1.fontSize,
                        lineHeight: theme.typography.body1.lineHeight,
                        "&::hover": {
                            color: theme.palette.common.secondary,
                        }
                    }
                },
            }
        },
        menuGrid: {
            "&.MuiGrid-container": {
                [theme.breakpoints.up("md")]: {
                    flexFlow: "row nowrap"
                },
                [theme.breakpoints.down("md")]: {
                    flexDirection: "column",
                    paddingTop: theme.spacing(5)
                },
                "& .MuiGrid-item ": {
                    [theme.breakpoints.up("md")]: {
                        paddingRight: theme.spacing(8)
                    },
                    [theme.breakpoints.down("md")]: {
                        padding: `0 ${theme.spacing(4)}`
                    }
                }
            }
        },
        newTag: {
            "&.MuiChip-root": {
                margin: "0 3px",
                background: theme.palette.common.navy,
                color: theme.palette.common.white,
                fontSize: "13px",
                height: "20px",
                padding: "0 4px 2px 4px",
                "& .MuiChip-label": {
                    padding: "0 5px",
                    height: "16px",
                    display: "inline-block",
                    lineHeight: "18px"
                }
            }

        },
        promoBox: {
            background: theme.grey["200"],
            borderRadius: theme.spacing(2),
            padding: theme.spacing(3),
            marginBottom: theme.spacing(3),
            minWidth: "200px",
        },
        promoTitle: {
            ...theme.typography.h6,
            margin: `${theme.spacing(1)} 0`,
        },
        promoList: {
            "&.MuiList-root": {
                padding: 0,
                "& .MuiListItem-root": {
                    padding: 0,
                    margin: `${theme.spacing(1)} 0`,
                    "& .MuiLink-root": {
                        color: theme.palette.common.grey,
                        fontSize: theme.typography.body1.fontSize,
                        lineHeight: theme.typography.body1.lineHeight,
                        width: "100%",
                        "&:hover": {
                            color: theme.palette.secondary.main,
                        }
                    }
                },
            },
        },
        promoLinkBox: {
            "&.MuiBox-root": {
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between"
            }
        },
        menuBanner: {
            [theme.breakpoints.up("md")]: {
                minHeight: "550px"
            }
        },
        menuBannerImg: {
            "&.MuiBox-root": {
                position: "absolute",
                zIndex: 200,
                bottom: 0,
                right: 0
            }
        },
        menuBannerContent: {
            "&.MuiBox-root": {
                maxWidth: "80%"
            }
        },
        btn: {
            ...theme.MuiButtonBase,
            background: `${theme.palette.gradients.violetMagenta} !important`
        }
    }
});

export default function MenuDialog(props) {
    const { menuDialogData }= props;
    const classes = useStyles();

    const isScreenSmall = MediaQueryCheck("sm")
    const isScreenMedium = MediaQueryCheck("md")
    const isRtl = IsRtl()

    return (
        <React.Fragment>
            <Box className={classes.menu} >
                <Grid container maxWidth="lg" sx={{mx: "auto"}}>

                    <Grid item xs={12} md={8}>
                        <Grid container className={classes.menuGrid}>
                            { menuDialogData.menu.map((menu, i) =>
                                <Grid item key={i}>
                                    <Typography variant="h6" component="div">{menu.title}</Typography>
                                    <List className={classes.menuList}>
                                        { menu.links.map((link, i) =>
                                            <ListItem key={i}>
                                                <Link href={link.link} underline="none" sx={{display:"flex", justifyContent: "space-between", alignItems: "center", width: { xs: "100%", md: "auto"}}}>
                                                    <Box>
                                                        {link.name}
                                                        {link.badge && (
                                                            <Chip className={classes.newTag} label={link.badge} />
                                                        )}
                                                    </Box>
                                                    {isScreenSmall && <KeyboardArrowRightIcon fontSize="small" color="secondary" /> }
                                                </Link>
                                            </ListItem>
                                        )}
                                    </List>
                                    { menu.promo && (
                                        <>
                                            <Box className={classes.promoWrap}>

                                                { isScreenMedium && (
                                                    <Box className={classes.promoBox}>
                                                        <Typography className={classes.promoTitle} variant="h6" component="div">{menu.promo.title}</Typography>
                                                        <List className={classes.promoList}>
                                                            { menu.promo.links.map((link, i) =>
                                                                <ListItem key={i} sx={{mb: 4, p: 0}}>
                                                                    <Link href={link.link} underline="none">
                                                                        <Box className={classes.promoLinkBox}>
                                                                            {link.name}
                                                                            {isRtl ? <ChevronLeftIcon fontSize="small" color="secondary" sx={{mt: .5}} /> : <ChevronRightIcon fontSize="small" color="secondary" sx={{mt: .5}} />}
                                                                        </Box>
                                                                    </Link>
                                                                </ListItem>
                                                            )}
                                                        </List>
                                                    </Box>
                                                )}

                                                <Link href={menu.promo.promoBtnLink} color="text.primary">
                                                    {menu.promo.promoBtnText}
                                                </Link>
                                            </Box>
                                        </>
                                    )}
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                    { isScreenMedium && (
                        <Grid item md={4}>
                            <Box className={classes["menuBanner"]} sx={{position: "relative", height: "100%"}}>
                                {menuDialogData.bannerImg && (
                                    <Box className={classes.menuBannerImg}>
                                        <Box component="img" src={menuDialogData.bannerImg} alt={menuDialogData.menuLabel} sx={{maxWidth: "100%", display: "block"}} />
                                    </Box>
                                )}

                                <Box className={classes.menuBannerContent} sx={{position: "absolute", zIndex: 201}}>
                                    <Typography variant="h2" component="h2" sx={{mb: 4}}>{menuDialogData.bannerTitle}</Typography>
                                    <Typography variant="body1" component="p" sx={{mb: 4}}>{menuDialogData.bannerSubTitle}</Typography>
                                    <Button variant="contained" className={classes.btn} color="primary" href={menuDialogData.BannerBtnLink}>{menuDialogData.bannerBtnText}</Button>
                                </Box>
                            </Box>
                        </Grid>
                    )}

                </Grid>
            </Box>
        </React.Fragment>
    )
}