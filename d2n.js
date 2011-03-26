var skey;
var inUpdate = false;

function updateHeroPanel() {
    inUpdate = true;

    var hero = $('#heroPanel');
    $('<div class="separator"/>').appendTo(hero.parent());

    var div = $('<div/>');
    var img = '<img src="'+ chrome.extension.getURL('16x16.png') +'">';
    var mouse = "onmouseover=\"js.HordeTip.showSpecialTip(this, 'simpleTip', '', 'Update external map');\" onmouseout=\"js.HordeTip.hide()\"";
    var a = $('<a class="button" id="updateMapButton" '+ mouse +'>'+ img +'Update map</a>');
    a.appendTo(hero.parent());
    a.click(function() {
        div.html('Updating...');
        chrome.extension.sendRequest({method: 'postUpdate', key: skey}, function(response) {
            div.html(response.text);
            window.setTimeout(function() { div.html('') }, 2500);
        });
    });

    div.appendTo(hero.parent());

    inUpdate = false;
}

$(window).load(function(){
    chrome.extension.sendRequest({method: "getKey"}, function(response) {
        skey = response.key;
        if(typeof skey != 'undefined') {
            $('#generic_section').bind('DOMSubtreeModified', function() {
                if ($('#heroPanel').length > 0 && $('#updateMapButton').length == 0 && !inUpdate) {
                    updateHeroPanel();
                }
            });
        }
    });
});




