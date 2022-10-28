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

const dummy_data_uma = [];

/* ---------------- */
/* GETTING ELEMENTS */
/* ---------------- */
const widget_button_uma = document.getElementById("uma-widget-button"); // WIDGET BUTTON
const widget_icon_uma = document.getElementById("uma-widget-icon"); // WIDGET ICON
const widget_window_uma = document.getElementById("uma-widget-window"); // WIDGET WINDOW
const widget_news_and_announcements_uma = document.getElementById("uma-widget-news-and-announcements"); // WIDGET

/* ------------------------------ */
/* OPENING WIDGET WITH ANIMATIONS */
/* ------------------------------ */
function opening_widget() {
  // BUTTON ACTIONS
  widget_button_uma.setAttribute("active", ""); // ADDING "ACTIVE" ATTRIBUTE TO WIDGET BUTTON
  widget_button_uma.setAttribute("class", "uma-slide-in-blurred"); // DISPLAY WIDGET BUTTON WITH ANIMATION
  // WINDOW ACTIONS
  widget_window_uma.style.visibility = "visible"; // DISPLAY WIDGET WINDOW
  widget_window_uma.setAttribute("class", "uma-slide-in-blurred"); // DISPLAY WIDGET WINDOW WITH ANIMATION
  // ICON ACTIONS
  widget_icon_uma.setAttribute("class", "bi uma-bi-x-circle-fill"); // CHANGING "QUESTION MARK ICON" TO "X ICON"
  // QUESTION LIST ACTIONS
  widget_news_and_announcements_uma.setAttribute("class", "uma-slide-in-to-top"); // DISPLAY QUESTION LIST WITH ANIMATION
  // ACTIONS WITH DELAY
  setTimeout(function () {
    widget_news_and_announcements_uma.setAttribute("class", "");
  }, 800); // DISABLING QUESTION LIST ANIMATION
}

/* ------------------------------ */
/* CLOSING WIDGET WITH ANIMATIONS */
/* ------------------------------ */
function closing_widget() {
  // BUTTON ACTIONS
  widget_button_uma.removeAttribute("active"); // REMOVING "ACTIVE" ATTRIBUTE FROM WIDGET BUTTON
  widget_button_uma.setAttribute("class", "uma-slide-out-blurred"); // HIDE WIDGET BUTTON WITH ANIMATION
  // WINDOW ACTIONS
  widget_window_uma.style.visibility = "hidden"; // HIDE WIDGET WINDOW
  widget_window_uma.setAttribute("class", "uma-slide-out-blurred"); // HIDE WIDGET WINDOW WITH ANIMATION
  // ACTIONS WITH DELAY
  setTimeout(function () {
    widget_icon_uma.setAttribute("class", "bi uma-bi-question-circle-fill"); // CHANGING "X ICON" TO "QUESTION MARK ICON"
    widget_button_uma.setAttribute("class", "uma-slide-in-blurred"); // DISPLAY WIDGET BUTTON WITH ANIMATION
  }, 800);
  setTimeout(function () {
    widget_button_uma.setAttribute("class", "");
  }, 1300); // DISABLING WIDGET BUTTON ANIMATION
}

/* ----------------------------- */
/* WHEN WIDGET BUTTON IS CLICKED */
/* ----------------------------- */
widget_button_uma.onclick = function () {
  if (widget_button_uma.getAttribute("active") == null) {
    // WIDGET WINDOW IS CLOSE
    opening_widget(); // CALL WIDGET OPENING FUNCTION
  } else if (widget_button_uma.hasAttribute("active")) {
    // WIDGET WINDOW IS OPEN
    closing_widget(); // CALL WIDGET CLOSING FUNCTION
  }
};

/* ----------------------------------------- */
/* DISPLAY WIDGET NEWS AND ANNOUNCEMENTS IN HTML */
/* ----------------------------------------- */
var uma_tab_idx = 0;

//Tabs
function openTabUma(evt, nameTab, index) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("uma-tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("uma-tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(nameTab + "-uma").style.display = "block";
  evt.currentTarget.className += " active";
  uma_tab_idx = index;
}

const options_uma = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

const onClickList_uma = function (idx) {
  document.getElementById("popup-modal").style.display = "block";
  const contentModal = document.getElementById("content-modal-data");
  const dataPopUp = dummy_data_uma[uma_tab_idx].contents[idx]
  contentModal.innerHTML = generatorUmaModal(dataPopUp);
};

const generatorUmaModal = function (secondModal) {
  return `
    <div>
      <p>Issuer Code : ${secondModal.issuer_code}</p>
      <p>Issuer Name : ${secondModal.issuer_name}</p>
      <p>Isin : ${secondModal.isin}</p>
      <p>Ipo Date : ${secondModal.ipo_date}</p>
      <p>Announcement Date : ${secondModal.announcement_date}</p>
      <p>Announcement Number : ${secondModal.announcement_number}</p>
      <p>Events : ${secondModal.events}</p>
    <div/>
  `;
};

const generatorTabs_uma = function () {
  return `
    <div class="uma-tab">
      ${dummy_data_uma
        .map((tab, index) => `<button class="uma-tablinks" onclick="openTabUma(event, ${tab.id}, ${index})">${tab.label}</button>`)
        .join("")}
    </div>
    ${dummy_data_uma
      .map(
        (tab) => `
        <div id="${tab.id}-uma" class="uma-tabcontent">
        <div class="uma-container-item-header border-bottom">
           <span class="uma-label-item">Title</span><span class="uma-label-item-date">Date</span>
        </div>
        ${tab.contents
          .map(
            (content, index) =>
              `<div onclick="onClickList_uma(${index})" class="uma-container-item border-bottom">
           <div class="uma-label-item">${
             content.title
           }</div><div class="uma-label-item-date">${content.date.toLocaleDateString("en-US")}</div>
          </div>`
          )
          .join("")}
     </div>`
      )
      .join("")}
    
  `;
};

widget_news_and_announcements_uma.innerHTML += generatorTabs_uma();

/* ----------------- */
/* ACCORDION HANDLER */
/* ----------------- */
const accordion_uma = document.getElementsByClassName("uma-accordion"); // GETTING ALL ACCORDIONS

for (i = 0; i < accordion_uma.length; i++) {
  // LOOPING
  accordion_uma[i].addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
