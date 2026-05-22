import { createTheme } from "@mui/material";
const direction = window.location.href.indexOf("/ar/")> 1 ? "rtl" : "ltr"

let theme = createTheme({
    palette: {
        common: {
            red: "#F44242",
            green: "#78BE20",
            orange: "#FF8200",
            black: "#000",
            white: "#fff",
            grey: "#333",
            magenta: "#C724B1", // primary
            aqua: "#00A9CE", // secondary
            violet: "#753BBD",
            navy: "#00205B",
            burgundy: "#69145A"
        }
    },
    typography: {
        fontFamily: direction=="rtl" ? "Dubai" : "ProximaNova",
    },
    grey: {
        50: "#F8F8F8",
        100: "#F8F8F8",
        200: "#EEEEEE",
        300: "#DDDDDD",
        400: "#CCCCCC",
        500: "#999999",
        600: "#777777",
        700: "#777777",
        800: "#333333",
        900: "#333333",
        A100: "#fafafa",
        A200: "#EEEEEE",
        A400: "#CCCCCC",
        A700: "#777777",
    },
    spacing: 4,
});

theme = createTheme(theme, {
    palette: {
        gradients: {
            navyVioletAqua: `linear-gradient(65deg, ${theme.palette.common.navy} 10%, ${theme.palette.common.violet} 35%, ${theme.palette.common.aqua} 90%)`,
            magentaVioletAqua: `linear-gradient(65deg, ${theme.palette.common.magenta} 10%, ${theme.palette.common.violet} 35%, ${theme.palette.common.aqua} 90%)`,
            magentaViolet:`linear-gradient(270deg, #2F1BAF 0%, #8104A7 100%)`,
            navyAqua: `linear-gradient(65deg, ${theme.palette.common.navy} 10%, ${theme.palette.common.aqua} 60%)`,
            navyViolet: `linear-gradient(65deg, ${theme.palette.common.navy} 10%, ${theme.palette.common.violet} 60%)`,
            violetAqua: `linear-gradient(65deg, ${theme.palette.common.violet} 10%, ${theme.palette.common.aqua} 60%)`,
            violetMagenta: `linear-gradient(65deg, ${theme.palette.common.violet} 10%, ${theme.palette.common.magenta} 60%)`,
        }
    },
});

