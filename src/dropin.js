//See documentation for directions 
//https://docs.adyen.com/online-payments/drop-in-web/

// Get clientKey - Make an API call to obtain the origin key with the provided API key
// https://docs.adyen.com/user-management/how-to-get-an-origin-key#generate-multiple-origin-keys

getClientKey().then(clientKey => {
  // Step 1: Get available payment methods
    getPaymentMethods().then(paymentMethodsResponse => { //defined in utils.js

        //Step 2: Add Drop-in to your payments form
        //Step 2-1,2,3: add js, css, and DOM object to index.html
        //Step 2-4: Create a configuration object
        const configuration = {
            environment: 'test',
            clientKey: clientKey, // Mandatory. clientKey from Customer Area. Web Drop-in versions before 3.10.1 use originKey instead of clientKey.
            paymentMethodsResponse,
            removePaymentMethods: ['paysafecard', 'c_cash'],
            onChange: state => {
                updateStateContainer(state); // Demo purposes only
            },
            onSubmit: (state, component) => {
                // state.data;
                // state.isValid;
                // Global configuration for onSubmit
                // Your function calling your server to make the `/payments` request
                
                //Step 2-6: Pass the state.data to your server.
                //Step 3: Make a payment
                makePayment(state.data) // defined in utils.js
                .then(response => {
                    if (response.action) {
                      // Drop-in handles the action object from the /payments response
                      dropin.handleAction(response.action);
                    } else {
                      // Your function to show the final result to the shopper
                      showFinalResult(response);
                      console.log(response);

                    }
                  })
                  .catch(error => {
                    throw Error(error);
                  });
            },
            onAdditionalDetails: (state, dropin) => {
                // Your function calling your server to make a `/payments/details` request
                makeDetailsCall(state.data)
                  .then(response => {
                    if (response.action) {
                      // Drop-in handles the action object from the /payments response
                      dropin.handleAction(response.action);
                    } else {
                      // Your function to show the final result to the shopper
                      showFinalResult(response);
                      console.log(response);
                    }
                  })
                  .catch(error => {
                    throw Error(error);
                  });
              },
              paymentMethodsConfiguration: {
                card: { // Example optional configuration for Cards
                  hasHolderName: true,
                  holderNameRequired: true,
                  enableStoreDetails: true,
                  hideCVC: false, // Change this to true to hide the CVC field for stored cards
                  name: 'Credit or debit card',
                  onSubmit: () => {}, // onSubmit configuration for card payments. Overrides the global configuration.
                }
              }
        }
        // Step 2-5: Use the configuration object to create an instance of AdyenCheckout. Then use the returned value to create and mount the instance of Drop-in. 
        const checkout = new AdyenCheckout(configuration);
        // Create and mount the Component
        const dropin = checkout
            .create('dropin', {
                // Events
                onSelect: activeComponent => {
                    if (activeComponent.state && activeComponent.state.data) updateStateContainer(activeComponent.data); // Demo purposes only
                }
            })
            .mount('#dropin-container');
      // Step 6: Present the payment result 
      const showFinalResult = (res) =>{
        if (res.resultCode == 'Authorised') {
          dropin.setStatus('success', { message: 'Payment successful!' });
        } else if (res.resultCode == 'Refused') {
          dropin.setStatus('error', { message: 'Something went wrong.'});
        }
      }

    });
});

