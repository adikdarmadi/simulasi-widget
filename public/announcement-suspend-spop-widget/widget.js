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

const dummy_data_spop = [];

/* ---------------- */
/* GETTING ELEMENTS */
/* ---------------- */
const widget_button_spop = document.getElementById("spop-widget-button"); // WIDGET BUTTON
const widget_icon_spop = document.getElementById("spop-widget-icon"); // WIDGET ICON
const widget_window_spop = document.getElementById("spop-widget-window"); // WIDGET WINDOW
const widget_news_and_announcements_spop = document.getElementById("spop-widget-news-and-announcements"); // WIDGET

/* ------------------------------ */
/* OPENING WIDGET WITH ANIMATIONS */
/* ------------------------------ */
function opening_widget_spop() {
  // BUTTON ACTIONS
  widget_button_spop.setAttribute("active", ""); // ADDING "ACTIVE" ATTRIBUTE TO WIDGET BUTTON
  widget_button_spop.setAttribute("class", "spop-slide-in-blurred"); // DISPLAY WIDGET BUTTON WITH ANIMATION
  // WINDOW ACTIONS
  widget_window_spop.style.visibility = "visible"; // DISPLAY WIDGET WINDOW
  widget_window_spop.setAttribute("class", "spop-slide-in-blurred"); // DISPLAY WIDGET WINDOW WITH ANIMATION
  // ICON ACTIONS
  widget_icon_spop.setAttribute("class", "spop-bi bi-x-circle-fill"); // CHANGING "QUESTION MARK ICON" TO "X ICON"
  // QUESTION LIST ACTIONS
  widget_news_and_announcements_spop.setAttribute("class", "spop-slide-in-to-top"); // DISPLAY QUESTION LIST WITH ANIMATION
  // ACTIONS WITH DELAY
  setTimeout(function () {
    widget_news_and_announcements_spop.setAttribute("class", "");
  }, 800); // DISABLING QUESTION LIST ANIMATION
}

/* ------------------------------ */
/* CLOSING WIDGET WITH ANIMATIONS */
/* ------------------------------ */
function closing_widget_spop() {
  // BUTTON ACTIONS
  widget_button_spop.removeAttribute("active"); // REMOVING "ACTIVE" ATTRIBUTE FROM WIDGET BUTTON
  widget_button_spop.setAttribute("class", "spop-slide-out-blurred"); // HIDE WIDGET BUTTON WITH ANIMATION
  // WINDOW ACTIONS
  widget_window_spop.style.visibility = "hidden"; // HIDE WIDGET WINDOW
  widget_window_spop.setAttribute("class", "spop-slide-out-blurred"); // HIDE WIDGET WINDOW WITH ANIMATION
  // ACTIONS WITH DELAY
  setTimeout(function () {
    widget_icon_spop.setAttribute("class", "spop-bi bi-question-circle-fill"); // CHANGING "X ICON" TO "QUESTION MARK ICON"
    widget_button_spop.setAttribute("class", "spop-slide-in-blurred"); // DISPLAY WIDGET BUTTON WITH ANIMATION
  }, 800);
  setTimeout(function () {
    widget_button_spop.setAttribute("class", "");
  }, 1300); // DISABLING WIDGET BUTTON ANIMATION
}

/* ----------------------------- */
/* WHEN WIDGET BUTTON IS CLICKED */
/* ----------------------------- */
widget_button_spop.onclick = function () {
  if (widget_button_spop.getAttribute("active") == null) {
    // WIDGET WINDOW IS CLOSE
    opening_widget_spop(); // CALL WIDGET OPENING FUNCTION
  } else if (widget_button_spop.hasAttribute("active")) {
    // WIDGET WINDOW IS OPEN
    closing_widget_spop(); // CALL WIDGET CLOSING FUNCTION
  }
};

/* ----------------------------------------- */
/* DISPLAY WIDGET NEWS AND ANNOUNCEMENTS IN HTML */
/* ----------------------------------------- */
var spop_tab_idx = 0;

//Tabs
function openTabSpop(evt, nameTab, index) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("spop-tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("spop-tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(nameTab + "-spop").style.display = "block";
  evt.currentTarget.className += " active";
  spop_tab_idx = index
}

const options_spop_spop = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

const onClickList_spop = function (idx) {
  document.getElementById("popup-modal").style.display = "block";
  const contentModal = document.getElementById("content-modal-data");
  const dataPopUp = dummy_data_spop[spop_tab_idx].contents[idx]
  contentModal.innerHTML = generatorSpopModal(dataPopUp);
};

const generatorSpopModal = function (firstModal) {
  return `
    <div>
      <p>Start : ${firstModal.start}</p>
      <p>Status : ${firstModal.status}</p>
      <p>System : ${firstModal.system}</p>
      <p>Reference : ${firstModal.reference}</p>
      <p>Notes : ${firstModal.notes}</p>
      <p>Emiten Code : ${firstModal.emiten_code}</p>
      <p>Short Name : ${firstModal.shortname}</p>
      <p>Isin : ${firstModal.isin}</p>
    <div/>
  `;
};


const generatorTabs_spop = function () {
  return `
    <div class="spop-tab">
      ${dummy_data_spop
        .map((tab, index) => `<button class="spop-tablinks" onclick="openTabSpop(event, ${tab.id}, ${index})">${tab.label}</button>`)
        .join("")}
    </div>
    ${dummy_data_spop
      .map(
        (tab) => `
        <div id="${tab.id}-spop" class="spop-tabcontent">
        <div class="spop-container-item-header border-bottom">
           <span class="spop-label-item">Title</span><span class="spop-label-item-date">Date</span>
        </div>
        ${tab.contents
          .map(
            (content, index) =>
              `<div onclick="onClickList_spop(${index})" class="spop-container-item border-bottom">
           <div class="spop-label-item">${
             content.title
           }</div><div class="spop-label-item-date">${content.date.toLocaleDateString("en-US")}</div>
          </div>`
          )
          .join("")}
     </div>`
      )
      .join("")}
    
  `;
};

widget_news_and_announcements_spop.innerHTML += generatorTabs_spop();

/* ----------------- */
/* ACCORDION HANDLER */
/* ----------------- */
const accordion_spop = document.getElementsByClassName("spop-accordion"); // GETTING ALL ACCORDIONS

for (i = 0; i < accordion_spop.length; i++) {
  // LOOPING
  accordion_spop[i].addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
