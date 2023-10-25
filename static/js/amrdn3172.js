const bars = document.querySelector(".fa-bars");
const navBar = document.querySelector(".navigationBar");
const backArrow = document.querySelector(".backArrow");
const macrot2 = document.querySelector("#k2");
const facomments = document.getElementsByClassName("fa-comments")[1];
const fahome = document.querySelector(".fa-home");
const urlpatterns1747 = [
  "amargerdon_e2_url01",
  "/amargedon_e2_url01",
  "/amargerdon_e2_url01",
  "/processPayment",
];
const container_head = document.querySelector(".container_head2");
const fatimer = document.querySelector(".fa-clock");

fatimer.addEventListener("click", () => {
  document.querySelector(".container_B").style.display = "block";
  options_notf.style.display = "none";
  options_comments.style.display = "none";
  settings_container.style.width = "0%";
  settings_container2.style.width = "0%";
  welcomeUserHolder3.style.display = "none";
  document.querySelector(".bodyCover2").style.width = "0%";
  document.getElementsByClassName("leaderboard_container")[0].style.width =
    "0%";
  callWinnerOff();
  document.querySelector(".spinnerContainer").style.display = "none";
  options.style.display = "none";
  leaderboard_hider.style.width = "0%";
});

bars.addEventListener("click", () => {
  options.style.display = "none";
  leaderboard_hider.style.width = "0%";
  navBar.style.display = "block";
  welcomeUserHolder3.style.display = "none";
  document.querySelector(".bodyCover2").style.width = "0%";
  document.querySelector(".welcomeUserHolder").style.display = "none";
  document.getElementsByClassName("leaderboard_container")[0].style.width =
    "0%";
  callWinnerOff();
  document.querySelector(".spinnerContainer").style.display = "none";
  document.querySelector(".container_B").style.display = "none";
});
backArrow.addEventListener("click", () => {
  navBar.style.display = "none";
  document.querySelector(".welcomeUserHolder").style.display = "none";
  document.querySelector(".bodyCover2").style.width = "0%";
  callWinnerOff();
  document.querySelector(".spinnerContainer").style.display = "none";
  document.querySelector(".manage_account_holder").style.width = "0%";
});

facomments.addEventListener("click", function () {
  openCommentss();
  callWinnerOff();
  options.style.display = "none";
  leaderboard_hider.style.width = "0%";
  document.querySelector(".bodyCover2").style.width = "0%";
  document.querySelector(".welcomeUserHolder").style.display = "none";
  document.querySelector(".container_B").style.display = "none";
  document.querySelector(".spinnerContainer").style.display = "none";
  document.getElementsByClassName("leaderboard_container")[0].style.width =
    "0%";
});

fahome.addEventListener("click", function () {
  options.style.display = "none";
  leaderboard_hider.style.width = "0%";
  options_comments.style.display = "none";
  document.querySelector(".welcomeUserHolder").style.display = "none";
  settings_container.style.width = "0%";
  callWinnerOff();
  document.querySelector(".spinnerContainer").style.display = "none";
  document.querySelector(".container_B").style.display = "none";
  options_notf.style.display = "none";
  settings_container2.style.width = "0%";
  welcomeUserHolder3.style.display = "none";
  document.querySelector(".bodyCover2").style.width = "0%";
  document.getElementsByClassName("leaderboard_container")[0].style.width =
    "0%";
});

const navProfile = document.getElementsByClassName("navProfile")[0];
const navProfile3 = document.getElementsByClassName("navProfile3")[0];
const navProfile2A = document.getElementsByClassName("navProfile2")[0];
const navProfile2B = document.getElementsByClassName("navProfile2")[1];
const navProfile2C = document.getElementsByClassName("navProfile2")[2];
const navProfile2D = document.getElementsByClassName("navProfile2")[3];
const navProfile2E = document.getElementsByClassName("navProfile2")[4];
const navProfile2F = document.getElementsByClassName("navProfile2")[5];
const navProfile2G = document.getElementsByClassName("navProfile2")[6];

navProfile2A.addEventListener("click", function () {
  welcomeUserHolder3.style.display = "block";
  navBar.style.display = "none";
  document.querySelector(".bodyCover2").style.width = "100%";
  document.getElementsByClassName("leaderboard_container")[0].style.width =
    "0%";
  callWinnerOff();
  document.querySelector(".spinnerContainer").style.display = "none";
  options.style.display = "none";
  leaderboard_hider.style.width = "0%";
  document.querySelector(".bodyCover3").style.width = "0%";
  options_comments.style.display = "none";
});

