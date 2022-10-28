var socket_spop;
var proses_spop = "announcement-suspend-spop-widget";
var nama_domain_spop = /*'imds-domain.com'; //*/ document.location.hostname

var iniSocket_spop = () => {
  socket_spop = new WebSocket(`ws://${domainServer}/ws/imds/${proses_spop}/${nama_domain_spop}`);
  var tm;

  function ping_spop() {
    socket_spop.send("__ping_spop__");
  }

  function pong_spop() {
    clearTimeout(tm);
  }

  socket_spop.onopen = function (e) {
    socket_spop.send("send token auth:" + dataTokenS[proses_graphic] + "---" + nama_domain_graphic + "---" + datasScuritycodeS[proses_graphic]);
    tm = setInterval(ping_spop, 30000);
  };

  var timspop;

  socket_spop.onmessage = function (event) {
    //console.log(`[message] save data ${event.data}`);

    var dataAnn = JSON.parse(event.data)
    let curDate = new Date(dataAnn.effective_date);

    let year = curDate.getFullYear();

//    console.log("Year SPOP : " + year);

    if (year < 1971 || year === NaN || dataAnn.notes === null) {
      return;
    }

    dataAnn.title = dataAnn.notes;
    dataAnn.date = curDate;

//    console.log("Year SPOP dataAnn.events : " + dataAnn.notes);


    let i=0;
    for (; i<dummy_data_spop.length; i++) {
      if (dummy_data_spop[i].id === year) {
            if (dummy_data_spop[i].contents === undefined || dummy_data_spop[i].contents === null) {
                dummy_data_spop[i].contents = [];
            } 
            dummy_data_spop[i].contents.push(dataAnn);
            return;
        }
    }

    if (i<dummy_data_spop.length) {
      widget_news_and_announcements_spop.innerHTML = generatorTabs_spop(); 
      return;
    }

    let dataContents = {
        id: year,
        label: year.toFixed(),
        contents: [dataAnn]
    };

    clearTimeout(timspop)
    dummy_data_spop.push(dataContents)

    dummy_data_spop.sort((a, b) => { return a.id - b.id }); 

    widget_news_and_announcements_spop.innerHTML = generatorTabs_spop();

    timspop = setTimeout(() => { 
      let o = dummy_data_spop.length - 1;

      let tablinks = document.getElementsByClassName("spop-tablinks");
      let evt = {
        currentTarget: tablinks[o]
      }
      openTabSpop(evt, dummy_data_spop[o].id, o);
    }, 700);
  };

  socket_spop.onclose = function (event) {
    if (event.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      console.log("[close] Connection died");
    }
    pong_spop();
    setTimeout(() => {
      iniSocket_spop();
    }, 1000);
  };

  socket_spop.onerror = function (error) {
    console.log(`[error] ${error.message}`);
  };
};

setTimeout(() => {
  iniSocket_spop();
}, 500);
