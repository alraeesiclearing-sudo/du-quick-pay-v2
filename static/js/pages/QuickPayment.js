import React, {useState, useEffect, useRef, useContext, useLayoutEffect} from 'react';
import axios from "axios"
import { useForm, Controller } from "react-hook-form";
import NumberFormat from 'react-number-format';
import LoadingButton from '@mui/lab/LoadingButton';
import {Check as CheckIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    StarBorder as StarOutlineIcon,
    OpenInNew as OpenInNewIcon,
    AddCircleOutline as AddCircleOutlineIcon,
    Edit as EditIcon,
    ExpandMore as ExpandMoreIcon,
    ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

import {
    Box,
    Card,
    CardActionArea,
    CardContent, Checkbox,
    Container, Divider, FormControlLabel, Link,
    Grid, InputAdornment, Radio,
    Typography, Button, TextField, List, ListItem, ListItemIcon, ListItemText, ListItemAvatar,
    CircularProgress,
    Tab, SvgIcon
} from "@mui/material";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';


import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { SubHeaderContext } from '../Contexts/SubHeaderContext'

import {MediaQueryCheck, IsRtl, GetLocaleData, GetDomain} from "../customHook/useGlobal";
import CommonDialog from '../components/CommonDialog';
import AppDownloadBanner from '../components/tourist/AppDownloadBanner';
import useDialog from '../customHook/useDialog';
import useDrawerModal from '../customHook/useDrawerModal';

import appleBtn from "../assets/images/apple-pay.svg";
import logoGPay from "../assets/images/google-pay.svg";
import logoSamsungPay from "../assets/images/samsung-pay.svg";
import logoCryptoPay from "../assets/images/crypto-pay.svg";
import iconCardPay from "../assets/images/card-pay.svg";

import alsaadaLogo from "../assets/images/alsaada.svg";
import alsaadaBanner from "../assets/images/alsaada-banner.png";

// import page data from a service
import fetchTextData from "../services/textContentService";

// page components
import {useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import TheBreadCrumb from "../components/TheBreadCrumb";
import ThePageHeader from "../components/ThePageHeader";
import errors from "../data/error.json";

// images
import ccVisaLight from "../assets/images/cc-visa-logo-light.svg"
import ccMasterLight from "../assets/images/cc-master-logo-light.svg"
import ccAmexLight from "../assets/images/cc-amex-logo-light.svg"
import ccVisa from "../assets/images/cc-visa-logo.svg"
import ccMaster from "../assets/images/cc-master-logo.svg"
import ccAmex from "../assets/images/cc-amex-logo.svg"
import AlertMessage from "../components/ui/AlertMessage";
import TheWidget from "../components/TheWidget";
import CurrencyConversionWidget from "../components/CurrencyConversionWidget";
import {makeStyles} from "@mui/styles";
import duTheme from "../assets/theme";
import DrawerModal from "../components/DrawerModal";
import useSamsungPay from '../customHook/useSamsungPay';
import useGooglePay from '../customHook/useGooglePay';


import ReCAPTCHA from "react-google-recaptcha";

const useStyles = makeStyles((theme) => {
    return {
        "isActive": {

            "&.MuiPaper-root": {
                /* background: theme.palette.gradients.violetAqua, */
                position: "relative",
                "&:after": {
                    background: theme.palette.common.white,
                    content: "''",
                    position: "absolute",
                    top: "2px",
                    left: "2px",
                    width: "calc(100% - 4px)",
                    height: "calc(100% - 4px)",
                    borderRadius: theme.spacing(1)
                },
                "& .MuiButtonBase-root": {
                    position: "relative",
                    zIndex: 2,
                },
                "& .MuiCardContent-root": {
                    position: "relative",
                    zIndex: 2,
                    padding: theme.spacing(4)
                }

            }
        },
        formWrap: {
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
        applepayBtn: {
            // ...theme.MuiButton,
            background: "transparent",
            backgroundImage: appleBtn,
            "&.MuiButton-root": {
                background: `#000 url(${appleBtn}) no-repeat 50%`,
                textIndent: "-99999px",
                "&:hover": {
                    backgroundColor: "#000"
                },
                "&.Mui-disabled": {
                    opacity: "inherit",
                    backgroundColor: "rgba(0, 0, 0, .5)"
                }
            }
        },
        buttonGroup: {
            "&.MuiButtonGroup-root": {
                display: "flex",
                justifyContent: "flex-start",
                [theme.breakpoints.down("md")]: {
                    justifyContent: "center"
                },
                minHeight: "60px",
                "& .MuiButtonGroup-grouped": {
                    minWidth: "140px",
                    height: "45px",
                    [theme.breakpoints.down("md")]: {
                       minWidth: "300px"
                    },
                    "&:hover": {
                        color: "inherit"
                    },
                    "&.isActive": {
                        /* background: duTheme.palette.gradients.violetAqua, */
                        /* color: duTheme.palette.common.white, */
                        /* border: 0, */
                        // boxShadow: `inset 2px 2px ${duTheme.palette.common.magenta}, inset -2px -2px ${duTheme.palette.common.aqua}`
                    },
                    /* "&::before": {
                        content: "",
                        display: "block",
                        position: "absolute",
                        width: "calc(100% - 4px)",
                        height: "calc(100% - 4px)",
                        background: "#fff"
                    } */
                    
                },
                "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                    border: "1px solid #ccc",
                    borderRadius: duTheme.spacing(2.5),

                },
                "& .MuiButtonGroup-grouped:not(:first-of-type)": {
                    border: "1px solid #ccc",
                    borderRadius: duTheme.spacing(2.5)
                },
                "&.MuiButton-outlined": {
                    color: "inherit",
                }
            }
        },
        groupBtn: {
            "&.MuiButton-outlined": {
                background: "transparent",
                border: "1px solid #ccc",
                color: duTheme.palette.text.primary,
                "&:before": {
                    display: "none"
                },
                "&:hover": {
                    background: duTheme.grey[100],
                    color: duTheme.palette.common.grey
                }
            },
            "&.MuiButton-contained": {
                background: duTheme.grey[800],
                "&:hover": {
                    background: '#474747',
                    color: `${duTheme.palette.common.white} !important`
                },
                "&.isActive": {
                    background: duTheme.palette.common.black
                }
            }
        },
        btn: {
            ...theme.MuiButtonBase,
            background: `${theme.palette.gradients.violetMagenta} !important`
        },
        inputLtr: {
            "& .MuiOutlinedInput-input": {
                flip: false,
                direction: "ltr",
                textAlign: theme.direction === "rtl" ? "right" : "left",
            }
        },
        cardText: {
            "& div": {
                minHeight: "22px"
            }
        },
        listLi:{
            "& li":{
                padding: 0,
                "& + li":{
                    paddingTop:"8px"
                }
            }
        },
        bold:{
            fontWeight:"bold",
        },
        gradientText:{
            background: theme.palette.gradients.violetAqua,
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
        },
        greyBox:{
            padding:24,
            borderRadius: duTheme.spacing(4),
            backgroundColor: duTheme.grey[50]
        },
        cardBanner:{
            background: "#eee",
            borderRadius: duTheme.spacing(3),
            padding: 16,
            height:"130px",
            backgroundBlendMode: "overlay"
        },
        cardContent: {
            background: "white",
            borderRadius: duTheme.spacing(5),
            marginTop:"-20px",
            minHeight:"116px",
            padding: "16px 8px",
        },
        tag:{
            borderRadius:duTheme.spacing(1.2),
            color:"white",
            fontSize:duTheme.spacing(3),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "500"
        },
        suggestedplans:{
            borderRadius:duTheme.spacing(2), overflow:"hidden",
            backgroundColor: "#F2F4F7",
            "& li":{
              minHeight:"60px",
              display:"flex",
              flexFlow:"column",
              textAlign:"center",
              alignItems: "center",
              justifyContent:"center",
              fontWeight: "500"
            },
            "& li:nth-child(2n + 1)":{
                backgroundColor: "#fff"
            }
        }
    }
});

export default function QuickPayment(props) {
    const {setShowHeader} = useContext(SubHeaderContext)
    const staticData = {
        currency: {
            en: "AED",
            ar: "درهماً"
        },
        payTitle: {
            en: "How much would you like to pay?",
            ar: "كم ترغب بأن تدفع؟"
        },
        rechargeTitle: {
            en: "How much would you like to recharge?",
            ar: "كم هو مبلغ تعبئة الرصيد؟"
        },
        paymentTitle: {
            en: "Payment options",
            ar: "الدفع"
        },
        controlAmountLbl: {
          en: "Enter amount",
          ar: "ادخل المبلغ"
        },
        controlAmountError: {
          en: "Enter a value between AED 1 and 30000.",
          ar: "يمكنك دفع أي مبلغ يتراوح بين 1 و 30000 درهماً."
        },
        controlEnterpriseAmountError: {
            en: "Enter a value between AED 1 and 500000.",
            ar: "يمكنك دفع أي مبلغ يتراوح بين 1 و 500000 درهماً."
        },
        controlOtherAmountHint: {
            en: "Enter a value between AED 1 and 1050.",
            ar: "أدخل مبلغاً بين 1 و 1050 درهماً."
        },
        controlTouristOtherAmountHint: {
            en: "Enter a value between AED 1 and 48. No decimals.",
            ar: "أدخل مبلغاً بين 1 و 48 درهماً. بدون كسور"
        },
        ccMockNameLbl: {
            en: "Name",
            ar: "الاسم"
        },
        ccMockExpiryLbl: {
            en: "Expiry",
            ar: "تاريخ الانتهاء"
        },
        controlCardNumberLbl: {
            en: "Card number",
            ar: "رقم بطاقة الائتمان"
        },
        controlCardNumberError: {
            en: "Enter valid Visa or Mastercard number",
            ar: "أدخل رقم Visa أو Mastercard صالح"
        },
        controlCardNameLbl: {
            en: "Name on card",
            ar: "الاسم على البطاقة"
        },
        controlCardNameError: {
            en: "Avoid special character or numbers. Max 25 characters",
            ar: "تجنب الأحرف أو الأرقام الخاصة. 25 حرفًا كحد أقصى"
        },
        controlCardExpiryLbl: {
            en: "Card expiry date",
            ar: "تاريخ انتهاء البطاقة"
        },
        controlCardExpiryError: {
            en: "Enter valid date",
            ar: "أدخل تاريخ صحيح"
        },
        controlCardCVVLbl: {
            en: "CVV / CVC",
            ar: "CVV / CVC"
        },
        controlCardCVVError: {
            en: "Enter valid CVV/CVC",
            ar: "أدخل رمز CVV/CVC صحيح"
        },
        termsAgreeLbl: {
            en: "I agree to payments",
            ar: "أوافق على المدفوعات "
        },
        termsConditionLbl: {
            en: "Terms and conditions",
            ar: "الشروط و الأحكام"
        },
        termsConditionLink: {
            en: "https://www.du.ae/terms-and-conditions",
            ar: "https://www.du.ae/ar/terms-and-conditions"
        },
        totalLbl: {
            en: "Total amount",
            ar: "المبلغ الإجمالي"
        },
        btnRechargeLbl: {
            en: "Recharge now",
            ar: "تعبئة الرصيد"
        },
        btnPayLbl: {
            en: "Pay now",
            ar: "إدفع الآن"
        },
        otherLbl: {
            en: "Other",
            ar: "أخرى"
        },
        infoPostpaidLbl: {
            en: "This is a Postpaid Number. You can still make a payment by entering the amount below.",
            ar: "هذا الرقم آجل الدفع. يمكنك القيام بالدفع عبر إدخال المبلغ الذي ترغب بدفعه أدناه."
        },
        infoPrepaidLbl: {
            en: "This is a Prepaid Number. You can still make a payment by selecting a recharge amount.",
            ar: "هذا الرقم مُسبق الدفع. يمكنك القيام بالدفع عبر اختيار مبلغ تعبئة الرصيد الذي ترغب بدفعه أدناه."
        },
        paymentTypeLbl: {
            en: "How do you like to pay?",
            ar: "كيف تريد الدفع؟"
        },
        CardLbl: {
            en: "Bank card",
            ar: "بطاقة البنك"
        },
        applePayLbl: {
            en: "Apple pay",
            ar: "Apple pay"
        },
        touristTitle: {
            en: "You Get Tourist Bundle",
            ar: "تحصل على باقة الزوار"
        },
        touristOffer: {
            en: "Unlimited voice or video internet calls through BOTIM &amp; CME apps. For more information, please <a href=\"https://www.du.ae/personal/mobile/specialoffers/internet-calling-app\" target=\"_blank\">click here.</a>",
            ar: "مكالمات صوتية وفيديو عبر الانترنت من خلال تطبيقات BOTIM &amp; CME لمزيد من المعلومات، يرجى ا <a href=\"https://www.du.ae/ar/personal/mobile/specialoffers/internet-calling-app\" target=\"_blank\">لضغط هنا.</a>"
        },
        err3D: {
            en: "We encountered a system error. Please try again.",
            ar: "واجهنا خطأ في النظام، يرجى المحاولة مرة أخرى."
        },
        touristUnlimitedOffer: {
            en: "Unlimited calls to one du number",
            ar: " مكالمات غير محدودة إلى رقم du مفضل"
        },
        touristApproximate: {
            en: "Approx.",
            ar: "تقريباً"
        },
        currencyUSDLbl: {
            en: "USD",
            ar: "دولار أمريكي"
        },
        amtHintLbl: {
            en: "Amount due is",
            ar: "المبلغ المستحق"
        },
        amtHintConsumerLbl: {
            en: "You can pay any amount between AED 1 and 30000.",
            ar: "يمكنك دفع أي مبلغ يتراوح بين 1 و 30000 درهما."
        },
        amtHintEnterpriseLbl: {
            en: "You can pay any amount between AED 1 and 500000.",
            ar: "يمكنك دفع أي مبلغ يتراوح بين 1 و 500000 درهما."
        },
        entertainer:{
            label: {
                en:"Get Entertainer",
                ar:"arabic Get Entertainer"
            },
            strongTxt:{
                en:"Buy 1 Get 1 Free and discount offers",
                ar:"arabic Buy 1 Get 1 Free and discount offers"
            },
            txt:{
                en:"on food & drinks, fashion & retail, attractions & leisure and more.",
                ar:"arabic on food & drinks, fashion & retail, attractions & leisure and more."
            },
            validity:{
                en:"Valid for 4 days",
                ar:"arabic Valid for 4 days"
            }
        },
        cryptoTerms:{
            title:{
                en:"About Cryptocurrency Payments",
                ar:"حول المدفوعات بالعملة الرقمية المشفّرة"
            }
        }
    }

    const isRtl = IsRtl()
    const locale = isRtl ? 'ar': 'en';

    const domain = GetDomain()

    const classes = useStyles();

    const loc = useLocation();
    const [state, setState] = useState(loc.state);

    const msisdn = state && state.msisdn;
    const [isSubmitDisabled, setisSubmitDisabled] = useState(false)
    const [isApplePay, setApplePay] = useState(false)
    const [isCryptoPay, setCryptoPay] = useState(false)
    const [authkey, setAuthkey] = useState()
    const [sessionID, setSessionID] = useState()
    const [isIgnite, setIsIgnite] = useState(false)
    const [paymentType, setPaymentType] = useState("card")
    const [errState, setErrState] = useState()
    const [err3DState, setErr3DState] = useState(false)

    const [systemErrors, setSystemErrors] = useState()
    const [openDrawer, setOpenDrawer] = useState([false, false])
    const [cryptoTerms, setCryptoTerms] = useState()
    const cryptoTermshandler = async ()=>{
        const apiUrl = 'https://www.du.ae/app/crypto-consent'
        await axios.get(apiUrl)
            .then(response => {
                        setCryptoTerms(response.data.consentCrypto)
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching data:', error);
            });
    }
    // const systemErrors = require("../data/error.json")

    // const [captchaToken, setCaptchaToken] = useState(null);

    // const CAPTCHA_KEY = '6Ld190chAAAAAKMWkUu38KIXUceVZnoqs7nLwCN6'; // V3 key
    const CAPTCHA_KEY = '6Lf3YxEUAAAAAMxuBSiyKBkvZihtdWFM8fg79LiD'; //same NetCov
    // const CAPTCHA_KEY = '6LeTtg4TAAAAACkx0WRLYFo79pii6uc5b7gHvtEA'; // V2 key

    const recaptchaRef = useRef();
    
    //redirect if state is NULL
    //entertainer CR: read querystring and prepopulate tourist mobile number and amount
    const navigate = useNavigate();
    let search = window.location.search
    let params = new URLSearchParams(search)

    // init GooglePay
    const { isGooglePayAble, onGooglePaymentButtonClicked } = useGooglePay()

    const GooglePayClickHandler = (params) => {
        setPaymentType("googlepay")
        setSpinner(true)

        var formdata = new FormData();
        formdata.append("pagename", "MA_NewQuickPayRedirect");
        formdata.append("requestType", "getMigs");
        formdata.append("MSISDN", msisdn);
        formdata.append("locale", locale);
        formdata.append("accountType", planType === "postpaid" ? "2" : "1");
        formdata.append("paymentType", "googlePayment");
        formdata.append("paymentSubtype", planType === "postpaid" ? "6" : "7");
        formdata.append("transactionType", transactionType);
        formdata.append("rechargeType", transactionType);
        formdata.append("merchantpaymentType", planType === "postpaid" ? "quick.payment" : "quick.recharge");
        formdata.append("amount", amountToPay || "1");
        formdata.append("_authkey_", window.$authKey);
        
        /* formdata.append("creditCardNo", data.card.replace(/\s/g, ''));
        formdata.append("nameOnCard", data.fullname);
        formdata.append("expiryDate", data.expiry);
        formdata.append("cvv", data.cvv);
        formdata.append("cardType", ccType)
        formdata.append("mearchantParentId", "method")
        formdata.append("creditValue", planType === "postpaid" ? "" : "Credit"); */
        onGooglePaymentButtonClicked(formdata, gPayServiceId, gPayMerchantId, (errCode) => {
            console.log('amountToPay :>> ', amountToPay);
            console.log('payment Error code :>> ', errCode);

            setSpinner(false)
            console.log('systemErrors :>> ', systemErrors);
            if (systemErrors) {
                const err = systemErrors.Error.filter((err) => err.error_key === errCode);
                const errDefault = systemErrors.Error.filter((err) => err.error_key === "500-GENERIC_ERROR");
                    setErrState(err.length ? err[0] : errDefault[0])
                    setisSubmitDisabled(false)
                    setErr3DState(false)
            }
        })
    }


    useEffect(() => {
        console.log('paymentType :>> ', paymentType);
        console.log('google pay: ', isGooglePayAble)
    }, [isGooglePayAble]);
    
    // init SamsungPay
    // const samsungServiceId = "cf5df208b335495cb9e7d2"
    const [samsungServiceId, setSamsungId] = useState()
    const [gPayServiceId, setGPayServiceId] = useState()
    const [gPayMerchantId, setGPayMerchantId] = useState()
    const { isSamsungPayAble, SamsungPayClick, SamsungPayConnect } = useSamsungPay()    

    const SamsungPayClickHandler = () => {
        
        setPaymentType("samsungpay")
        setSpinner(true)
        
        const formdata = new FormData();
        formdata.append("pagename", "MA_SamsungTransaction");
        formdata.append("amount", amountToPay || 200);
        formdata.append("_authkey_", window.$authKey);
        formdata.append("paymentType", planType === "postpaid" ? "SAMSUNG_PAYPAYMENT" : "SAMSUNG_PAYRECHARGE");
        formdata.append("flowtype", planType === "postpaid" ? "quick.payment" : "quick.recharge");
        formdata.append("rechargeType", transactionType);
        // formdata.append("transactionType", transactionType);

        // console.log('paymentType', formdata.get('paymentType'))
        // console.log('transactionType', formdata.get('transactionType'))


        // first API call - du server
        SamsungPayClick(formdata, samsungServiceId).then((resp) => {
            console.log('response: ', resp.data)
            
            // 2nd API call - samsung
            SamsungPayConnect(resp.data, samsungServiceId)

        }).catch((error) => {
            setSpinner(false)
            setErrState({"error_en": "There's something wrong! " + error})
        })

    }

    // init reCaptcha when params.get('enum') && params.get('eamt')
    useEffect(() => {
        setShowHeader(false)
        // console.log('In Effect - authkey: ', authkey)
        let _url = '';
        const getRecaptchaToken = async () => {
            const token = await recaptchaRef.current.executeAsync();
            // setCaptchaToken(token)
            //uncomment
            // _url = domain + window.$myaRedirectURL + (token ? '?g-recaptcha-response=' + token : '')
            _url = window.$myaRedirectURL
            // console.log('_url: ', _url)
            return token;
        }
        
        recaptchaRef.current && getRecaptchaToken().then((token) => {
            // console.log('token: ', token)
        if (params.get('enum') && params.get('eamt')) {

            var formdata = new FormData();
            formdata.append("MSISDN", params.get('enum'));
            formdata.append("rechargeType", 7);
            formdata.append("requestType", "customerInfo");
            formdata.append("_authkey_", window.$authKey);

                // formdata.append("d", 'front');
                // formdata.append("pagename", 'MA_QuickPayRedirect');

            axios({
                // url: domain + '/servlet/ContentServer?pagename=MA_QuickPayRedirect&d=front',
                // url: domain + window.$myaRedirectURL,
                url: _url,
                data: formdata,
                header: {},
                method: 'post'
            })
                .then(function (response) {
                    if (response.data.code === "200") {
                        console.log(response.data)
                        if (response.data.rateplanId === "trSME" || response.data.rateplanId === "trSIM" ) {

                            setState({
                                "journeyType": "prepaid",
                                "msisdn": params.get('enum'),
                                "planId": response.data.rateplanId,
                                "planType": "prepaid",
                                "prgCode": response.data.prgCode,
                                "ratePlan": response.data.rateplan,
                                "crypto": response.data.cryptoPayment
                            })

                            const price = parseInt(params.get('eamt'))
                            // const selected = touristPlans.filter( (item) => item.value == params.get('eamt') )?.[0]
                            setPlanType("tourist")
                            // setSelectedCardValue( selected ? selected  : touristPlans[touristPlans.length - 1] )
                            setAmountToPay(price)

                            // console.log(pay)
                            setValue('pay', price, { shouldValidate: true })
                        } else {
                            return navigate("/"+locale+"/quick-recharge")
                        }
                    } else {
                        return navigate("/"+locale+"/quick-recharge")
                    }

                    })
                    .catch(function (error) {
                        console.log(error);

                    })
                    .then(function () {
                        // always executed
                    });

            }

            if ((!state && !params.get('enum')) || (!state && !params.get('eamt'))) {
                if (window.location.href.indexOf('quick-pay') > 0) {
                    return navigate("/" + locale + "/quick-pay");
                } else if (window.location.href.indexOf('quick-recharge') > 0) {
                    return navigate("/" + locale + "/quick-recharge");
                } else {
                    return navigate("https://myaccount.du.ae/");
                }
            }

        })

        },[authkey]);

    const isScreenSmall = MediaQueryCheck("sm")
    const isScreenMedium = MediaQueryCheck("md")


    useEffect(() => {
        if(state && state.ignite) setIsIgnite(state.ignite ? state.ignite : false)
        if(state && state.crypto) setCryptoPay(state.crypto === 'true'?true:false)
        if(state && state.crypto && (msisdn === 971559531847 || msisdn === 971525734266))  setCryptoPay(true)
        console.log('ignite', isIgnite)


        // GTM for cross journey
        return () => {
            if (state && state.journeyType !== state.planType ) {
                if (state.planType === "postpaid") {
                    window.dataLayer.push({
                        event: "eventTracker",
                        eventCategory: "My Account Quick Recharge",
                        eventAction: "Credit Card Page",
                        eventLabel: "You entered a postpaid number"
                    });
                }

                if (state && state.planType === "prepaid") {
                    window.dataLayer.push({
                        event: "eventTracker",
                        eventCategory: "My Account Quick Payment",
                        eventAction: "Credit Card Page",
                        eventLabel: "You entered a prepaid number"
                    });
                }
            }

            // error json
            // axios(domain + "/du/common/myaccount/backend-routine/error.json")
            //     .then((res) => {
            //         setSystemErrors(res.data)
            //         console.log(res.data)
            //     })
            //     .catch((e) => console.log(e))
            // .finally(() => console.log(""))
        }
    },[])

    // vars for Enablers
    const [visaEnabled, setVisaEnabled] = useState(false);
    const [GPayEnabled, setGPayEnabled] = useState(false);
    const [SamsungPayEnabled, setSamsungPayEnabled] = useState(false);
    const [ApplePayEnabled, setApplePayEnabled] = useState(false);
    
    // effect to get Page session
    useEffect( () => {

        fetch(domain + "/servlet/myaccount/en/mya-quick-pay-payment.html")
        // fetch("http://localhost:3007/servlet/myaccount/en/mya-quick-pay-payment.html")
            .then(response => response.text())
            .then(text => {
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(text, "text/html");
                setAuthkey(htmlDocument.documentElement.querySelector('[name="_authkey_"]')?.defaultValue)
                setSessionID(htmlDocument.documentElement.querySelector('[name="sessionID"]')?.defaultValue)
                window.$authKey = htmlDocument.documentElement.querySelector('[name="_authkey_"]')?.defaultValue
                
                console.log('upper auth key',window.$authKey, authkey)
                // get Samsung service ID
                const samsungId = htmlDocument.documentElement.querySelector('#sam-service-id')?.defaultValue
                const gPayId = htmlDocument.documentElement.querySelector('#gpay-service-id')?.defaultValue
                const gMerchantId = htmlDocument.documentElement.querySelector('#gpay-merchant-id')?.defaultValue
                setSamsungId(samsungId)
                setGPayServiceId(gPayId)
                setGPayMerchantId(gMerchantId)

                // set Enablers
                const _enableVisaPay = htmlDocument.documentElement.querySelector('#payment-network')?.defaultValue
                const _enableGPay = htmlDocument.documentElement.querySelector('#enable-gpay')?.defaultValue
                const _enableSamsungPay = htmlDocument.documentElement.querySelector('#enable-samsungpay')?.defaultValue
                const _enableApplePay = htmlDocument.documentElement.querySelector('#enable-applepay')?.defaultValue


                setVisaEnabled(_enableVisaPay !== 'Visa' ? false : true)
                setGPayEnabled(_enableGPay !== 'Yes' ? false : true)
                setSamsungPayEnabled(_enableSamsungPay !== 'Yes' ? false : true)
                setApplePayEnabled(_enableApplePay  !== 'Yes' ? false : true)
                console.log('variables(gpay, samsung, apple): ', _enableGPay, _enableSamsungPay, _enableApplePay)

            });

        if (window.ApplePaySession && window.ApplePaySession.canMakePayments()) {
            setApplePay(true)
        } else {
            setApplePay(false)
        }
    }, [])
    const [pageData, setPageData] = useState(null)
    useEffect( () => {
        // error json
        axios(domain + "/du/common/myaccount/backend-routine/error.json")
        // axios("https://myaccount.du.ae/du/common/myaccount/backend-routine/error.json")
        .then((res) => {
            setSystemErrors(res.data)
            window.systemErrors = res.data.Error
        })
        .catch((e) => console.log(e))

        // page data
        fetchTextData().then(data => {
            setPageData(data)
        })
    }, [])
    
    // Handle errors Passed through QueryString
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        const statusError = searchParams.get('status');
        if (systemErrors && statusError) {
            const err = systemErrors.Error.filter((err) => err.error_key === statusError);            
            err.length && setErrState(err[0])
        }
    }, [systemErrors]);
    // easy plans
    const easyPlans = [
        {
            id: "1",
            value: "30"
        },
        {
            id: "2",
            value: "55"
        },
        {
            id: "3",
            value: "110"
        },
        {
            id: "4",
            value: "210"
        },
        {
            id: "5",
            value: "525"
        },
        {
            id: "6",
            value: "0"
        }
    ]


    const GetLocaleData = (obj) => {
        return isRtl ?  obj["ar"] : obj["en"];
    }

    var [planType, setPlanType] = useState( () => {
        if ((state && state.planType === "prepaid" && (state.planId !== "trSME" && state.planId !== "trSIM") && !(state.planId === "EE50" || state.planId === "HBPL1" || state.planId === "HBPL2" || state.planId === "HBPL3" || state.planId === "HBPL4")) ||
            (state && state.journeyType === "prepaid" && (state.planId === "EE50" || state.planId === "HBPL1" || state.planId === "HBPL2" || state.planId === "HBPL3" || state.planId === "HBPL4"))) {
            return "prepaid"
        }

        if (state &&
            (state.planId === "trSME" || state.planId === "trSIM" )) {
            return "tourist"
        }

        if (state &&
            ((state.planType === "postpaid") ||
                (
                    (state.planId === "EE50" || state.planId === "HBPL1" || state.planId === "HBPL2" || state.planId === "HBPL3" || state.planId === "HBPL4") &&
                    state.journeyType === "postpaid"
                ))) {
            return "postpaid"
        }
        return ""
    })

    const bannerType = planType === 'tourist' ? 'tourist' : 'default'
    const [selectedCardValue, setSelectedCardValue] = useState("0"); // set value using ternary operator

    const [touristPlansCards, setTouristPlansCards] = useState()
    const [touristStaticData, setTouristStaticData] = useState()
    const [touristRechargeType, setTouristRechargeType] = useState("")
    const [touristSuggestedPlan, setTouristSuggestedPlan] = useState()
    const [otherAmountValue, setOtherAmountvalue] = useState(() => {
        if (planType === "postpaid") {
            if (state && state.billAmount != "" && (Math.round(state.billAmount * 100) / 100).toFixed(2) > 0) {
                return state.billAmount
            } else {
                return ""
            }
        }
        else{
            return ""
        }
    });
    const [touristFaqs, setTouristFaqs] = useState()
    const [btnActive, setBtnActive] = useState(1)
    const [btnVariant, setBtnVariant] = useState()
    const [cardIndex, setCardIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
            // Define the URL you want to make a GET request to
                const apiUrl = isRtl ? domain +'/du/common/myaccount/backend-routine/json/tourist_bundle-ar.json' : domain +'/du/common/myaccount/backend-routine/json/tourist_bundle-en.json';
            // const apiUrl = isRtl? 'http://172.24.108.102:8100/servlet/duaediscovery/quickAPI/tourist_bundle--dev-ar.json' : 'http://172.24.108.102:8100/servlet/duaediscovery/quickAPI/tourist_bundle-dev.json'
            // Make the GET request using Axios
            axios.get(apiUrl)
                .then(response => {
                    setTouristPlansCards(response.data);
                    setTouristStaticData(response.data.staticText)
                    // if (selectedPlanCard) {
                    //     const priceArray = new Array
                    //     response.data.plans.forEach(value => {
                    //         priceArray.push(value.price.toString())
                    //         setCardIndex(priceArray.indexOf(selectedPlanCard))
                    //     })
                    // }
                    setLoading(false)

                })
                .catch(error => {
                    // Handle error
                    console.error('Error fetching data:', error);
                });
        // const faqUrl = isRtl ? 'https://du.ae/du/common/myaccount/backend-routine/json/touristMoreDetails-ar.json' : 'https://du.ae/du/common/myaccount/backend-routine/json/touristMoreDetails-en.json';
            const faqUrl = isRtl ? domain +'/du/common/myaccount/backend-routine/json/touristMoreDetails-ar.json' : domain +'/du/common/myaccount/backend-routine/json/touristMoreDetails-en.json';
            axios.get(faqUrl)
                .then(response => {
                        setTouristFaqs(response.data)
                    }
                )
                .catch(error => {
                    // Handle error
                    console.error('Error fetching data:', error);
                });
    }, [planType]);

    // useLayoutEffect(() => {
    //     if(touristRechargeType === "other amount"){
    //         // selectTouristPlan(null)
    //         setAmountToPay("")
    //     }
    // },[touristRechargeType])

    const [selectedPlanDetails, setSelectedPlanDetails] = useState(null)

    const selectTouristPlan = async (price) =>{
        setOtherAmountvalue("")
        setBtnVariant(price)
        setAmountToPay(price)
        setTouristRechargeType("plans")
        if(touristPlansCards) {
            await touristPlansCards.plans.filter((plan) => {
                if (plan.price === price) {
                    console.log("plan", plan)
                    setSelectedPlanDetails(plan)
                }
            })
        }
    }

    // const [suggestedPlan, setSuggestedPlan] = useState()

    // const touristPlansSuggestion = () => {
    //     let inputValue = document.querySelector('#otherAmount').value
    //     let otherAmountArray = []
    //     let otherAmountPlan = [
    //         {
    //             "plan": "No data",
    //             "price": "",
    //             "planCode": "O99D6V28M30",
    //             "benefits": {
    //                 "mins": "Voice calls only",
    //                 "internetCall": "No unlimited",
    //                 "validity": "Pay for recharges, bundles & more"
    //             },
    //             "flag": "custom amount",
    //         }
    //     ]
    //     touristPlansCards.plans.forEach((plan) => {
    //         if(plan.price === inputValue || plan.price < inputValue){
    //             otherAmountArray.push(plan)
    //         }
    //     })
    //     setAmountToPay(inputValue)
    //     const sortedArray = otherAmountArray.sort((a,b) => b.price - a.price)
    //     otherAmountPlan.push(sortedArray[0])
    //     setSuggestedPlan(otherAmountPlan)
    //     // suggestDrawer.openDrawer
    // }

    const scrollToPayment = () => {
        const element = document.getElementById('paymentSection');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    // const [amountToPay, setAmountToPay] = useState( planType === "postpaid" ? "0" : planType === "tourist" ? touristPlans[1].value : easyPlans[1].value ); // set value using ternary operator
    const [amountToPay, setAmountToPay] = useState( () => {
        if (planType === "postpaid") {
           return 0
        } else if (planType === "tourist") {
            return 0
        } else if (planType === "prepaid") {
            // return easyPlans[1].value
            return 0
        }
    }); // set amount to pay
    // const [selectedPlanCard, setSelectedPlanCard] = useState( ()=>{
    //
    //     setBtnVariant(selectedAmount)
    //     return selectedAmount
    // })
    useEffect(() => {
        if(planType === 'tourist') {
            const searchAmtParams = new URLSearchParams(window.location.search);
            const selectedAmount = searchAmtParams.get('eamt');
            setTouristRechargeType("plans")

            setTimeout(function () {
                if(selectedAmount && touristPlansCards) {
                    const paramAmt = parseInt(selectedAmount);
                    selectTouristPlan(paramAmt)
                }
            }, 50)
        }
    }, [touristPlansCards])

    const [billAmount, setBillAmount] = useState( (state && state.billAmount) && (Math.round(state.billAmount * 100) / 100).toFixed(2) )

    const [transactionType, setTransactionType] = useState(planType === "postpaid" ? "CREDIT_ACCOUNT_PAY" : "CREDIT_ACCOUNT_TOPUP");

    const [ccType, setCcType] = useState();

    const isEnterprise = state && (state.prgCode === "Key Account" || state.prgCode === "Government" || state.prgCode === "Fix Government" || state.prgCode === "Basic Large Account" || state.prgCode === "Fix Key Account" || state.prgCode === "Business-MPR" || state.customerType === "Enterprise") ? true : false;
    console.log('state check ', state.customerType === "Enterprise", isEnterprise)

    const LuhnCheck = (IDNum, IDType) => {
        // accept only digits, dashes or spaces
        if (/[^0-9-\s]+/.test(IDNum)) return false;
        if (IDType === 'eid' && IDNum.substring(0,3) !== '784') return false;

        // The Luhn Algorithm
        var nCheck = 0, nDigit = 0, bEven = false;
        IDNum = IDNum.replace(/\D/g, "");

        for (var n = IDNum.length - 1; n >= 0; n--) {
            var cDigit = IDNum.charAt(n);
            nDigit = parseInt(cDigit, 10);

            if (bEven) {
                if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
        }

        return (nCheck % 10) === 0;
    };
    // LuhnCheck(_raw, 'cc');
   // const [dialogOpen, setDialogOpen] = useState(false)
   const [showLoader, setShowLoader] = useState(true)
    const handleCryptoDialogOpen = () =>{
        makePaymentRequest(amountToPay)
        // setDialogOpen(true)
    }
    const handleCloseDialog = () =>{
        setPaymentUrl('')
        setShowLoader(true)
    }

    const expirydateValidate = (value) => {
        var currentTime, expiry, prefix, ref;

        if(value.indexOf('/') === -1){
            return false;
        }

        var date = value.split('/'),
            month = date[0].trim(),
            year  = date[1].trim();

        if (!/^\d+$/.test(month)) {
            return false;
        }
        if (!/^\d+$/.test(year)) {
            return false;
        }
        if (!(parseInt(month, 10) >= 1) || !(parseInt(month, 10) <= 12)) {
            return false;
        }
        if (year.length === 2) {
            prefix = new Date().getFullYear();
            prefix = prefix.toString().slice(0, 2);
            year = prefix + year;
        }
        expiry = new Date(year, month);
        currentTime = new Date();
        expiry.setMonth(expiry.getMonth() - 1);
        expiry.setMonth(expiry.getMonth() + 1, 1);
        return expiry > currentTime;
    }

    var showCardType = function(event){
        var _cardType = GetCardType(event.target.value);
        console.log('card type', _cardType);
        setCcType(_cardType);
    };


    const cardIcon = (mode) => {
        if (ccType === "Visa" && mode === "light")
            return ccVisaLight
        else if (ccType === "Mastercard" && mode === "light")
            return ccMasterLight
        else if (ccType === "AMEX" && mode === "light")
            return ccAmexLight
        else if (ccType === "Visa" && mode === "dark")
            return ccVisa
        else if (ccType === "Mastercard" && mode === "dark")
            return ccMaster
        else if (ccType === "AMEX" && mode === "dark")
            return ccAmex
        else
            return ""
    }

    const GetCardType = (number) => {
        // visa
        var re = new RegExp("^4");
        if (number.match(re) != null)
            return "Visa";

        // Mastercard
        re = new RegExp("^5[1-5]|^2[2-7]");
        if (number.match(re) != null)
            return "Mastercard";

        // AMEX
        re = new RegExp("^3[4-7]");
        if (number.match(re) != null)
            return "AMEX";

        // Discover
        re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
        if (number.match(re) != null)
            return "Discover";

        // Diners
        re = new RegExp("^36");
        if (number.match(re) != null)
            return "Diners";

        // Diners - Carte Blanche
        re = new RegExp("^30[0-5]");
        if (number.match(re) != null)
            return "Diners - Carte Blanche";

        // JCB
        re = new RegExp("^35(2[89]|[3-8][0-9])");
        if (number.match(re) != null)
            return "JCB";

        // Visa Electron
        re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
        if (number.match(re) != null)
            return "Visa Electron";

        return "";
    }

    // card change handler
    const handleCardChange = (event, plan) => {
        setSelectedCardValue(plan);
        if (plan.value === "Other" || plan.value === "0") {
            setOtherAmountvalue("0");
        } else {
            setOtherAmountvalue(plan.value);
        }

        //GTM
        if (plan.value !== "0") {
            window.dataLayer.push({
                event: "eventTracker",
                eventCategory: "My Account Quick Recharge",
                eventAction: "Credit Card Page",
                eventLabel: "Cart Selected – " + plan.value
            });
        }
    };

    // pay change handler
    const handlePayChange = (event) => {
        //prevent input after 2 decimal places
        const _m = event.target.value.match(/^[-+]?[0-9]+\.\d{3,}$/)
        let _value = event.target.value
        if(_m && _m[0]){
            _value = event.target.value
            _value = _value.substring(0, _value.indexOf('.') + 3)
            event.target.value = _value
        }

        if (event.target.value !== '') {
            setOtherAmountvalue(_value);
        } else {
            setOtherAmountvalue("0");
        }
    };
    const handleTouristPayChange = (event) => {
        if (event.target.value !== '') {
            let newValue = event.target.value.replace(/^0+/, "")
            if (newValue === "" || parseInt(newValue) < 1) newValue = "1";
            setOtherAmountvalue(newValue)
        } else {
            setAmountToPay("");
            // setOtherAmountvalue("25");
        }
        // let amount = event.target.value;
        // let plansArray = []
        // touristPlansCards.forEach(plan => {
        //     if(plan.price <= amount){
        //         plansArray.push(plan.price);
        //     }
        // })
        // plansArray.sort((a, b) => b - a);
        // setTouristSuggestedPlan(plansArray[0])
    };

    // tourist pay type
    const handleTouristRechargeType = (e) => {
        setAmountToPay("0")
        const selectedOption = e.target.value
        setTouristRechargeType(selectedOption)
    }

    // other change handler
    const handleOtherAmtChange = (event) => {
        window.dataLayer.push({
            event: "eventTracker",
            eventCategory: "My Account Quick Recharge",
            eventAction: "Credit Card Page",
            eventLabel: "Cart Selected – " + event.target.value + " - Other "
        });
    };

    const createElement = (tagName, attrs) => {
        const _el = document.createElement(tagName);
        for (const [key, value] of Object.entries(attrs)) {
            _el.setAttribute(key, value);
        }
        document.body.appendChild(_el);
        return _el;
    }
    const getByID = (id) => {
        return document.getElementById(id);
    }

    // Visa Setup authKey + iFrames/Forms
    // const [trn, setTrn] = useState();
    // const [VisaPAN, setVisaPAN] = useState();
    // const orgID = '1snn5n9w';
    const orgID = 'k8vif92e';
    window.listenerFlag = false

    useEffect(() => {
        if(authkey && visaEnabled){

            const authURL = domain + '/servlet/myaccount/en/mya-quick-pay-payment.html';
            const formData = new FormData();

            window.tempKeyVar = authkey
            window.sessionID = sessionID

            console.log('visaEnabled :>> ', visaEnabled);

            /* fetch(authURL)
            .then(response => response.text())
            .then(text => {
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(text, "text/html");
                const _authKey = htmlDocument.documentElement.querySelector('[name="_authkey_"]').defaultValue;
                const _sessID = htmlDocument.documentElement.querySelector('[name="sessionID"]').defaultValue;

                    if (_authKey) {
                        setAuthkey(_authKey);
                        // append Authkey here...
                        // formData.append("_authkey_", authkey);
                        window.tempKeyVar = _authKey;
                        window.sessionID = _sessID;
                    }

                    // console.log('fingerPrint: ', fPrintURL);
                }); */


            // Create iFrame & Forms
            createElement("iframe", {
                "id": "cardinal_collection_iframe",
                "name": "collectionIframe",
                "style": "display:none",
            });
            const form1 = createElement("form", {
                "id": "cardinal_collection_form",
                "target": "collectionIframe",
                "method": "POST",
                "action": "",
            });
            form1.appendChild(createElement("input", {
                "type": "hidden",
                "id": "cardinal_collection_form_input",
                "name": "JWT",
                "value": "",
            }));


            // window Message listener
            window.addEventListener("message", (event) => {

                if ( (event.origin === 'https://centinelapistag.cardinalcommerce.com' || event.origin === 'https://centinelapi.cardinalcommerce.com') && !window.listenerFlag ) {

                    window.listenerFlag = true
                    console.log("listener Invoked: ", window.listenerFlag)
                    const $form = getByID('cardinal_collection_form');
                    formData.append('d', 'front');
                    formData.append('pagename', 'MA_VisaPayment');
                    // formData.append('trnRefNr', $form.dataset.trn);
                    // formData.append('pan', $form.dataset.pan);
                    formData.append("_authkey_", window.tempKeyVar);

                    //console.log('authKey: ', window.tempKeyVar);

                    const visaConfig = {
                        method: "post",
                        // url: domain + "/servlet/ContentServer?d=front&pagename=MA_VisaPayment&trnRefNr=" + $form.dataset.trn + "&pan=" + $form.dataset.pan,
                        url: domain + "/servlet/ContentServer",
                        data: formData
                    };

                    // console.log('config: ', visaConfig);

                    axios(visaConfig).then((resp) => {
                        console.log("visaPayment Resp: ", resp);

                        const response = resp.data;

                        const successURL = domain+"/servlet/myaccount/"+locale+"/mya-new-quick-recharge-pay-success.html";

                        // if Card Authorized
                        if (response.status == "AUTHORIZED") {
                            console.log('status: ', response.status);
                            window.location.href = successURL;
                        }
                        else {
                            console.log('respCode: ', response.responseCode)
                            console.log('systemErrors: ', window.systemErrors)
                            if (window.systemErrors) {
                                const err = window.systemErrors.filter((err) => err.error_key === response.responseCode);
                                const errDefault = window.systemErrors.filter((err) => err.error_key === "500-GENERIC_ERROR");
                                console.log('default Error: ', errDefault);

                                setErrState(err.length ? err[0] : errDefault[0])
                                setisSubmitDisabled(false)
                                setErr3DState(false)
                            }
                        }

                        // if Needed OTP challenge
                        if (response.accessToken && response.stepUpUrl) {
                            console.log('status: ', response.status);
                            // window.location.href = response.stepUpUrl + '?accessToken=' + response.accessToken;
                            window.location.href = domain+"/servlet/myaccount/"+locale+'/mya-stepup-page.html?accessToken=' + response.accessToken;
                        }



                        /*const cardinalStepUpForm = getByID('step-up-form');
                        console.log("response.accessToken="+response.accessToken);
                        console.log("response.stepUpUrl="+response.stepUpUrl);
                        if(null != response.accessToken){
                            console.log("pgwRef=="+pgwRef);
                            window.location.href = "mya-stepup-page.html";
                        } else {
                            //it could be SUCCESS or FAILED / Error message ?
                            //resp.status
                            console.log("Payment Completed!!");
                            window.location.href = "mya-payment-success-new-card.html";
                        }*/

                    }).catch((error) => {
                        window.listenerFlag = false
                        console.log("ERROR: ", error);
                    });
                }
            }, false);

        } //end Visa Setup


    }, [authkey, visaEnabled])


    // form submit
    const { register, control, handleSubmit, trigger, watch, getValues, formState: {isDirty, isValid, errors}, setValue } = useForm({
        mode: "all",
        shouldUnregister: true
    });
    const fullname = watch(`fullname`);
    const card = watch(`card`);
    const expiry = watch(`expiry`);
    const cvv = watch(`cvv`);

    const onSubmit = (data) => {
        // window.dataLayer.push({
        //     event: "eventTracker",
        //     eventCategory: state.planType === "postpaid" ? "My Account Quick Payment" : "My Account Quick Recharge",
        //     eventAction: "Credit Card Page",
        //     eventLabel: "Recharge Now -" + amountToPay
        // });
        setErrState()

        setisSubmitDisabled(true)

        var formdata = new FormData();
        formdata.append("requestType", "getMigs");
        formdata.append("MSISDN", msisdn);
        formdata.append("locale", locale);
        formdata.append("accountType", planType === "postpaid" ? "2" : "1");
        formdata.append("paymentType", planType === "postpaid" ? "quick.payment" : "quick.recharge");
        formdata.append("paymentSubtype", planType === "postpaid" ? "6" : "7");
        formdata.append("creditCardNo", data.card.replace(/\s/g, ''));
        formdata.append("nameOnCard", data.fullname);
        formdata.append("expiryDate", data.expiry);
        formdata.append("cvv", data.cvv);
        formdata.append("cardType", ccType)
        formdata.append("transactionType", transactionType);
        formdata.append("merchantpaymentType", planType === "postpaid" ? "quick.payment" : "quick.recharge");
        formdata.append("mearchantParentId", "method")
        formdata.append("creditValue", planType === "postpaid" ? "" : "Credit");
        formdata.append("amount", amountToPay);
        //uncomment this
        formdata.append("_authkey_", window.$authKey);

        // formdata.append("d", 'front');
        // formdata.append("pagename", 'MA_QuickPayRedirect');

        var config = {
            // url: domain+'/servlet/ContentServer?pagename=MA_QuickPayRedirect&d=front',
            url: domain + window.$myaRedirectURL,
            method: 'post',
            headers: {
                // ...data.getHeaders()
            },
            data : formdata
        };

        // setting cookie to check ignite customer
        document.cookie = "ignite="+isIgnite+";path=/";

        // Visa Card Process
        if (visaEnabled === true) {

            console.log('visaEnabled 2nd check');

            const $iframe = getByID('cardinal_collection_iframe');
            const $form = getByID('cardinal_collection_form');
            const $jwt = getByID('cardinal_collection_form_input');


            // getToken Func
            const getToken = async (theKey) => {
                // formdata.append("pagename", "MA_VisaAuthenticationSteps");
                formdata.append("_authkey_", theKey);
                formdata.append("d", "front");
                formdata.append("pagename", "MA_NewQuickPayRedirect");
                const authParams = {
                    // url: domain+'/servlet/ContentServer?d=front&pagename=MA_VisaAuthenticationSteps',
                    // url: domain+'/servlet/ContentServer?d=front&pagename=MA_NewQuickPayRedirect',
                    url: domain+'/servlet/ContentServer',
                            method: 'post',
                    headers: {},
                            data: formdata
                         };
                return await axios(authParams);
                                            }

            try {
                // console.log('Getting Token...');
                getToken(authkey).then((resp) => {
                    console.log('resp: ', resp);
                    const {code, accessToken, deviceDataCollectionUrl, trnRefNr, merchId} = resp.data;
                    // console.log('accessToken: ', accessToken);
                    if (code == 200) {
                        //call here the Fingerprint url
                        const fPrintURL = `https://h.online-metrix.net/fp/tags.js?org_id=${orgID}&session_id=${merchId}${window.sessionID}`;
                        console.log('finger print URL: ', fPrintURL);
                        axios(fPrintURL).then((resp) => {
                            console.log('response from FingerPrint: ', resp.data);
                        }).catch((error) => {
                            console.log('fingerPrint Error: ',error);
                        });

                        prepCollectionForm({code, accessToken, deviceDataCollectionUrl, trnRefNr});
                                    }
                    else {
                    if (systemErrors) {
                            const err = systemErrors.Error.filter((err) => err.error_key === resp.data.responseCode);
                            // const errDefault = systemErrors.Error.filter((err) => err.error_key === resp.data.error_key_default);
                            const errDefault = systemErrors.Error.filter((err) => err.error_key === "500-GENERIC_ERROR");
                                setErrState(err.length ? err[0] : errDefault[0])
                        setisSubmitDisabled(false)
                        setErr3DState(false)
                    }
                }

                }).catch((error) => {
                console.log(error);
            });
    }
            catch(error){
                console.log('Error on gettting Token: ', error)
            }

            // Prepare Collection Form
            const prepCollectionForm = (params) => {

                $iframe.setAttribute('src', params.deviceDataCollectionUrl);
                $form.setAttribute('action', params.deviceDataCollectionUrl);
                $form.setAttribute('data-trn', params.trnRefNr);
                $form.setAttribute('data-pan', data.card.replace(/\s/g, ''));
                $jwt.setAttribute('value', params.accessToken)

                $form.submit();
                console.log('Collection Form Submittted...');
            }

        }

        // 3DS 2.0
        // removed

        else {
            console.log("VISA is not enabled. Please contact administrator.");
        }

    }

    const handleGTMTriggerOnError = (name, error, event, eventCategory, eventAction ) => {
        if (!!error) {
            //GTM
            window.dataLayer.push({
                event: event,
                eventCategory: eventCategory,
                eventAction: eventAction,
                eventLabel: name + " Error: "+ error.message
            });
        }
    }

    const handleGTMTrigger = (e) => {
        if (e.target.checked) {
            window.dataLayer.push({
                event: "eventTracker",
                eventCategory: planType === "postpaid" ? "My Account Quick Payment" : "My Account Quick Recharge",
                eventAction: "Credit Card Page",
                eventLabel: "Cart Selected – Terms and Condition"
            });
        }
    }

    const handleApplePay = (e) => {
        // Questionable code to trigger the form validation on apple pay which is not required

        // if(!isValid) {
        //     trigger()
        //     return
        // }

        var runningAmount = amountToPay;
        var runningPP = runningAmount;
        getShippingCosts('domestic_std', true);
        const runningTotal = () => { return runningAmount }
        var shippingOption = "";
        var subTotalDescr = "Amount";

        function getShippingOptions(shippingCountry){
            if( shippingCountry.toUpperCase() === "AE" ) {
                shippingOption = [{label: 'Standard Shipping', amount: getShippingCosts('domestic_std', true), detail: '3-5 days', identifier: 'domestic_std'},{label: 'Expedited Shipping', amount: getShippingCosts('domestic_exp', false), detail: '1-3 days', identifier: 'domestic_exp'}];
            } else {
                shippingOption = [{label: 'International Shipping', amount: getShippingCosts('international', true), detail: '5-10 days', identifier: 'international'}];
            }
        }

        function getShippingCosts(shippingIdentifier, updateRunningPP ){
            var shippingCost = 0;
            switch(shippingIdentifier) {
                case 'domestic_std':
                    shippingCost = 0;
                    break;
                case 'domestic_exp':
                    shippingCost = 0;
                    break;
                case 'international':
                    shippingCost = 0;
                    break;
                default:
                    shippingCost = 0;
            }
            if (updateRunningPP === true) {
                runningPP = shippingCost;
            }
            return shippingCost;
        }

        var paymentRequest = {
            currencyCode: 'AED',
            countryCode: 'AE',
            lineItems: [{ label: subTotalDescr, amount: runningAmount }],
            total: {
                label: 'DU',
                amount: runningTotal()
            },
            supportedNetworks: ['amex', 'masterCard', 'visa' ],
            merchantCapabilities: [ 'supports3DS', 'supportsCredit', 'supportsDebit' ]
        };

        var session = new window.ApplePaySession(1, paymentRequest);

        // Merchant Validation
        session.onvalidatemerchant = function (event) {
            console.log(event);
            var promise = performValidation(event.validationURL);
            promise.then(function (merchantSession) {
                session.completeMerchantValidation(merchantSession);
            });
        }

        function performValidation(valURL) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onload = function() {
                    var data = JSON.parse(this.responseText);
                    console.log(data);
                    resolve(data);
                };
                xhr.onerror = reject;
                xhr.open('GET', 'https://myaccount.du.ae/servlet/Satellite?pagename=myaccount/MA_NewApplePayValidation');
                xhr.send();
            });
        }

        session.onshippingcontactselected = function(event) {
            console.log(event);
            getShippingOptions( event.shippingContact.countryCode );
            var status = window.ApplePaySession.STATUS_SUCCESS;
            var newShippingMethods = shippingOption;
            var newTotal = { type: 'final', label: 'DU', amount: runningTotal() };
            var newLineItems =[{type: 'final',label: subTotalDescr, amount: runningAmount }];
            session.completeShippingContactSelection(status, newShippingMethods, newTotal, newLineItems );
        }
        session.onshippingmethodselected = function(event) {
            console.log(event);
            getShippingCosts( event.shippingMethod.identifier, true );
            var status = window.ApplePaySession.STATUS_SUCCESS;
            var newTotal = { type: 'final', label: 'DU', amount: runningTotal() };
            var newLineItems =[{type: 'final',label: subTotalDescr, amount: runningAmount }];
            session.completeShippingMethodSelection(status, newTotal, newLineItems );
        }
        session.onpaymentmethodselected = function(event) {
            console.log(event);
            var newTotal = { type: 'final', label: 'DU', amount: runningTotal() };
            var newLineItems =[{type: 'final',label: subTotalDescr, amount: runningAmount }];
            session.completePaymentMethodSelection( newTotal, newLineItems );
        }

        session.onpaymentauthorized = function (event) {
            console.log(event);
            var paymentToken;
            var status;
            if(event.payment.token !== undefined && event.payment.token !== ''){
                paymentToken = event.payment.token;
                var dataPayment = JSON.parse(JSON.stringify(paymentToken));

                // Create a form dynamically
                let applePayForm = document.createElement("form")
                applePayForm.setAttribute("method", "post")
                applePayForm.setAttribute("action", domain + "/servlet/myaccount/"+locale+"/mya-new-applepay-quickpayrecharge-confirmation.html?framework_referrer=new&journey="+(planType === "postpaid" ? "postpaid" : "prepaid"))
                addElement("_authkey_", authkey)
                addElement("payment-token", JSON.stringify(dataPayment.paymentData))
                addElement("payment-amount", amountToPay)
                addElement("msisdn", state.msisdn)
                addElement("transactionTypeApple", transactionType)
                addElement("rateplan", state.ratePlan ? state.ratePlan : state.prgCode)
                addElement("crypto", state.crypto)
                // addElement("rateplan", "du employee mobile plan")
                addElement("transaction", "Quick Pay-AP")
                document.getElementsByTagName("body")[0].appendChild(applePayForm)


                // GTM for apply pay success
                let eventLabel = planType === "postpaid" ? "Payment Now" : "Recharge Now"
                eventLabel = eventLabel + " - " + amountToPay + " - "
                eventLabel = eventLabel + (planType === "postpaid" ? "Apple Recharge" : "Apple Recharge")
                window.dataLayer.push({
                    event: "eventTracker",
                    eventCategory: planType === "postpaid" ? "My Account Quick pay" : "My Account Quick Recharge",
                    eventAction: "Credit Card Page",
                    eventLabel: eventLabel,
                    eventValue: amountToPay
                })
                applePayForm.submit()

                function addElement(name, value) {
                    var element = document.createElement("input");
                    element.setAttribute("type", "hidden");
                    element.setAttribute("name", name);
                    element.setAttribute("value", value);
                    applePayForm.appendChild(element);
                }
            }else{
                status = window.ApplePaySession.STATUS_FAILURE;
                session.completePayment(status);
                console.log(status)
                console.log('failed transaction')

                // GTM for apply pay failure
                let eventLabel = planType === "postpaid" ? "Payment Now Error" : "Recharge Now Error"
                eventLabel = eventLabel + " - " + amountToPay + " - "
                eventLabel = eventLabel + (planType === "postpaid" ? "Apple Recharge" : "Apple Recharge")
                eventLabel = eventLabel + status
                window.dataLayer.push({
                    event: "eventTracker",
                    eventCategory: planType === "postpaid" ? "My Account Quick pay" : "My Account Quick Recharge",
                    eventAction: "Credit Card Page",
                    eventLabel: eventLabel,
                    eventValue: amountToPay
                })
            }
        }

        function sendPaymentToken(paymentToken) {
            return new Promise(function(resolve, reject) {

                // document.getElementById("payment-token").value = JSON.stringify(paymentToken);
                // if(amountToPay > 0){
                //     document.getElementById("payment-amount").value = $("input[name=pay-amount]").val();
                // }
                console.log(JSON.stringify(paymentToken))
            });
        }

        session.oncancel = function(event) {
            // logit('starting session.cancel');
            // logit(event);
        }
        session.begin();
    }

    const USD = 3.67
    const currencyConverter = (currency1, currency2) => {
        return Math.round(currency1 / currency2 * 100) / 100
    }

    // const [touristBundleFlag, setTouristBundleFlag] = useState(true)
    // const touristOtherChangeHandler = (event) => {
    //     let enteredAmt = event.target.value
    //
    //     let plan = touristPlans.find(plan => plan.value === enteredAmt)
    //     if (plan !== undefined) {
    //         setSelectedCardValue(plan)
    //     }
    //
    //     if ((enteredAmt >= 10 && enteredAmt < 59) || plan !== undefined) {
    //         setTouristBundleFlag(true)
    //     } else {
    //         setTouristBundleFlag(false)
    //     }
    // }
    const [paymentUrl, setPaymentUrl] = useState("")
    // Crypto
    const makePaymentRequest = async (amount) => {

            const cryptoformdata = new FormData();
            cryptoformdata.append("amount", amount);
            cryptoformdata.append("lang", locale);
            cryptoformdata.append("_authkey_", window.$authKey);
            const response = await axios.post(domain+'/servlet/myaccount/en/mya-cryptoUrl.html', cryptoformdata);
            // console.log('response', response.data)
            setShowLoader(false)

            if (response.data.code == 200) {
                setPaymentUrl(response.data.hostedUrl)
                window.addEventListener('message', e => {
                    if (typeof e.data == "string") {
                        // if(e.data.includes('frameResized') || e.data.includes('bitcoinUrl') || e.data.includes('tripleaframeResized')) {
                        if (e.data.includes('triplea.formExpired') || e.data.includes('triplea.paymentTooLittle') || e.data.includes('triplea.paymentSuccess') || e.data.includes('triplea.badTransaction') || e.data.includes('triplea.error')) {
                            const cryptoMsg = e.data.replace(/\|/g, ',').trim()
                            setTimeout(() => {
                                window.location.href = '/servlet/myaccount/' + locale + '/mya-quick-recharge-pay-confirmation.html?transaction_state=' + e.data + '&transaction_type=crypto'
                            }, 5000)
                        }
                    }
                })
            }
            else{
                if (systemErrors) {
                        const responseCode = response.data.code
                        const responseOperation = response.data.operation

                        if(responseOperation === null){
                            // console.log(response.data.errorMessage)
                            setErrState(response.data.errorMessage)
                        }
                        else{
                            // console.log(responseCode, responseOperation, GetLocaleData)
                            systemErrors.Error.forEach(err => {
                                // console.log(err)
                            if(err.error_key.includes(responseCode+"-"+responseOperation)) {
                                const errorMsg = isRtl ? err.error_ar:err.error_en
                                setErrState(errorMsg)
                            }
                            })
                        }
                    };

                }
    };

    const [spinner, setSpinner] = useState(false);
    const closeSpinner = () => {
        // setSpinner(false)
    }
    const openSpinner = () => {
        setSpinner(true)
    }
    const [otherRechargeAmt, setOtherRechargeAmt] = useState(0)
    // add Other amount in tourist
    const addRechargeAmtHandler = () => {
        let inputValue = document.querySelector('#otherAmount').value
        let value = inputValue === "" ? 0:inputValue
        let inputNumber = parseInt(value) + 5
        let finalValue = inputNumber.toString()
        setOtherAmountvalue(finalValue)
    }

    // remove Other amount in tourist
    const removeRechargeAmtHandler = () => {
        let inputValue = document.querySelector('#otherAmount').value
        let inputNumber = parseInt(inputValue)
        let newValue = inputNumber <= 1 ? 1 : inputNumber - 5
        if (newValue === "" || parseInt(newValue) < 1 || isNaN(newValue)) newValue = "1";
        // let finalValue = newValue.toString()
        setOtherAmountvalue(newValue)
    }
    const [touristPlansTabValue, setTouristPlansTabValue] = useState('fixed');
    const handleTouristPlanType = (event: React.SyntheticEvent, newValue: string) => {
        setTouristPlansTabValue(newValue)
    }

    const alSaadaDialog = useDialog();
    const crytoDialog = useDialog();
    const crytoTermsDialog = useDialog();

    const suggestDrawer = useDrawerModal();
    const planDetailsDrawer = useDrawerModal();
    const cardPaymentDrawer = useDrawerModal();

    return (
        <>
            {/*<TheBreadCrumb />*/}

            <ThePageHeader props={{type: "pay", msisdn: state ? state.msisdn: "", ratePLan: state ? state.ratePlan: "", planType: state ? state.planType: "", journeyType: state ? state.journeyType: "", isControlPlan: state ? (state.planId === "EE50" || state.planId === "HBPL1" || state.planId === "HBPL2" || state.planId === "HBPL3" || state.planId === "HBPL4"): ""}} />

            {( touristStaticData && amountToPay > 0) && (
            <Box sx={{background: isScreenSmall && duTheme.grey[50], p:6}}>
                <Grid container maxWidth="lg" sx={{mx: "auto", border: isScreenMedium && '1px solid #ddd', borderRadius: isScreenMedium && 1, p: isScreenMedium && 4}}>

                    {touristRechargeType === "plans" ? (
                        <>
                            <Grid item xs={6} md="auto">
                                <Typography component="small" variant="body3">Total payable</Typography>
                                {selectedPlanDetails && (
                                    <>
                                <Box sx={{display: "flex", alignItems: "end"}}>
                                    <Typography variant="h6" component="h6">
                                        AED {selectedPlanDetails.price}
                                    </Typography>
                                    <Typography variant="body2" component="div" sx={{ml:2, fontWeight: "500"}}>
                                        {touristStaticData.USDPrice} {Math.round((selectedPlanDetails.price / 3.6725) * 100) / 100}
                                    </Typography>
                                </Box>
                                    </>
                            )}
                            </Grid>
                            <Grid item xs={6} md="auto">
                                <Typography variant="body2" component="div" color="primary" sx={{textAlign: isScreenSmall ? "right" : "left", cursor:"pointer", mt: 6, mx: isScreenMedium && 4}} onClick={()=> {setAmountToPay(""); setSelectedPlanDetails(null) }}>
                                    <EditIcon color="primary" fontSize="16px" sx={{verticalAlign: "middle", mr: 1, mb: "3px"}} />
                                    {touristStaticData.changePlan}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" component="div" sx={{mt: 2}}>
                                    {selectedPlanDetails.plan} data, {selectedPlanDetails.benefits.mins} local and intl. mins,
                                    {selectedPlanDetails.benefits.internetCall} internet calling, {selectedPlanDetails.benefits.validity} days validity
                                </Typography>
                            </Grid>
                        </>
                    ) : (
                        <>
                    <Grid item xs={6} md="auto">
                        <Typography variant="body2" component="div">{GetLocaleData(staticData.totalLbl)}</Typography>
                        <Box>
                            {!isRtl && (
                                <Typography variant="body2" component="span">{GetLocaleData(staticData.currency) + " "}</Typography>
                            )}
                            <Typography variant="h4" component="span" sx={{lineHeight: 1}}>{amountToPay}</Typography>
                            {isRtl && (
                                <Typography variant="body2" component="span">{" " + GetLocaleData(staticData.currency)}</Typography>
                            )}
                            {(amountToPay>0 && planType === "tourist" ) && (

                                isRtl ? (
                                        <Typography variant="body2" component="p"
                                                    sx={{lineHeight: 1}}>{currencyConverter(amountToPay, USD)} {GetLocaleData(staticData.currencyUSDLbl)} {GetLocaleData(staticData.touristApproximate)}</Typography>
                                    ) :
                                    (
                                        <Typography variant="body2" component="p"
                                                    sx={{lineHeight: 1}}>{GetLocaleData(staticData.touristApproximate)} {GetLocaleData(staticData.currencyUSDLbl)} {currencyConverter(amountToPay, USD)}</Typography>
                                    )

                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={6} md="auto">
                        <Typography variant="body2" component="div" color="primary" sx={{textAlign: "right", cursor: "pointer", mt: isScreenMedium ? 5 : 6, mx: isScreenMedium && 4}} onClick={()=> {setAmountToPay(""); setSelectedPlanDetails(null) }}>
                            <EditIcon color="primary" fontSize="16px" sx={{verticalAlign: "middle", mr: 1, mb: "3px"}} />
                            {touristStaticData.changeAmount}
                        </Typography>
                    </Grid>
                    </>
                    )
                    }
                </Grid>
            </Box>
            )}
            {err3DState && (
            <Grid container maxWidth="lg" sx={{mx: "auto", mt:10}}>
                <Grid item xs={12}>
                    <AlertMessage {...{alertType:"error", alertTitle: "",  alertMessage: GetLocaleData(staticData.err3D) }} />
                </Grid>
            </Grid>
            )}

            {errState && (
                <Grid container maxWidth="lg" sx={{mx: "auto", mt:10}}>
                    <Grid item xs={12}>
                        <AlertMessage {...{alertType:"error", alertTitle: "",  alertMessage: isRtl ? errState["error_ar"] : errState["error_en"]}} />
                    </Grid>
                </Grid>
            )}

            { state && state.journeyType !== state.planType && (
                <>
                <Grid container maxWidth="lg" sx={{mx: "auto", mt:10}}>
                    <Grid item xs={12}>
                        {state && state.planType === "postpaid" && (state.planId !== "EE50" || state.planId !== "HBPL1" || state.planId !== "HBPL2" || state.planId !== "HBPL3" || state.planId !== "HBPL4") && (
                            <AlertMessage {...{alertType:"info", alertTitle: "",  alertMessage: GetLocaleData(staticData.infoPostpaidLbl) }} />
                            )}
                        {state && state.planType === "prepaid" && !(state.planId === "EE50" || state.planId === "HBPL1" || state.planId === "HBPL2" || state.planId === "HBPL3" || state.planId === "HBPL4") && (
                            <AlertMessage {...{alertType:"info", alertTitle: "",  alertMessage: GetLocaleData(staticData.infoPrepaidLbl) }} />
                        )}
                    </Grid>
                </Grid>

                </>
            )}

            <Container disableGutters maxWidth={false} sx={{my: 4}}>
                <Box noValidate autoComplete="off" component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container maxWidth="lg" sx={{mx: "auto"}}>
                    <Grid item md={12}>
                                {(planType === "prepaid" && amountToPay < 1) && (
                                    <Box sx={{py: 6, px: isScreenSmall && 6}}>
                                        <Typography variant="h5" component="h5" sx={{mb: 5 }}>{GetLocaleData(staticData.rechargeTitle)}</Typography>
                                        <Grid container spacing={2}>
                                            { easyPlans.map((plan) =>
                                                <Grid item key={plan.id}>
                                                    <Card sx={{width: isScreenSmall ? '120px' : '95px'}}>
                                                        <CardActionArea onClick= {(e) => handleCardChange(e, plan)}>
                                                            <CardContent align="center">
                                                                <Controller
                                                                    control={control}
                                                                    name="radio-buttons"
                                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                                        <>
                                                                            <Radio
                                                                                // onChange={e => { handleCardChange(e, plan)} }
                                                                                checked={selectedCardValue.value === plan.value}
                                                                                value= {plan}
                                                                                onChange={onChange}
                                                                                onBlur={onBlur}
                                                                                name="radio-buttons"
                                                                                inputProps={{ "aria-label" : plan.value }}
                                                                            />
                                                                            <Typography gutterBottom variant="body2" className={classes.cardText} component="div">
                                                                                {isRtl ? (
                                                                                <>
                                                                                    <div>{plan.value !== "0" ? plan.value : "" }</div>
                                                                                    <div>{plan.value !== "0" ? GetLocaleData(staticData.currency) : GetLocaleData(staticData.otherLbl)}</div>
                                                                                </>
                                                                                ) : (
                                                                                <>
                                                                                    <div>{plan.value !== "0" ? GetLocaleData(staticData.currency) : ""}</div>
                                                                                    <div>{plan.value !== "0" ? plan.value : GetLocaleData(staticData.otherLbl) }</div>
                                                                                </>
                                                                                )}
                                                                            </Typography>
                                                                        </>
                                                                    )}
                                                                />
                                                            </CardContent>
                                                        </CardActionArea>
                                                    </Card>
                                                </Grid>
                                            )}
                                        </Grid>
                                        {(selectedCardValue.value ===  "0" || selectedCardValue.value ===  "") && (
                                            <Grid container sx={{mt:10}}>
                                                <Grid item>
                                                    <Controller
                                                        name="pay"
                                                        control={control}
                                                        defaultValue=""
                                                        render={({ field: { ref, onChange, value, onBlur }, fieldState: { error } }) => (
                                                            <TextField
                                                                label={ GetLocaleData(staticData.controlAmountLbl) }
                                                                variant="outlined"
                                                                value={otherAmountValue !== "0" ? otherAmountValue : ""}
                                                                onChange= {e => {
                                                                    onChange(e.target.value);
                                                                    handlePayChange(e)
                                                                }}
                                                                onBlur= {e => {
                                                                    onBlur(e.target.value);
                                                                    handleOtherAmtChange(e)
                                                                }}
                                                                error={!!error}
                                                                ref={ref}
                                                                helperText={error ? error.message : GetLocaleData(staticData.controlOtherAmountHint) }
                                                                margin="none"
                                                                fullWidth={isScreenSmall}
                                                            />
                                                        )}
                                                        rules={{
                                                            required: GetLocaleData(staticData.controlOtherAmountHint),
                                                            min: {value: 1, message: GetLocaleData(staticData.controlOtherAmountHint) },
                                                            max: {value: 1050, message: GetLocaleData(staticData.controlOtherAmountHint) },
                                                            pattern: { value:/^[1-9]\d*$/i, message: GetLocaleData(staticData.controlOtherAmountHint) },
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        )}
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            size="large"
                                            sx={{ width: isScreenMedium ? "400px" : "100%" , mt: 8}}
                                            onClick={() => {setAmountToPay(otherAmountValue); window.scrollTo({ top: 0 })}}
                                            // disabled={!isValid}
                                            disabled={!otherAmountValue.match(/^(?:[1-9]|[1-9][0-9]{1,2}|10[0-4][0-9]|1050)$/)}
                                        >
                                            {isRtl ? "تعبئة" : "Proceed"}
                                        </Button>
                                    </Box>
                                )}
                                {(planType === "tourist" && touristStaticData && touristPlansCards && amountToPay < 1) && (
                                        <>

                                            <Box sx={{ width: '100%', px: isScreenSmall ? "20px" : 0 }}>
                                                <TabContext value={touristPlansTabValue}>
                                                    <Box sx={{display: 'flex', flexDirection: isScreenMedium ? 'row':'column', justifyContent: 'space-between'}}>
                                                    <Box sx={{ mb: isScreenSmall ? 4 : 0 }}>
                                                        <TabList onChange={handleTouristPlanType} aria-label="Tourist Plans tabs">
                                                            { touristPlansCards.planFilters.map((tab,i) =>
                                                                <Tab label={tab.label} value={tab.type} key={i}/>
                                                            )}
                                                        </TabList>
                                                    </Box>
                                                        <Card variant="raised" sx={{
                                                            p: 4,
                                                            mb: 6,
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            borderRadius: 8,
                                                            minWidth: isScreenSmall ? "100%" : "400px"
                                                        }}>
                                                            <Typography variant="body2" component="div"
                                                                        sx={{fontWeight: 500}}>
                                                                <SvgIcon sx={{verticalAlign: "middle"}}>
                                                                    <svg width="20" fill="#777"
                                                                         xmlns="http://www.w3.org/2000/svg"
                                                                         viewBox="0 0 24 24">
                                                                        <title>sale-outline</title>
                                                                        <path
                                                                            d="M9.5 7C10.33 7 11 7.67 11 8.5C11 9.33 10.33 10 9.5 10C8.67 10 8 9.33 8 8.5C8 7.67 8.67 7 9.5 7M14.5 14C15.33 14 16 14.67 16 15.5C16 16.33 15.33 17 14.5 17C13.67 17 13 16.33 13 15.5C13 14.67 13.67 14 14.5 14M8.41 17L7 15.59L15.59 7L17 8.41L8.41 17M18.65 2.85L19.26 6.71L22.77 8.5L21 12L22.78 15.5L19.24 17.29L18.63 21.15L14.74 20.54L11.97 23.31L9.19 20.5L5.33 21.14L4.71 17.25L1.22 15.47L3 11.97L1.23 8.5L4.74 6.69L5.35 2.87L9.22 3.5L12 .695L14.76 3.46L18.65 2.85M20.1 9.37L17.5 8L17 5.11L14.1 5.53L12 3.5L9.9 5.53L7 5.11L6.5 8L3.9 9.37L5.2 12L3.9 14.63L6.5 16L7 18.89L9.9 18.47L12 20.5L14.1 18.47L17 18.89L17.5 16L20.1 14.63L18.8 12L20.1 9.37Z"/>
                                                                    </svg>
                                                                </SvgIcon>
                                                                {touristStaticData.discountCardTitle}
                                                            </Typography>
                                                            <Typography variant="body2" color="primary" component="a"
                                                                        sx={{
                                                                            textDecoration: "underline",
                                                                            fontWeight: 500
                                                                        }} onClick={alSaadaDialog.openDialog}>
                                                                {touristStaticData.discountCardLink}
                                                            </Typography>

                                                            <CommonDialog
                                                                isOpen={alSaadaDialog.isOpen}
                                                                onClose={alSaadaDialog.closeDialog}
                                                                content={
                                                                    <Grid container>
                                                                        <Box className={classes.greyBox}>
                                                                            <img src={alsaadaLogo}
                                                                                 style={{marginBottom: "20px"}}/>
                                                                            <Typography variant="h3" component="h5"
                                                                                        sx={{mb: 2}}> {touristStaticData.alSaadaDialogTitle}</Typography>
                                                                            <Typography variant="body1" component="div">
                                                                                {touristStaticData.alSaadaDialogDesc}
                                                                            </Typography>
                                                                            <img src={alsaadaBanner} style={{
                                                                                maxWidth: "100%",
                                                                                margin: "20px 0"
                                                                            }}/>
                                                                            <Typography
                                                                                variant="body1"
                                                                                component="a"
                                                                                href="#"
                                                                                color="primary"
                                                                                sx={{
                                                                                    cursor: "pointer",
                                                                                    textDecoration: "none",
                                                                                    fontWeight: 500
                                                                                }}>
                                                                                {touristStaticData.alSaadaLinkText}
                                                                                <OpenInNewIcon fontSize="small"
                                                                                               color="primary"
                                                                                               sx={{
                                                                                                   ml: 1,
                                                                                                   verticalAlign: "middle"
                                                                                               }}/>
                                                                            </Typography>
                                                                        </Box>
                                                                    </Grid>
                                                                }
                                                            />
                                                        </Card>
                                                    </Box>
                                                    <TabPanel value={touristPlansTabValue} sx={{p: 0}}>
                                                        <Grid container spacing={10}>
                                                            {
                                                                touristPlansCards.plans.filter((item) => item.type === touristPlansTabValue).map((data, i) => (
                                                                    <Grid item xs={12} md={4} key={i}>

                                                                        <Card key={data.planCode} sx={{borderRadius: 2}}
                                                                              variant="raised">
                                                                            <Box className={classes.cardBanner} sx={{background: "url("+data.bgImage+") no-repeat", backgroundSize: "cover"}}>
                                                                                <Grid container>
                                                                                    <Grid item xs={4}>
                                                                                        {(data.flag) && (
                                                                                            <Box className={classes.tag} sx={{background: duTheme.palette.gradients.violetMagenta}}>
                                                                                                <StarOutlineIcon color="white" sx={{fontSize: 15, verticalAlign: "middle", mr: 1}} />  {data.flag}
                                                                                            </Box>
                                                                                        )}
                                                                                    </Grid>
                                                                                    <Grid item xs={4}></Grid>
                                                                                    <Grid item xs={4} sx={{textAlign:'right'}}>
                                                                                        <Box className={classes.tag} sx={{bgcolor: "rgba(0,0,0,.56)"}}>
                                                                                            <Typography component="span" sx={{fontWeight:"bold", fontSize:duTheme.spacing(3), mr:1}}>{data.benefits.validity}</Typography>{touristStaticData.valid}
                                                                                        </Box>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} sx={{mt:8}}>
                                                                                        <Box sx={{display: "flex", alignItems: "end"}}>
                                                                                            <Typography variant="h4" component="h4" color="white">
                                                                                                AED {data.price}
                                                                                            </Typography>
                                                                                            <Typography variant="body2" component="div" color="white" sx={{ml:2, fontWeight: "500"}}>
                                                                                                {touristStaticData.USDPrice} {Math.round((data.price / 3.6725) * 100) / 100}
                                                                                            </Typography>
                                                                                        </Box>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Box>
                                                                            <div className={classes.cardContent}>
                                                                                <Grid container>
                                                                                    <Grid item xs={3} sx={{textAlign:"center", borderRight:"1px solid #ddd"}}>
                                                                                        <Typography variant="body3" component="div" className={classes.bold}>
                                                                                            {data.plan}
                                                                                        </Typography>
                                                                                        <Typography variant="body3" component="div">
                                                                                            data
                                                                                        </Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs={5} sx={{textAlign:"center", borderRight:"1px solid #ddd"}}>
                                                                                        <Typography variant="body3" component="div" className={classes.bold}>
                                                                                            {data.benefits.mins}
                                                                                        </Typography>
                                                                                        <Typography variant="body3" component="div">
                                                                                            {touristStaticData.mins}
                                                                                        </Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs={4} sx={{textAlign:"center"}}>
                                                                                        <Typography variant="body3" component="div" className={classes.bold}>
                                                                                            {data.benefits.internetCall}
                                                                                        </Typography>
                                                                                        <Typography variant="body3" component="div">
                                                                                            {touristStaticData.call}
                                                                                        </Typography>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid container sx={{px:3, mt:4}}>
                                                                                    <Grid item xs={5} sx={{pt:2}}>
                                                                                        <Typography
                                                                                            onClick={planDetailsDrawer.openDrawer}
                                                                                            variant="body2"
                                                                                            color="primary"
                                                                                            sx={{cursor: "pointer"}}>
                                                                                            {touristStaticData.details}
                                                                                            <OpenInNewIcon fontSize="small" color="primary" sx={{ml: 1, verticalAlign: "middle"}} />
                                                                                        </Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs={2}></Grid>
                                                                                    <Grid item xs={5} >
                                                                                        <Button size="medium" type="button" color="primary"
                                                                                                variant={data.price == btnVariant && touristRechargeType === 'plans' ? 'contained' : 'outlined'}
                                                                                                sx={{minWidth:"auto", width:"100%"}}
                                                                                                onClick={() => {
                                                                                                    selectTouristPlan(data.price)
                                                                                                    setTouristRechargeType("plans")
                                                                                                }
                                                                                                }
                                                                                        >
                                                                                            {touristStaticData.selectPlanBtn}
                                                                                        </Button>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </div>
                                                                        </Card>

                                                            </Grid>
                                                                ))
                                                            }
                                                        </Grid>

                                                    </TabPanel>
                                                </TabContext>
                                                <DrawerModal anchor={"bottom"}
                                                             open={planDetailsDrawer.isOpen}
                                                             toggleDrawer={planDetailsDrawer.openDrawer}
                                                             onClose={planDetailsDrawer.closeDrawer}
                                                >
                                                    <Grid container spacing={2}
                                                          sx={{px: 4}}>
                                                        {(touristFaqs) && (
                                                            <>
                                                                <Grid item xs={12} md={4}>
                                                                    <div
                                                                        dangerouslySetInnerHTML={{__html: touristFaqs.planInfo}}/>
                                                                </Grid>
                                                                <Grid item md={1} container
                                                                      justifyContent="center">
                                                                    <Divider
                                                                        orientation="vertical"
                                                                        flexItem/>
                                                                </Grid>
                                                                <Grid item xs={12} md={7}>
                                                                    <div
                                                                        dangerouslySetInnerHTML={{__html: touristFaqs.planDetails}}/>
                                                                </Grid>
                                                            </>
                                                        )}
                                                    </Grid>
                                                </DrawerModal>
                                                {isScreenMedium && <Divider sx={{my: 8}} />}
                                                <Card variant="outlined" sx={{textAlign:"center", py: 6, borderRadius: 2, cursor:"pointer", display: touristRechargeType === "other amount" ? "none":"block", maxWidth: isScreenMedium ? "calc(33.33% - 20px)": "100%", my: 8}} onClick={()=> {setTouristRechargeType("other amount"); setSelectedPlanDetails(null); setOtherAmountvalue("25")} } >
                                                    <AddCircleOutlineIcon color="primary" fontSize="medium" />
                                                    <Typography color="primary" component="h4">{touristStaticData.otherAmountBoxLabel}</Typography>
                                                </Card>

                                                {(touristRechargeType === "other amount") && (
                                                    <Card variant="outlined" sx={{borderRadius: 2, p: 4, my: 8, maxWidth: isScreenMedium ? "calc(33.33% - 20px)": "100%"}}>
                                                        <Typography variant="body1"
                                                                    sx={{mb: 4}}>{touristStaticData.otherAmountInputLabel}</Typography>

                                                        <Controller
                                                            name="pay"
                                                            control={control}
                                                            defaultValue=""
                                                            render={({
                                                                         field: {ref, onChange, value, onBlur},
                                                                         fieldState: {error}
                                                                     }) => (
                                                                <>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={2} md={2}>
                                                                            <Button
                                                                                color="primary" variant="outlined" sx={{
                                                                                width: "44px",
                                                                                height: "44px",
                                                                                minWidth: "auto"
                                                                            }} onClick={removeRechargeAmtHandler}>
                                                                                <RemoveIcon sx={{
                                                                                    fontSize: 17,
                                                                                    color: duTheme.palette.common.primary
                                                                                }}/>
                                                                            </Button>
                                                                        </Grid>
                                                                        <Grid item xs={8} md={8}>
                                                                            <TextField
                                                                                variant="outlined"
                                                                                onChange={e => {
                                                                                    onChange(e.target.value);
                                                                                    handleTouristPayChange(e)
                                                                                }}
                                                                                onBlur={e => {
                                                                                    onBlur(e.target.value);
                                                                                    handleTouristPayChange(e)
                                                                                }}
                                                                                onClick={(e)=> {setTouristRechargeType("other amount")}}
                                                                                value={touristRechargeType === "plans" ? "0" : otherAmountValue}
                                                                                error={touristRechargeType === "other amount" ? !!error : false}
                                                                                helperText={error ? error.message : GetLocaleData(staticData.controlOtherAmountHint) }
                                                                                ref={ref}
                                                                                margin="none"
                                                                                fullWidth
                                                                                type="number"
                                                                                id="otherAmount"
                                                                                sx={{minWidth: 'auto'}}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={2} md={2}>
                                                                            <Button
                                                                                color="primary" variant="outlined" sx={{
                                                                                width: "44px",
                                                                                height: "44px",
                                                                                minWidth: "auto",
                                                                                float: "right"
                                                                            }} onClick={addRechargeAmtHandler}>
                                                                                <AddIcon sx={{
                                                                                    fontSize: 17,
                                                                                    color: duTheme.palette.common.primary
                                                                                }}/>
                                                                            </Button>
                                                                        </Grid>
                                                                    </Grid>
                                                                </>
                                                            )}
                                                            rules={{
                                                                required: touristRechargeType === "other amount" && GetLocaleData(staticData.controlOtherAmountHint),
                                                                min: {
                                                                    value: 1,
                                                                    message: GetLocaleData(staticData.controlOtherAmountHint)
                                                                },
                                                                pattern: {
                                                                    value: /^[1-9]\d*$/i,
                                                                    message: GetLocaleData(staticData.controlOtherAmountHint)
                                                                },
                                                            }}
                                                        />

                                                        <Button
                                                            type="button"
                                                            color="primary"
                                                            variant="contained"
                                                            size="large"
                                                            sx={{ width: "100%" , mt: 4}}
                                                            onClick={() => {suggestDrawer.openDrawer()}}
                                                            // disabled={!isValid}
                                                            // disabled={!otherAmountValue.match(/^(?:[1-9]|[1-9][0-9]{1,2}|10[0-4][0-9]|1050)$/i)}
                                                            disabled={otherAmountValue > 0 && otherAmountValue < 1050 ? false: true}
                                                        >
                                                            {touristStaticData.proceednowBtnLbl}
                                                        </Button>

                                                        <DrawerModal anchor={"bottom"}
                                                                     open={suggestDrawer.isOpen}
                                                                     toggleDrawer={suggestDrawer.openDrawer}
                                                                     onClose={suggestDrawer.closeDrawer}
                                                        >
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5} sx={{textAlign: isScreenSmall? "center": isRtl ? "left" : "right", px: 6}}>
                                                                    <img src={touristStaticData.suggestedDrawerImg} style={{maxWidth: "200px"}}/>
                                                                </Grid>
                                                                <Grid item xs={12} md={7}>
                                                                    <Box sx={{py: 0, px: 6}}>
                                                                        <Typography variant="h3" component="h3" sx={{mb: 4}}>{touristStaticData.suggestedDrawerTitle}</Typography>
                                                                        <Typography variant="body1" component="p">{touristStaticData.suggestedDrawerDesc}</Typography>
                                                                        <Button
                                                                            color="primary"
                                                                            variant="contained"
                                                                            size="large"
                                                                            sx={{ width: isScreenSmall ? "100%": "auto" , mt: 4}}
                                                                            onClick={() => {suggestDrawer.closeDrawer(); setAmountToPay(otherAmountValue); window.scrollTo({ top: 0 })}}
                                                                        >

                                                                            {isRtl ? "الاستمرار" : "Proceed now"}
                                                                        </Button>
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>

                                                        </DrawerModal>
                                                    </Card>
                                                )}
                                            </Box>

                                        </>


                                )}

                                {(planType === "postpaid" && amountToPay < 1) && (
                                            <Box sx={{maxWidth: "400px", my: 8, mx: isScreenSmall ? 6 : 0}} >
                                                <Typography gutterBottom variant="h5" component="h5">{ GetLocaleData(staticData.payTitle) }</Typography>

                                                <Controller
                                                    name="amount"
                                                    control={control}
                                                    defaultValue={otherAmountValue != "0" ? otherAmountValue : ""}
                                                    render={({ field: { name, ref, onChange, value, onBlur }, fieldState: { error } }) => (
                                                        <TextField
                                                            label= { GetLocaleData(staticData.controlAmountLbl) }
                                                            type={isScreenSmall ? "tel" : "number"}
                                                            variant="outlined"
                                                            value={value}
                                                            onChange={e => {
                                                                handlePayChange(e)
                                                                onChange(e.target.value);
                                                            }}
                                                            onBlur={e => {
                                                                onBlur(e.target.value)
                                                                handleGTMTriggerOnError(name, error, "eventTracker", "My Account Quick Recharge", "Credit Card Page")
                                                            }}
                                                            error={!!error}
                                                            ref={ref}
                                                            /*helperText={error ? error.message : <>
                                                                {GetLocaleData(staticData.amtHintLbl)} <strong>{GetLocaleData(staticData.currency)} 808.50</strong><br />{GetLocaleData(staticData.amtHintConsumerLbl)}
                                                            </>
                                                            }*/

                                                            helperText={error ? error.message :
                                                                <>
                                                                {billAmount &&
                                                                    <span>
                                                                        {GetLocaleData(staticData.amtHintLbl)}
                                                                        <strong> { isRtl ? billAmount+ ' ' +GetLocaleData(staticData.currency) : GetLocaleData(staticData.currency) + ' ' + billAmount } </strong>
                                                                    <br />
                                                                    </span>

                                                                }
                                                                    { isEnterprise ? GetLocaleData(staticData.amtHintEnterpriseLbl) : GetLocaleData(staticData.amtHintConsumerLbl)}
                                                                </>
                                                            }

                                                            margin="normal"
                                                            fullWidth={isScreenSmall}
                                                        />
                                                    )}
                                                    rules={
                                                        isEnterprise ?
                                                            {
                                                                required: GetLocaleData(staticData.controlEnterpriseAmountError),
                                                                pattern: {value: /^s*-?[1-9]\d*(\.\d{1,2})?\s*$/i, message: GetLocaleData(staticData.controlEnterpriseAmountError)},
                                                                min: {value: 1, message: GetLocaleData(staticData.controlEnterpriseAmountError)},
                                                                max: {value: 500000, message: GetLocaleData(staticData.controlEnterpriseAmountError)}
                                                            } :
                                                            {
                                                                required: GetLocaleData(staticData.controlAmountError),
                                                                pattern: {value: /^s*-?[1-9]\d*(\.\d{1,2})?\s*$/i, message: GetLocaleData(staticData.controlAmountError)},
                                                                min: {value: 1, message: GetLocaleData(staticData.controlAmountError)},
                                                                max: {value: 30000, message: GetLocaleData(staticData.controlAmountError)}
                                                            }
                                                    }
                                                />
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    size="large"
                                                    sx={{ width: "100%" , mt: 4}}
                                                    onClick={() => {setAmountToPay(otherAmountValue); window.scrollTo({ top: 0 })}}
                                                    // disabled={!isValid}
                                                    disabled={otherAmountValue > 0 && otherAmountValue < (isEnterprise ? 500000 : 30000) ? false : true}
                                                >
                                                    {isRtl ? "الاستمرار" : "Proceed now"}
                                                </Button>
                                            </Box>
                                )}

                                {/*{paymentType === "card" && (*/}
                                {/*    <>*/}
                                {/*    <Grid container justifyContent="space-between" sx={{mt:4}}>*/}
                                {/*                        {(isScreenMedium || isIgnite) && (*/}
                                {/*                            <Grid item md={6} sx={{mx: 'auto'}}>*/}
                                {/*            <Paper elevation={0} variant="none" sx={{width: "300px", height: "180px", position: "relative", mb: 5}}>*/}
                                {/*                <Box sx={{position: "absolute", width: "300px",height: "100%", zIndex: 3}}>*/}
                                {/*                        <Box*/}
                                {/*                            component="img"*/}
                                {/*                            sx={{*/}
                                {/*                                maxWidth: "65px", display: "block", position: "absolute", top: "30px", right: "30px"*/}
                                {/*                            }}*/}
                                {/*                            alt=""*/}
                                {/*                            src={cardIcon("light")}*/}
                                {/*                            className="card-img"*/}
                                {/*                        />*/}
                                {/*                        <Typography variant="subtitle1" component="div" color="white" className="card-number" sx={{position: "absolute", top: "75px", left: "30px", ...(!card && {opacity: ".3"}) }}>*/}
                                {/*                            {card ? card : "1234 1234 1234 1234"}*/}
                                {/*                        </Typography>*/}
                                {/*                        <Box className="card-name" sx={{position: "absolute", top: "125px", left: "30px"}}>*/}
                                {/*                            <Typography component="div" variant="body2" color="white" sx={{ ...(!fullname && {opacity: ".3"}) }}>*/}
                                {/*                                {fullname ? fullname : GetLocaleData(staticData.controlCardNameLbl) }*/}
                                {/*                            </Typography>*/}
                                {/*                            <Typography color="white" sx={{fontSize: "12px"}}>*/}
                                {/*                                { GetLocaleData(staticData.ccMockNameLbl) }*/}
                                {/*                            </Typography>*/}
                                {/*                        </Box>*/}
                                {/*                        <Box className="card-name" sx={{position: "absolute", top: "125px", right: "30px", textAlign: "right"}}>*/}
                                {/*                            <Typography component="div" variant="body2" color="white" sx={{ ...(!expiry && {opacity: ".3"}) }}>*/}
                                {/*                                {expiry ? expiry : "MM/YY"}*/}
                                {/*                            </Typography>*/}
                                {/*                            <Typography color="white" sx={{fontSize: "12px"}}>*/}
                                {/*                                { GetLocaleData(staticData.ccMockExpiryLbl) }*/}
                                {/*                            </Typography>*/}
                                {/*                        </Box>*/}

                                {/*                </Box>*/}
                                {/*                <img src={cardMock} alt="" />*/}
                                {/*            </Paper>*/}
                                {/*        </Grid>*/}
                                {/*                        )}*/}

                                {/*        <Grid item md={6}>*/}
                                {/*            <Grid container direction="column">*/}
                                {/*                <Grid item py={4}>*/}
                                {/*                    <Controller*/}
                                {/*                        name= "card"*/}
                                {/*                        control= {control}*/}
                                {/*                        defaultValue= ""*/}
                                {/*                        render= {({ field: { name, ref, onChange, value, onBlur }, fieldState: { error } }) => (*/}
                                {/*                            <NumberFormat*/}
                                {/*                                label= { GetLocaleData(staticData.controlCardNumberLbl) }*/}
                                {/*                                variant= "outlined"*/}
                                {/*                                value= {value}*/}
                                {/*                                format= "#### #### #### ####"*/}
                                {/*                                placeholder= "1234 1234 1234 1234"*/}
                                {/*                                error= {!!error}*/}
                                {/*                                helperText= {error ? error.message : "" }*/}
                                {/*                                margin= "none"*/}
                                {/*                                onChange= {e => {*/}
                                {/*                                    // onCardChangeHandler(e)*/}
                                {/*                                    showCardType(e)*/}
                                {/*                                    onChange(e.target.value)*/}
                                {/*                                    if (cvv) {*/}
                                {/*                                        trigger("cvv")*/}
                                {/*                                    }*/}
                                {/*                                }}*/}
                                {/*                                onBlur={e => {*/}
                                {/*                                    onBlur(e.target.value)*/}
                                {/*                                    handleGTMTriggerOnError(name, error, "eventTracker", "My Account Quick Recharge", "Credit Card Page")*/}
                                {/*                                }}*/}
                                {/*                                ref={ref}*/}
                                {/*                                customInput= {*/}
                                {/*                                    TextField*/}
                                {/*                                }*/}
                                {/*                                fullWidth*/}
                                {/*                                InputProps={{*/}
                                {/*                                    endAdornment: <InputAdornment position="end" sx={{width: "40px"}}>*/}
                                {/*                                        <Box*/}
                                {/*                                            component="img"*/}
                                {/*                                            sx={{*/}
                                {/*                                                maxWidth: "100px", display: "block"*/}
                                {/*                                            }}*/}
                                {/*                                            alt=""*/}
                                {/*                                            src={cardIcon("dark")}*/}
                                {/*                                            className="card-img"*/}
                                {/*                                        />*/}
                                {/*                                    </InputAdornment>*/}
                                {/*                                }}*/}
                                {/*                                className={classes.inputLtr}*/}
                                {/*                            />*/}

                                {/*                        )}*/}
                                {/*                        rules={{*/}
                                {/*                            required: GetLocaleData(staticData.controlCardNumberError),*/}
                                {/*                            pattern: { value:/4\d{3}\s\d{4}\s\d{4}\s\d{4}|5[1-5]\d{2}\s\d{4}\s\d{4}\s\d{4}|3[47]\d{2}\s\d{4}\s\d{4}\s\d{3}/i, message: GetLocaleData(staticData.controlCardNumberError) },*/}
                                {/*                            validate: value => LuhnCheck(value, 'cc') || GetLocaleData(staticData.controlCardNumberError)*/}
                                {/*                        }}*/}
                                {/*                    />*/}
                                {/*                </Grid>*/}
                                {/*                <Grid item py={4}>*/}
                                {/*                    <Controller*/}
                                {/*                        name="fullname"*/}
                                {/*                        control={control}*/}
                                {/*                        defaultValue=""*/}
                                {/*                        render={({ field: { name, ref, onChange, value, onBlur }, fieldState: { error } }) => (*/}
                                {/*                            <TextField*/}
                                {/*                                label= { GetLocaleData(staticData.controlCardNameLbl) }*/}
                                {/*                                variant= "outlined"*/}
                                {/*                                value= {value}*/}
                                {/*                                onChange= {onChange}*/}
                                {/*                                onBlur={e => {*/}
                                {/*                                    onBlur(e.target.value)*/}
                                {/*                                    handleGTMTriggerOnError(name, error, "eventTracker", "My Account Quick Recharge", "Credit Card Page")*/}
                                {/*                                }}*/}
                                {/*                                error= {!!error}*/}
                                {/*                                helperText= {error ? error.message : "" }*/}
                                {/*                                ref={ref}*/}
                                {/*                                margin= "none"*/}
                                {/*                                inputProps={{maxLength :25}}*/}
                                {/*                                fullWidth*/}
                                {/*                            />*/}
                                {/*                        )}*/}
                                {/*                        rules={{ required: GetLocaleData(staticData.controlCardNameError), pattern: { value:/^[a-zA-Z\-'\s]{1,25}$/, message: GetLocaleData(staticData.controlCardNameError) } }}*/}
                                {/*                    />*/}
                                {/*                </Grid>*/}
                                {/*                <Grid item>*/}
                                {/*                    <Grid container justifyContent="space-between">*/}
                                {/*                        <Grid item py={4} xs={6}>*/}
                                {/*                            <Controller*/}
                                {/*                                name="expiry"*/}
                                {/*                                control={control}*/}
                                {/*                                defaultValue=""*/}
                                {/*                                render={({ field: { name, ref, onChange, value, onBlur }, fieldState: { error } }) => (*/}
                                {/*                                    <NumberFormat*/}
                                {/*                                        label= { GetLocaleData(staticData.controlCardExpiryLbl)}*/}
                                {/*                                        variant="outlined"*/}
                                {/*                                        value={value}*/}
                                {/*                                        format="##/##"*/}
                                {/*                                        placeholder="MM/YY"*/}
                                {/*                                        error={!!error}*/}
                                {/*                                        helperText={error ? error.message : "" }*/}
                                {/*                                        margin="none"*/}
                                {/*                                        onChange={onChange}*/}
                                {/*                                        onBlur={e => {*/}
                                {/*                                            onBlur(e.target.value)*/}
                                {/*                                            handleGTMTriggerOnError(name, error, "eventTracker", "My Account Quick Recharge", "Credit Card Page")*/}
                                {/*                                        }}*/}
                                {/*                                        ref={ref}*/}
                                {/*                                        customInput={*/}
                                {/*                                            TextField*/}
                                {/*                                        }*/}
                                {/*                                        className={classes.inputLtr}*/}
                                {/*                                        sx={{minWidth: "auto", width: "90%"}}*/}
                                {/*                                    />*/}
                                {/*                                )}*/}
                                {/*                                rules={{*/}
                                {/*                                    required: GetLocaleData(staticData.controlCardExpiryError),*/}
                                {/*                                    pattern: { value:/\d{2}[\/]\d{2}/, message: GetLocaleData(staticData.controlCardExpiryError) },*/}
                                {/*                                    validate: value => expirydateValidate(value, 'cc') || GetLocaleData(staticData.controlCardExpiryError)*/}
                                {/*                                }}*/}
                                {/*                            />*/}
                                {/*                        </Grid>*/}
                                {/*                        <Grid item py={4} xs={6} align={isRtl ? "left" : "right"}>*/}
                                {/*                            <Controller*/}
                                {/*                                name="cvv"*/}
                                {/*                                control={control}*/}
                                {/*                                defaultValue=""*/}
                                {/*                                render={({ field: { name, ref, onChange, value, onBlur }, fieldState: { error } }) => (*/}
                                {/*                                    <TextField*/}
                                {/*                                        label= { GetLocaleData(staticData.controlCardCVVLbl) }*/}
                                {/*                                        variant="outlined"*/}
                                {/*                                        value={value}*/}
                                {/*                                        onChange={onChange}*/}
                                {/*                                        onBlur={e => {*/}
                                {/*                                            onBlur(e.target.value)*/}
                                {/*                                            handleGTMTriggerOnError(name, error, "eventTracker", "My Account Quick Recharge", "Credit Card Page")*/}
                                {/*                                        }}*/}
                                {/*                                        error={!!error}*/}
                                {/*                                        helperText={error ? error.message : "" }*/}
                                {/*                                        ref={ref}*/}
                                {/*                                        margin="none"*/}
                                {/*                                        type="password"*/}
                                {/*                                        sx={{minWidth: "auto", width: "90%"}}*/}
                                {/*                                        className={classes.inputLtr}*/}
                                {/*                                        inputProps={{maxLength : ccType === "AMEX" ? 4 : 3, autoComplete:"new-password"}}*/}
                                {/*                                    />*/}
                                {/*                                )}*/}
                                {/*                                rules={{*/}
                                {/*                                    required: GetLocaleData(staticData.controlCardCVVError),*/}
                                {/*                                    pattern: { value:/\d{3}/, message: GetLocaleData(staticData.controlCardCVVError)} ,*/}
                                {/*                                    minLength: {value: ccType === "AMEX" ? 4 : 3, message: GetLocaleData(staticData.controlCardCVVError) },*/}
                                {/*                                    maxLength: {value: ccType === "AMEX" ? 4 : 3, message: GetLocaleData(staticData.controlCardCVVError) },*/}
                                {/*                                }}*/}
                                {/*                            />*/}
                                {/*                        </Grid>*/}
                                {/*                    </Grid>*/}
                                {/*                </Grid>*/}
                                {/*                <Grid item py={4}>*/}
                                {/*                    <FormControlLabel control={*/}
                                {/*                        <Controller*/}
                                {/*                            control={control}*/}
                                {/*                            name="terms"*/}
                                {/*                            render={({ field: { name, ref, onChange, onBlur, value }, fieldState: { error } }) => (*/}
                                {/*                                <Checkbox*/}
                                {/*                                    onBlur={e => {*/}
                                {/*                                        onBlur(e.target.value)*/}
                                {/*                                        handleGTMTriggerOnError(name, error, "eventTracker", "My Account Quick Recharge", "Credit Card Page")*/}
                                {/*                                    }}*/}
                                {/*                                    onChange= {e => {*/}
                                {/*                                        handleGTMTrigger(e)*/}
                                {/*                                        onChange(e.target.checked);*/}
                                {/*                                    }}*/}
                                {/*                                    // checked={value}*/}
                                {/*                                    color={error && "error" }*/}
                                {/*                                    ref={ref}*/}
                                {/*                                />*/}
                                {/*                            )}*/}
                                {/*                            rules={{ required: "required" }}*/}
                                {/*                        />*/}
                                {/*                    } label={*/}

                                {/*                        <div style={{fontSize: "16px"}}>*/}
                                {/*                            <span>{ GetLocaleData(staticData.termsAgreeLbl) } </span>*/}
                                {/*                            <Link href={ GetLocaleData(staticData.termsConditionLink) }>{ GetLocaleData(staticData.termsConditionLbl) }</Link>*/}
                                {/*                        </div>*/}
                                {/*                    } />*/}
                                {/*                </Grid>*/}
                                {/*            </Grid>*/}
                                {/*        </Grid>*/}
                                {/*    </Grid>*/}

                                {/*    </>*/}

                                {/*            )}*/}
                                    <CommonDialog
                                    isOpen={crytoTermsDialog.isOpen}
                                    onClose={handleCloseDialog, crytoTermsDialog.closeDialog}
                                    content={
                                        <>
                                            <Typography gutterBottom variant="h6" component="h6" sx={{mt:4, mb:2}}>{ GetLocaleData(staticData.cryptoTerms.title) }</Typography>
                                            <List dense>
                                                { cryptoTerms && cryptoTerms.map((item,index) =>

                                                    <ListItem disablePadding alignItems="flex-start" key={index}>
                                                        <ListItemIcon sx={{minWidth: "24px"}}>
                                                            <CheckIcon sx={{ fontSize: 17, color:duTheme.palette.common.magenta }} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                <Typography variant="body2" component="div">
                                                                    {isRtl ? item.consentAr : item.consentEn}
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItem>
                                                )}
                                            </List>
                                            <LoadingButton
                                                variant="contained"
                                                type="button"
                                                onClick={crytoDialog.openDialog}
                                                color="primary"
                                                loading={isSubmitDisabled}
                                                className={classes.btn}
                                            >
                                                { (planType === "postpaid") ? GetLocaleData(staticData.btnPayLbl) : GetLocaleData(staticData.btnRechargeLbl) }
                                            </LoadingButton>
                                        </>
                                    }
                                />

                                {/*<Grid container justifyContent="flex-end">*/}
                                {/*    <Grid item xs={12} md={8} align={isRtl ? "left" : "right"}>*/}
                                {/*        <Grid container alignItems="center" justifyContent={ isScreenMedium ? "flex-end" : "space-between" }>*/}
                                {/*            <Grid item md={5}>*/}
                                                {/*{paymentType === "card" && (*/}
                                                {/*    <LoadingButton*/}
                                                {/*        variant="contained"*/}
                                                {/*        type="submit"*/}
                                                {/*        disabled={isSubmitDisabled || !isValid}*/}
                                                {/*        color="primary"*/}
                                                {/*        loading={isSubmitDisabled}*/}
                                                {/*        className={classes.btn}*/}
                                                {/*    >*/}
                                                {/*        { (planType === "postpaid") ? GetLocaleData(staticData.btnPayLbl) : GetLocaleData(staticData.btnRechargeLbl) }*/}
                                                {/*    </LoadingButton>*/}
                                                {/*)}*/}
                                                {/*{paymentType === "crypto" && isCryptoPay && (*/}
                                                {/*    <LoadingButton*/}
                                                {/*        variant="contained"*/}
                                                {/*        type="button"*/}
                                                {/*        onClick={handleCryptoDialogOpen, crytoDialog.openDialog}*/}
                                                {/*        disabled={isSubmitDisabled || !isValid}*/}
                                                {/*        color="primary"*/}
                                                {/*        loading={isSubmitDisabled}*/}
                                                {/*        className={classes.btn}*/}
                                                {/*    >*/}
                                                {/*        { (planType === "postpaid") ? GetLocaleData(staticData.btnPayLbl) : GetLocaleData(staticData.btnRechargeLbl) }*/}
                                                {/*    </LoadingButton>*/}
                                                {/*)}*/}
                                                {/*{paymentType === "applepay" && isApplePay && (*/}
                                                {/*    <Button variant="contained" type="button" color="primary" disabled={amountToPay>0 ? '' : 'disabled'} className={classes.applepayBtn} onClick= {(e) => handleApplePay(e)}>ApplePay</Button>*/}
                                                {/*)}*/}

                                                {/*/!*div with # method needed for 3DS*!/*/}
                                                {/*<div id="method" style={{display:'none'}}></div>*/}
                                {/*            </Grid>*/}
                                {/*        </Grid>*/}
                                {/*    </Grid>*/}
                                {/*</Grid>*/}

                    </Grid>
                    <Grid item xs={12} md={8} sx={{px: isScreenSmall ? "20px" : 0, display: amountToPay > 0 ? "block":"none" }}>
                        <Typography gutterBottom variant="h3" component="h3" id="paymentSection" sx={{mt: 10, mb: 5}}>{ GetLocaleData(staticData.paymentTitle) }</Typography>
                        <small>Card</small>
                        <Divider sx={{my: 1}} />
                        { isScreenMedium ? (
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{fill: duTheme.grey[500], mr:2}}/>}
                                    aria-controls="cardPayment"
                                    id="cardPayment"
                                    sx={{px: 0}}>
                                    <img src={iconCardPay} style={{marginRight:"20px"}}/>
                                    Credit or debit card
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container direction="column">
                                        <Grid item py={4}>
                                            <Controller
                                                name= "card"
                                                control= {control}
                                                defaultValue= ""
                                                render= {({ field: { name, ref, onChange, value, onBlur }, fieldState: { error } }) => (
                                                    <NumberFormat
                                                        label= { GetLocaleData(staticData.controlCardNumberLbl) }
                                                        variant= "outlined"
                                                        value= {value}
                                                        format= "#### #### #### ####"
                                                        placeholder= "1234 1234 1234 1234"
                                                        error= {!!error}
                                                        helperText= {error ? error.message : "" }
                                                        margin= "none"
                                                        onChange= {e => {
                                                            // onCardChangeHandler(e)
                                                            showCardType(e)
                                                            onChange(e.target.value)
                                                            if (cvv) {
                                                                trigger("cvv")
                                                            }
                                                        }}
                                                        onBlur={e => {
                                                            onBlur(e.target.value)
                                                            handleGTMTriggerOnError(name, error, "eventTracker", "My Account Quick Recharge", "Credit Card Page")
                                                        }}
                                                        ref={ref}
                                                        customInput= {
                                                            TextField
                                                        }
                                                        fullWidth
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end" sx={{width: "40px"}}>
                                                                <Box
                                                                    component="img"
                                                                    sx={{
                                                                        maxWidth: "100px", display: "block"
                                                                    }}
                                                                    alt=""
                                                                    src={cardIcon("dark")}
                                                                    className="card-img"
                                                                />
                                                            </InputAdornment>
                                                        }}
                                                        className={classes.inputLtr}
                                                    />

                                                )}
                                                rules={{
                                                    required: GetLocaleData(staticData.controlCardNumberError),
                                                    // pattern: { value:/4\d{3}\s\d{4}\s\d{4}\s\d{4}|5[1-5]\d{2}\s\d{4}\s\d{4}\s\d{4}|3[47]\d{2}\s\d{4}\s\d{4}\s\d{3}/i, message: GetLocaleData(staticData.controlCardNumberError) },
                                                    pattern:{ value:/4\d{3}\s\d{4}\s\d{4}\s\d{4}|(5[1-5]\d{2}|2[2-7]\d{2})\s\d{4}\s\d{4}\s\d{4}|3[47]\d{2}\s\d{4}\s\d{4}\s\d{3}/i, message: GetLocaleData(staticData.controlCardNumberError) },
                                                    validate: value => LuhnCheck(value, 'cc') || GetLocaleData(staticData.controlCardNumberError)
                                                }}
                                            />
                                        </Grid>
                                        <Grid item py={4}>
                                            <Controller
                                                name="fullname"
                                                control={control}
                                                defaultValue=""
                                                render={({ field: { name, ref, onChange, value, onBlur }, fieldState: { error } }) => (
                                                    <TextField
                                                        label= { GetLocaleData(staticData.controlCardNameLbl) }
                                                        variant= "outlined"
                                                        value= {value}
                                                        onChange= {onChange}
                                                        onBlur={e => {
                                                            onBlur(e.target.value)
                                                            handleGTMTriggerOnError(name, error, "eventTracker", "My Account Quick Recharge", "Credit Card Page")
                                                        }}
                                                        error= {!!error}
                                                        helperText= {error ? error.message : "" }
                                                        ref={ref}
                                                        margin= "none"
                                                        inputProps={{maxLength :25}}
                                                        fullWidth
                                                    />
                                                )}
                                                rules={{ required: GetLocaleData(staticData.controlCardNameError), pattern: { value:/^[a-zA-Z\-'\s]{1,25}$/, message: GetLocaleData(staticData.controlCardNameError) } }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Grid container justifyContent="space-between">
                                                <Grid item py={4} xs={6}>
                                                    <Controller
                                                        name="expiry"
                                                        control={control}
                                                        defaultValue=""
                                                        render={({ field: { name, ref, onChange, value, onBlur }, fieldState: { error } }) => (
                                                            <NumberFormat
                                                                label= { GetLocaleData(staticData.controlCardExpiryLbl)}
                                                                variant="outlined"
                                                                value={value}
                                                                format="##/##"
                                                                placeholder="MM/YY"
                                                                error={!!error}
                                                                helperText={error ? error.message : "" }
                                                                margin="none"
                                                                onChange={onChange}
                                                                onBlur={e => {
                                                                    onBlur(e.target.value)
                                                                    handleGTMTriggerOnError(name, error, "eventTracker", "My Account Quick Recharge", "Credit Card Page")
                                                                }}
                                                                ref={ref}
                                                                customInput={
                                                                    TextField
                                                                }
                                                                className={classes.inputLtr}
                                                                sx={{minWidth: "auto", width: "90%"}}
                                                            />
                                                        )}
                                                        rules={{
                                                            required: GetLocaleData(staticData.controlCardExpiryError),
                                                            pattern: { value:/\d{2}[\/]\d{2}/, message: GetLocaleData(staticData.controlCardExpiryError) },
                                                            validate: value => expirydateValidate(value, 'cc') || GetLocaleData(staticData.controlCardExpiryError)
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item py={4} xs={6} align={isRtl ? "left" : "right"}>
                                                    <Controller
                                                        name="cvv"
                                                        control={control}
                                                        defaultValue=""
                                                        render={({ field: { name, ref, onChange, value, onBlur }, fieldState: { error } }) => (
                                                            <TextField
                                                                label= { GetLocaleData(staticData.controlCardCVVLbl) }
                                                                variant="outlined"
                                                                value={value}
                                                                onChange={onChange}
                                                                onBlur={e => {
                                                                    onBlur(e.target.value)
                                                                    handleGTMTriggerOnError(name, error, "eventTracker", "My Account Quick Recharge", "Credit Card Page")
                                                                }}
                                                                error={!!error}
                                                                helperText={error ? error.message : "" }
                                                                ref={ref}
                                                                margin="none"
                                                                type="password"
                                                                sx={{minWidth: "auto", width: "90%"}}
                                                                className={classes.inputLtr}
                                                                inputProps={{maxLength : ccType === "AMEX" ? 4 : 3, autoComplete:"new-password"}}
                                                            />
                                                        )}
                                                        rules={{
                                                            required: GetLocaleData(staticData.controlCardCVVError),
                                                            pattern: { value:/\d{3}/, message: GetLocaleData(staticData.controlCardCVVError)} ,
                                                            minLength: {value: ccType === "AMEX" ? 4 : 3, message: GetLocaleData(staticData.controlCardCVVError) },
                                                            maxLength: {value: ccType === "AMEX" ? 4 : 3, message: GetLocaleData(staticData.controlCardCVVError) },
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
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
                                                                handleGTMTriggerOnError(name, error, "eventTracker", "My Account Quick Recharge", "Credit Card Page")
                                                            }}
                                                            onChange= {e => {
                                                                handleGTMTrigger(e)
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
                                        <LoadingButton
                                            variant="contained"
                                            type="submit"
                                            disabled={isSubmitDisabled || !isValid}
                                            color="primary"
                                            loading={isSubmitDisabled}
                                            className={classes.btn}
                                            sx={{maxWidth: "250px"}}
                                        >
                                            { (planType === "postpaid") ? GetLocaleData(staticData.btnPayLbl) : GetLocaleData(staticData.btnRechargeLbl) }
                                        </LoadingButton>
                                        {/*div with # method needed for 3DS*/}
                                        <div id="method" style={{display:'none'}}></div>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        ) : (
                            <>
                                <Typography variant="body1" component="div" sx={{display: "flex", alignItems: "center", mt: 4}} onClick={cardPaymentDrawer.openDrawer}>
                                    <img src={iconCardPay} style={{marginRight: "20px"}}/>
                                    Credit or debit card
                                </Typography>
                                <DrawerModal anchor={"bottom"}
                                         open={cardPaymentDrawer.isOpen}
                                         toggleDrawer={cardPaymentDrawer.openDrawer}
                                         onClose={cardPaymentDrawer.closeDrawer}
                            >
                                <Grid container direction="column" px={4}>
                                    <Typography variant="h4" component="h4">Pay</Typography>
                                    <Grid item py={4}>
                                        <Controller
                                            name= "card"
                                            control= {control}
                                            defaultValue= ""
                                            render= {({ field: { name, ref, onChange, value, onBlur }, fieldState: { error } }) => (
                                                <NumberFormat
                                                    label= { GetLocaleData(staticData.controlCardNumberLbl) }
                                                    variant= "outlined"
                                                    value= {value}
                                                    format= "#### #### #### ####"
                                                    placeholder= "1234 1234 1234 1234"
                                                    error= {!!error}
                                                    helperText= {error ? error.message : "" }
                                                    margin= "none"
                                                    onChange= {e => {
                                                        // onCardChangeHandler(e)
                                                        showCardType(e)
                                                        onChange(e.target.value)
                                                        if (cvv) {
                                                            trigger("cvv")
                                                        }
                                                    }}
                                                    onBlur={e => {
                                                        onBlur(e.target.value)
                                                        handleGTMTriggerOnError(name, error, "eventTracker", "My Account Quick Recharge", "Credit Card Page")
                                                    }}
                                                    ref={ref}
                                                    customInput= {
                                                        TextField
                                                    }
                                                    fullWidth
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end" sx={{width: "40px"}}>
                                                            <Box
                                                                component="img"
                                                                sx={{
                                                                    maxWidth: "100px", display: "block"
                                                                }}
                                                                alt=""
                                                                src={cardIcon("dark")}
                                                                className="card-img"
                                                            />
                                                        </InputAdornment>
                                                    }}
                                                    className={classes.inputLtr}
                                                />

                                            )}
                                            rules={{
                                                required: GetLocaleData(staticData.controlCardNumberError),
                                                // pattern: { value:/4\d{3}\s\d{4}\s\d{4}\s\d{4}|5[1-5]\d{2}\s\d{4}\s\d{4}\s\d{4}|3[47]\d{2}\s\d{4}\s\d{4}\s\d{3}/i, message: GetLocaleData(staticData.controlCardNumberError) },
                                                pattern:{ value:/4\d{3}\s\d{4}\s\d{4}\s\d{4}|(5[1-5]\d{2}|2[2-7]\d{2})\s\d{4}\s\d{4}\s\d{4}|3[47]\d{2}\s\d{4}\s\d{4}\s\d{3}/i, message: GetLocaleData(staticData.controlCardNumberError) },
                                                validate: value => LuhnCheck(value, 'cc') || GetLocaleData(staticData.controlCardNumberError)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item py={4}>
                                        <Controller
                                            name="fullname"
                                            control={control}
                                            defaultValue=""
                                            render={({ field: { name, ref, onChange, value, onBlur }, fieldState: { error } }) => (
                                                <TextField
                                                    label= { GetLocaleData(staticData.controlCardNameLbl) }
                                                    variant= "outlined"
                                                    value= {value}
                                                    onChange= {onChange}
                                                    onBlur={e => {
                                                        onBlur(e.target.value)
                                                        handleGTMTriggerOnError(name, error, "eventTracker", "My Account Quick Recharge", "Credit Card Page")
                                                    }}
                                                    error= {!!error}
                                                    helperText= {error ? error.message : "" }
                                                    ref={ref}
                                                    margin= "none"
                                                    inputProps={{maxLength :25}}
                                                    fullWidth
                                                />
                                            )}
                                            rules={{ required: GetLocaleData(staticData.controlCardNameError), pattern: { value:/^[a-zA-Z\-'\s]{1,25}$/, message: GetLocaleData(staticData.controlCardNameError) } }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Grid container justifyContent="space-between">
                                            <Grid item py={4} xs={6}>
                                                <Controller
                                                    name="expiry"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field: { name, ref, onChange, value, onBlur }, fieldState: { error } }) => (
                                                        <NumberFormat
                                                            label= { GetLocaleData(staticData.controlCardExpiryLbl)}
                                                            variant="outlined"
                                                            value={value}
                                                            format="##/##"
                                                            placeholder="MM/YY"
                                                            error={!!error}
                                                            helperText={error ? error.message : "" }
                                                            margin="none"
                                                            onChange={onChange}
                                                            onBlur={e => {
                                                                onBlur(e.target.value)
                                                                handleGTMTriggerOnError(name, error, "eventTracker", "My Account Quick Recharge", "Credit Card Page")
                                                            }}
                                                            ref={ref}
                                                            customInput={
                                                                TextField
                                                            }
                                                            className={classes.inputLtr}
                                                            sx={{minWidth: "auto", width: "90%"}}
                                                        />
                                                    )}
                                                    rules={{
                                                        required: GetLocaleData(staticData.controlCardExpiryError),
                                                        pattern: { value:/\d{2}[\/]\d{2}/, message: GetLocaleData(staticData.controlCardExpiryError) },
                                                        validate: value => expirydateValidate(value, 'cc') || GetLocaleData(staticData.controlCardExpiryError)
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item py={4} xs={6} align={isRtl ? "left" : "right"}>
                                                <Controller
                                                    name="cvv"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field: { name, ref, onChange, value, onBlur }, fieldState: { error } }) => (
                                                        <TextField
                                                            label= { GetLocaleData(staticData.controlCardCVVLbl) }
                                                            variant="outlined"
                                                            value={value}
                                                            onChange={onChange}
                                                            onBlur={e => {
                                                                onBlur(e.target.value)
                                                                handleGTMTriggerOnError(name, error, "eventTracker", "My Account Quick Recharge", "Credit Card Page")
                                                            }}
                                                            error={!!error}
                                                            helperText={error ? error.message : "" }
                                                            ref={ref}
                                                            margin="none"
                                                            type="password"
                                                            sx={{minWidth: "auto", width: "90%"}}
                                                            className={classes.inputLtr}
                                                            inputProps={{maxLength : ccType === "AMEX" ? 4 : 3, autoComplete:"new-password"}}
                                                        />
                                                    )}
                                                    rules={{
                                                        required: GetLocaleData(staticData.controlCardCVVError),
                                                        pattern: { value:/\d{3}/, message: GetLocaleData(staticData.controlCardCVVError)} ,
                                                        minLength: {value: ccType === "AMEX" ? 4 : 3, message: GetLocaleData(staticData.controlCardCVVError) },
                                                        maxLength: {value: ccType === "AMEX" ? 4 : 3, message: GetLocaleData(staticData.controlCardCVVError) },
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
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
                                                            handleGTMTriggerOnError(name, error, "eventTracker", "My Account Quick Recharge", "Credit Card Page")
                                                        }}
                                                        onChange= {e => {
                                                            handleGTMTrigger(e)
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
                                    <LoadingButton
                                        variant="contained"
                                        type="button"
                                        onClick={handleSubmit(onSubmit)}
                                        disabled={isSubmitDisabled || !isValid}
                                        color="primary"
                                        loading={isSubmitDisabled}
                                        className={classes.btn}
                                    >
                                        { (planType === "postpaid") ? GetLocaleData(staticData.btnPayLbl) : GetLocaleData(staticData.btnRechargeLbl) }
                                    </LoadingButton>
                                    {/*div with # method needed for 3DS*/}
                                    <div id="method" style={{display:'none'}}></div>
                                </Grid>
                            </DrawerModal>
                            </>
                        )

                        }


                        <Box sx={{display: isIgnite ? 'none':'block', mt: 10}}>
                            {true && (
                                <>
                                    <small>Others</small>
                                    <Divider sx={{my: 1}}/>
                                    <List sx={{width: '100%', pr:2}}>
                                        {ApplePayEnabled && isApplePay && (
                                            <ListItem alignItems="center" onClick={handleApplePay} sx={{px: 0, py: 3, cursor: 'pointer'}} >
                                                <ListItemAvatar sx={{textAlign: "center"}}>
                                                    <img alt="Apple pay" src={appleBtn}/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary="Apple Pay"
                                                    sx={{pl:2}}
                                                />
                                                <ListItemIcon sx={{minWidth: "24px"}}>
                                                    <ChevronRightIcon sx={{fill: duTheme.grey[500]}}/>
                                                </ListItemIcon>
                                            </ListItem>
                                        )}
                                        {SamsungPayEnabled &&
                                            <ListItem alignItems="center" onClick={SamsungPayClickHandler} sx={{px: 0, py: 3, cursor: 'pointer'}}>
                                                <ListItemAvatar sx={{textAlign: "center"}}>
                                                    <img alt="Samsung pay" src={logoSamsungPay}/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary="Samsung Pay"
                                                    sx={{pl:2}}
                                                />
                                                <ChevronRightIcon sx={{fill: duTheme.grey[500]}}/>
                                            </ListItem>
                                        }
                                        {GPayEnabled &&
                                            <ListItem alignItems="center" onClick={GooglePayClickHandler} sx={{px: 0, py: 3, cursor: 'pointer'}}>
                                                <ListItemAvatar sx={{textAlign: "center"}}>
                                                    <img alt="Google pay" src={logoGPay}/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary="Google Pay"
                                                    sx={{pl:2}}
                                                />
                                                <ChevronRightIcon sx={{fill: duTheme.grey[500]}}/>
                                            </ListItem>
                                        }
                                        {isCryptoPay &&
                                            <ListItem alignItems="center" onClick={crytoTermsDialog.openDialog} sx={{px: 0, py: 3, cursor: 'pointer'}}>
                                                <ListItemAvatar sx={{textAlign: "center"}}>
                                                    <img alt="Crypto pay" src={logoCryptoPay}/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary="Cryptocurrency"
                                                    sx={{pl:2}}
                                                />
                                                <ChevronRightIcon sx={{fill: duTheme.grey[500]}} />
                                            </ListItem>
                                        }
                                    </List>


                                    {/*<ButtonGroup sx={{flexFlow: 'row wrap', ml: -2, pt: 4}} disableElevation*/}
                                    {/*             variant="contained" className={classes.buttonGroup}>*/}

                                    {/*    {ApplePayEnabled && isApplePay && (<Button sx={{mx: 2, my: 1}}*/}
                                    {/*                                               className={`${classes.groupBtn} ${paymentType === "applepay" && "isActive"}`}*/}
                                    {/*                                               variant="contained"*/}
                                    {/*                                               onClick={handleApplePay}>{ /* GetLocaleData(staticData.applePayLbl) */}
                                    {/*        <img src={appleBtn}/>}</Button>)}*/}

                                    {/*    {GPayEnabled &&*/}
                                    {/*        <Button*/}
                                    {/*            sx={{mx: 2, my: 1}}*/}
                                    {/*            className={`${classes.groupBtn} ${paymentType === "googlepay" ? "isActive" : ""}`}*/}
                                    {/*            variant="contained"*/}
                                    {/*            onClick={GooglePayClickHandler}><img src={logoGPay}/></Button>}*/}

                                    {/*    {SamsungPayEnabled &&*/}
                                    {/*        (<Button*/}
                                    {/*            sx={{mx: 2, my: 1}}*/}
                                    {/*            className={`${classes.groupBtn} ${paymentType === "samsungpay" ? "isActive" : ""}`}*/}
                                    {/*            variant="contained"*/}
                                    {/*            onClick={SamsungPayClickHandler}*/}
                                    {/*        ><img src={logoSamsungPay}/></Button>)}*/}

                                    {/*    {isCryptoPay &&*/}
                                    {/*        (<Button sx={{mx: 2, my: 1}}*/}
                                    {/*                 className={`${classes.groupBtn} ${paymentType === "crypto" && "isActive"}`}*/}
                                    {/*                 variant="contained" onClick={() => {*/}
                                    {/*            cryptoTermshandler();*/}
                                    {/*            setPaymentType("crypto")*/}
                                    {/*        }}>Cryptocurrency</Button>)}*/}

                                    {/*    <Button sx={{mx: 2, my: 1}}*/}
                                    {/*            className={`${classes.groupBtn} ${paymentType === "card" && "isActive"}`}*/}
                                    {/*            variant={paymentType === "card" ? 'contained' : 'outlined'}*/}
                                    {/*            onClick={() => setPaymentType("card")}>{GetLocaleData(staticData.CardLbl)}</Button>*/}

                                    {/*</ButtonGroup>*/}
                                </>
                            )}
                        </Box>
                        <CommonDialog
                            isOpen={crytoDialog.isOpen}
                            onClose={handleCloseDialog, crytoDialog.closeDialog}
                            content={
                                showLoader ? (
                                        <Typography variant="span"><CircularProgress color="primary" /></Typography>
                                    ) :
                                    paymentUrl?
                                        (<iframe
                                            src={paymentUrl}
                                            frameBorder="0"
                                            height="600px"
                                            width="400px" />) : (
                                            <Grid container maxWidth="lg" sx={{mx: "auto", mt:10}}>
                                                <Grid item xs={12}>
                                                    <AlertMessage {...{alertType:"error", alertTitle: "",  alertMessage: errState}} />
                                                </Grid>
                                            </Grid>
                                        )
                            }
                        />
                    </Grid>
                    <Grid item md={4} sx={{mt:isScreenSmall && 4, p: isScreenSmall && 4, display: amountToPay > 0 ? "block":"none"}}>
                        <Grid container direction="column" >
                            {planType === "tourist" && (
                                <Grid item sx={{ml: isScreenMedium && 15, mb:5}}>
                                    <Box className={classes.greyBox}>
                                        <CurrencyConversionWidget props={{currency1: amountToPay, currency2: currencyConverter(amountToPay, USD)}} />
                                    </Box>
                                </Grid>
                            )}
                            <Grid item sx={{ml: isScreenMedium && 15}}>
                                <Box className={classes.greyBox}>
                                    <TheWidget {...{widgetName: planType==="postpaid" ? "cardsacceptPostpaid" : "cardsacceptPrepaid"}} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>


                    {/*<Dialog fullWidth maxWidth={'sm'}  open={dialogOpen} anchor="bottom" onClose={handleCloseDialog}>*/}
                    {/*    <Grid container direction="row" justifyContent="center" alignItems="center" sx={{minHeight:"200px"}}>*/}
                    {/*    {showLoader ?  :*/}
                    {/*        paymentUrl? */}
                    {/*    }*/}
                    {/*    </Grid>*/}

                    {/*</Dialog>*/}
                </Grid>
                    <Box sx={{my: 6}}>
                        {pageData &&
                            <AppDownloadBanner content={pageData.banner} bannerFor={bannerType}  />
                        }
                    </Box>
                </Box>

            </Container>

            { params.get('enum') && (
                <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={CAPTCHA_KEY}
              />
            )}
        </>
    )
}