navProfile2B.addEventListener("click", function () {
  document.getElementsByClassName("leaderboard_container")[0].style.width =
    "100%";
  navBar.style.display = "none";
  welcomeUserHolder3.style.display = "none";
  window.history.pushState({ id: 1 }, null, "?q=85747&texttornado-engine");
  document.querySelector(".bodyCover2").style.width = "0%";
  callWinnerOff();
  document.querySelector(".spinnerContainer").style.display = "none";
  settings_container2.style.width = "0%";
  options.style.display = "none";
  document.querySelector(".bodyCover3").style.width = "0%";
  leaderboard_hider.style.width = "0%";
  options_comments.style.display = "none";
});

navProfile2C.addEventListener("click", function () {
  document.querySelector(".spinnerContainer").style.display = "block";
  setTimeout(callWinner, 500);
  document.querySelector("#toAnEnd").innerHTML = "LAST EVENT RESULTS";
  document.getElementsByClassName("leaderboard_container")[0].style.width =
    "0%";
  navBar.style.display = "none";
  welcomeUserHolder3.style.display = "none";
  document.querySelector(".bodyCover2").style.width = "0%";
  settings_container2.style.width = "0%";
  document.querySelector(".welcomeUserHolder").style.display = "none";
  options.style.display = "none";
  document.querySelector(".bodyCover3").style.width = "0%";
  leaderboard_hider.style.width = "0%";
  options_comments.style.display = "none";
});

navProfile2D.addEventListener("click", () => {
  document.querySelector(".spinnerContainer").style.display = "none";
  callWinnerOff();
  document.querySelector("#toAnEnd").innerHTML = "LAST EVENT RESULTS";
  document.getElementsByClassName("leaderboard_container")[0].style.width =
    "0%";
  navBar.style.display = "none";
  welcomeUserHolder3.style.display = "none";
  document.querySelector(".bodyCover2").style.width = "0%";
  document.querySelector(".bodyCover3").style.width = "0%";
  settings_container2.style.width = "0%";
  document.querySelector(".bodyCover3").style.width = "0%";
  document.querySelector(".welcomeUserHolder").style.display = "block";
  partA.style.display = "block";
  partB.style.display = "none";
  options.style.display = "none";
  leaderboard_hider.style.width = "0%";
  options_comments.style.display = "none";
});

navProfile2E.addEventListener("click", () => {
  redirectToTerms();
});
navProfile2F.addEventListener("click", () => {
  redirectTopolicy();
});

navProfile2G.addEventListener("click", () => {
  navBar.style.display = "none";
  document.querySelector(".options_logout").style.width = "98%";
  document.querySelector(".options_logout").style.opacity = "1";
  document.querySelector(".bodyCover3").style.width = "0%";
  log_out_hider.style.width = "100%";
  options.style.display = "none";
  leaderboard_hider.style.width = "0%";
  options_comments.style.display = "none";
});

navProfile3.addEventListener("click", function () {
  options.style.display = "block";
  leaderboard_hider.style.width = "100%";
  navBar.style.display = "none";
  options_comments.style.display = "none";
  document.querySelector(".bodyCover3").style.width = "0%";
  options_notf.style.display = "none";
});

const openCustomercare = document.getElementsByClassName("setseen6")[1];

openCustomercare.addEventListener("click", () => {
  settings_container2.style.width = "100%";
  settings_container.style.width = 0;
  settings_container3.style.width = 0;
  document.querySelector(".bodyCover3").style.width = "0%";
  options.style.display = "none";
  leaderboard_hider.style.width = "0%";
  document.getElementsByClassName("leaderboard_container")[0].style.width =
    "0%";
  settings_container4.style.width = 0;
  options_comments.style.display = "none";
  document.querySelector(".container_B").style.display = "none";
  options_notf.style.display = "none";
  welcomeUserHolder3.style.display = "none";
  document.querySelector(".bodyCover2").style.width = "0%";
  callWinnerOff();
  document.querySelector(".spinnerContainer").style.display = "none";
});

navProfile.addEventListener("click", () => {
  document.querySelector(".manage_account_holder").style.width = "100%";
});

const monetary = document.getElementsByClassName("monetary")[0];
const quest = document.getElementsByClassName("monetary")[1];

document.getElementsByClassName("setseenn")[1].addEventListener("click", () => {
  quest.style.display = "block";
  monetary.style.display = "none";
  eventRules.style.display = "none";
  eventPrizes.style.display = "block";
});

const notificationsmob = document.querySelector(".notificationsmob");
const notText2 = document.querySelector("#notText2");

function closeNotification() {
  notificationsmob.style.top = "-40px";
  notText2.innerHTML = "";
}

window.addEventListener("popstate", detectback);

function detectback() {
  document.getElementsByClassName("leaderboard_container")[0].style.width =
    "0%";
}
