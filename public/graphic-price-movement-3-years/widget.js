/* ---------------- */
/* GETTING ELEMENTS */
/* ---------------- */

var chart = {};

var hrefStyles = [
  "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css",
  "https://fonts.googleapis.com/css?family=Roboto",
];
for (const idx in hrefStyles) {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = hrefStyles[idx];
  document.head.appendChild(link);
}

/* KALAU ADA JAVASCRIPT TAMBAHAN, CARANYA INI */
var script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/apexcharts";
document.head.appendChild(script);
script.onload = function () {
  myjs();
};
/* KALAU ADA JAVASCRIPT TAMBAHAN, CARANYA INI */

var myjs = function () {
  // const widget_button = document.getElementById("graphic-widget-button"); // WIDGET BUTTON
  // const widget_icon = document.getElementById("graphic-widget-icon"); // WIDGET ICON
  const widget_window = document.getElementById("graphic-widget-window"); // WIDGET WINDOW
  const price_chart = document.getElementById("graphic-price-chart"); // QUESTION LIST


  /* ----------------------------------------- */
  /* DISPLAY ALL QUESTIONS AND ANSWERS IN HTML */
  /* ----------------------------------------- */
  var options_graphic = {
    series: [],
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        autoScaleYaxis: true,
      },
      toolbar: {
        offsetX: -20,
        offsetY: 0,
        show: true,
        tools: {
          export: false,
          download: false,
          selection: true,
          zoom: false,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
//        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    title: {
      text: "Stock Price Movement",
      align: "left",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    stroke: {
      curve: 'straight',
    },
    yaxis: {
      title: {
        text: "Price",
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return "close value: " + val;
        },
      },
    },
  };

  chart = new ApexCharts(price_chart, options_graphic);
  chart.render();

  var resetCssClasses = function(activeEl) {
    var els = document.querySelectorAll('button')
    Array.prototype.forEach.call(els, function(el) {
      el.classList.remove('active')
    })
  
    activeEl.target.classList.add('active')
  }
  
  document
    .getElementById('s1').addEventListener('click', function(e) {
      resetCssClasses(e)
      var curDate = new Date().getTime()
      var beforDate = curDate - (5 * 86_400_000)
      chart.zoomX(beforDate, curDate)
    })
  
  document
    .getElementById('s2').addEventListener('click', function(e) {
      resetCssClasses(e)
      var curDate = new Date().getTime()
      var beforDate = curDate - (30 * 86_400_000)
      chart.zoomX(beforDate, curDate)
    })
  
  document
    .getElementById('s3').addEventListener('click', function(e) {
      resetCssClasses(e)
      var curDate = new Date().getTime()
      var beforDate = curDate - (3 * 30 * 86_400_000)
      chart.zoomX(beforDate, curDate)
    })
  
  document.getElementById('s4').addEventListener('click', function(e) {
    resetCssClasses(e)
    var curDate = new Date().getTime()
    var beforDate = curDate - (5 * 30 * 86_400_000)
    chart.zoomX(beforDate, curDate)
  })
  
  document.getElementById('s5').addEventListener('click', function(e) {
    resetCssClasses(e)
    var curDate = new Date().getTime()
    var beforDate = curDate - (365 * 86_400_000)
    chart.zoomX(beforDate, curDate)
  })

  document.getElementById('s6').addEventListener('click', function(e) {
    resetCssClasses(e)
    var curDate = new Date().getTime()
    var beforDate = curDate - (3 * 365 * 86_400_000)
    chart.zoomX(beforDate, curDate)
  })

  // document.getElementById('s7').addEventListener('click', function(e) {
  //   resetCssClasses(e)
  //   var curDate = new Date().getTime()
  //   var beforDate = curDate - (5 * 365 * 86_400_000)
  //   chart.zoomX(beforDate, curDate)
  // })

  document.getElementById('s8').addEventListener('click', function(e) {
    resetCssClasses(e)
    chart.resetSeries({shouldResetZoom: true})
  })

};


  /* ----------------- */
  /* ACCORDION HANDLER */
  /* ----------------- */
  // const accordion_gr = document.getElementsByClassName("graphic-accordion"); // GETTING ALL ACCORDIONS

  // for (i = 0; i < accordion_gr.length; i++) {
  //   // LOOPING
  //   accordion_gr[i].addEventListener("click", function () {
  //     this.classList.toggle("active");
  //     const panel = this.nextElementSibling;
  //     if (panel.style.maxHeight) {
  //       panel.style.maxHeight = null;
  //     } else {
  //       panel.style.maxHeight = panel.scrollHeight + "px";
  //     }
  //   });
  // }


  // /* ------------------------------ */
  // /* OPENING WIDGET WITH ANIMATIONS */
  // /* ------------------------------ */
  // function opening_widget() {
  //   // BUTTON ACTIONS
  //   widget_button.setAttribute("active", ""); // ADDING "ACTIVE" ATTRIBUTE TO WIDGET BUTTON
  //   widget_button.setAttribute("class", "graphic-slide-in-blurred"); // DISPLAY WIDGET BUTTON WITH ANIMATION
  //   // WINDOW ACTIONS
  //   widget_window.style.visibility = "visible"; // DISPLAY WIDGET WINDOW
  //   widget_window.setAttribute("class", "graphic-slide-in-blurred"); // DISPLAY WIDGET WINDOW WITH ANIMATION
  //   // ICON ACTIONS
  //   widget_icon.setAttribute("class", "bi graphic-bi-x-circle-fill"); // CHANGING "QUESTION MARK ICON" TO "X ICON"
  //   // QUESTION LIST ACTIONS
  //   price_chart.setAttribute("class", "graphic-slide-in-to-top"); // DISPLAY QUESTION LIST WITH ANIMATION
  //   // ACTIONS WITH DELAY
  //   setTimeout(function () {
  //     price_chart.setAttribute("class", "");
  //   }, 800); // DISABLING QUESTION LIST ANIMATION
  // }

  // /* ------------------------------ */
  // /* CLOSING WIDGET WITH ANIMATIONS */
  // /* ------------------------------ */
  // function closing_widget() {
  //   // BUTTON ACTIONS
  //   widget_button.removeAttribute("active"); // REMOVING "ACTIVE" ATTRIBUTE FROM WIDGET BUTTON
  //   widget_button.setAttribute("class", "graphic-slide-out-blurred"); // HIDE WIDGET BUTTON WITH ANIMATION
  //   // WINDOW ACTIONS
  //   widget_window.style.visibility = "hidden"; // HIDE WIDGET WINDOW
  //   widget_window.setAttribute("class", "graphic-slide-out-blurred"); // HIDE WIDGET WINDOW WITH ANIMATION
  //   // ACTIONS WITH DELAY
  //   setTimeout(function () {
  //     widget_icon.setAttribute("class", "bi graphic-bi-question-circle-fill"); // CHANGING "X ICON" TO "QUESTION MARK ICON"
  //     widget_button.setAttribute("class", "graphic-slide-in-blurred"); // DISPLAY WIDGET BUTTON WITH ANIMATION
  //   }, 800);
  //   setTimeout(function () {
  //     widget_button.setAttribute("class", "");
  //   }, 1300); // DISABLING WIDGET BUTTON ANIMATION
  // }

  // /* ----------------------------- */
  // /* WHEN WIDGET BUTTON IS CLICKED */
  // /* ----------------------------- */
  // widget_button.onclick = function () {
  //   if (widget_button.getAttribute("active") == null) {
  //     // WIDGET WINDOW IS CLOSE
  //     opening_widget(); // CALL WIDGET OPENING FUNCTION
  //   } else if (widget_button.hasAttribute("active")) {
  //     // WIDGET WINDOW IS OPEN
  //     closing_widget(); // CALL WIDGET CLOSING FUNCTION
  //   }
  // };



