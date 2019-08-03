function deleteCookiesAndRefresh(){
	var p;
	chrome.runtime.sendMessage(p, function(response) {  
});
}
function vote() {
	//here you can put your code for voting
	//for example, if you want a button to be pressed, you can do smth like document.getElementByID("IDofTheElement").click();
}
}
window.onload=function(){
     vote();
     deleteCookiesAndRefresh();
}