var activated = false;
var interval;
var queryInfo;
var URL;//put the url here :D

function deleteCookiesAndRefresh(){
if(activated){
    queryInfo={'url':URL};
        chrome.tabs.query(queryInfo, function(tabs){
            var url = tabs[0].url;
            var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
            var d = matches && matches[1].replace('www.','');
            d = '.'+d;
            // get cookies for this domain
            chrome.cookies.getAll({domain: d}, function (cookies) {
                for (var i=0; i<cookies.length; i++) {
                    var url = "http" + (cookies[i].secure ? "s" : "") + "://" + cookies[i].domain + cookies[i].path;
                    var cname = cookies[i].name;
    
                    // remove cookie
                    chrome.cookies.remove({
                        "url": url,
                        "name": cname
                    });
                }
    
                // reload the tab
                chrome.tabs.reload(tabs[0].id);
            });
        });
}
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
		deleteCookiesAndRefresh();
});

chrome.browserAction.onClicked.addListener(function(tab) {
    if(activated){
	chrome.browserAction.setIcon({path:"red.png"});
        clearInterval(interval);
        activated = false;
        return;
    }
	chrome.browserAction.setIcon({path:"green.png"});
    activated = true;
    deleteCookiesAndRefresh();
});