import {useEffect, useState} from 'react';
import {Box, Container} from "@mui/material";
import Grid from "@mui/material/Grid";

// page components
import AdditionalInfo from "../components/AdditionalInfo";
import FeatureInfo from "../components/FeatureInfo";
import TheWidget from "../components/TheWidget";
import QuickPayForm from "../components/QuickPayForm";
import OfferCard from "../components/OfferCard";
import {IsRtl, MediaQueryCheck, GetError} from "../customHook/useGlobal";
import AlertMessage from "../components/ui/AlertMessage";
import DownloadAppBanner from "../components/tourist/AppDownloadBanner";
import Paper from '@mui/material/Paper';

// import page data from a service
import fetchTextData from "../services/textContentService";

export default function QuickPayLanding() {

    const isScreenSmall = MediaQueryCheck("sm")
    const isScreenMedium = MediaQueryCheck("md")

    const isRtl = IsRtl()

    const [errState, setErrState] = useState()
    const formErrorHandler = (err) => {
        setErrState(err)
    };

    
    // Showing postback errors after Credit Card processing
    let search = window.location.search
    let params = new URLSearchParams(search)

    const [pageData, setPageData] = useState(null)

    useEffect(() => {
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

        // static data for landing page
        fetchTextData().then(data => {
            setPageData(data)
        })
    },[])

    return (
        <>

            <Container disableGutters maxWidth="lg">
                <Box sx={{p: {xs: "20px 0 0", md: "40px 108px 60px"} }}>
                    {(pageData && pageData.errorMsg.error) && (
                        <Paper elevation={0} sx={{mb: 8}}>
                            <AlertMessage {...{alertType:"warning", alertTitle: "",  alertMessage: isRtl ? pageData.errorMsg.message.ar : pageData.errorMsg.message.en }}/>
                        </Paper>
                            )
                    }


                    {errState &&
                        <>
                            <AlertMessage {...{alertType:"error", alertTitle: "",  alertMessage: isRtl ? errState["error_ar"] : errState["error_en"]}} />
                            <Box sx={{minHeight:"40px"}} />
                        </>
                    }
                    <Grid container justifyContent={isScreenMedium && "space-between"} >
                        <Grid item xs={12} md={5} >
                            <QuickPayForm formErrorHandler={formErrorHandler} />
                            <Box sx={{px: isScreenSmall && 5, mb: isScreenSmall && 5}}>
                                <TheWidget {...{widgetName: "bankTransfer"}}/>
                                {/*<TheWidget {...{widgetName: "cardsacceptPostpaid"}}/>*/}
                            </Box>

                        </Grid>
                        <Grid item md="auto"
                              sx={{mt: isScreenSmall && 3, mb: isScreenSmall && 10, px: isScreenSmall && 5}}>
                            {(pageData && pageData.PayBillOffer) &&
                                <OfferCard {...{offerType: "paybill"}} content={pageData.PayBillOffer}/>
                            }
                            <Box sx={{mt:12, width:"350px"}}>
                                <TheWidget {...{widgetName: "cardsacceptPostpaid"}}/>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            {pageData &&
                <DownloadAppBanner content={pageData.banner} bannerFor="default" />
            }
            {/*<AdditionalInfo/>*/}
            {/*<FeatureInfo/>*/}
        </>
    )
}