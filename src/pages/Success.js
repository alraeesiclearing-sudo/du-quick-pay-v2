import React from 'react';
import {
    Box,
    Container, Divider,
    Grid, ImageList, ImageListItem,
    Link,
    Typography,
    useTheme
} from "@mui/material";

import {makeStyles} from "@mui/styles";
import duTheme from "../assets/theme";

// page components
import TheWidget from "../components/TheWidget";
import appStore from "../assets/images/app-store-icon2.png"
import googlePlay from "../assets/images/google-play-icon2.png"
import QuestionIcon from "../assets/svg/du-question.svg"
import PrintIcon from "../assets/svg/du-print.svg"
import MobileIcon from "../assets/svg/du-mobile-lite.svg"
import EmailIcon from "../assets/svg/du-email-lite.svg"
import AutoPayIcon from "../assets/svg/du-autopay.svg"

import {useLocation, useSearchParams} from "react-router-dom";
import {GetLocaleData, MediaQueryCheck, IsRtl } from "../customHook/useGlobal";
import ThePageHeader from "../components/ThePageHeader";

const useStyles = makeStyles((theme) => {
    return {
        successWrap: {
            padding: 20,
            boxShadow: "0 5px 12px 0px rgb(0 0 0 / 5%)",
            [theme.breakpoints.up("md")]: {
                maxWidth: "1085px",
                padding: 40,
                boxShadow: "0 2px 12px 0px rgb(0 0 0 / 10%)",
                margin: "0 auto 50px",
                border: "#ddd solid 1px",
                borderRadius: "12px",
            }
        },
        payDetail: {
            marginTop: 40,
            marginBottom: 40,
            [theme.breakpoints.down("md")]: {
                borderTop: "4px solid #ddd",
                borderBottom: "4px solid #ddd",
                marginTop: 20,
                marginBottom: 20
            },
            [theme.breakpoints.up("md")]: {
                background:"#F8F8F8",
                borderRadius: "10px",
                border: "1px solid #ddd",

            }
        },
        IconWrap: {
            background: duTheme.palette.common.white,
            paddingTop: 24,
            paddingBottom: 24,
            borderRadius: "12px 0 0 12px"
        },
        receiptWrap: {
            [theme.breakpoints.down("md")]: {
                borderBottom: "4px solid #ddd",
                marginBottom: 20,
            }
        },
        appWrap : {
            [theme.breakpoints.down("md")]: {
                borderBottom: "4px solid #ddd",
                paddingBottom: 20,
                marginBottom: 20,
            }
        }
    }
});

