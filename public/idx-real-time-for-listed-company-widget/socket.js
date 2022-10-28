var socket_idx_realtime;
var proses_idx_realtime = "idx-real-time-for-listed-company-widget";
var nama_domain_idx_realtime = /*'imds-domain.com'; //*/ document.location.hostname

var iniSocket_idx_realtime = () => {
    socket_idx_realtime = new WebSocket(`ws://${domainServer}/ws/imds/${proses_idx_realtime}/${nama_domain_idx_realtime}`);
    var tm;
  
    function ping_idx_realtime() {
      socket_idx_realtime.send("__ping_idx_realtime__");
    }
  
    function pong_idx_realtime() {
      clearTimeout(tm);
    }
  
    socket_idx_realtime.onopen = function (e) {
      socket_idx_realtime.send("send token auth:" + dataTokenS[proses_idx_realtime] + "---" + nama_domain_idx_realtime + "---" + datasScuritycodeS[proses_idx_realtime]);
      tm = setInterval(ping_idx_realtime, 30000);
    };
  
    // var timuma;
    socket_idx_realtime.onmessage = function (event) {
        var rawData = event.data;
        if (rawData.indexOf("|") < 0){
          return;
        }
        // rawData = parseData_idx_realtime(rawData)
        // IDX|20221026|150001|00020854|5|YELO                 |TN  |00000000093.00|00000000000.00|00000000000.00|00000000000.00|00000000000.00|
        var dataReal = rawData.split("|");
        if (datasScuritycodeS[proses_idx_realtime].toLowerCase().indexOf(dataReal[5].trim().toLowerCase()) < 0){
//          console.log(rawData)
          return;
        }
        dummy_data_idx_real.date = new Date(dataReal[1].substr(0,4) + "-" + dataReal[1].substr(4,2) + "-" + dataReal[1].substr(6,2)) 
        dummy_data_idx_real.company_name = dataReal[5]
        dummy_data_idx_real.current = parseFloat(dataReal[7])
        dummy_data_idx_real.open = parseFloat(dataReal[8])
        dummy_data_idx_real.hight = parseFloat(dataReal[9])
        dummy_data_idx_real.low = parseFloat(dataReal[10])
        dummy_data_idx_real.volume = parseFloat(dataReal[11])

        const ooo = document.getElementById("price-xml-feeder");
        var options_price = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        ooo.innerHTML = `<span>${dummy_data_idx_real.company_name}</span>
          <div class="container-item-white border-bottom">
            <span class="real-price">$${dummy_data_idx_real.current}</span>
          </div>
          <div class="container-item-white border-bottom">
            <span class="label-item">Open</span><span>${dummy_data_idx_real.open}</span>
          </div>
          <div class="container-item-grey border-bottom">
            <span class="label-item">Hight</span><span>${dummy_data_idx_real.hight}</span>
          </div>
          <div class="container-item-white border-bottom">
            <span class="label-item">Low</span><span>${dummy_data_idx_real.low}</span>
          </div>
          <div class="container-item-grey border-bottom">
            <span class="label-item">Volume</span><span>${dummy_data_idx_real.volume}</span>
          </div>
          <div class="container-item">
            <span class="label-date">As of ${dummy_data_idx_real.date.toLocaleDateString("en-US", options_price)}</span>
          </div>
          `;

    

        // var dataAnn = JSON.parse(rawData)

        

    };
  
    socket_idx_realtime.onclose = function (event) {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        console.log("[close] Connection died");
      }
      pong_idx_realtime();
      setTimeout(() => {
        iniSocket_idx_realtime();
      }, 1000);
    };
  
    socket_idx_realtime.onerror = function (error) {
      console.log(`[error] ${error.message}`);
    };
  };
  
  setTimeout(() => {
    iniSocket_idx_realtime();
  }, 500);