//See documentation for directions 
//https://docs.adyen.com/online-payments/drop-in-web/

// Step 1: Get available payment methods

// 0. Get clientKey - Make an API call to obtain the origin key with the provided API key
// https://docs.adyen.com/user-management/how-to-get-an-origin-key#generate-multiple-origin-keys

getClientKey().then(clientKey => {
    getPaymentMethods().then(paymentMethodsResponse => {

        const configuration = {
            environment: 'test',
            clientKey: clientKey, // Mandatory. clientKey from Customer Area
            paymentMethodsResponse,
            removePaymentMethods: ['paysafecard', 'c_cash'],
            onChange: state => {
                updateStateContainer(state); // Demo purposes only
            },
            onSubmit: (state, component) => {
                // state.data;
                // state.isValid;
                makePayment(state.data);
            }
        }
        // 1. Create an instance of AdyenCheckout
        // Use the configuration object to create an instance of AdyenCheckout. Then use the returned value to create and mount the instance of Drop-in. 
        const checkout = new AdyenCheckout(configuration);

        // 2. Create and mount the Component
        const dropin = checkout
            .create('dropin', {
                // Events
                onSelect: activeComponent => {
                    if (activeComponent.state && activeComponent.state.data) updateStateContainer(activeComponent.data); // Demo purposes only
                }
            })
            .mount('#dropin-container');
    });
});
