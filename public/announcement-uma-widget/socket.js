var socket_uma;
var proses_uma = "announcement-uma-widget";
var nama_domain_uma = /*'imds-domain.com'; //*/ document.location.hostname

var iniSocket_uma = () => {
  socket_uma = new WebSocket(`ws://${domainServer}/ws/imds/${proses_uma}/${nama_domain_uma}`);
  var tm;

  function ping_uma() {
    socket_uma.send("__ping_uma__");
  }

  function pong_uma() {
    clearTimeout(tm);
  }

  socket_uma.onopen = function (e) {
    socket_uma.send("send token auth:" + dataTokenS[proses_graphic] + "---" + nama_domain_graphic + "---" + datasScuritycodeS[proses_graphic]);
    tm = setInterval(ping_uma, 30000);
  };

  var timuma;

  socket_uma.onmessage = function (event) {
    //console.log(`[message] save data ${event.data}`);

    var dataAnn = JSON.parse(event.data)
    let curDate = new Date(dataAnn.announcement_date);

    let year = curDate.getFullYear();

//    console.log("Year UMA : " + year);

    if (year < 1971 || year === NaN) {
      return;
    }

    dataAnn.title = dataAnn.events;
    dataAnn.date = curDate;
//    console.log("Year UMA dataAnn.events : " + dataAnn.events);

    let i=0;
    for (; i<dummy_data_uma.length; i++) {
        if (dummy_data_uma[i].id === year) {
            if (dummy_data_uma[i].contents === undefined || dummy_data_uma[i].contents === null) {
                dummy_data_uma[i].contents = [];
            } 
            dummy_data_uma[i].contents.push(dataAnn);
            break;
        }
    }

    if (i<dummy_data_uma.length) {
      widget_news_and_announcements_uma.innerHTML = generatorTabs_uma(); 
      return;
    }

    let dataContents = {
        id: year,
        label: year.toFixed(),
        contents: [dataAnn]
    };

    clearTimeout(timuma)
    dummy_data_uma.push(dataContents)

    dummy_data_uma.sort((a, b) => { return a.id - b.id }); 

    widget_news_and_announcements_uma.innerHTML = generatorTabs_uma();

    timuma = setTimeout(() => { 
      let o = dummy_data_uma.length - 1;

      let tablinks = document.getElementsByClassName("uma-tablinks");
      let evt = {
        currentTarget: tablinks[o]
      }
      openTabUma(evt, dummy_data_uma[o].id, o);
    }, 700);

  };

  socket_uma.onclose = function (event) {
    if (event.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      console.log("[close] Connection died");
    }
    pong_uma();
    setTimeout(() => {
      iniSocket_uma();
    }, 1000);
  };

  socket_uma.onerror = function (error) {
    console.log(`[error] ${error.message}`);
  };
};

setTimeout(() => {
  iniSocket_uma();
}, 500);
