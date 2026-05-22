import * as React from "react";
import Typography from '@mui/material/Typography';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Link, useTheme} from "@mui/material";
import {makeStyles} from "@mui/styles";


import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { GetLocaleData, IsRtl } from "../customHook/useGlobal"

const useStyles = makeStyles((theme) => {
    return {
        root: {
            "&.MuiCard-root": {

            },
            "& .MuiCardActions-root": {
                padding: "0 16px 12px"
            },
        },
        bannerText: {
            color: "#777",
        }
    }
})

const RechargeOffer  = ({content}) => {

    // const staticData = {
    //     quickRechargeOfferLbl: {
    //         en: "Activate your free Flexi eSim instantly using UAE PASS",
    //         ar: "فعل شريحة Flexi eSim فوراً باستخدام الهوية الرقمية"
    //     },
    //     quickRechargeMoreInfo: {
    //         lbl: {
    //             en: "More info",
    //             ar: "لمزيد من المعلومات",
    //         },
    //         link: {
    //             en: "https://shop.du.ae/en/personal/s-du-prepaid-flexi-plans",
    //             ar: "https://shop.du.ae/ar_AE/personal/s-du-prepaid-flexi-plans"
    //         },
    //     }
    // }

    const classes = useStyles();
    const isRtl = IsRtl()
    const staticData = isRtl ? content.ar : content.en

    return (
        <Card sx={{ maxWidth: { xs: "100%", md: 470 }, }} className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="177"
                    image= {staticData.bannerImg}
                    alt=""
                />
                <CardContent>
                    <Typography variant="body2" className={classes.bannerText}>
                        {staticData.quickRechargeOfferLbl}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link href={staticData.quickRechargeMoreInfo.link} color="primary" underline="none" sx={{ display: "flex" }}>
                    {staticData.quickRechargeMoreInfo.lbl}
                    {isRtl ? <ChevronLeftIcon fontSize="small" color="text.primary" sx={{mt: .5}} /> : <ChevronRightIcon fontSize="small" color="text.primary" sx={{mt: .5}} />}
                </Link>
            </CardActions>
        </Card>
    )
}

const PayBillOffer  = ({content}) => {

    // const staticData = {
    //     quickPayOfferLbl: {
    //         en: "du Home Wireless from ONLY AED 159/month (was AED 199/month)." +
    //             "Exclusively Online. Buy now!",
    //         ar: " du Home اللاسلكية ابتداء من 159 درهما فقط في الشهر (كان 199 درهما في الشهر). حصريا عبر الإنترنت. اشتر الآن!ً"
    //     },
    //     quickPayMoreInfo: {
    //         lbl: {
    //             en: "More info",
    //             ar: "لمزيد من المعلومات",
    //         },
    //         link: {
    //             en: "https://www.du.ae/homewireless?utm_source=webbannerHW&utm_medium=quickpaypage&utm_campaign=homewirelessonquickpay",
    //             ar: "https://www.du.ae/ar/homewireless?utm_medium=quickpaypage&utm_source=webbannerHW&utm_campaign=homewirelessonquickpay"
    //         },
    //     }
    // }
    const isRtl = IsRtl()
    const staticData = isRtl ? content.ar : content.en
    const classes = useStyles();



    return (
        <Card sx={{ maxWidth: { xs: "100%", md: 470 }, }} className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="177"
                    /*image= { isRtl ? "https://myaccount.du.ae/du/common/myaccount/common/images/5gbannercampaign-ar.jpg" : "https://myaccount.du.ae/du/common/myaccount/common/images/5gbannercampaign.jpg" }*/
                    image= {staticData.bannerImg}
                    alt=""
                />
                <CardContent>
                    <Typography variant="body2" className={classes.bannerText}>
                        {staticData.quickPayOfferLbl}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link href={staticData.quickPayMoreInfo.link} color="primary" underline="none" sx={{ display: "flex" }}>
                    {staticData.quickPayMoreInfo.lbl}
                    {isRtl ? <ChevronLeftIcon fontSize="small" color="text.primary" sx={{mt: .5}} /> : <ChevronRightIcon fontSize="small" color="text.primary" sx={{mt: .5}} />}
                </Link>
            </CardActions>
        </Card>
    )
}

export default function OfferCard(props) {

    const offerProps = props.offerType;

    return (
        <React.Fragment>
            { (offerProps !== undefined  && offerProps === "recharge") && <RechargeOffer content={props.content} /> }
            { (offerProps !== undefined  && offerProps === "paybill") && <PayBillOffer content={props.content}/> }
        </React.Fragment>
    );
}