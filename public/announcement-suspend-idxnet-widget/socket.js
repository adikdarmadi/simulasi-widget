var socket_idxnet;
var proses_idxnet = "announcement-suspend-idxnet-widget";
var nama_domain_idxnet = /*'imds-domain.com'; //*/ document.location.hostname

var iniSocket_idxnet = () => {
  socket_idxnet = new WebSocket(`ws://${domainServer}/ws/imds/${proses_idxnet}/${nama_domain_idxnet}`);
  var tm;

  function ping_idxnet() {
    socket_idxnet.send("__ping_idxnet__");
  }

  function pong_idxnet() {
    clearTimeout(tm);
  }

  socket_idxnet.onopen = function (e) {
    socket_idxnet.send("send token auth:" + dataTokenS[proses_graphic] + "---" + nama_domain_idxnet + "---" + datasScuritycodeS[proses_graphic]);
    tm = setInterval(ping_idxnet, 30000);
  };

  var timidxnet;

  socket_idxnet.onmessage = function (event) {
    //console.log(`[message] save data ${event.data}`);

    var dataAnn = JSON.parse(event.data)
    let curDate = dataAnn.open_date === null?  new Date(dataAnn.start_date): new Date(dataAnn.open_date);

    let year = curDate.getFullYear();

//    console.log("Year IDXNET : " + year);

    if (year < 1971 || year === NaN) {
      return;
    }

    let opening_reason = (dataAnn.opening_reason === null || dataAnn.opening_reason === "-" || dataAnn.opening_reason === "---") ? "": dataAnn.opening_reason;
    let reason = (dataAnn.reason === null || dataAnn.reason === "-" || dataAnn.reason === "---") ? "": dataAnn.reason;
    let other_reasons = (dataAnn.other_reasons === null || dataAnn.other_reasons === "-" || dataAnn.other_reasons === "---") ? "": dataAnn.other_reasons;

    let reasess = [opening_reason, reason, other_reasons];
    reasess.sort((a, b) => { return a.length - b.length })
    let sss = reasess[reasess.length - 1];

    dataAnn.title = sss === "" ? null:sss;

    if (dataAnn.title === null) {
      return;
    }

    // if (opening_reason !== null && opening_reason.length > 8) {
    //   dataAnn.title = opening_reason;
    // } else if (reason !== null && reason.length > 8) {
    //   dataAnn.title = reason;
    // } else {
    //   dataAnn.title = other_reasons;
    // }

    dataAnn.date = curDate;

  //  console.log("Year IDXNET dataAnn.events : " + dataAnn.title);

    let i=0;
    for (; i<dummy_data_idxnet.length; i++) {
        if (dummy_data_idxnet[i].id === year) {
            if (dummy_data_idxnet[i].contents === undefined || dummy_data_idxnet[i].contents === null) {
                dummy_data_idxnet[i].contents = [];
            } 
            dummy_data_idxnet[i].contents.push(dataAnn);
            break;
        }
    }

    if (i<dummy_data_idxnet.length) {
      widget_news_and_announcements_idxnet.innerHTML = generatorTabs_idxnet(); 
      return;
    }

    let dataContents = {
        id: year,
        label: year.toFixed(),
        contents: [dataAnn]
    };

    clearTimeout(timidxnet)
    dummy_data_idxnet.push(dataContents)

    dummy_data_idxnet.sort((a, b) => { return a.id - b.id }); 

    widget_news_and_announcements_idxnet.innerHTML = generatorTabs_idxnet();
    
    timidxnet = setTimeout(() => { 
      let o = dummy_data_idxnet.length - 1;
  
      let tablinks = document.getElementsByClassName("idxnet-tablinks");
      let evt = {
        currentTarget: tablinks[o]
      }
      openTabIdxNet(evt, dummy_data_idxnet[o].id, o);  
    }, 700);

  };

  socket_idxnet.onclose = function (event) {
    if (event.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      console.log("[close] Connection died");
    }
    pong_idxnet();
    setTimeout(() => {
      iniSocket_idxnet();
    }, 1000);
  };

  socket_idxnet.onerror = function (error) {
    console.log(`[error] ${error.message}`);
  };
};

setTimeout(() => {
  iniSocket_idxnet();
}, 500);
