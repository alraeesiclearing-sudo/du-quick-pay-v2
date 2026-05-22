import {useState, useEffect, useRef} from 'react';
import {Box, Container} from "@mui/material";
import Grid from "@mui/material/Grid";

// page components
import QuickRechargeForm from "../components/QuickRechargeForm";
import OfferCard from "../components/OfferCard";
import AdditionalInfo from "../components/AdditionalInfo";
import FeatureInfo from "../components/FeatureInfo";
import DownloadAppBanner from "../components/tourist/AppDownloadBanner";
import TheWidget from "../components/TheWidget";
import {IsRtl, MediaQueryCheck, GetError} from "../customHook/useGlobal";
import AlertMessage from "../components/ui/AlertMessage";

import axios from "axios"

// import page data from a service
import fetchTextData from "../services/textContentService";

export default function QuickRechargeLanding() {

    const isScreenSmall = MediaQueryCheck("sm")
    const isScreenMedium = MediaQueryCheck("md")

    const isRtl = IsRtl()

    const [errState, setErrState] = useState()
    const formErrorHandler = (err) => {
        setErrState(err)
    };

    // check for customers coming from tourist plans page
    let search = window.location.search
    let params = new URLSearchParams(search)
    const touristPlansPage = params.get('touristPlansPage') && params.get('touristPlansPage') === 'true' ? params.get('touristPlansPage') : false
    const bannerType = touristPlansPage ? 'tourist' : 'default'

    const [pageData, setPageData] = useState(null)


    useEffect(() => {

        fetchTextData().then(data => {
            setPageData(data)
        })

        if (params.get('status') && params.get('status') == '720') {
            GetError('720-PAYMENTAFTERSTEPUP', (error) => {
                setErrState(error)
            })
        }
        if(params.get('status') && params.get('status') != '720') {
            GetError('500-GENERIC_ERROR', (error) => {
                setErrState(error)
            })
        }

    },[])
    

    return (
        <>
            <Container disableGutters maxWidth="lg">
                <Box sx={{p: {xs: "20px 0 0", md: "40px 108px"} }}>
                    {errState &&
                        <>
                            <AlertMessage {...{alertType:"error", alertTitle: "",  alertMessage: isRtl ? errState["error_ar"] : errState["error_en"]}} />
                            <Box sx={{minHeight:"40px"}} />
                        </>
                    }
                    <Grid container justifyContent={isScreenMedium && "space-between"} >
                        <Grid item xs={12} md={5}>
                            <QuickRechargeForm formErrorHandler={formErrorHandler} touristPlansPage={touristPlansPage}/>
                            <Box sx={{width: isScreenSmall ? "100%":"340px", px: isScreenSmall && 5}}>
                                <TheWidget {...{widgetName:"cardsacceptPrepaid"}} />
                            </Box>
                        </Grid>
                        <Grid item md="auto" sx={{mt: isScreenSmall && 3, mb: isScreenSmall && 10, px: isScreenSmall && 5 }}>
                            {(pageData && pageData.RechargeOffer) &&
                                <OfferCard {...{offerType:"recharge"}} content={pageData.RechargeOffer} />
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            {pageData &&
                <DownloadAppBanner content={pageData.banner} bannerFor={bannerType} />
            }
            {/*<AdditionalInfo />*/}
            {/*<FeatureInfo />*/}
        </>
    )
}