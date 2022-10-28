/* ----------------------------------------------------------- */
/* DUMMY DATA DATABASE, API, ETC. */
/* ----------------------------------------------------------- */

var hrefStyles = ['https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css', 'https://fonts.googleapis.com/css?family=Roboto']
for (const idx in hrefStyles) {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = hrefStyles[idx]
  document.head.appendChild(link);
}

const dummy_data_idx_real = {
  company_name: "Listed Company Name",
  current: 2.89,  
  open: 2.89,
  hight: 2.91,
  low: 2.88,
  volume: 2858100,
  date: new Date(),
};

/* ---------------- */
/* GETTING ELEMENTS */
/* ---------------- */
const widget_button_price = document.getElementById("price-widget-button"); // WIDGET BUTTON
const widget_icon_price = document.getElementById("price-widget-icon"); // WIDGET ICON
const widget_window_price = document.getElementById("price-widget-window"); // WIDGET WINDOW
const widget_price_xml_feeder = document.getElementById("price-xml-feeder"); // WIDGET

/* ------------------------------ */
/* OPENING WIDGET WITH ANIMATIONS */
/* ------------------------------ */
function opening_widget() {
  // BUTTON ACTIONS
  widget_button_price.setAttribute("active", ""); // ADDING "ACTIVE" ATTRIBUTE TO WIDGET BUTTON
  widget_button_price.setAttribute("class", "slide-in-blurred"); // DISPLAY WIDGET BUTTON WITH ANIMATION
  // WINDOW ACTIONS
  widget_window_price.style.visibility = "visible"; // DISPLAY WIDGET WINDOW
  widget_window_price.setAttribute("class", "slide-in-blurred"); // DISPLAY WIDGET WINDOW WITH ANIMATION
  // ICON ACTIONS
  widget_icon_price.setAttribute("class", "bi bi-x-circle-fill"); // CHANGING "QUESTION MARK ICON" TO "X ICON"
  // QUESTION LIST ACTIONS
  widget_price_xml_feeder.setAttribute("class", "slide-in-to-top"); // DISPLAY QUESTION LIST WITH ANIMATION
  // ACTIONS WITH DELAY
  setTimeout(function () {
    widget_price_xml_feeder.setAttribute("class", "");
  }, 800); // DISABLING QUESTION LIST ANIMATION
}

/* ------------------------------ */
/* CLOSING WIDGET WITH ANIMATIONS */
/* ------------------------------ */
function closing_widget() {
  // BUTTON ACTIONS
  widget_button_price.removeAttribute("active"); // REMOVING "ACTIVE" ATTRIBUTE FROM WIDGET BUTTON
  widget_button_price.setAttribute("class", "slide-out-blurred"); // HIDE WIDGET BUTTON WITH ANIMATION
  // WINDOW ACTIONS
  widget_window_price.style.visibility = "hidden"; // HIDE WIDGET WINDOW
  widget_window_price.setAttribute("class", "slide-out-blurred"); // HIDE WIDGET WINDOW WITH ANIMATION
  // ACTIONS WITH DELAY
  setTimeout(function () {
    widget_icon_price.setAttribute("class", "bi bi-question-circle-fill"); // CHANGING "X ICON" TO "QUESTION MARK ICON"
    widget_button_price.setAttribute("class", "slide-in-blurred"); // DISPLAY WIDGET BUTTON WITH ANIMATION
  }, 800);
  setTimeout(function () {
    widget_button_price.setAttribute("class", "");
  }, 1300); // DISABLING WIDGET BUTTON ANIMATION
}

/* ----------------------------- */
/* WHEN WIDGET BUTTON IS CLICKED */
/* ----------------------------- */
widget_button_price.onclick = function () {
  if (widget_button_price.getAttribute("active") == null) {
    // WIDGET WINDOW IS CLOSE
    opening_widget(); // CALL WIDGET OPENING FUNCTION
  } else if (widget_button_price.hasAttribute("active")) {
    // WIDGET WINDOW IS OPEN
    closing_widget(); // CALL WIDGET CLOSING FUNCTION
  }
};

/* ----------------------------------------- */
/* DISPLAY WIDGET PRICE XML FEEDER IN HTML */
/* ----------------------------------------- */
var options_price = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
widget_price_xml_feeder.innerHTML = `<span>${dummy_data_idx_real.company_name}</span>
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

/* ----------------- */
/* ACCORDION HANDLER */
/* ----------------- */
const accordion_price = document.getElementsByClassName("accordion_price"); // GETTING ALL ACCORDIONS

for (i = 0; i < accordion_price.length; i++) {
  // LOOPING
  accordion_price[i].addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
