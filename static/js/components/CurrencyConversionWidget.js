import {
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {IsRtl} from "../customHook/useGlobal";

const useStyles = makeStyles((theme) => {
    return {
        cardWidget: {
            "&.MuiCard-root": {
                    background: "transparent",
                    border: 0,
                    borderRadius: 0,
            },
            "& .MuiCardContent-root:last-child":{
                paddingBottom: 0
            }
        }
    }
})

export default function CurrencyConversionWidget(props) {

    const classes = useStyles();
    // const theme = useTheme();

    const amountToPayInAED = props.props.currency1 == null ? 1 : props.props.currency1
    const equivalentInUSD = props.props.currency2 == 0 ? 0.27 : props.props.currency2

    const FlagAE = () => {
        return (
            <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#uaeflag)">
                    <g>
                        <path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="white"/>
                        <path fillRule="evenodd" d="M0 10H21V15H0V10Z" fill="black"/>
                        <path fillRule="evenodd" d="M0 0H21V5H0V0Z" fill="#007E35"/>
                        <path fillRule="evenodd" d="M0 0V15H6V0H0Z" fill="#FF0400"/>
                        <path d="M19 0.5H2C1.17157 0.5 0.5 1.17157 0.5 2V13C0.5 13.8284 1.17157 14.5 2 14.5H19C19.8284 14.5 20.5 13.8284 20.5 13V2C20.5 1.17157 19.8284 0.5 19 0.5Z" stroke="black" strokeOpacity="0.1"/>
                    </g>
                </g>
                <defs>
                    <clipPath id="uaeflag">
                        <rect width="21" height="15" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        )
    }

    const FlagUS = () => {
        return (
            <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_994_1569)">
                    <g mask="url(#mask0_994_1569)">
                        <path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="white"/>
                        <path fillRule="evenodd" d="M0 0H9V7H0V0Z" fill="#444379"/>
                        <path fillRule="evenodd" d="M1 1V2H2V1H1ZM3 1V2H4V1H3ZM5 1V2H6V1H5ZM7 1V2H8V1H7ZM6 2V3H7V2H6ZM4 2V3H5V2H4ZM2 2V3H3V2H2ZM1 3V4H2V3H1ZM3 3V4H4V3H3ZM5 3V4H6V3H5ZM7 3V4H8V3H7ZM1 5V6H2V5H1ZM3 5V6H4V5H3ZM5 5V6H6V5H5ZM7 5V6H8V5H7ZM6 4V5H7V4H6ZM4 4V5H5V4H4ZM2 4V5H3V4H2Z" fill="#A7B6E7"/>
                        <path fillRule="evenodd" d="M9 0V1H21V0H9ZM9 2V3H21V2H9ZM9 4V5H21V4H9ZM9 6V7H21V6H9ZM0 8V9H21V8H0ZM0 10V11H21V10H0ZM0 12V13H21V12H0ZM0 14V15H21V14H0Z" fill="#ED4C49"/>
                        <path d="M19 0.5H2C1.17157 0.5 0.5 1.17157 0.5 2V13C0.5 13.8284 1.17157 14.5 2 14.5H19C19.8284 14.5 20.5 13.8284 20.5 13V2C20.5 1.17157 19.8284 0.5 19 0.5Z" stroke="black" strokeOpacity="0.1"/>
                    </g>
                </g>
                <defs>
                    <clipPath id="clip0_994_1569">
                        <rect width="21" height="15" fill="white"/>
                    </clipPath>
                </defs>
            </svg>

        )
    }

    const cardData = {
        titleLbl: {
            en: "About the currency conversion",
            ar: " حول تحويل العملات"
        },
        desc: {
            en: "Additional fees that may be applied by your bank if you are paying with a non-UAE-issued card. You will be charged in the local currency of the card you use.",
            ar: " قد يتم احتساب رسوم إضافية من قِبل مصرفك عند الدفع ببطاقة غير صادرة من الإمارات العربية المتحدة وسوف يتم احتساب الرسوم وفقاً لعملة البلد الذي صدرت منه البطاقة. "
        },
        approximateLbl: {
            en: "is approximately",
            ar: "تعادل تقريبا ",
        },
        currencyAEDLbl: {
            en: "AED",
            ar: "درهماً"
        },
        currencyUSDLbl: {
            en: "USD",
            ar: "دولار أمريكي"
        },
    }

    const isRtl = IsRtl()
    const GetLocaleData = (obj) => {
        return isRtl ?  obj["ar"] : obj["en"];
    }

    return (
        <>
            <Card variant="outlined" className={classes.cardWidget}>
                <CardContent sx={{p:0}}>
                    <Typography variant="h6" component="h4" gutterBottom>
                        { GetLocaleData(cardData.titleLbl) }
                    </Typography>
                    <Box sx={{border: "1px solid #ddd", borderRadius: 1, px:4, my: 4}}>
                        <Typography variant="body3" sx={{display:"flex", gap: "5px", my:3}}>
                            <FlagAE />
                            <span>
                                <strong>{!isRtl ?  (GetLocaleData(cardData.currencyAEDLbl) + " " + amountToPayInAED) : amountToPayInAED  + " " + (GetLocaleData(cardData.currencyAEDLbl)) }</strong> { GetLocaleData(cardData.approximateLbl)}
                            </span>
                            <FlagUS />
                            <strong>  {!isRtl && (GetLocaleData(cardData.currencyUSDLbl) )}  {equivalentInUSD}  {isRtl && (GetLocaleData(cardData.currencyUSDLbl) )} </strong>
                        </Typography>
                    </Box>

                    <Typography variant="body3" component="div">
                        { GetLocaleData(cardData.desc) }
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}