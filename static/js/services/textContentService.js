import axios from 'axios'
import {GetDomain} from "../customHook/useGlobal";

const fetchTextContent = async () => {
    const domain = GetDomain()
    try{
        const response = await axios.get(domain + "/du/common/myaccount/backend-routine/json/landingPageData.json");
        // const response = await axios.get("http://172.24.245.83:8100/servlet/duaediscovery/common/discovery/landingPageData.json");
        return response.data;
    }
    catch(err){
        console.error("Error fetching landing page data:", err);
        // Return default data on error
        return {
            errorMsg: {
                error: false,
                message: {
                    ar: "لا توجد أخطاء",
                    en: "No errors"
                }
            },
            PayBillOffer: {
                title: "Pay Your Bill",
                description: "Pay your bill easily and quickly",
                image: "/static/images/pay-bill.svg",
                discount: "10%",
                offerText: "Special Offer"
            },
            banner: {
                title: "Download du App",
                description: "Get the best experience with du app",
                image: "/static/images/app-banner.svg",
                ctaText: "Download Now",
                ctaUrl: "https://www.du.ae/ar/app"
            }
        };
    }
}
export default fetchTextContent;