import axios from 'axios';
import { useState, useEffect } from 'react';
import {MediaQueryCheck, IsRtl, GetLocaleData, GetDomain} from "./useGlobal";


function useGooglePay(serviceId) {
    const domain = GetDomain()
    const locale = IsRtl ? 'ar': 'en';
    const orgID = '1snn5n9w';
    const getByID = (id) => {
        return document.getElementById(id);
    }
    
    const [isGooglePayAble, setGooglePayAble] = useState(false);
    
    let paymentToken = null;
    let paymentsClient = null;
    let payAmt = null || "1";
    let thisFormData = null;
    let handlePaymentErrors = null;
    
    const baseRequest = {
        apiVersion: 2,
        apiVersionMinor: 0
    };
    
    const allowedCardNetworks = ["AMEX", "MASTERCARD", "VISA"];
    const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];
    const tokenizationSpecification = {
        type: 'PAYMENT_GATEWAY',
        parameters: {
            'protocolVersion': 'ECv2',
            'gateway': 'cybersource',
            'gatewayMerchantId': 'du_googlepay',
            'publicKey': '38kiQXtuDnvJdlRsxFIMLBpuZJR/6YSVvcj2JrUkqds=' //will be overridden
        }
    };
    
    const baseCardPaymentMethod = {
        type: 'CARD',
        parameters: {
            allowedAuthMethods: allowedCardAuthMethods,
            allowedCardNetworks: allowedCardNetworks,	
            "assuranceDetailsRequired": true,
            "billingAddressRequired": true
        }
    };
    
    const cardPaymentMethod = Object.assign( {}, baseCardPaymentMethod, { tokenizationSpecification: tokenizationSpecification} );
    
    function getGoogleIsReadyToPayRequest() {
        return Object.assign( {}, baseRequest, { allowedPaymentMethods: [baseCardPaymentMethod] } );
    }
    
    function getGooglePaymentDataRequest() {
        const paymentDataRequest = Object.assign({}, baseRequest);
        paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
        paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
        paymentDataRequest.merchantInfo = {
            merchantId: 'du_googlepay', // will be overridden
            merchantName: 'du'
        };
        
        paymentDataRequest.callbackIntents = ["PAYMENT_AUTHORIZATION"];
        return paymentDataRequest;
    }
    
    function getGooglePaymentsClient() {
        if ( paymentsClient === null ) {
            paymentsClient = new window.google.payments.api.PaymentsClient({
                // environment: 'TEST',
                environment: 'PRODUCTION',
                paymentDataCallbacks: {
                    onPaymentAuthorized: onPaymentAuthorized
                }
            });
        }
        return paymentsClient;
    }
    
    function onPaymentAuthorized(paymentData) {
        return new Promise(function(resolve, reject){
            // handle the response
            processPayment(paymentData)
            .then(function() {
                resolve({transactionState: 'SUCCESS'});
            })
            .catch(function() {
                resolve({
                    transactionState: 'ERROR',
                    error: {
                        intent: 'PAYMENT_AUTHORIZATION',
                        message: 'Insufficient funds',
                        reason: 'PAYMENT_DATA_INVALID'
                    }
                });
            });
        });
    }
    
    function onGooglePayLoaded() {
        const paymentsClient = getGooglePaymentsClient();
        paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
        .then(function(response) {
            if (response.result) {
                // addGooglePayButton();
                // console.log('response.result :>> ', response);
                
                response.result && setGooglePayAble(true)
            }
        })
        .catch(function(err) {
            // show error in developer console for debugging
            console.error(err);
        });
    }

    
    function addGooglePayButton() {
        const paymentsClient = getGooglePaymentsClient();
        const button = paymentsClient.createButton({
            onClick: onGooglePaymentButtonClicked,
            allowedPaymentMethods: [baseCardPaymentMethod]
        });
        //document.getElementById('container').appendChild(button);
    }
    
    function getGoogleTransactionInfo() {
        return {
            displayItems: [
                {
                    label: "Subtotal",
                    type: "SUBTOTAL",
                    price: "11.00",
                },
                {
                    label: "Tax",
                    type: "TAX",
                    price: "1.00",
                }
            ],
            countryCode: 'AE',
            currencyCode: "AED",
            totalPriceStatus: "FINAL",
            totalPrice: payAmt,
            totalPriceLabel: "Total"
        };
    }
    
    /**
    * Show Google Pay payment sheet when Google Pay payment button is clicked
    */
    function onGooglePaymentButtonClicked(formdata, gPayServiceId, gPayMerchantId , _handlePaymentErrors) {
        thisFormData = formdata
        handlePaymentErrors = _handlePaymentErrors

        // assign dynamic Public key
        cardPaymentMethod.tokenizationSpecification.parameters.publicKey = gPayServiceId

        // console.log('amount to be paid: ', thisFormData.get('amount'))
        payAmt = thisFormData.get('amount')
        
        const paymentDataRequest = getGooglePaymentDataRequest();
        paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
        paymentDataRequest.merchantInfo.merchantId = gPayMerchantId
        // console.log('paymentDataRequest :>> ', paymentDataRequest);
        
        const paymentsClient = getGooglePaymentsClient()
        paymentsClient.loadPaymentData(paymentDataRequest)
            .then(() => {
                // console.log('successful googlePay window')
            })
            .catch((error) => {
                console.log('user error: ', error)
                handlePaymentErrors('500')
            });

        // console.log('paymentsClient :>> ', paymentsClient);
    }
    
    /**
     * Process payment data returned by the Google Pay API
     *
     * @param {object} paymentData response from Google Pay API after user approves payment
     * @see {@link https://developers.google.com/pay/api/web/reference/response-objects#PaymentData|PaymentData object reference}
     */
    function processPayment(paymentData) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                
                // console.log('paymentData :>> ', paymentData);
                
                paymentToken = paymentData.paymentMethodData.tokenizationData.token;
                // console.log("without encode paymentToken: " + paymentToken);
                
                const card = paymentData.paymentMethodData.info.cardDetails;
                // console.log("card: ", card);
                
                const cardNetwork = paymentData.paymentMethodData.info.cardNetwork;
                // console.log("cardNetwork: ", cardNetwork);
                
                const assuranceDetails = paymentData.paymentMethodData.info.assuranceDetails.cardHolderAuthenticated;
                // console.log("assuranceDetails: ", assuranceDetails);
                
                const enc = window.btoa(paymentToken);
                // console.log("With encode: ", enc);
                
                const _url = domain + '/servlet/ContentServer'
                // console.log("payment Type: ", thisFormData.get('merchantpaymentType'))

                const successURL = domain + "/servlet/myaccount/" + locale + "/mya-new-quick-recharge-pay-success.html";
                // console.log('successURL :>> ', successURL);
                
                if(assuranceDetails == true){
                    // 3DS Flow

                    const inputJson1 = {
                        _authkey_: window.$authKey,
                        pagename: "MA_ProcessWalletPayment",
                        amount: payAmt,
                        paymentType: thisFormData.get('merchantpaymentType') == "quick.recharge" ? "GOOGLE_PAYRECHARGE" : "GOOGLE_PAYPAYMENT",
                        inputToken: enc
                    }
                    // console.log('inputJson1 :>> ', inputJson1);
                    
                    axios({
                        url: _url,
                        data: inputJson1,
                        method: 'post'
                    })
                    .then((resp) => {
                        if (resp.code == "200") {
                            console.log("Success! Payment Completed!!");
                            // console.log("respone data: ", resp.data);
                            window.location.href = successURL;	
                        }
                        else {
                            handlePaymentErrors(resp.code)
                        }
                    })
                    .catch((error) => {
                        console.log('error Process wallet :>> ', error)
                        handlePaymentErrors("500")
                    })
                }
                else {
                    // PAN flow
                    thisFormData.append("gPayToken", enc)
                    
                    axios({
                        url: _url,
                        data: thisFormData,
                        method: 'POST'
                    })
                    .then((resp) => {
                        console.log('success PAN flow: ')
                        const {code, accessToken, deviceDataCollectionUrl, trnRefNr, merchId} = resp.data;
                        const $iframe = getByID('cardinal_collection_iframe');
                        const $form = getByID('cardinal_collection_form');
                        const $jwt = getByID('cardinal_collection_form_input');
                        
                        // Prepare Collection Form
                        const prepCollectionForm = (params) => {

                            $iframe.setAttribute('src', params.deviceDataCollectionUrl);
                            $form.setAttribute('action', params.deviceDataCollectionUrl);
                            $form.setAttribute('data-trn', params.trnRefNr);
                            // $form.setAttribute('data-pan', data.card.replace(/\s/g, ''));
                            $jwt.setAttribute('value', params.accessToken)

                            $form.submit();
                            console.log('Collection Form Submittted...');
                        }

                        if (code == 200) { //success
                            const fPrintURL = `https://h.online-metrix.net/fp/tags.js?org_id=${orgID}&session_id=${merchId}${window.sessionID}`;
                            // console.log('finger print URL: ', fPrintURL);
                            axios(fPrintURL).then((resp) => {
                                // console.log('response from FingerPrint: ', resp.data);
                            }).catch((error) => {
                                console.log('fingerPrint Error: ',error);
                            });

                            prepCollectionForm({code, accessToken, deviceDataCollectionUrl, trnRefNr});
                        }
                        else { //handle errors
                            handlePaymentErrors(code)
                        }
                    })
                    .catch((error) => {
                        console.log('error PAN flow :>> ', error)
                        handlePaymentErrors("500")
                    })
                }
                
                resolve({})
            }, 3000)
        })
    }
    
    // Load script google pay api
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://pay.google.com/gp/p/js/pay.js';
        script.async = true;
        script.addEventListener('load', () => {
            // console.log('testing googlePay: ', window.google.payments.api)
            
            onGooglePayLoaded()
        })
        document.body.appendChild(script);
        
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    
    // exports
    return { isGooglePayAble, onGooglePaymentButtonClicked }
    
}

export default useGooglePay;