// Config object to be passed to Msal on creation
const msalConfig = {
    auth: {
        clientId: "bbdb07ea-501d-49cb-9de0-4c0fcd51e184",
        authority: "https://myBTCtenantDomain.b2clogin.com/myBTCtenantDomain.onmicrosoft.com/B2C_1_signupsignin1",
        knownAuthorities: ["myBTCtenantDomain.b2clogin.com"]
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        allowNativeBroker: false // Disables WAM Broker
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
const tokenRequest = {
    scopes: ["bbdb07ea-501d-49cb-9de0-4c0fcd51e184"],
    forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
};
