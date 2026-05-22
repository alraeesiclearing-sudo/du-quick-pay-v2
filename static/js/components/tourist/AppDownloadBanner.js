import {useState, useEffect} from "react";
import duTheme from "../../assets/theme";
import {MediaQueryCheck, IsRtl, GetLocaleData, GetDomain} from "../../customHook/useGlobal";
import storeIcons from "../../assets/images/store-icons.svg";
import AppleStoreBtn from "../../assets/images/apple-store-btn.png";
import AndroidStoreBtn from "../../assets/images/android-store-btn.png";
import HuaweiStoreBtn from "../../assets/images/huawei-store-btn.png";

import {
    Box,
    Container, Link,
    Grid,
    Typography, Button,
    Backdrop, IconButton
} from "@mui/material";

// const useStyles = makeStyles((theme) => {
//     return {
//
//     }
// });



export default function AppDownloadBanner({content, bannerFor}) {
    const bannerContent = content?.[bannerFor]
    const isRtl = IsRtl()
    const bannerData = isRtl ? bannerContent.ar : bannerContent.en
    const isScreenSmall = MediaQueryCheck("sm")

    const detectDevice = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/android/i.test(userAgent)) {
            // Redirect to Google Play Store for Android
            window.location.href = "https://play.google.com/store/apps/details?id=duleaf.duapp.splash";
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            // Redirect to Apple App Store for iOS
            window.location.href = "https://apps.apple.com/ae/app/du/id521545878";
        } else {
            // For other devices or desktop, redirect to a web page
            window.location.href = "https://appgallery.huawei.com/#/app/C101122217?appId=C101122217&source=appshare&subsource=C101122217";
        }
    };

    return (
        bannerData &&
        <>
            {isScreenSmall ? (
                <Box sx={{background: bannerData.backgroundMobile ? "url(" + bannerData.backgroundMobile + ") no-repeat" : duTheme.palette.gradients.magentaViolet, backgroundSize: "cover"}}>
                    <Box sx={{p: 6}}>
                        <Typography variant="h3" component="h2" color="white">
                            {bannerData.title}
                        </Typography>
                        <Typography variant="body1" component="div" color="white" sx={{mt: 4, mb: 6}}>
                            {bannerData.description}
                        </Typography>
                        <Button variant="contained" color="light"
                                sx={{fontSize: 16, fontWeight: 700, width: '100%'}}
                                startIcon={<img src={storeIcons}/>}
                                disableElevation
                                onClick={detectDevice}
                        >
                            {bannerData.buttonText}
                        </Button>
                    </Box>
                    <img src={bannerData.productImgMobile}
                         style={{maxWidth: "100%", marginTop: "20px", display: "block", margin: "0 auto"}}></img>
                </Box>
            ) : (
                <Box sx={{background: bannerData.backgroundMobile ? "url(" + bannerData.backgroundDesktop + ") no-repeat" : duTheme.palette.gradients.magentaViolet, minHeight: "400px", backgroundSize: "cover"}}>
                    <Container maxWidth="lg">
                        <Box>
                            <Grid container spacing={2} sx={{alignItems: 'center', minHeight: "400px"}}>
                                <Grid item xs={bannerFor === 'default' ? 9 : 6}>
                                    <Typography variant="h3" component="h2" color="white">
                                        {bannerData.title}
                                    </Typography>
                                    <Typography variant="body1" component="div" color="white" sx={{mt: 4, mb: 6}}>
                                        {bannerData.description}
                                    </Typography>
                                    <Grid container spacing={4} sx={{mt: 8}}>
                                        <Grid item xs={'auto'}>
                                            <Link
                                                href="https://apps.apple.com/ae/app/du/id521545878"
                                                target="_blank"
                                                children={<img src={AppleStoreBtn}
                                                               style={{maxWidth: "150px", display: "block"}} />}
                                            ></Link>
                                        </Grid>
                                        <Grid item xs={'auto'}>
                                            <Link
                                                href="https://play.google.com/store/apps/details?id=duleaf.duapp.splash"
                                                target="_blank"
                                                children={<img src={AndroidStoreBtn}
                                                               style={{maxWidth: "150px", display: "block"}} />}
                                            ></Link>
                                        </Grid>
                                        <Grid item xs={'auto'}>
                                            <Link
                                                href="https://appgallery.huawei.com/#/app/C101122217?appId=C101122217&source=appshare&subsource=C101122217"
                                                target="_blank"
                                                children={<img src={HuaweiStoreBtn}
                                                               style={{maxWidth: "150px", display: "block"}} />}
                                            ></Link>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={bannerFor === 'default' ? 3 : 6} sx={{mt: "auto"}}>
                                    <img src={bannerData.productImgDesktop}
                                         style={{maxWidth: "100%", display: "block"}} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Box>
            )}
        </>
    );
}