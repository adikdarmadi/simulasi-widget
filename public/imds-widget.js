let oke = false
let sudah = []
var dataTokenS = [];
var datasScuritycodeS = [];
var domainServer = "imds-server.com";

var init = async function () {
  const divList = document.getElementsByTagName("div");
  var token = null;
  var remoteHost = "./";

  for (let idx = 0; idx < divList.length; idx++) {
    const divC = divList[idx];
    const dataWidget = divC.getAttribute("data-widget");
    if (dataWidget == undefined || dataWidget == null) {
      continue;
    }

    const dataToken = divC.getAttribute("data-token");
    if (dataToken == undefined || dataToken == null) {
      continue;
    }

    const dataSecuritycode = divC.getAttribute("data-securitycode");
    if (dataToken == undefined || dataToken == null) {
      continue;
    }

    if (sudah.includes(dataWidget)) {
      continue;
    }

    dataTokenS[dataWidget] = dataToken
    datasScuritycodeS[dataWidget] = dataSecuritycode
    

    sudah.push(dataWidget)

    console.log(idx + ". dataWidget = " + dataWidget)

    token = dataToken;
    divC.innerHTML = await (await fetch(remoteHost + dataWidget + "/index.html")).text();

    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = remoteHost + dataWidget + "/style.css";
    document.head.appendChild(link);

    var wg = document.createElement("script");
    wg.type = "text/javascript";
    wg.src = remoteHost + dataWidget + "/widget.js";
    document.head.appendChild(wg);

//    wg.onload = function () {
      var ws = document.createElement("script");
      ws.type = "text/javascript";
      ws.src = remoteHost + dataWidget + "/socket.js";
      document.head.appendChild(ws);      
//    };
  }

  const divPopUp = document.createElement("div");
  divPopUp.setAttribute('id', 'popup-modal');
  divPopUp.className = 'w3-modal';
  document.body.appendChild(divPopUp);

  const divPopUpContent = `
    <div class="w3-modal-content">
      <div class="w3-container">
        <span onclick="document.getElementById('popup-modal').style.display='none'" class="w3-button w3-display-topright">&times;</span>
        <div id="content-modal-data" class="content-modal-data"></div>
      </div>
    </div>`

  divPopUp.innerHTML = divPopUpContent;
};

document.addEventListener("DOMContentLoaded", function () {
  if (oke) {
    return;
  }

  oke = true
  console.log("DOMContentLoaded")

  init();
});
