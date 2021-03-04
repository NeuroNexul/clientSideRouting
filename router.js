var routed_urls = [];
var activeDomId;
var routeElmnts = document.getElementsByTagName("route");
for (i = 0; i < routeElmnts.length; i++) {
    var routeElmnt = routeElmnts[i];
    url = routeElmnt.getAttribute("addr");
    //console.log(document.querySelector('[addr="'+url+'"]'));
    if (routed_urls.includes(url)){
        console.error("The address '"+url+"' is already used!!");
        routeElmnt.removeAttribute("addr");
        routeElmnt.removeAttribute("path");
    }else{
        routed_urls.push(url);
    }
}
console.log(routed_urls);


function routeDom(addr){
    elmnt = document.querySelector('[addr="'+addr+'"]');
    //console.log(elmnt);
    elmnt.setAttribute("style","padding:0;margin:0;");
    
    file = elmnt.getAttribute("path");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "<p style='"+"border:2px solid black;padding:20px;"+"'>🗒Page not found.</p>";}
          /* Remove the attribute, and call this function once more: */
          //elmnt.removeAttribute("path");
          activeDomId = addr;
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
}
function removeDom(addr){
    document.querySelector('[addr="'+addr+'"]').innerHTML='';
}
function routeUrl(addr){
    console.log("Window is rendering to url: ",window.location.host+addr);
    routeDom(addr);
    removeDom(activeDomId);
    window.history.pushState({"pageTitle":addr},"", addr);
    console.log("Window is rendered to url: ",window.location.href);
}