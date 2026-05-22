import * as React from 'react';

import {Container, Grid, Typography} from "@mui/material";
import pci from "../assets/images/logo_PCI.png"
import nologin from "../assets/images/graphicon_nologin.png"
import duTheme from "../assets/theme"
import {GetLocaleData} from "../customHook/useGlobal";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => {
    return {
        root: {
            background: theme.palette.gradients.navyVioletAqua,
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        }
    }
});

function AdditionalInfo() {

    const staticData = {
        secureLbl: {
            en: "Secure",
            ar: "آمنة"
        },
        secureDesc: {
            en: "PCI DSS certified, ensuring your personal details are kept safe.",
            ar: "نتبع المبادئ التوجيهية الواردة في PCI DDS ، لضمان سلامة بياناتك الشخصية."
        },
        loginLbl: {
            en: "No login required",
            ar: "لا يلزم تسجيل الدخول"
        },
        loginDesc: {
            en: "Forgot your password? No problem. You can still make secure payments and recharges with your credit card.",
            ar: "هل نسيت رقمك السري؟ لا توجد مشكلة. لا يزال بإمكانك إجراء عمليات الدفع وإعادة الشحن بأمان بإستخدام بطاقة الائتمان الخاصة بك."
        },
    }

    const classes = useStyles();

    return (
        <React.Fragment>
            <Container className={classes.root} disableGutters maxWidth={false}>
                <Container maxWidth="md">
                    <Grid container justifyContent="space-between">
                        <Grid item xs={12}  md={5} align="center" sx={{ py: 6 }}>
                            <img alt="PCI DSS certified" src={pci} style={{maxWidth:"145px",maxHeight:"60px"}} />
                            <Typography variant="h5" color="white" gutterBottom>{GetLocaleData(staticData.secureLbl)}</Typography>
                            <Typography variant="body2" color="white">
                                {GetLocaleData(staticData.secureDesc)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}  md={5} align="center" sx={{ py: 6 }}>
                            <img alt="No login required" src={nologin} style={{maxWidth:"145px",maxHeight:"60px"}} />
                            <Typography variant="h5" color="white" gutterBottom>{GetLocaleData(staticData.loginLbl)}</Typography>
                            <Typography variant="body2" color="white">{GetLocaleData(staticData.loginDesc)}</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Container>
        </React.Fragment>

    );
}
export default AdditionalInfo;