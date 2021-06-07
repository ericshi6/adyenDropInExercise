//const { CHECKOUT_APIKEY, MERCHANT_ACCOUNT, CLIENT_KEY } = process.env;
//hard coded env 
const CHECKOUT_APIKEY='AQEyhmfxK4zJbBZDw0m/n3Q5qf3VaY9UCJ1+XWZe9W27jmlZiniYHPZ+YtXG9dYfNdwN0H8QwV1bDb7kfNy1WIxIIkxgBw==-uA2G0DS73SlmB4EHi/YNndhli7KlCMjXHbMmm8stboc=-djvcdM2gNHq9dSvC';
const MERCHANT_ACCOUNT='TestAccountNY';
const CLIENT_KEY='pub.v2.8016227695560099.aHR0cHM6Ly90cmFucXVpbC10ZW1wbGUtNTUwMjEuaGVyb2t1YXBwLmNvbQ.5HuglU6lcGek1jawBnDRvsT3gSSmYksLZ0ZD5kwzTY0';

const API_VERSION = 'v67';
const CHECKOUT_URL = `https://checkout-test.adyen.com/${API_VERSION}`;

module.exports = {
    CHECKOUT_APIKEY,
    CHECKOUT_URL,
    MERCHANT_ACCOUNT,
    CLIENT_KEY
};

