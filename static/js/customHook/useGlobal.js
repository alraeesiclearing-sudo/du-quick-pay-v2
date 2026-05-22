import { useState, useContext } from "react";
import {useTheme, useMediaQuery} from "@mui/material";
import {DirectionContext} from "../Contexts/DirectionContext";

import axios from "axios";

// context consumer customHook
const useRtlContext = () => {
    // get the context
    const {isRtl, setIsRtl} = useContext(DirectionContext);

    // if `undefined`, throw an error
    if (isRtl === undefined) {
        throw new Error("useUserContext was used outside of its Provider");
    }

    return isRtl;
};

export function Media() {

    const theme = useTheme()

    return (
        {
            matchesSM: useMediaQuery(theme.breakpoints.down("md")),
            matchesMD: useMediaQuery(theme.breakpoints.up("md")),
            matchesLG: useMediaQuery(theme.breakpoints.up("lg")),
        }
    )
}

// function use to check media screen size
export function MediaQueryCheck(key) {
    const theme = useTheme()
    var size = "";
    if (key === "sm") {
        size = theme.breakpoints.down("md")
    } else if (key === "xs") {
        if (key === "xs") {
            size = theme.breakpoints.down("sm")
        }
    } else {
        size = theme.breakpoints.up(key)
    }

    return useMediaQuery(size)
}

// function to check isRTL
export function IsRtl() {
    return useRtlContext() ?  true : false
}

export function GetLocaleData(obj) {
    return useRtlContext() ?  obj["ar"] : obj["en"];
}

export function GetDomain() {
    const domain = document.getElementById("domain")
    return domain !== null && domain.value.length ? domain.value  : window.location.origin
}

export const GetError = (code, callBack) => {
    axios(GetDomain() + "/du/common/myaccount/backend-routine/error.json")
        .then((resp) => {
            const errors = resp.data
            callBack( errors.Error.filter((err) => err.error_key === code)[0] )
        })
        .catch((e) => console.log(e))
}