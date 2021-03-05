const routingElement = document.querySelector('#route');
var Elements = [];
//console.log(routingElement);

function routeDom(file){
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {routingElement.innerHTML = this.responseText;}
          if (this.status == 404) {routingElement.innerHTML = "<p style='"+"border:2px solid black;padding:20px;"+"'>🗒Page not found.</p>";}
          /* Remove the attribute, and call this function once more: */
          //elmnt.removeAttribute("path");
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
    }
}
function routeUrl(url){
    console.log("Window is rendering to url: ",window.location.host+url);
    window.history.pushState({"pageTitle":url},"", url);
    console.log("Window is rendered to url: ",window.location.href);
}
function routePage(url, addr){
    routeUrl(url);
    routeDom(addr);
    Elements.push({"Url":url,"Addr":addr});
}

window.onpopstate = function(e){
    if(e.state){
        //console.log(e.state.pageTitle);
        var i;
        for(i=0;i<Elements.length;i++){
            if(Elements[i].Url === e.state.pageTitle){
                routeDom(Elements[i].Addr);
            }
        }
    }
};