// {
//   name: "Series 1",
//   data: [
//     {
//       x: "02-10-2017 GMT",
//       y: 34,
//     },
//     {
//       x: "02-11-2017 GMT",
//       y: 43,
//     },
//     {
//       x: "02-12-2017 GMT",
//       y: 31,
//     },
//     {
//       x: "02-13-2017 GMT",
//       y: 43,
//     },
//     {
//       x: "02-14-2017 GMT",
//       y: 33,
//     },
//     {
//       x: "02-15-2017 GMT",
//       y: 52,
//     },
//   ],
// },
// {
//   name: "Series 2",
//   data: [
//     {
//       x: "02-10-2017 GMT",
//       y: 14,
//     },
//     {
//       x: "02-11-2017 GMT",
//       y: 33,
//     },
//     {
//       x: "02-12-2017 GMT",
//       y: 21,
//     },
//     {
//       x: "02-13-2017 GMT",
//       y: 13,
//     },
//     {
//       x: "02-14-2017 GMT",
//       y: 23,
//     },
//     {
//       x: "02-15-2017 GMT",
//       y: 42,
//     },
//   ],
// },


         // customIcons:[{
          //   icon: `<svg height="20" width="23">
          //           <rect width="100%" height="100%" stroke="black" fill="white"/>
          //           <text x="2" y="15">1d</text>
          //         </svg>`,
          //     index: 0,
          //     class: 'custom-icon',
          //     title: '5 days',
          //     click: function (chart, options, e) {
          //       alert('5 hari terakhir');
          //     }
          // },{
          //   icon: `<svg height="20" width="23">
          //           <rect width="100%" height="100%" stroke="black" fill="white"/>
          //           <text x="2" y="15">1m</text>
          //         </svg>`,
          //     index: 1,
          //     class: 'custom-icon',
          //     title: '1 month',
          //     click: function (chart, options, e) {
          //       alert('1 bulan terakhir');
          //     }
          // },{
          //   icon: `<svg height="20" width="23">
          //           <rect width="100%" height="100%" stroke="black" fill="white"/>
          //           <text x="2" y="15">3m</text>
          //         </svg>`,
          //     index: 2,
          //     class: 'custom-icon',
          //     title: '3 month',
          //     click: function (chart, options, e) {
          //       alert('3 bulan terakhir');
          //     }
          // },{
          //   icon: `<svg height="20" width="23">
          //           <rect width="100%" height="100%" stroke="black" fill="white"/>
          //           <text x="2" y="15">5m</text>
          //         </svg>`,
          //     index: 3,
          //     class: 'custom-icon',
          //     title: '5 month',
          //     click: function (chart, options, e) {
          //       alert('5 bulan terakhir');
          //     }
          // },{
          //   icon: `<svg height="20" width="23">
          //           <rect width="100%" height="100%" stroke="black" fill="white"/>
          //           <text x="2" y="15">1y</text>
          //         </svg>`,
          //     index: 4,
          //     class: 'custom-icon',
          //     title: '1 year',
          //     click: function (chart, options, e) {
          //       alert('1 tahun terakhir');
          //     }
          // },{
          //   icon: `<svg height="20" width="23">
          //           <rect width="100%" height="100%" stroke="black" fill="white"/>
          //           <text x="2" y="15">3y</text>
          //         </svg>`,
          //     index: 5,
          //     class: 'custom-icon',
          //     title: '3 years',
          //     click: function (chart, options, e) {
          //       alert('3 tahun terakhir');
          //     }
          // },{
          //   icon: `<svg height="20" width="23">
          //           <rect width="100%" height="100%" stroke="black" fill="white"/>
          //           <text x="2" y="15">5y</text>
          //         </svg>`,
          //     index: 6,
          //     class: 'custom-icon',
          //     title: '5 years',
          //     click: function (chart, options, e) {
          //       alert('5 tahun terakhir');
          //     }
          // },{
          //   icon: `<svg height="20" width="23">
          //           <rect width="100%" height="100%" stroke="black" fill="white"/>
          //           <text x="2" y="15">All</text>
          //         </svg>`,
          //     index: 7,
          //     class: 'custom-icon',
          //     title: 'All data',
          //     click: function (chart, options, e) {
          //       alert('Semua data');
          //     }
          // }],  