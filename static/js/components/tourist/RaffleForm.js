import {useEffect, useState} from "react";
import OtpInput from 'react-otp-input';
import axios from "axios"
import { MediaQueryCheck, IsRtl, GetDomain } from "../../customHook/useGlobal"
import Box from "@mui/material/Box";
import {Grid, TextField, Typography, MenuItem, InputAdornment, Divider, Link, Container, FormControlLabel, Checkbox} from "@mui/material";
import AlertMessage from "../ui/AlertMessage";
import DrawerModal from "../DrawerModal"
import { useForm, Controller } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import {makeStyles} from "@mui/styles";
import React from "react";
import bannerImgDesktop from "../../assets/images/tourist/banner/tourist_banner_Desktop-1920x500.jpg"
import bannerImgMobile from "../../assets/images/tourist/banner/tourist_banner_Mobile-800x500_EN.jpg"

const useStyles = makeStyles((theme) => {
    return {
        btn: {
            ...theme.MuiButtonBase,
            background: `${theme.palette.gradients.violetMagenta} !important`
        },
        otpWrapper: {
            marginLeft: "-.5rem",
            marginRight: "-.5rem",
            "& input": {
                width: "3rem !important",
                height: "3rem",
                margin: "0 .5rem",
                fontSize: "2rem",
                borderRadius: "4px",
                border: "1px solid rgba(0, 0, 0, 0.3)"
            }
        }
    }
});

