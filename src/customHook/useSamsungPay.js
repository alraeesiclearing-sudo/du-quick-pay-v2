import axios  from 'axios';
import { useState, useEffect } from 'react';
import {MediaQueryCheck, IsRtl, GetLocaleData, GetDomain} from "./useGlobal";



function useSamsungPay() {
    
    const domain = GetDomain()
    const [isSamsungPayAble, setSamsungPayAble] = useState(true);
    
    
    // init Samsung Pay
    useEffect(() => {
        const script = document.createElement('script');
		script.src = 'https://d35p4vvdul393k.cloudfront.net/sdk_library/us/stg/ops/pc_gsmpi_web_sdk.js';
		script.async = true;
        script.addEventListener('load', () => {
            setSamsungPayAble(window.SamsungPay.checkMobileAndRunnable())
        })
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
    }, []);

    const SamsungPayClick = async (formdata) => {
        // const apiURL = domain+'/servlet/ContentServer?pagename=MA_SamsungTransaction'
        const apiURL = domain+'/servlet/ContentServer'

        // const apiURL = domain+'/servlet/ContentServer'
        /* const _config = {
            "pagename" : "MA_SamsungTransaction",
            "amount" : amountToPay || 200,
            "_authkey_" : window.$authKey,
        } */

        /* const formdata = new FormData();
        formdata.append("amount", amountToPay || 200);
        formdata.append("_authkey_", window.$authKey); */
        
        return await axios({
            url: apiURL,
            data: formdata,
            header: {},
            method: 'post'
        })
    }
    const SamsungPayConnect = (result, serviceId) => {
        // console.log('connecting[SamsungID]: ', serviceId)
        // var response = JSON.parse(result);
        var response = result;
		console.log("Samsung Response: "+response);
		var callback = domain + "/servlet/myaccount/en/mya-samsung-pay-intermediate-page.html";
		var cancel = window.location.href;
		window.SamsungPay.connect(response.id, response.href, serviceId, callback, cancel, "en_ae",response.encInfo.mod, response.encInfo.exp, response.encInfo.keyId);

    }

    return { isSamsungPayAble, SamsungPayClick, SamsungPayConnect }
}


export default useSamsungPay;