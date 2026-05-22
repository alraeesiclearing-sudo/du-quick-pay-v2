import React  from "react";
import {
    Box,
    Button,
    Card,
    CardContent, CardActionArea,
    Grid,
    Stack,
    Chip,
    Avatar,
    ImageList, ImageListItem,
    Typography, useMediaQuery, useTheme, Divider
} from "@mui/material";
import AutoPayIcon from "../assets/svg/du-autopay.svg";
import logoVisa from "../assets/images/cc-visa-logo.svg";
import logoMaster from "../assets/images/cc-master-logo.svg";
import logoAmex from "../assets/images/cc-amex-logo.svg";
import logoGPay from "../assets/images/cc-gpay.svg";
import logoSamsungPay from "../assets/images/cc-samsung-pay.svg";
import BankIcon from "../assets/svg/du-bank.svg";
import StarBorder from "../assets/svg/du-star-border.svg";
import ChevronRight from "../assets/svg/du-chevron-right.svg";
import {makeStyles} from "@mui/styles";
import pciColored from "../assets/images/logo-pci-certified.svg";
import firewall from "../assets/images/Firewall.svg";
import {GetLocaleData, MediaQueryCheck} from "../customHook/useGlobal";

export default function TheWidget(props) {

    const useStyles = makeStyles((theme) => {
        return {
            "logo-list": {
                maxWidth: "100%",
                "&.MuiImageList-root": {
                    marginBottom: theme.spacing(3)
                }
            },
            "logo-list-item": {
                borderRadius: "4px",
                padding: "8px 2px",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                "& > .MuiImageListItem-img": {
                    objectFit: "fill !important",
                    maxHeight: "14px"
                }
            },
            cardWidget: {
                "&.MuiCard-root": {
                        background: "transparent",
                        border: 0,
                        borderRadius: 0,
                }
            },
            "widgetChip":{
                borderTopLeftRadius:"0 !important",
                borderTopRightRadius:"0 !important",
                position: "absolute",
                right:20,
                top:0
            }

        }
    });

    const widgetProps = props.widgetName;

    const WidgetLinktoBox  = () => {
        const classes = useStyles();
        const theme = useTheme();
        const bankTransferData = {
            titleLbl: {
                en: "Have you done a bank transfer?",
                ar: "هل قمت بتحويل مصرفي؟"
            },
            desc: {
                en: "Click here to proceed with crediting the transferred amount to your du account",
                ar: "اضغط هنا لمتابعة إيداع المبلغ المحول لحساب دو الخاص بك"
            },
            chipLbl:{
                en:"Bank transfer",
                ar:"Bank transfer"
            },
            cta:{
                en: "https://myaccount.du.ae/servlet/myaccount/en/bank-to-bank-records.html",
                ar: "https://myaccount.du.ae/servlet/myaccount/ar/bank-to-bank-records.html"
            }
        }

        return (
            <>
                <Card variant="outlined" sx={{borderRadius: 2}}>
                    <CardActionArea href={ GetLocaleData(bankTransferData.cta) }>
                        <CardContent sx={{ p: 6, pt:8 }}>
                            <Chip
                                label={ GetLocaleData(bankTransferData.chipLbl) }
                                avatar={<Avatar src={StarBorder} />}
                                className={classes["widgetChip"]}
                                color="navy" sx={{borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}
                                size='small'
                            />
                            <Stack
                                direction="row"
                                spacing={{ xs: 1, sm: 2, md: 5 }}
                            >
                                <div><img src={BankIcon} alt="" /></div>
                                <div>
                                    <Typography variant="h6" component="div">
                                        { GetLocaleData(bankTransferData.titleLbl) }
                                    </Typography>
                                    <Typography variant="body2" component="div">
                                        { GetLocaleData(bankTransferData.desc) }
                                    </Typography>
                                </div>
                                <div><img src={ChevronRight} alt="" /></div>
                            </Stack>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </>
        )
    }
    
    const WidgetAutopay  = () => {
        const autopayData = {
            subTitleLbl: {
                en: "What's next?",
                ar: "ماذا بعد؟"
            },
            titleLbl: {
                en: "Auto-pay your bills",
                ar: "الدفع التلقائي لفواتيرك"
            },
            desc: {
                en: "Take control by setting limit and save time by automatically paying for your bills or recharges.",
                ar: "قم بالتحكم من خلال وضع الحد و توفير الوقت خلال دفع الفواتير أو إعادة تعبئة الرصيد تلقائيًا."
            },
            cta: {
                lbl: {
                    en: "set auto-pay",
                    ar: "حدد تفعيل الدفع التلقائي",
                },
                link: {
                    en: "https://myaccount.du.ae/servlet/myaccount/en/home.html",
                    arr: "https://myaccount.du.ae/servlet/myaccount/en/home.html"
                }
            }
        }

        return (
            <>
                <Card variant="outlined" >
                    <CardContent sx={{ p: 6 }}>
                        <Grid container alignItems="center">
                            <Grid item>
                                <img src={AutoPayIcon} alt="" style={{width: "50px", float: "right"}} />
                                <Typography variant="body2" component="div">
                                    { GetLocaleData(autopayData.subTitleLbl) }
                                </Typography>
                                <Typography variant="h6" component="div">
                                    { GetLocaleData(autopayData.titleLbl) }
                                </Typography>
                                <Typography variant="body2" component="div">
                                    { GetLocaleData(autopayData.desc) }
                                </Typography>
                                <Button sx={{mt:2}} variant="outlined" color="primary" href={ GetLocaleData(autopayData.cta.link) }>{ GetLocaleData(autopayData.cta.lbl) }</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </>
        )
    }

    const WidgetCardPrepaid  = () => {
        const classes = useStyles();
        const theme = useTheme();

        const cardData = {
            titleLbl: {
                en: "We accept",
                ar: "البطاقات المقبولة"
            },
            desc: {
                en: "International and GCC/UAE issued cards are accepted.",
                ar: "تُقبل البطاقات العالمية والبطاقات الصادرة في دولة الإمارات ودول الخليج."
            },
            privateLbl: {
                en: "Your private data is secure.",
                ar: "بياناتك الخاصة بأمان"
            }
        }

        return (
            <React.Fragment>
                <Card variant="outlined" className={classes.cardWidget}>
                    <CardContent sx={{p:0}}>
                        <Grid container rowSpacing={2}>
                            <Grid item  >
                                <Typography variant="h6" component="h4" gutterBottom>
                                    { GetLocaleData(cardData.titleLbl) }
                                </Typography>
                            </Grid>
                            <Grid item >
                                <ImageList className={classes["logo-list"]} cols={5}>
                                    <ImageListItem className={classes["logo-list-item"]}>
                                        <img src={logoVisa} alt="" />
                                    </ImageListItem>
                                    <ImageListItem className={classes["logo-list-item"]}>
                                        <img src={logoMaster} alt="" />
                                    </ImageListItem>
                                    <ImageListItem className={classes["logo-list-item"]}>
                                        <img src={logoAmex} alt="" />
                                    </ImageListItem>
                                    <ImageListItem className={classes["logo-list-item"]}>
                                        <img src={logoGPay} alt="" />
                                    </ImageListItem>
                                    <ImageListItem className={classes["logo-list-item"]}>
                                        <img src={logoSamsungPay} alt="" />
                                    </ImageListItem>
                                </ImageList>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" component="div">
                                    { GetLocaleData(cardData.desc) }
                                </Typography>
                            </Grid>
                            {/*<Grid item xs={12}>*/}
                            {/*    <Box sx={{border: "1px solid #eee", borderRadius: 1, p:4, my: 4}}>*/}
                            {/*        <Typography component="div" sx={{display: "flex"}}>*/}
                            {/*            <img src={firewall} />*/}
                            {/*            <Box sx={{display: "flex", flexDirection: "column", ml: 4}}>*/}
                            {/*                <Typography variant="h6" component="h6">Buy with confidence</Typography>*/}
                            {/*                <Typography variant="body3" component="span">Secure online checkout</Typography>*/}
                            {/*            </Box>*/}
                            {/*        </Typography>*/}
                            {/*        <Divider sx={{my: 2}} />*/}
                            {/*        <Typography variant="body2" component="div">*/}
                            {/*            We don’t store your payment card information and your personal details are secured with 128-bit encryption before transmitting.*/}
                            {/*        </Typography>*/}
                            {/*    </Box>*/}
                            {/*</Grid>*/}
                            <Grid item xs={12}>
                                <Grid container alignItems="center" justifyContent="space-between" >
                                    <Grid item md="auto" >
                                        <Typography variant="body2" component="div">
                                            { GetLocaleData(cardData.privateLbl) }
                                        </Typography>
                                    </Grid>
                                    <Grid item md align="right">
                                        <Box
                                            component="img"
                                            sx={{
                                                maxWidth: "100px", display: "block"
                                            }}
                                            alt="Your private data is secured."
                                            src={pciColored}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </React.Fragment>
        )
    }

    const WidgetCardPostpaid  = () => {
        const classes = useStyles();
        const theme = useTheme();

        const cardData = {
            titleLbl: {
                en: "Accepted Cards",
                ar: "البطاقات المقبولة"
            },
            desc: {
                en: "All GCC/UAE issued Mastercard and VISA cards are accepted",
                ar: "تُقبل جميع بطاقات ماستركارد وفيزا الصادرة من دول مجلس التعاون الخليجي / الإمارات العربية المتحدة"
            },
        }

        return (
            <React.Fragment>
                <Card variant="outlined" className={classes.cardWidget}>
                    <CardContent>
                        <Typography variant="h5" component="h4" gutterBottom>
                            { GetLocaleData(cardData.titleLbl) }
                        </Typography>

                        <ImageList className={classes["logo-list"]} sx={{ mb: 2 }} cols={5}>
                            <ImageListItem className={classes["logo-list-item"]}>
                                <img src={logoVisa} alt="" />
                            </ImageListItem>
                            <ImageListItem className={classes["logo-list-item"]}>
                                <img src={logoMaster} alt="" />
                            </ImageListItem>
                            <ImageListItem className={classes["logo-list-item"]}>
                                <img src={logoAmex} alt="" />
                            </ImageListItem>
                            <ImageListItem className={classes["logo-list-item"]}>
                                <img src={logoGPay} alt="" />
                            </ImageListItem>
                            <ImageListItem className={classes["logo-list-item"]}>
                                <img src={logoSamsungPay} alt="" />
                            </ImageListItem>
                        </ImageList>
                        <Typography variant="body2" component="div">
                            { GetLocaleData(cardData.desc) }
                        </Typography>
                    </CardContent>
                </Card>
            </React.Fragment>
        )
    }

    const WidgetPrivateData  = () => {
        const classes = useStyles();
        const privateData = {
            titleLbl: {
                en: "Your private data is secure.",
                ar: "بياناتك الخاصة بأمان"
            }
        }

        return (
            <React.Fragment>
                <Card variant="outlined" className={classes.cardWidget}>
                    <CardContent sx={{ p: 6 }}>
                        <Grid container alignItems="center">
                            <Grid item md="auto" >
                                <Typography variant="body2" component="div">
                                    { GetLocaleData(privateData.titleLbl) }
                                </Typography>
                            </Grid>
                            <Grid item md align="right">
                                <Box
                                    component="img"
                                    sx={{
                                        maxWidth: "100px", display: "block"
                                    }}
                                    alt="Your private data is secured."
                                    src={pciColored}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </React.Fragment>
        )
    }


    return (
        <React.Fragment>
            { (widgetProps !== undefined  && widgetProps === "autopay") && <WidgetAutopay /> }
            { (widgetProps !== undefined  && widgetProps === "cardsacceptPrepaid") && <WidgetCardPrepaid /> }
            { (widgetProps !== undefined  && widgetProps === "cardsacceptPostpaid") && <WidgetCardPostpaid /> }
            { (widgetProps !== undefined  && widgetProps === "privatedata") && <WidgetPrivateData /> }
            { (widgetProps !== undefined  && widgetProps === "bankTransfer") && <WidgetLinktoBox /> }
        </React.Fragment>
    );
}