export default function RaffleForm() {
    const [stateOtp, setStateOtp] = useState("")
    const handleChange = (otp) => setStateOtp(otp)

    const isScreenSmall = MediaQueryCheck("sm")
    const isScreenMedium = MediaQueryCheck("md")

    const domain = GetDomain()

    const [countryList, setCountryList] = useState()
    const [selectedCountryCode, setSelectedCountryCode] = useState()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const [isVerifyBtnDisabled, setIsVerifyBtnDisabled] = useState(false)
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState({})
    const [screen, setScreen] = useState("form")
    const [isPopup, setIsPopup] = useState(false)
    const [isTouristNumberError, setIsTouristNumberError] = useState(false)
    const [isOTPError, setIsOTPError] = useState(false)

    const [authkey, setAuthkey] = useState()

    useEffect(() => {
        // country list
        axios("https://www.du.ae/app/countries")
            .then((res) => {
                setCountryList(res.data.Countries[0].countries_list.Countries)
            })
            .catch((e) => console.log(e))

        fetch(domain + "/servlet/myaccount/en/mya-quick-pay-payment.html")
            .then(response => response.text())
            .then(text => {
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(text, "text/html");
                setAuthkey(htmlDocument.documentElement.querySelector('[name="_authkey_"]')?.defaultValue)
                window.$authKey = htmlDocument.documentElement.querySelector('[name="_authkey_"]')?.defaultValue

            });

    },[])







    const COUNTER = 120
    const [state, setState] = useState({ time: {}, seconds: COUNTER })
    const [resendState, setResendState] = useState(false)
    let timer = 0
    const secondsToTime = (secs) => {
        let hours = Math.floor(secs / (60 * 60))

        let divisor_for_minutes = secs % (60 * 60)
        let minutes = Math.floor(divisor_for_minutes / 60).toString().padStart(2,"0")

        let divisor_for_seconds = divisor_for_minutes % 60
        let seconds = Math.ceil(divisor_for_seconds).toString().padStart(2,"0")

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj
    }
    useEffect(() => {
        return () => {
            let timeLeftVar = secondsToTime(state.seconds)
            setState(prevState => ({ ...prevState, time: timeLeftVar }))
        }
    },[])
    const startTimer = () => {
        if (timer === 0 && state.seconds > 0) {
            setResendState(false)
            timer = setInterval(countDown, 1000)
        }
    }
    const countDown = () => {
        // Remove one second, set state so a re-render happens.
        setState(prevState => {
            if ((prevState.seconds-1) === 0) {
                clearInterval(timer)
                setState(prevState => ({ ...prevState, seconds: COUNTER }))
                setResendState(true)
            }
            return {
                ...prevState,
                time: secondsToTime(prevState.seconds-1), seconds: prevState.seconds-1
            }
        })
    }






    const staticData = {
        //
        banner: {
            en: "Win an all inclusive luxury family trip to Dubai",
            ar: "Win an all inclusive luxury family trip to Dubai"
        },
        touristNumberError: {
            en: "Please enter a valid du tourist mobile number.",
            ar: "Please enter a valid du tourist mobile number."
        },
        otpError: {
            en: "PIN is incorrect.",
            ar: "PIN is incorrect."
        },
        title: {
            en: "A luxury trip is a click away.",
            ar: "A luxury trip is a click away."
        },
        subTitle: {
            en: "Simply fill in your details to enter the raffle.",
            ar: "Simply fill in your details to enter the raffle."
        },
        fieldNameLabel: {
            en: "Name",
            ar: "Name"
        },
        fieldNameError: {
            en: "Name Required",
            ar: "Name Required"
        },
        fieldEmailLabel: {
            en: "Email address",
            ar: "Email address"
        },
        fieldEmailError: {
            en: "Email address Required",
            ar: "Email address Required"
        },
        fieldDuMobileLabel: {
            en: "du mobile number",
            ar: "du mobile number"
        },
        fieldDuMobileError: {
            en: "Required format 9715XXXXXXXX, 05XXXXXXXX",
            ar: "Required format 9715XXXXXXXX, 05XXXXXXXX"
        },
        fieldCountryLabel: {
            en: "Select country",
            ar: "Select country"
        },
        fieldCountryError: {
            en: "Select country Required",
            ar: "Select country Required"
        },
        fieldHomeMobileLabel: {
            en: "Home country number",
            ar: "Home country number"
        },
        fieldHomeMobileError: {
            en: "Home country number Required",
            ar: "Home country number Required"
        },
        fieldPassportLabel: {
            en: "Passport number",
            ar: "Passport number"
        },
        fieldPassportError: {
            en: "Passport number Required",
            ar: "Passport number Required"
        },
        btnSubmit: {
            en: "Submit",
            ar: "Submit"
        },
        btnSend: {
            en: "Send",
            ar: "Send"
        },
        btnResend: {
            en: "Resend",
            ar: "Resend"
        },
        msgThankyou: {
            en: "Thank you for submitting your details. You will be notified if you’re one of the lucky winners.",
            ar: "Thank you for submitting your details. You will be notified if you’re one of the lucky winners."
        },
        termsAgreeLbl: {
            en: "I agree that the details entered are corrent and I hereby agree to the ",
            ar: "I agree that the details entered are corrent and I hereby agree to the "
        },
        termsConditionLbl: {
            en: "Terms and conditions",
            ar: "الشروط و الأحكام"
        },
        termsConditionLink: {
            en: "https://www.du.ae/terms-and-conditions",
            ar: "https://www.du.ae/ar/terms-and-conditions"
        },
        otpLbl: {
            en: "Enter OTP",
            ar: "Enter OTP"
        },
        otpSendLbl: {
            en: "We sent an OTP to:",
            ar: "We sent an OTP to:"
        },
        otpNotReceivedLbl: {
            en: "Didn't receive the PIN?",
            ar: "Didn't receive the PIN?"
        }
    }

    const isRtl = IsRtl()
    const GetLocaleData = (obj) => {
        return isRtl ?  obj["ar"] : obj["en"];
    }

    const { control, handleSubmit, formState: {isDirty, isValid} } = useForm({
        mode: "all"
    });

    const formatMobileNumber = num => {
        let msisdn = num
        let prefix = "971"

        if (num === undefined)
            return num

        if (num.toString().startsWith('0')) {
            msisdn = prefix + num.substring(1)
        } else if (num.toString().startsWith('+')) {
            msisdn = num.substring(1)
        }
        return msisdn
    }

    const onSubmitForm = data => {
        setIsSubmitDisabled(true)
        setIsTouristNumberError(false)
        setIsOTPError(false)
        setStateOtp("")
        // console.log(data)
        setUserInfo(data)

        let type = 7; // for prepaid

        var formdata = new FormData()
        formdata.append("MSISDN", formatMobileNumber(data.dumobile))
        formdata.append("rechargeType", type)
        formdata.append("requestType", "customerInfo")
        formdata.append("msisdnSource", formatMobileNumber(data.dumobile))

        formdata.append("pagename", "MA_QuickPayRedirect");
        formdata.append("d", "front");
        formdata.append("_authkey_", window.$authKey);

        axios({
            // url: domain + '/servlet/ContentServer?pagename=MA_QuickPayRedirect&d=front',
            url: domain + '/servlet/ContentServer',
            data: formdata,
            header: {},
            method: 'post'
        })
            .then(function (response) {
                // console.log(response.data);
                if (response.data.code === "200") {
                    if (response.data.rateplanId === "trSME" || response.data.rateplanId === "trSIM" ) {
                        // console.log("tourist sim")

                        // api call to generate otp
                        handleSendOPT(data.dumobile, data.email)

                    } else {
                        // console.log("Please enter a valid du tourist mobile number.")
                        setIsTouristNumberError(true)
                        setIsSubmitDisabled(false)
                    }
                } else {
                    console.log("Error")
                    setIsSubmitDisabled(false)
                }
            })
            .catch(function (error) {
                console.log(error)
                setIsSubmitDisabled(false)
            })
            .then(function () {
                // always executed
                // setIsSubmitDisabled(true)
            });

    };

    const handleSendOPT = (mobile, email) => {
        axios.get(domain + '/servlet/ContentServer?pagename=du/du_GenerateOtpGeneric&d=front',
            {
                params: {
                    nu: formatMobileNumber(mobile),
                    em: email
                }
            })
            .then(function (response) {
                setIsSubmitDisabled(false)
                setIsPopup(true)
                startTimer()
            })
            .catch(function (error) {
                setIsSubmitDisabled(false)
            })
    }

    const handleOTPVerifyForm = () => {
        //capture userInfo and verify OTP
        setIsVerifyBtnDisabled(true)
        setIsOTPError(false)
        axios.get(domain + '/servlet/ContentServer?pagename=du/du_GenerateOtpGeneric&d=front',
            {
                params: {
                    nu: formatMobileNumber(userInfo.dumobile),
                    em: userInfo.email,
                    verifyOTP: stateOtp,
                    name: userInfo.name,
                    country: userInfo.country,
                    homenumber: selectedCountryCode+''+userInfo.homemobile,
                    passportnumber: userInfo.passportnumber
                }
            })
            .then(function (response) {
                let strObj = JSON.stringify(response.data).replace(/\\r/g, "").replace(/\\t/g, "").replace(/\\n/g, "").replace(/\s/g, "").replace(/["']/g, "")
                if (strObj === "Success") {
                    setScreen("confirm")
                } else {
                    setScreen("form")
                    // console.log("PIN is incorrect.")
                    setIsOTPError(true)
                }
                setIsVerifyBtnDisabled(false)
            })
    }

    const closePopUpHandler = (isOpen) => {
        setIsPopup(isOpen)
    }



    return (
        <>
            <Container maxWidth="false" disableGutters sx={{height: { xs: "200px", md: "340px", lg: "340px" }, overflow: "hidden", position: "relative"}}>
                <Container disableGutters maxWidth="false" sx={{position: "absolute", height: "100%"}}>
                    <Container disableGutters maxWidth="lg" sx={{height: "100%"}}>
                        <Grid container direction="row" alignItems="center" sx={{height: "100%"}}>
                            <Grid item xs={7} lg={5}>
                                <Box sx={{px: isScreenSmall && 5}}>
                                    <Typography variant={isScreenSmall ? 'h4' : 'h3'} component="h3" color="white">{ GetLocaleData(staticData.banner) }</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Container>
                {/*<Box component="img"  src={bannerImgMobile} alt="" sx={{display: { xs: "block", lg: "none" }, maxWidth: "100%", objectFit: "cover"}} />*/}
                <Box sx={{background: `url(${isScreenSmall ? bannerImgMobile : bannerImgDesktop}) no-repeat`, backgroundSize: "cover", width: "100%", height: "100%" }} />
                {/*<Box sx={{background: `url(${bannerImgMobile}) no-repeat 100%` }} />*/}
            </Container>
            <Container disableGutters maxWidth="lg">
                {/*<Box sx={{p: {xs: "20px 0 0", md: "40px 90px"} }}>*/}
                <Box sx={{p: {xs: "20px 20px 0", md: "40px 90px"} }}>
                    {(screen === "form") && (
                        <>
                            {isTouristNumberError &&
                                <>
                                    <AlertMessage {...{
                                        alertType: "error",
                                        alertTitle: "",
                                        alertMessage: GetLocaleData(staticData.touristNumberError)
                                    }} />
                                    <Box sx={{minHeight:"20px"}} />
                                </>
                            }

                            <Typography variant="h5" component="h1" gutterBottom>
                                { GetLocaleData(staticData.title) }
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                { GetLocaleData(staticData.subTitle) }
                            </Typography>

                            <Box noValidate component="form" autoComplete="off" onSubmit={handleSubmit(onSubmitForm)}>
                                <Grid container mb={10}>
                                    <Grid item xs={12} md={5} py={2}>
                                        <Controller
                                            name="name"
                                            control={control}
                                            defaultValue=""
                                            render={({ field: { name, ref,onChange, value, onBlur }, fieldState: { error } }) => (
                                                <TextField
                                                    label={ GetLocaleData(staticData.fieldNameLabel) }
                                                    variant="outlined"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    error={!!error}
                                                    helperText={error ? error.message : "" }
                                                    margin="normal"
                                                    fullWidth={isScreenSmall}
                                                    ref={ref}
                                                    // autoFocus
                                                    inputProps={{ maxLength: 50, type: "text" }}
                                                />
                                            )}
                                            rules={{
                                                required: GetLocaleData(staticData.fieldNameError)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5} py={2}>
                                        <Controller
                                            name="email"
                                            control={control}
                                            defaultValue=""
                                            render={({ field: { name, ref,onChange, value, onBlur }, fieldState: { error } }) => (
                                                <TextField
                                                    label={ GetLocaleData(staticData.fieldEmailLabel) }
                                                    variant="outlined"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    error={!!error}
                                                    helperText={error ? error.message : "" }
                                                    margin="normal"
                                                    fullWidth={isScreenSmall}
                                                    ref={ref}
                                                    // autoFocus
                                                    inputProps={{ maxLength: 50, type: "email" }}
                                                />
                                            )}
                                            rules={{
                                                required: GetLocaleData(staticData.fieldEmailError),
                                                pattern: { value:/.+@.+\.[A-Za-z]+$/, message: GetLocaleData(staticData.fieldEmailError)},
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5} py={2}>
                                        <Controller
                                            name="dumobile"
                                            control={control}
                                            defaultValue=""
                                            render={({ field: { name, ref,onChange, value, onBlur }, fieldState: { error } }) => (
                                                <TextField
                                                    label={ GetLocaleData(staticData.fieldDuMobileLabel) }
                                                    variant="outlined"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    error={!!error}
                                                    helperText={error ? error.message : "" }
                                                    margin="normal"
                                                    fullWidth={isScreenSmall}
                                                    ref={ref}
                                                    // autoFocus
                                                    inputProps={{ maxLength: 50, type: "text" }}
                                                />
                                            )}
                                            rules={{
                                                required: GetLocaleData(staticData.fieldDuMobileError),
                                                pattern: { value:/^(((9715)|(05))[0-9]{8})$/i, message: GetLocaleData(staticData.fieldDuMobileError)},
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5} py={2}>
                                        <Controller
                                            name="passportnumber"
                                            control={control}
                                            defaultValue=""
                                            render={({ field: { name, ref,onChange, value, onBlur }, fieldState: { error } }) => (
                                                <TextField
                                                    label={ GetLocaleData(staticData.fieldPassportLabel) }
                                                    variant="outlined"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    error={!!error}
                                                    helperText={error ? error.message : "" }
                                                    margin="normal"
                                                    fullWidth={isScreenSmall}
                                                    ref={ref}
                                                    // autoFocus
                                                    inputProps={{ maxLength: 50, type: "text" }}
                                                />
                                            )}
                                            rules={{
                                                required: GetLocaleData(staticData.fieldPassportError),
                                                minLength: {value: 4, message: GetLocaleData(staticData.fieldPassportError) },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5} py={2}>
                                        <Controller
                                            name="country"
                                            control={control}
                                            defaultValue=""
                                            render={({ field: { onChange, value, name, onBlur }, fieldState: { error } }) => (
                                                <TextField
                                                    select
                                                    label={ GetLocaleData(staticData.fieldCountryLabel) }
                                                    variant="outlined"
                                                    value={value}
                                                    onChange={(e) => {
                                                        onChange(e.target.value)

                                                        const filteredItem = countryList.filter(item => item["Country-En"] === e.target.value)
                                                        setSelectedCountryCode("+"+filteredItem[0].ICC)

                                                    }}
                                                    onBlur={onBlur}
                                                    error={!!error}
                                                    helperText={error ? error.message : "" }
                                                    margin="normal"
                                                    fullWidth={isScreenSmall}
                                                    // autoFocus
                                                    inputProps={{ maxLength: 50, type: "text" }}
                                                >
                                                    {countryList ? countryList.map((option, i) => (
                                                            <MenuItem key={i} value={option["Country-En"]}>
                                                                {option["Country-En"]}
                                                            </MenuItem>
                                                        )) :
                                                        <MenuItem>
                                                            {GetLocaleData(staticData.fieldCountryLabel)}
                                                        </MenuItem>
                                                    }
                                                </TextField>
                                            )}
                                            rules={{
                                                required: GetLocaleData(staticData.fieldCountryError)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5} py={2}>
                                        <Controller
                                            name="homemobile"
                                            control={control}
                                            defaultValue=""
                                            render={({ field: { name, ref,onChange, value, onBlur }, fieldState: { error } }) => (
                                                <TextField
                                                    label={ GetLocaleData(staticData.fieldHomeMobileLabel) }
                                                    variant="outlined"
                                                    autoComplete="outlined"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    error={!!error}
                                                    helperText={error ? error.message : "" }
                                                    margin="normal"
                                                    fullWidth={isScreenSmall}
                                                    ref={ref}
                                                    // autoFocus
                                                    inputProps={{ maxLength: 12, type: "text" }}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">{selectedCountryCode}</InputAdornment>,
                                                    }}
                                                />
                                            )}
                                            rules={{
                                                required: GetLocaleData(staticData.fieldHomeMobileError),
                                                minLength: {value: 6, message: GetLocaleData(staticData.fieldHomeMobileError) },
                                                maxLength: {value: 12, message: GetLocaleData(staticData.fieldHomeMobileError) },
                                                pattern: { value:/^([0-9]{6,12})$/i, message: GetLocaleData(staticData.fieldHomeMobileError)},
                                            }}
                                        />
                                    </Grid>
                                    <Grid item py={4}>
                                        <FormControlLabel control={
                                            <Controller
                                                control={control}
                                                name="terms"
                                                render={({ field: { name, ref, onChange, onBlur, value }, fieldState: { error } }) => (
                                                    <Checkbox
                                                        onBlur={e => {
                                                            onBlur(e.target.value)
                                                        }}
                                                        onChange= {e => {
                                                            onChange(e.target.checked);
                                                        }}
                                                        // checked={value}
                                                        color={error && "error" }
                                                        ref={ref}
                                                    />
                                                )}
                                                rules={{ required: "required" }}
                                            />
                                        } label={

                                            <div style={{fontSize: "16px"}}>
                                                <span>{ GetLocaleData(staticData.termsAgreeLbl) } </span>
                                                <Link href={ GetLocaleData(staticData.termsConditionLink) }>{ GetLocaleData(staticData.termsConditionLbl) }</Link>
                                            </div>
                                        } />
                                    </Grid>
                                    <Grid item xs={12} py={4}>
                                        <LoadingButton
                                            variant="contained"
                                            type="submit"
                                            disabled={isSubmitDisabled || !isValid}
                                            color="primary"
                                            loading={isSubmitDisabled}
                                            className = {classes.btn}
                                        >
                                            { GetLocaleData(staticData.btnSubmit) }
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            </Box>


                            {isPopup && (
                                <DrawerModal isOpen={isPopup} anchor="bottom" closePopUpHandler={closePopUpHandler}>
                                    <Grid container>
                                        <Grid container item xs={12} sm={5}  direction="column" alignItems={isScreenSmall ? 'flex-start' : 'flex-end'}>
                                            <Grid item>
                                                <Typography variant="h4" component="h4">{GetLocaleData(staticData.otpLbl)}</Typography>
                                            </Grid>
                                        </Grid>
                                        {!isScreenSmall && (
                                            <Grid container item  sm={1} justifyContent="center">
                                                <Divider orientation="vertical" variant="middle" />
                                            </Grid>
                                        )}
                                        <Grid item xs={12} md={4}>
                                            {isOTPError &&
                                                <>
                                                    <AlertMessage {...{
                                                        alertType: "error",
                                                        alertTitle: "",
                                                        alertMessage: GetLocaleData(staticData.otpError)
                                                    }} />
                                                    <Box sx={{minHeight:"20px"}} />
                                                </>
                                            }
                                            <Typography sx={{mb: 2 }} variant="h5" component="h6">{GetLocaleData(staticData.otpSendLbl)}</Typography>
                                            <Typography variant="h6">{userInfo.email}</Typography>

                                            <Box component="div" className={classes.otpWrapper} sx={{my:5}}>
                                                <OtpInput
                                                    value = {stateOtp}
                                                    onChange = {handleChange}
                                                    numInputs = {4}
                                                    separator = {<span>-</span>}
                                                    isInputSecure = {true}
                                                    focusStyle = "optInputFocus"
                                                    inputStyle = "optInput"
                                                />
                                            </Box>
                                            <Typography variant="body1" component="p" sx={{my:2}}>
                                                <Typography component="span" >{GetLocaleData(staticData.otpNotReceivedLbl)}</Typography> <Link
                                                component="button"
                                                disabled = {!resendState}
                                                variant="body1"
                                                onClick={() => {handleSendOPT(userInfo.dumobile, userInfo.email)}}
                                            >
                                                { GetLocaleData(staticData.btnResend) }
                                            </Link> <Typography component="span">{state.time.m}:{state.time.s}s</Typography>
                                            </Typography>
                                            <LoadingButton
                                                variant="contained"
                                                type="button"
                                                color="primary"
                                                className = {classes.btn}
                                                disabled={isVerifyBtnDisabled || stateOtp.length !== 4}
                                                loading={isVerifyBtnDisabled}
                                                onClick={handleOTPVerifyForm}
                                            >
                                                { GetLocaleData(staticData.btnSend) }
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>
                                </DrawerModal>
                            )}
                        </>
                    )}

                    {screen === "confirm" && (
                        <>
                            <Typography variant="h5" component="h3" sx={{mb: 70}}>
                                { GetLocaleData(staticData.msgThankyou) }
                            </Typography>
                        </>
                    )}
                </Box>
            </Container>
        </>
    );
}