import React, {useContext, useEffect, useState} from "react";
import axios from "axios"
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import {Grid, TextField, Typography, CircularProgress, Chip} from "@mui/material";
import {IsRtl, MediaQueryCheck, GetDomain} from "../customHook/useGlobal";
import { useForm, Controller } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import {makeStyles} from "@mui/styles";
import AlertMessage from "./ui/AlertMessage";
import ReCAPTCHA from "react-google-recaptcha";

// import GoogleReCaptcha from '../components/GoogleReCaptcha';


const useStyles = makeStyles((theme, isRtl) => {
    return {
        btn: {
            ...theme.MuiButtonBase,
            background: `${theme.palette.gradients.violetMagenta} !important`
        }
    }
    return {
        btn: {
            ...theme.MuiButtonBase,
            background: `${theme.palette.gradients.violetMagenta} !important`
        }
    }
});

export default function QuickRechargeForm({formErrorHandler, touristPlansPage}) {

    let search = window.location.search
    let params = new URLSearchParams(search)
    const isScreenSmall = MediaQueryCheck("sm")

    const domain = GetDomain()
    let navigate = useNavigate();
    // const systemErrors = require("../data/error.json");
    const [systemErrors, setSystemErrors] = useState()
    // const [errorMessage, setErrorMessage] = useState();
    const [isSubmitDisabled, setisSubmitDisabled] = useState(false)
    const [authkey, setAuthkey] = useState()
    const classes = useStyles();
    const [amountToPay, setAmountToPay] = useState(null);
    const [captchaToken, setCaptchaToken] = useState(null);

    // const CAPTCHA_KEY = '6Ld190chAAAAAKMWkUu38KIXUceVZnoqs7nLwCN6'; // V3 key
    const CAPTCHA_KEY = '6Lf3YxEUAAAAAMxuBSiyKBkvZihtdWFM8fg79LiD'; //same NetCov
    // const CAPTCHA_KEY = '6LeTtg4TAAAAACkx0WRLYFo79pii6uc5b7gHvtEA'; // V2 key

    const handleVerifyToken = (token) => {
        token && !captchaToken && setCaptchaToken(token)
    };

    const recaptchaRef = React.useRef();

    const getRecaptchaToken = async () => {
        const token = await recaptchaRef.current.executeAsync();
        setCaptchaToken(token)
        // console.log('captcha: ',token)
    }

    const [source, setSource] = useState(false);
    const [gfMigratedState, setGfMigratedState] = useState(false);
    const [quickPayAccess, setQuickPayAccess] = useState(null);
/*    useEffect(() => {
        return () => {
            // error json
            axios(domain + "/du/common/myaccount/backend-routine/error.json")
                .then((res) => {
                    setSystemErrors(res.data)
                })
                .catch((e) => console.log(e))
            // .finally(() => console.log(""))
        }
    },[])*/

    const staticData = {
        //
        payTitle: {
            en: "Quick Pay",
            ar: "الدفع السريع"
        },
        paySubTitle: {
            en: "Pay your postpaid bills securely with no login.",
            ar: "قم بدفع فواتيرك للدفع الآجل بآمان دون تسجيل الدخول."
        },
        rechargeTitle: {
            en: "Quick Recharge",
            ar: "إعادة الشحن السريع"
        },
        rechargeSubTitle: {
            en: "Recharge online",
            ar: "اشحن أونلاين"
        },
        controlNumberLbl: {
            en: "Enter your mobile number",
            ar: "أدخل رقم هاتفك المتحرك"
        },
        controlNumberHint: {
            en: "Ex. 9715XXXXXXXX, 05XXXXXXXX",
            ar: "مثال 9715XXXXXXXX,  05XXXXXXXX."
        },
        controlNumberRequired: {
            en: "Required",
            ar: "مطلوب"
        },
        controlNumberPattern: {
            en: "Required format 9715XXXXXXXX, 05XXXXXXXX",
            ar: "الصيغة المطلوبة 05XXXXXXXX, 9715XXXXXXXX"
        },
        btnRechargeLbl: {
            en: "Next",
            ar: "التالي"
        },
        btnPayLbl: {
            en: "Next",
            ar: "التالي"
        },
        sourceErrorMsg:{
            en: "Please continue with mobile number",
            ar: "Arabic - Please continue with mobile number "
        },
        migratedErrorMsg:{
            en: "Invalid number. Please use your new account number or mobile number.",
            ar: "رقم غير ساري. يرجى استخدام رقم حسابك الجديد أو رقم هاتفك المحمول."
        },
        touristRechargeTitle:{
            en: "Enter your mobile number",
            ar: "Enter your mobile number AR"
        },
        qpAccessErrorMsg:{
            en:"Sorry, the entered account number is not valid. Please use your new du account number to complete your payment.",
            ar:"عفواً، رقم الحساب الذي تم إدخاله غير صالح. الرجاء استخدام رقم حسابك الجديد من du لإكمال عملية الدفع."
        },
        qpAccessErrorMsgSmall:{
            en:"You can find your new account number on your latest du bill or by logging into the du App.",
            ar:"يمكنك العثور على رقم حسابك الجديد في آخر فاتورة du أو عن طريق الدخول إلى تطبيق du."
        }
    }
    useEffect(() => {
        console.log('tourist page', touristPlansPage)
        fetch(domain + "/servlet/myaccount/en/mya-quick-pay-payment.html")
            .then(response => response.text())
            .then(text => {
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(text, "text/html");
                setAuthkey(htmlDocument.documentElement.querySelector('[name="_authkey_"]')?.defaultValue)
                window.$authKey = htmlDocument.documentElement.querySelector('[name="_authkey_"]')?.defaultValue

            });

        // get reCaptcha token on load
        getRecaptchaToken()

    }, [])


    useEffect(() => {
        setTimeout(()=> {
            if (params.get('enum')) {
                setValue("msisdn", params.get('enum'), {
                    shouldValidate: true,
                });
                if(window.$authKey !== 'undefined' && captchaToken !== null){
                    handleSubmit(onSubmit)()
                }
            }
        },1000)

    }, [captchaToken],[authkey])
    const isRtl = IsRtl()
    const GetLocaleData = (obj) => {
        return isRtl ?  obj["ar"] : obj["en"];
    }


    const { register, setValue, control, handleSubmit, formState: {isDirty, isValid} } = useForm({
        mode: "all"
    });
    const onSubmit = data => {
        //GTM
        window.dataLayer.push({
            event: "eventTracker",
            eventCategory: "My Account Quick Recharge",
            eventAction: "Numbers Page",
            eventLabel: "Next"
        });

        setisSubmitDisabled(true)

        let msisdn = data.msisdn;
        var prefix = "971";
        if (msisdn.toString().startsWith('0')) {
            msisdn = prefix + msisdn.substring(1)
        }
        // else if (msisdn.toString().startsWith('5')) {
        //     msisdn = prefix + msisdn
        // }
        else if (msisdn.toString().startsWith('+')) {
            msisdn = msisdn.substring(1)
        }
        let type = 7; // for prepaid

        // rechargeType == '6' for postpaid


        // setErrorMessage("");
        formErrorHandler("");

        var formdata = new FormData();
        formdata.append("MSISDN", msisdn);
        formdata.append("rechargeType", type);
        formdata.append("requestType", "customerInfo");
        formdata.append("msisdnSource", msisdn);
        formdata.append("_authkey_", window.$authKey);
        // formdata.append("pagename", "MA_QuickPayRedirect");
        // formdata.append("d", "front");
        formdata.append("g-recaptcha-response", captchaToken);

        axios({
            // url: domain + '/servlet/ContentServer?pagename=MA_QuickPayRedirect&d=front',
            // uncomment this
            // url: domain + window.$myaRedirectURL + (captchaToken ? '?g-recaptcha-response=' + captchaToken : ''),
            url: window.$myaRedirectURL,
            data: formdata,
            header: {},
            method: 'post'
        })
            .then(function (response) {
                // console.log(response.data);
                    if (response.data.code === "200") {
                        setSource(response.data.hasOwnProperty('Source'))
                        let planType;
                        let billAmount
                        let journeyType
                        const gfMigrated = response.data.gfMigrated ? response.data.gfMigrated : false
                        const quickPayAccess = response.data.quickPayAccess ? response.data.quickPayAccess : false
                        setGfMigratedState(gfMigrated)
                        setQuickPayAccess(quickPayAccess)
                        if (response.data.PrePaid) {
                            planType = "prepaid"
                            journeyType = "prepaid"
                        }
                        if (response.data.PostPaid){
                            planType = "postpaid"
                            journeyType = "postpaid"
                        }
                        if(response.data.hasOwnProperty('billAmount')){
                            billAmount = parseInt(response.data.billAmount)
                            if(billAmount > 0){
                                planType = "postpaid"
                                journeyType = "postpaid"
                            }
                        }

                        if(quickPayAccess) {
                            if (!response.data.hasOwnProperty('Source') || planType === "postpaid" || billAmount > 0) {
                                navigate(params.get('eamt') ? "./pay?eamt=" + params.get('eamt') : "./pay", {
                                    state: {
                                        msisdn: msisdn,
                                        planType: planType,
                                        planId: response.data.rateplanId,
                                        ratePlan: response.data.rateplan,
                                        journeyType: journeyType,
                                        prgCode: response.data.prgCode,
                                        crypto: response.data.cryptoPayment,
                                        ignite: response.data.isIgnite ? response.data.isIgnite : false,
                                        customerType: response.data.customerType
                                    }
                                });
                            } else {
                                console.log(source, billAmount, planType, journeyType)
                            }
                        }
                        else{
                            console.log("Customer migrated")
                        }
                } else {
                    if (!systemErrors) {
                        axios(domain + "/du/common/myaccount/backend-routine/error.json")
                            .then((res) => {
                                setSystemErrors(res.data)
                                handleOnSubmitError(response.data.error_key, response.data.error_key_default, res.data)
                            })
                            .catch((e) => console.log(e))

                    } else {
                        handleOnSubmitError(response.data.error_key, response.data.error_key_default)
                    }
                }

            })
            .catch(function (error) {
                console.log(error);
                setisSubmitDisabled(false)
            })
            .then(function () {
                // always executed
            });
    };

    const handleGTMTriggerOnError = (name, error, event, eventCategory, eventAction ) => {
        if (!!error) {
            // console.log(!!error)
            //GTM
            window.dataLayer.push({
                event: event,
                eventCategory: eventCategory,
                eventAction: eventAction,
                eventLabel: name + " Error: "+ error.message
            });
        }
    }

    const handleOnSubmitError = (error_key, error_key_default, systemErr = systemErrors) => {
        setisSubmitDisabled(false)
        const errObj = systemErr.Error.filter((err) => err.error_key === error_key);
        const errDefaultObj = systemErr.Error.filter((err) => err.error_key === error_key_default);


        formErrorHandler(errDefaultObj.length ? errDefaultObj[0] : errObj[0])

        // GTM for invalid number
        window.dataLayer.push({
            event: "eventTracker",
            eventCategory: "My Account Quick Recharge",
            eventAction: "Numbers Page",
            eventLabel: "Error: " + errDefaultObj.length ? errDefaultObj[0].error_en : errObj[0].error_en
        })
    }

    return (
        <>
            <Box sx={{
                width: "100%",
                height: 300,
                display: params.get('enum') ? 'flex':'none',
                flexFlow: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <CircularProgress size="5rem"/>
             <Typography variant="h4" component="div" sx={{mt: 6}}>
                 Loading plans for you
             </Typography>
            </Box>
            <Box sx={{px: isScreenSmall && 5, display: params.get('enum') ? 'none':'block'}}>
                <Typography variant="h3" component="h1" gutterBottom sx={{whiteSpace: 'nowrap'}}>
                    {touristPlansPage ? GetLocaleData(staticData.touristRechargeTitle) : GetLocaleData(staticData.rechargeTitle) }
                </Typography>
                <Typography variant="body1" gutterBottom>
                    { GetLocaleData(staticData.rechargeSubTitle) }
                </Typography>

                <Box noValidate component="form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container mb={10}>
                        <Grid item xs={12} py={4}>
                            <Controller
                                name="msisdn"
                                control={control}
                                defaultValue=""
                                render={({ field: { name, ref,onChange, value, onBlur }, fieldState: { error } }) => (
                                    <TextField
                                        label={ GetLocaleData(staticData.controlNumberLbl) }
                                        variant="outlined"
                                        value={value}
                                        onChange={onChange}
                                        onBlur={e => {
                                            onBlur(e.target.value)
                                            handleGTMTriggerOnError(name, error, "eventTracker", "My Account Quick Recharge", "Numbers Page")
                                        }}
                                        error={!!error}
                                        helperText={error ? error.message : "" }
                                        margin="normal"
                                        fullWidth={isScreenSmall}
                                        ref={ref}
                                        // autoFocus
                                        inputProps={{ maxLength: 12, type: "text" }}
                                    />
                                )}
                                rules={{
                                    required: GetLocaleData(staticData.controlNumberPattern),
                                    pattern: { value:/^(((\\+9715)|(9715)|(05))[0-9]{8})$/i, message: GetLocaleData(staticData.controlNumberPattern)},
                                    maxLength: {value: 12, message: GetLocaleData(staticData.controlNumberPattern) }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} py={4}>
                            <LoadingButton
                                variant="contained"
                                type="submit"
                                disabled={isSubmitDisabled || !isValid}
                                color="primary"
                                loading={isSubmitDisabled}
                                className={classes.btn}
                            >
                                { GetLocaleData(staticData.btnRechargeLbl) }
                            </LoadingButton>
                        </Grid>
                        {/*{source && <AlertMessage {...{alertType:"error", alertTitle: "",  alertMessage: GetLocaleData(staticData.sourceErrorMsg)}} />}*/}
                        {gfMigratedState && <AlertMessage {...{alertType:"error", alertTitle: "",  alertMessage: GetLocaleData(staticData.migratedErrorMsg)}} />}
                        {(!quickPayAccess && quickPayAccess !== null) && <AlertMessage {...{alertType:"error", alertTitle: "",  alertMessage: GetLocaleData(staticData.qpAccessErrorMsg)}} />}
                        {(!quickPayAccess && quickPayAccess !== null) && <Chip sx={{
                            height: 'auto',
                            borderRadius: 1,
                            mt: 4,
                            py: 3,
                            backgroundColor: '#E5F5FD',
                            color: '#000',
                            fontSize: '15px',
                            '& .MuiChip-label': {
                                display: 'block',
                                whiteSpace: 'normal',
                            },
                        }} label={GetLocaleData(staticData.qpAccessErrorMsgSmall)} color="info" filled />}
                    </Grid>

                    {/*<GoogleReCaptcha siteKey={CAPTCHA_KEY} onVerify={handleVerifyToken} />*/}

                    <ReCAPTCHA
                          ref={recaptchaRef}
                          size="invisible"
                          sitekey={CAPTCHA_KEY}
                        />

                </Box>
            </Box>
        </>
    );
}
