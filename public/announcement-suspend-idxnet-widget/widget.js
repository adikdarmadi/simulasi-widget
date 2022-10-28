/* ----------------------------------------------------------- */
/* DUMMY DATA DATABASE, API, ETC. */
/* ----------------------------------------------------------- */

var hrefStyles = [
  "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css",
  "https://fonts.googleapis.com/css?family=Roboto",
  "https://www.w3schools.com/w3css/4/w3.css",
];
for (const idx in hrefStyles) {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = hrefStyles[idx];
  document.head.appendChild(link);
}

const dummy_data_idxnet = [];

/* ---------------- */
/* GETTING ELEMENTS */
/* ---------------- */
const widget_button = document.getElementById("idxnet-widget-button"); // WIDGET BUTTON
const widget_icon = document.getElementById("idxnet-widget-icon"); // WIDGET ICON
const widget_window = document.getElementById("idxnet-widget-window"); // WIDGET WINDOW
const widget_news_and_announcements_idxnet = document.getElementById("idxnet-widget-news-and-announcements"); // WIDGET

/* ------------------------------ */
/* OPENING WIDGET WITH ANIMATIONS */
/* ------------------------------ */
function opening_widget() {
  // BUTTON ACTIONS
  widget_button.setAttribute("active", ""); // ADDING "ACTIVE" ATTRIBUTE TO WIDGET BUTTON
  widget_button.setAttribute("class", "idxnet-slide-in-blurred"); // DISPLAY WIDGET BUTTON WITH ANIMATION
  // WINDOW ACTIONS
  widget_window.style.visibility = "visible"; // DISPLAY WIDGET WINDOW
  widget_window.setAttribute("class", "idxnet-slide-in-blurred"); // DISPLAY WIDGET WINDOW WITH ANIMATION
  // ICON ACTIONS
  widget_icon.setAttribute("class", "bi idxnet-bi-x-circle-fill"); // CHANGING "QUESTION MARK ICON" TO "X ICON"
  // QUESTION LIST ACTIONS
  widget_news_and_announcements_idxnet.setAttribute("class", "idxnet-slide-in-to-top"); // DISPLAY QUESTION LIST WITH ANIMATION
  // ACTIONS WITH DELAY
  setTimeout(function () {
    widget_news_and_announcements_idxnet.setAttribute("class", "");
  }, 800); // DISABLING QUESTION LIST ANIMATION
}

/* ------------------------------ */
/* CLOSING WIDGET WITH ANIMATIONS */
/* ------------------------------ */
function closing_widget() {
  // BUTTON ACTIONS
  widget_button.removeAttribute("active"); // REMOVING "ACTIVE" ATTRIBUTE FROM WIDGET BUTTON
  widget_button.setAttribute("class", "idxnet-slide-out-blurred"); // HIDE WIDGET BUTTON WITH ANIMATION
  // WINDOW ACTIONS
  widget_window.style.visibility = "hidden"; // HIDE WIDGET WINDOW
  widget_window.setAttribute("class", "idxnet-slide-out-blurred"); // HIDE WIDGET WINDOW WITH ANIMATION
  // ACTIONS WITH DELAY
  setTimeout(function () {
    widget_icon.setAttribute("class", "bi idxnet-bi-question-circle-fill"); // CHANGING "X ICON" TO "QUESTION MARK ICON"
    widget_button.setAttribute("class", "idxnet-slide-in-blurred"); // DISPLAY WIDGET BUTTON WITH ANIMATION
  }, 800);
  setTimeout(function () {
    widget_button.setAttribute("class", "");
  }, 1300); // DISABLING WIDGET BUTTON ANIMATION
}

/* ----------------------------- */
/* WHEN WIDGET BUTTON IS CLICKED */
/* ----------------------------- */
widget_button.onclick = function () {
  if (widget_button.getAttribute("active") == null) {
    // WIDGET WINDOW IS CLOSE
    opening_widget(); // CALL WIDGET OPENING FUNCTION
  } else if (widget_button.hasAttribute("active")) {
    // WIDGET WINDOW IS OPEN
    closing_widget(); // CALL WIDGET CLOSING FUNCTION
  }
};

/* ----------------------------------------- */
/* DISPLAY WIDGET NEWS AND ANNOUNCEMENTS IN HTML */
/* ----------------------------------------- */
var idxnet_tab_idx = 0;

//Tabs
function openTabIdxNet(evt, nameTab, index) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("idxnet-tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("idxnet-tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(nameTab + "-idxnet").style.display = "block";
  evt.currentTarget.className += " active";
  idxnet_tab_idx = index;
}

const options_idxnet = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

const onClickList_idxnet = function (idx) {
  document.getElementById("popup-modal").style.display = "block";
  const contentModal = document.getElementById("content-modal-data");
  const dataPopUp = dummy_data_idxnet[idxnet_tab_idx].contents[idx]
  contentModal.innerHTML = generatorIdxModal(dataPopUp);
};

const generatorIdxModal = function (thridModal) {
  return `
    <div>
      <p>Issuer Code : ${thridModal.issuer_code}</p>
      <p>Issuer Name : ${thridModal.issuer_name}</p>
      <p>Opening Reason : ${thridModal.opening_reason ?? "-"}</p>
      <p>Market Type : ${thridModal.market_type}</p>
      <p>Opening board type : ${thridModal.opening_board_type ?? "-"}</p>
      <p>Reason : ${thridModal.reason ?? "-"}</p>
      <p>Other Reason : ${thridModal.other_reasons ?? "-"}</p>
      <p>Status : ${thridModal.status}</p>
      <p>Note : ${thridModal.note ?? "-"}</p>
    <div/>
  `;
};

const generatorTabs_idxnet = function () {
  return `
    <div class="idxnet-tab">
      ${dummy_data_idxnet
        .map((tab, index) => `<button class="idxnet-tablinks" onclick="openTabIdxNet(event, ${tab.id}, ${index})">${tab.label}</button>`)
        .join("")}
    </div>
    ${dummy_data_idxnet
      .map(
        (tab) => `
        <div id="${tab.id}-idxnet" class="idxnet-tabcontent">
        <div class="idxnet-container-item-header border-bottom">
           <span class="idxnet-label-item">Title</span><span class="idxnet-label-item-date">Date</span>
        </div>
        ${tab.contents
          .map(
            (content, index) =>
              `<div onclick="onClickList_idxnet(${index})" class="idxnet-container-item border-bottom">
           <div class="idxnet-label-item">${
             content.title
           }</div><div class="idxnet-label-item-date">${content.date.toLocaleDateString("en-US")}</div>
          </div>`
          )
          .join("")}
     </div>`
      )
      .join("")}
    
  `;
};

widget_news_and_announcements_idxnet.innerHTML += generatorTabs_idxnet();

/* ----------------- */
/* ACCORDION HANDLER */
/* ----------------- */
const accordion_idxnet = document.getElementsByClassName("idxnet-accordion"); // GETTING ALL ACCORDIONS

for (i = 0; i < accordion_idxnet.length; i++) {
  // LOOPING
  accordion_idxnet[i].addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
