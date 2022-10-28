var socket_graphic;
var proses_graphic = "graphic-price-movement-3-years";
var nama_domain_graphic = /*'imds-domain.com'; //*/ document.location.hostname

var iniSocket_graphic = () => {
    socket_graphic = new WebSocket(`ws://${domainServer}/ws/imds/${proses_graphic}/${nama_domain_graphic}`);
    var tm;
  
    function ping_graphic() {
      socket_graphic.send("__ping_graphic__");
    }
  
    function pong_graphic() {
      clearTimeout(tm);
    }
  
    socket_graphic.onopen = function (e) {
      socket_graphic.send("send token auth:" + dataTokenS[proses_graphic] + "---" + nama_domain_graphic + "---" + datasScuritycodeS[proses_graphic]);
      tm = setInterval(ping_graphic, 30000);
    };
  
    // var timuma;

    function parseData(rawData) {
        return rawData;
    }
  
    socket_graphic.onmessage = function (event) {
        var rawData = event.data;
        if (rawData.indexOf("|") > 0){
            rawData = parseData(rawData)
        }

        var dataAnn = JSON.parse(rawData)
        
        if (dataAnn === undefined || dataAnn === null || dataAnn[0].name === undefined || dataAnn[0].name === null) {
            chart.appendData(dataAnn)
        } else {
          //console.log(rawData);
          chart.updateOptions({series: dataAnn})
        }
    };
  
    socket_graphic.onclose = function (event) {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        console.log("[close] Connection died");
      }
      pong_graphic();
      setTimeout(() => {
        iniSocket_graphic();
      }, 1000);
    };
  
    socket_graphic.onerror = function (error) {
      console.log(`[error] ${error.message}`);
    };
  };
  
  setTimeout(() => {
    iniSocket_graphic();
  }, 500);