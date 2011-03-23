var skey;
var checker = 0;
var tdiv;

function clearDiv() {
    tdiv.innerHTML = '';
}

function checkHeroPanel() {
    var heroActions = document.getElementById("heroPanel");
    if (heroActions) {
        var div = document.createElement("div");
        div.className = "separator";
        heroActions.parentNode.appendChild(div);

        tdiv = document.createElement("div");

        var a = document.createElement("a");
        a.className = "button";

        var img = document.createElement("img");
        img.src = chrome.extension.getURL('16x16.png');
        a.appendChild(img);
        a.innerHTML = a.innerHTML + " Update map ";
	a.onclick = function() {
            chrome.extension.sendRequest({method: 'postUpdate', key: skey}, function(response) {
                tdiv.innerHTML = response.text;
                window.setTimeout(clearDiv, 2500);
            });
       }	

        heroActions.parentNode.appendChild(a);
        heroActions.parentNode.appendChild(tdiv);
    } else if (checker++ < 10) {
        window.setTimeout(checkHeroPanel, 100);
    }
}

function findAndStoreSecureKey() {
    var skey = document.getElementById("key");
    if (skey) {
        chrome.extension.sendRequest({method: "setKey", key: skey.innerHTML});
    }
}

if (document.URL.indexOf("http://die2nite.gamerz.org.uk/") != -1) {
    findAndStoreSecureKey();
} else {
    chrome.extension.sendRequest({method: "getKey"}, function(response) {
        skey = response.key;
        if (typeof skey != 'undefined') {
            checkHeroPanel();
        }
    });
}