const duTheme = createTheme(theme, {
    direction: direction,
    palette: {
        primary: {
            main: theme.palette.common.magenta,
            contrastText: theme.palette.common.white
        },
        secondary: {
            main: theme.palette.common.aqua,
        },
        error: {
            main: theme.palette.common.red,
            contrastText: theme.palette.common.white
        },
        navy: {
            main: theme.palette.common.navy,
            contrastText: theme.palette.common.white
        },
        warning: {
            main: theme.palette.common.orange,
        },
        info: {
            main: theme.palette.common.aqua,
            bg: "rgba(0, 169, 206, 0.08)"
        },
        success: {
            main: theme.palette.common.green
        },
        text: {
            primary: theme.palette.common.grey,
            secondary: "#b78eff",
            disabled: "#b78eff"
        },
        light:{
            main: theme.palette.common.white, // The main color for the button background
            contrastText: theme.palette.common.black,
        },
        dark:{
            main: theme.palette.common.black, // The main color for the button background
            contrastText: theme.palette.common.white,
        },
        divider: "rgba(0, 0, 0, 0.12)",
        // action: {
        //     active: "",
        //     hover: "",
        //     hoverOpacity: "",
        //     selected: "",
        //     selectedOpacity: "",
        //     disabled: "",
        //     disabledBackground: "",
        //     disabledOpacity: "",
        //     focus: "",
        //     focusOpacity: "",
        //     activatedOpacity: ""
        // },
        // gradients: {
        //     navVioAqu: gradients.navyVioletAqua,
        //     magVioAqu: gradients.magentaVioletAqua,
        //     navAqu: gradients.navyAqua,
        //     navVio: gradients.navyViolet,
        //     vioAqu: gradients.violetAqua,
        // }
    },

    typography: {
        fontSize: 16,
        htmlFontSize: 16,
        styleOverrides: {
            root: {
                lineHeight: 1.2,
            },
            gutterBottom: {
                marginBottom: theme.spacing(5),
            }
        },
        h1: {
            fontFamily: "duCoHeadline16",
            fontSize: "48px",
            lineHeight: "60px",
            [theme.breakpoints.down("md")]: {
                fontSize: "32px",
                lineHeight: "40px"
            },
        },
        h2: {
            fontFamily: "duCoHeadline16",
            fontSize: "36px",
            lineHeight: "44px",
            [theme.breakpoints.down("md")]: {
                fontSize: "28px",
                fontSize: "36px",
            },
        },
        h3: {
            fontFamily: "duCoHeadline16",
            fontSize: "32px",
            lineHeight: "40px",
            [theme.breakpoints.down("md")]: {
                fontSize: "24px",
                lineHeight: "32px"
            },
        },
        h4: {
            fontFamily: "duCoHeadline16",
            fontSize: "24px",
            lineHeight: "32px",
            fontWeight: 700,
            fontFamily: direction=="rtl" ? "Dubai" : "ProximaNova",
            [theme.breakpoints.down("md")]: {
                fontSize: "22px",
                lineHeight: "28px",
            },
        },
        h5: {
            fontSize: "20px",
            lineHeight: "24px",
            fontWeight: 700,
            fontFamily: direction=="rtl" ? "Dubai" : "ProximaNova",
        },
        h6: {
            fontSize: "17px",
            lineHeight: "22px",
            fontWeight: 700,
            fontFamily: direction=="rtl" ? "Dubai" : "ProximaNova",
        },
        subtitle1: {
            fontSize: "20px",
            lineHeight: "28px",
            fontWeight: 500,
            fontFamily: direction=="rtl" ? "Dubai" : "ProximaNova",
        },
        subtitle2: {
            fontSize: "17px",
            lineHeight: "24px",
            fontFamily: direction=="rtl" ? "Dubai" : "ProximaNova",
        },
        body1: {
            fontSize: "17px",
            lineHeight: "24px",
            "&.MuiTypography-gutterBottom": {
                marginBottom: theme.spacing(2.5),
            }
        },
        body2: {
            fontSize: "15px",
            lineHeight: "22px",
        },
        body3: {
            fontSize: "13px",
            lineHeight: "18px",
        },
        small: {
            fontSize: "12px",
        },
        button: {

        },
        caption: {

        },
        overline: {

        }
    },
    components: {
        MuiPaper:{
            styleOverrides: {
                root: {
                },
                raised:{
                    boxShadow: "0px 3px 6px 0px rgba(0, 0, 0, 0.10)"
                }
            }
        },
        MuiCardActionArea:{
            styleOverrides: {
                root: {
                    fontSize: "inherit"
                }
             }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                },
                h5: {
                    "&.MuiTypography-gutterBottom": {
                        marginBottom: theme.spacing(2),
                    }
                }
            },
            // variants: [
            //     {
            //         props: {
            //             variant: "body2"
            //         },
            //         style: {
            //             fontSize: "14px",
            //         }
            //     }
            // ]
        },
        MuiTab:{
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontSize: "16px",
                    color: "#333"
                }
            }
        },
        MuiButton: {
            defaultProps: {
                disableRipple: true,
            },
            styleOverrides: {
                root: {
                    textTransform: "none",
                    minWidth: "180px",
                    fontSize: "1rem",
                    fontWeight: 600
                },
                containedPrimary: {
                    background: theme.palette.gradients.violetMagenta,
                    "&.Mui-disabled": {
                        opacity: .1,
                        color: theme.palette.common.white,
                        backgroundColor: "transparent"
                    }
                },
                containedSecondary: {
                    color: theme.palette.common.white,
                },
                containedDark: {
                    color: theme.palette.common.black,
                },
                outlinedPrimary: {
                    color: theme.palette.common.magenta,
                    background: theme.palette.gradients.violetMagenta,
                    position: "relative",
                    zIndex: 1,
                    // border: 0 + "!important",
                    border: 0,
                    "&::before": {
                        content: "''",
                        position: "absolute",
                        background: theme.palette.common.white,
                        width: "calc(100% - 4px)",
                        height: "calc(100% - 4px)",
                        left: "2px",
                        top: "2px",
                        zIndex: -2,
                        borderRadius: "8px"
                    },
                    "&.MuiButton-outlined": {
                        "&:before": {
                            border: 0,
                        },
                        "&:hover": {
                            "&:before": {
                                background: "transparent",
                            },
                            color: theme.palette.common.white,
                            border: 0,
                        }
                    },"&.Mui-disabled": {
                        background: theme.grey[300],
                        borderColor:theme.grey[300],
                        color: theme.palette.common.grey,
                        "&:before":{
                            background: theme.grey[300]
                        }
                    }

                },
                outlinedSecondary: {
                    color: theme.palette.common.aqua,
                    borderColor: theme.palette.common.aqua,
                    minWidth: "180px",
                    "&:hover": {
                        color: theme.palette.common.white,
                        background: theme.palette.common.aqua,
                    }
                },
                outlinedSecondary: {
                    color: theme.palette.common.aqua,
                    borderColor: theme.palette.common.aqua,
                    minWidth: "180px",
                    "&:hover": {
                        color: theme.palette.common.white,
                        background: theme.palette.common.aqua,
                    }
                },
                textPrimary: {
                    minWidth: "180px",
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    minWidth: "400px",
                    "&.MuiFormControl-fullWidth": {
                        width: "100%",
                        minWidth: "auto"
                    },
                    "& .MuiFormHelperText-root": {
                        color: theme.palette.common.grey,
                        fontSize: "13px",
                        "&.Mui-error": {
                            color: theme.palette.common.grey
                        }
                    },
                    "& .MuiInputLabel-root": {
                        color: theme.palette.common.grey,
                        zIndex: 101,
                        "&.Mui-error": {
                            color: theme.palette.common.red
                        }
                    }
                },

            }
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    "&.MuiCheckbox-colorError": {
                        color: theme.palette.common.red
                    },
                    "&.Mui-checked": {
                        color: theme.palette.common.magenta
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {

                    "&.Mui-focused": {
                        background: theme.palette.gradients.magentaVioletAqua,
                        "&::after": {
                            background: theme.palette.common.white,
                            content: "''",
                            top: "2px",
                            left: "2px",
                            width: "calc(100% - 4px)",
                            height: "calc(100% - 4px)",
                            borderRadius: "8px",
                            position: "absolute",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "transparent",
                            border: "0",
                        }
                    }
                },
                input: {
                    background: "transparent",
                    padding: "10px 14px",
                    zIndex: 100
                }
            }
        },
        MuiInputAdornment: {
            styleOverrides: {
                root: {
                    zIndex: 5,
                    position: "relative"
                }
            }
        },
        MuiInputBase: {

        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    // color: theme.palette.text.primary,
                    transform: "translate(14px, 10px) scale(1)",
                    "&.Mui-focused": {
                        color: theme.palette.common.aqua,
                        transform: "translate(14px, -9px) scale(.75)",
                        padding: "0 4px",
                        background: theme.palette.common.white
                    },
                    "&.MuiFormLabel-filled": {
                        color: theme.palette.common.navy,
                        transform: "translate(14px, -9px) scale(.75)"
                    },
                    "&.MuiInputLabel-shrink": {
                        transform: "translate(14px, -9px) scale(.75)"
                    }
                },
            }
        },
        MuiFilledInput: {
            root: {

            }
        },
        MuiLoadingButton: {
            styleOverrides: {
                root: {
                    "& .MuiLoadingButton-loadingIndicator": {
                        color: theme.palette.common.white
                    },
                }
            }
        },
        MuiDivider:{
            styleOverrides: {
                vertical:{height:"100%"}
            }
        },
        MuiAccordion:{
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    border: "none",
                    "&::before": {
                        content: "none",
                    },
                    "& .MuiAccordionSummary-content":{
                        alignItems: "center"
                    }
                }
            }
        }
    },
    shape: {
        borderRadius: 10,
    },
    // spacing: 4,
});
export default duTheme;
