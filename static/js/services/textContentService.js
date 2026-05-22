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
        console.log(err);
    }
}
export default fetchTextContent;