export default function Success(props) {

    let [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get('account_number'));

    // const params = (new URL(document.location)).searchParams;
    // const name = params.get('account_number');
    // console.log(name)

    const isScreenSmall = MediaQueryCheck("sm")
    const isScreenMedium = MediaQueryCheck("md")
    const isScreenExtraSmall = MediaQueryCheck("xs")

    const staticData = {
        headerSuccessLbl: {
            en: "Payment successful",
            ar: "تم الدفع بنجاح"
        },
        headerSuccessReferenceLbl: {
            en: "Your reference ID is:",
            ar: "رقم المرجع الخاص بك هو:"
        },
        titleLbl: {
            en: "Thanks",
            ar: "شكراً",
        },
        subTitleLbl1: {
            en: "Your bill payment for account / mobile number",
            ar: "دفع فاتورتك للحساب",
        },
        subTitleLbl2: {
            en: "was successful on",
            ar: "تم بنجاح في",
        },
        paymentLbl: {
            en: "You made a payment of",
            ar: "لقد قمت بسداد مبلغ",
        },
        currencyLbl: {
            en: "AED",
            ar: "درهماً",
        },
        receiptLbl: {
            en: "A copy of receipt has been sent to",
            ar: "تم إرسال نسخة من الإيصال إلى",
        },
        appLbl: {
            en: "Manage your account and easily pay your bills with the du app.",
            ar: "قم بإدارة حسابك وادفع فواتيرك بسهولة عبر تطبيق du.",
        },
        contactLbl: {
            en: "If you have any questions or need help, please use ",
            ar: "إذا كان لديك أي استفسارات أو بحاجة إلى مساعدة ، يرجى استخدام",
        },
        chat: {
            lbl: {
                en: "Live Chat",
                ar: "صفحة المحادثة عبر الانترنت",
            },
            link: {
                en: "https://help.du.ae/system/templates/chat/du/chat.html?subActivity=Chat&entryPointId=1021&templateName=du&languageCode=en&countryCode=US",
                ar: "https://help.du.ae/system/templates/chat/du/chat.html?subActivity=Chat&entryPointId=1021&templateName=du&languageCode=en&countryCode=US"
            }
        },
        contact: {
            lbl: {
                en: "contact us",
                ar: "اتصل بنا",
            },
            link: {
                en: "https://www.du.ae/personal/helpandsupport/contact-us",
                ar: "https://www.du.ae/ar/personal/helpandsupport/contact-us"
            }
        },
        lblOr: {
            en: "or",
            ar: " و "
        }

    }

    const theme = useTheme();
    const state = useLocation();

    const classes = useStyles();
    const isRtl = IsRtl()


    return (
        <>
            {/*<TheBreadCrumb />*/}
            <ThePageHeader props={{type: "success", msisdn: "", ratePLan: "", planType: ""}} />
            <Container disableGutters maxWidth={false} sx={{mt: 12}}>
                <Grid container maxWidth="lg" sx={{mx: "auto"}}>
                    <Grid item md={8}>
                        <Box className={classes.successWrap}>
                            <Grid container>
                                <Grid item xs={9} md={10}>
                                    <Typography gutterBottom variant="h5" component="h5">
                                        {GetLocaleData(staticData.titleLbl)} Alisa!
                                    </Typography>
                                    <Typography gutterBottom variant="body" component="p">
                                        {GetLocaleData(staticData.subTitleLbl1)} 971557731775 {GetLocaleData(staticData.subTitleLbl2)} May 31, 2022 12:20:09 PM.
                                    </Typography>
                                </Grid>
                                {isScreenSmall && (
                                    <Grid item xs={3} align="right">
                                        <img src={AutoPayIcon} alt="" style={{minWidth: "60px"}} />
                                    </Grid>
                                )}
                            </Grid>

                            <Box className={classes.payDetail}>
                                <Grid container alignItems="center">
                                    {isScreenMedium && (
                                        <Grid item md={3} align="center" className={classes.IconWrap}>
                                            <img src={AutoPayIcon} alt="" style={{minWidth: "72px"}} />
                                        </Grid>
                                    )}
                                    <Grid item xs={12} md={9} sx={{px: isScreenMedium && 6}}>
                                        <Grid container>
                                            <Grid item sx={{py: isScreenMedium && 4}}>
                                                <Typography gutterBottom variant="body2" component="div">{GetLocaleData(staticData.paymentLbl)}</Typography>
                                                <Typography gutterBottom variant="h6" component="div">{GetLocaleData(staticData.currencyLbl)} 1</Typography>
                                            </Grid>
                                            {/*<Grid item>*/}
                                            {/*    <Typography gutterBottom variant="body2" component="div">Type</Typography>*/}
                                            {/*    <Typography gutterBottom variant="h6" component="div">Data – 1000 MB</Typography>*/}
                                            {/*</Grid>*/}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Container className={classes.receiptWrap} disableGutters sx={{position: "relative"}}>
                                <Typography gutterBottom variant="body" component="p">{GetLocaleData(staticData.receiptLbl)}</Typography>
                                <Grid container alignItems={isScreenMedium ? "center" : "flex-start"} sx={{mb: 5}} direction={isScreenMedium ? "row" : "column"}>
                                    <Grid item sx={{display: "flex", alignItems: "center"}}>
                                        <img src={MobileIcon} alt="" /> <strong style={{padding: "0 10px"}}>97155xxxx775</strong>
                                    </Grid>
                                    <Grid item sx={{px: isScreenMedium && 5, display: "flex", alignItems: "center"}}>
                                        <img src={EmailIcon} alt="" /> <strong style={{padding: "0 10px"}}>moxxxxe@du.ae</strong>
                                    </Grid>
                                </Grid>
                                <Box onClick={(event) => window.print()} sx={{
                                    cursor: "pointer", width: "60px", height: "60px", position: "absolute", top: 0, right: "0", border: "1px solid #ddd", boxShadow: "0 2px 10px rgb(0 0 0 / 20%)", background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <Box
                                        component="img"
                                        sx={{maxWidth: "32px", display: "block", margin: "auto"}}
                                        alt=""
                                        src={PrintIcon}
                                    />
                                </Box>
                            </Container>

                            <Divider sx={{my: 10, display: isScreenMedium ? "block" : "none"}} />

                            <Grid container className={classes.appWrap} alignItems="center">
                                <Grid item md={8}>
                                    <Typography variant="body" component="p">{GetLocaleData(staticData.appLbl)}</Typography>
                                </Grid>
                                <Grid item md={4} align="right" sx={{pt: isScreenExtraSmall && 5}}>
                                    <ImageList cols={2}>
                                        <ImageListItem>
                                            <Link href="https://itunes.apple.com/ae/app/du/id521545878?mt=8">
                                            <Box
                                                component="img"
                                                sx={{maxWidth: "115px", display: "block"}}
                                                alt=""
                                                src={appStore}
                                            />
                                            </Link>
                                        </ImageListItem>
                                        <ImageListItem>
                                            <Link href="https://play.google.com/store/apps/details?id=duleaf.duapp.splash">
                                            <Box
                                                component="img"
                                                sx={{maxWidth: "115px", display: "block"}}
                                                alt=""
                                                src={googlePlay}
                                            />
                                            </Link>
                                        </ImageListItem>
                                    </ImageList>
                                </Grid>
                            </Grid>

                            <Divider sx={{my: 10, display: isScreenMedium ? "block" : "none"}} />

                            <Grid container alignItems={isScreenMedium ? "center" : "flex-start"}>
                                <Grid item xs={1}>
                                    <img src={QuestionIcon} alt="" />
                                </Grid>
                                <Grid item xs={11} sx={{px:4}}>
                                    <Typography variant="body" component="p">
                                        {GetLocaleData(staticData.contactLbl)}
                                        <Link href={GetLocaleData(staticData.chat.link)}>{GetLocaleData(staticData.chat.lbl)}</Link> {GetLocaleData(staticData.lblOr)} <Link href={GetLocaleData(staticData.contact.link)}>{GetLocaleData(staticData.contact.lbl)}</Link>.
                                    </Typography>
                                </Grid>
                            </Grid>


                        </Box>
                    </Grid>
                    <Grid item md={4}>
                        <Grid container direction="column" >
                            <Grid item sx={{ml: isScreenMedium && 15}}>
                                <TheWidget {...{widgetName:"autopay"}} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}