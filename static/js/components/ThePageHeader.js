import React from "react";
import {Container, Grid, Link, Typography, Box, Button} from "@mui/material";


import { Link as RouterLink } from "react-router-dom";
import {Edit as EditIcon} from "@mui/icons-material";
import {GetLocaleData, IsRtl, MediaQueryCheck} from "../customHook/useGlobal";

function ThePageHeader(props) {
    const staticData = {
        payTitle: {
            en: "Pay",
            ar: "الدفع السريع"
        },
        rechargeTitle: {
            en: "Recharge",
            ar: "تعبئة رصيد الدفع المسبق"
        },
        accountLbl: {
            en: "Account",
            ar: "الحساب"
        },
        changeLbl: {
            en: "Change number",
            ar: "تغيير"
        },
        payTitleSuccess: {
            en: "Payment successful",
            ar: "تمت عملية الدفع بنجاح"
        },
        rechargeTitleSuccess: {
            en: "successful",
            ar: ""
        },
        referenceLbl: {
            en: "Your reference ID is:",
            ar: "رقم المرجع:"
        }
    }

    const isScreenLarge = MediaQueryCheck("lg")
    const isScreenMedium = MediaQueryCheck("md")
    const isScreenSmall = MediaQueryCheck("sm")

    const isRtl = IsRtl()
    const locale = isRtl ? 'ar': 'en';

    const handleGTM = (e) => {
        //GTM
        window.dataLayer.push({
            event: "eventTracker",
            eventCategory: props.props.planType === "prepaid" ? "My Account Quick Recharge" : "My Account Quick Payment",
            eventAction: "Credit Card Page",
            eventLabel: props.props.planType === "prepaid" ? "Entered a prepaid number - Change" : "Entered a postpaid number - Change"
        });
    }

    const getJourneyLink = () => {
        return props.props.journeyType=="postpaid" ? "/"+locale+"/quick-pay/" : "/"+locale+"/quick-recharge/"
    }
    const isTouristNumber = props.props.ratePLan.indexOf('Tourist') > -1
    return (
        <>
            <Container maxWidth={false} disableGutters sx={{boxShadow: "0 9px 12px 0px rgba(0, 0, 0, 0.08)", py:6}}>
                <Grid container maxWidth="lg" sx={{ mx: "auto" }}>
                    <Grid item xs={12}>
                        <Box sx={{px: isScreenLarge ? "0" : "20px"}}>
                        { props.props.type === "pay" ? (
                            <>
                                <Typography gutterBottom variant="h3" component="h3">
                                    {(props.props.planType === "prepaid" && !props.props.isControlPlan) || (props.props.isControlPlan && props.props.journeyType==="prepaid") ? GetLocaleData(staticData.rechargeTitle) : GetLocaleData(staticData.payTitle)}
                                </Typography>
                                <Box sx={{display: "flex", justifyContent: isScreenSmall && "space-between", alignItems: "end"}}>

                                <Typography variant="body1" component="div" sx={{display: isScreenMedium && "flex"}}>
                                    {isScreenMedium ?
                                    <Typography variant="body2" sx={{mr: 2}}>{props.props.planType==="prepaid"? props.props.ratePLan : GetLocaleData(staticData.accountLbl) }</Typography>
                                        :
                                    <small>Your number</small>
                                    }
                                    <h4>{props.props.msisdn}</h4>
                                </Typography>
                                <Link underline="none" component={RouterLink} to={props.props.journeyType=="postpaid" ? "/"+locale+"/quick-pay/" : isTouristNumber ? "/"+locale+"/quick-recharge?touristPlansPage=true" : "/"+locale+"/quick-recharge/"}  variant="body2" sx={{ml:2}}
                                      onClick={(e) => {
                                          handleGTM(e)
                                      }}
                                >
                                    <EditIcon color="primary" fontSize="16px" sx={{verticalAlign: "middle", mr: 1, mb: "3px"}} />
                                    {GetLocaleData(staticData.changeLbl)}
                                </Link>
                                </Box>
                            </>) :
                            (
                                <>
                                    <Typography gutterBottom variant="h3" component="h3">
                                        {GetLocaleData(staticData.payTitleSuccess)}
                                    </Typography>
                                    <Typography variant="body1" component="p">
                                        {GetLocaleData(staticData.referenceLbl)} <strong>001125731217</strong>
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Grid>
                </Grid>

            </Container>
        </>
    );
}

export default ThePageHeader;