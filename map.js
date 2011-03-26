function findAndStoreSecureKey() {
    var skey = document.getElementById("key");
    if (skey) {
        chrome.extension.sendRequest({method: "setKey", key: skey.innerHTML});
    }
}

findAndStoreSecureKey();
