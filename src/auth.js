let signInType;
let accountId = "";

// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new msal.PublicClientApplication(msalConfig);

// Register Callbacks for Redirect flow
console.log("Calling myMSALObj.initialize()...");
myMSALObj.initialize().then(() => {
    console.log("   myMSALObj.initialize() response received");
    console.log("Calling myMSALObj.handleRedirectPromise()...");
    myMSALObj.handleRedirectPromise().then(response => {
        if (response) {
            handleResponse(response);
        }
    }).catch(error => {
        console.log(error);
    });
});

function handleResponse(response) {
    console.log("   myMSALObj.handleRedirectPromise() response receiced");
    console.log("   response:");
    console.log (response)
    if (response !== null) {
        accountId = response.account.homeAccountId;
        showWelcomeMessage(response.account);
        updateUI(response);
    }
}

const currentAccounts = myMSALObj.getAllAccounts();
if (currentAccounts.length > 1) {
    // Add choose account code here
} else if (currentAccounts.length === 1) {
    accountId = currentAccounts[0].homeAccountId;
    showWelcomeMessage(currentAccounts[0]);
}

async function signIn(method) {
    if (method === "loginPopup") {
        await myMSALObj.loginPopup().then(handleResponse).catch(function (error) {
            console.log(error);
        });
    } else if (method === "loginRedirect") {
        //myMSALObj.loginRedirect( {redirectUri: "https://yellow-mud-0f8203f03.5.azurestaticapps.net/testAuthReturn.html"});
        myMSALObj.loginRedirect();
    }
}

function signOut() {
    const currentAcc = myMSALObj.getAccountByHomeId(accountId);
    myMSALObj.logout(currentAcc);
}

function getAccessTokenPopup() {
    request = tokenRequest;
    myMSALObj.acquireTokenPopup(request).then(handleResponse).catch(error => {
        console.log(error);
    });
}

function getAccessTokenRedirect() {
    request = tokenRequest;
    myMSALObj.acquireTokenRedirect(request);
}

function getAccessTokenSilent() {
    request = tokenRequest
    request.account = myMSALObj.getAccountByHomeId(accountId);
    myMSALObj.acquireTokenSilent(request).then(handleResponse).catch(error => {
        console.log(error);
    })
}