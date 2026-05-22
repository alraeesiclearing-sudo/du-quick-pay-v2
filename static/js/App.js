import React, {useState, useContext, useMemo} from 'react';
import TagManager from 'react-gtm-module'

import { CssBaseline, ThemeProvider } from '@mui/material';
import duTheme from './assets/theme'
import TheHeader from "./components/TheHeader";
import Layout from "./components/Layout";
import {IsRtl} from "./customHook/useGlobal";

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import {  createTheme } from "@mui/material";
import { prefixer } from "stylis";
import Button from "@mui/material/Button";
import TheFooter from "./components/TheFooter";
import { DirectionContext } from './Contexts/DirectionContext'
import { SubHeaderContext } from './Contexts/SubHeaderContext'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

// pages
import QuickRechargeLanding from "./pages/QuickRechargeLanding";
import QuickPayLanding from "./pages/QuickPayLanding";
import QuickPayment from "./pages/QuickPayment";
import TouristRaffle from "./pages/tourist/TouristRaffle";
import Success from "./pages/Success";
import Form from "./pages/Form";


const cacheLtr = createCache({
    key: "muiltr"
});

const cacheRtl = createCache({
    key: "muirtl",
    // prefixer is the only stylis plugin by default, so when
    // overriding the plugins you need to include it explicitly
    // if you want to retain the auto-prefixing behavior.
    stylisPlugins: [prefixer, rtlPlugin]
});




function App() {
    
    const tagManagerArgs = {
        gtmId: 'GTM-KJPLS3Q'
    }

    const [isRtl, setIsRtl] = useState(window.location.href.indexOf("/ar/")> 1 ? true : false);
    const toggleRtl = (rtl) => {
        setIsRtl(!rtl);
        duTheme.direction = isRtl ? "rtl" : "ltr"
    }
    React.useLayoutEffect(() => {
        document.dir = isRtl ? "rtl" : "ltr";
    }, [isRtl]);
    const [isEntertainer, setIsEntertainer] = useState(false)
    // Callback function to receive data from the quickpayment.js for entertainer
    const getEntertainerInfo = (data) => {
        setIsEntertainer(data);
    };

    const direction = useMemo(
        () => ({ isRtl, setIsRtl }),
        [isRtl]
    );

    const [showHeader, setShowHeader] = useState(true);

    // window.$myaRedirectURL = `/servlet/myaccount/${isRtl ? 'ar' : 'en'}/mya-qpRedirect.html`
    //uncomment this
    window.$myaRedirectURL = `/servlet/myaccount/en/mya-qpRedirect.html`

    // Quick pay access
    // window.$myaRedirectURL = `http://172.24.245.83:8100/servlet/duaediscovery/common/discovery/quickpay-access.html`

    // tourist sim
    // window.$myaRedirectURL = `http://172.24.108.102:8100/servlet/duaediscovery/quickAPI/touristSim.html`

    // crypto recharge true mock
    // window.$myaRedirectURL = `https://run.mocky.io/v3/1005be33-3d96-4a53-a451-ed07a40d1575`

    // crypto recharge false mock
    // window.$myaRedirectURL = `https://run.mocky.io/v3/6e90b16b-a80f-4982-842c-b895ea71cf17`
    
    // prepaid sim
    // window.$myaRedirectURL = `http://172.24.108.102:8100/servlet/duaediscovery/quickAPI/prepaidSim.html`
    
    // postpaid sim
    // window.$myaRedirectURL = `http://172.24.108.102:8100/servlet/duaediscovery/quickAPI/postpaidSim.html`
    
    //crypto pay true
    // window.$myaRedirectURL = `https://run.mocky.io/v3/0bef7142-b08b-4547-ac80-60256a9299de`
    
    //ignite true
    // window.$myaRedirectURL = `http://172.24.108.102:8100/servlet/duaediscovery/quickAPI/postpaid-ignite.html`

    // enterprise
    // window.$myaRedirectURL = `http://172.24.245.83:8100/servlet/duaediscovery/common/discovery/enterprise.html`

    const RedirectDefault  = () => {
        // 👇️ redirect to external URL
        window.location.replace('https://myaccount.du.ae/');
        return null;
    }

    TagManager.initialize(tagManagerArgs)

    return (
        <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
        <ThemeProvider theme={duTheme}>
            <CssBaseline />
            <DirectionContext.Provider value={direction}>
                <Layout>
                    <SubHeaderContext.Provider value={{showHeader, setShowHeader}}>
                    <BrowserRouter basename="/">
                        
                            {(!isEntertainer) && (<TheHeader />)}
                        
                    <Routes>
                        {/*<Route path="/" element={<Form />} />*/}
                        <Route path="/:lang/quick-recharge" element={<QuickRechargeLanding />} />
                        <Route path="/:lang/quick-recharge/pay" element={<QuickPayment cardProcessor="visa" />}  />
                        <Route path="/:lang/quick-recharge/success" element={<Success />} />

                        <Route path="/:lang/quick-pay" element={<QuickPayLanding />} />
                        <Route path="/:lang/quick-pay/pay" element={<QuickPayment cardProcessor="visa" />}  />
                        <Route path="/:lang/quick-pay/success" element={<Success />} />
                        <Route path="*" element={<RedirectDefault />} />

                        {/*Tourist*/}
                        <Route path="/:lang/tourist/win" element={<TouristRaffle />} />
                    </Routes>
                    </BrowserRouter>
                    </SubHeaderContext.Provider>
                    <TheFooter type="A" />
                </Layout>
            </DirectionContext.Provider>
        </ThemeProvider>
        </CacheProvider>
    );
}

export default App;
