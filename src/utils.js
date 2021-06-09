// Step 1: Get available payment methods
const paymentMethodsConfig = {
    shopperReference: 'Checkout Components sample code test',
    reference: 'Checkout Components sample code test',
    countryCode: 'US',
    amount: {
        value: 1000,
        currency: 'USD'
    },
    channel: 'Web',
    merchantAccount: 'TestAccountNY'
};

//Step 3: Make a payment
const paymentsDefaultConfig = {
    shopperReference: 'Checkout Components sample code test',
    reference: 'Checkout Components sample code test',
    countryCode: 'US',
    channel: 'Web',
    //returnUrl: 'http://localhost:3000/thanks.html',
    returnUrl: 'https://boiling-atoll-49990.herokuapp.com/thanks.html',  //return url needs to be hardcoded since it is not relative to the redirect path
    amount: {
        value: 1000,
        currency: 'USD'
    },
    lineItems: [
        {
            id: '1',
            description: 'Test Item 1',
            amountExcludingTax: 10000,
            amountIncludingTax: 11800,
            taxAmount: 1800,
            taxPercentage: 1800,
            quantity: 1,
            taxCategory: 'High'
        }
    ]
};

// Generic POST Helper
// Adyen endpoint was defined in config.js
const httpPost = (endpoint, data) =>
    fetch(`/${endpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json());

// Step 1: Get all available payment methods from the local server (posts to /paymentMethods)
const getPaymentMethods = () =>
    httpPost('paymentMethods', paymentMethodsConfig)
        .then(response => {
            if (response.error) throw 'No paymentMethods available';

            return response;
        })
        .catch(console.error);

// Step 3: Make a payment
// Posts a new payment into the local server
const makePayment = (paymentMethod, config = {}) => {
    const paymentsConfig = { ...paymentsDefaultConfig, ...config };
    const paymentRequest = { ...paymentsConfig, ...paymentMethod };
    // payment method is STATE_DATA 
    // spread operator combines the objects into one
    // STATE_DATA is the paymentMethod field of an object passed from the front end or client app, deserialized from JSON to a data structure.

    updateRequestContainer(paymentRequest);

    return httpPost('payments', paymentRequest)
        .then(response => {
            if (response.error) throw 'Payment initiation failed';

            updateResponseContainer(response);

            return response;
        })
        .catch(console.error);
};

// Fetches an originKey from the local server
const getOriginKey = () =>
    httpPost('originKeys')
        .then(response => {
            if (response.error || !response.originKeys) throw 'No originKey available';

            return response.originKeys[Object.keys(response.originKeys)[0]];
        })
        .catch(console.error);

// Fetches a clientKey from the local server
const getClientKey = () =>
    httpPost('clientKeys')
        .then(response => {
            if (response.error || !response.clientKey) throw 'No clientKey available';

            return response.clientKey;
        })
        .catch(console.error);

// I should have switched the function and the .env to getOriginKey / originKey