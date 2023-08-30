const loader = document.getElementsByClassName("loader")[0];
const main_body = document.getElementsByClassName("main_body")[0];
const buy_tokens = document.getElementsByClassName("buy_tokens")[0];
const notf = document.getElementsByClassName("notf")[0];
const options_notf = document.getElementsByClassName("options_notf")[0];
const options = document.getElementsByClassName("options")[0];
const logout = document.getElementsByClassName("logout")[0];
const closee1 = document.getElementsByClassName("closee")[0];
const closee2 = document.getElementsByClassName("closee")[1];
const closee3 = document.getElementsByClassName("closee")[2];
const closee4 = document.getElementsByClassName("closee")[3];
const closee5 = document.getElementsByClassName("closee")[4];
const close_comm = document.getElementsByClassName("closexx")[1];
const closee11 = document.getElementsByClassName("closee1")[0];
const options_player = document.getElementsByClassName("options_player")[0];
const options_logout = document.getElementsByClassName("options_logout")[0];
const leaderboard_hider =
  document.getElementsByClassName("leaderboard_hider")[0];
const main_container = document.getElementsByClassName("main_container")[0];
const settings_box = document.getElementsByClassName("settings_box")[0];
const settings_box2 = document.getElementsByClassName("settings_box")[1];
const settings_box3 = document.getElementsByClassName("settings_box")[2];
const settings_box4 = document.getElementsByClassName("settings_box")[3];
const settings_container =
  document.getElementsByClassName("settings_container")[0];
const settings_container2 =
  document.getElementsByClassName("settings_container")[1];
const settings_container3 =
  document.getElementsByClassName("settings_container")[2];
const settings_container4 =
  document.getElementsByClassName("settings_container")[3];
const ask = document.getElementsByClassName("ask")[0];
const ask_holder = document.getElementsByClassName("ask_holder")[0];
const options_logout_1_1 =
  document.getElementsByClassName("options_logout_1_1")[1];
const log_out_hider = document.getElementsByClassName("log_out_hider")[0];
const opt = screen.availHeight;
const opt2 = screen.availWidth;
const fontss = document.getElementById("fontss");
const font_changer = document.getElementsByClassName("typing-text")[0];
const manage_account_holder = document.getElementsByClassName(
  "manage_account_holder"
)[0];
const manage_account = document.getElementsByClassName("manage_account")[0];
const changee = document.getElementsByClassName("change")[0];
const change_pass = document.getElementsByClassName("change_pass")[0];
const manage_close1 = document.getElementsByClassName("manage_close")[0];
const manage_close2 = document.getElementsByClassName("manage_close")[1];
const manage_close3 = document.getElementsByClassName("manage_close")[2];
const write_comment = document.getElementsByClassName("write_comment")[0];
const comment_b = document.getElementsByClassName("write_coment_holder")[0];
const open_comm = document.getElementById("open_comm");
const options_comments = document.getElementsByClassName("options_comments")[0];
const comment_body = document.getElementsByClassName("comment_body")[0];
const leaderboard = (document.getElementsByClassName(
  "leaderboard_container"
)[0].style.height = opt - 140 + "px");

const notifications = document.querySelector(".notifications");

const airtel = document.querySelector("#airtel");

const userImage = document.getElementsByClassName("ico")[0];
window.addEventListener("load", function () {
  userImage.width = 300;
});

main_container.style.height = opt - 120 + "px";
settings_container.style.height = opt - 150 + "px";
settings_container2.style.height = opt - 150 + "px";
settings_container3.style.height = opt - 150 + "px";
settings_container4.style.height = opt - 150 + "px";

open_comm.addEventListener("click", function () {
  options_comments.style.height = opt - 160 + "px";
  comment_body.style.maxHeight = opt - 200 + "px";
  options.style.display = "none";
  options_player.style.height = "0";
  options_player.style.border = "none";
  leaderboard_hider.style.width = "0";
  options_logout.style.width = "0";
  options_notf.style.height = 0;
});

close_comm.addEventListener("click", function () {
  options_comments.style.height = 0;
  t_overview.innerHTML = "";
});

settings_box.addEventListener("click", function () {
  settings_container.style.width = "27%";
  settings_container2.style.width = 0;
  settings_container3.style.width = 0;
  settings_container4.style.width = 0;
});

settings_box2.addEventListener("click", function () {
  settings_container2.style.width = "27%";
  settings_container.style.width = 0;
  settings_container3.style.width = 0;
  settings_container4.style.width = 0;
});

settings_box3.addEventListener("click", function () {
  settings_container3.style.width = "27%";
  settings_container.style.width = 0;
  settings_container2.style.width = 0;
  settings_container4.style.width = 0;
});

settings_box4.addEventListener("click", function () {
  settings_container4.style.width = "27%";
  settings_container.style.width = 0;
  settings_container2.style.width = 0;
  settings_container3.style.width = 0;
});

setInterval(function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getFontendCodes");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      for (var key in response.codes) {
        if (response.codes[key].FrontendId == 5747) {
          loader.style.height = "0vh";
          loader.style.opacity = "0";
          main_body.style.display = "block";
        } else {
          loader.style.height = "100vh";
          loader.style.opacity = "1";
          main_body.style.display = "none";
        }
      }
    } else {
      console.log("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
}, 2000);

document.getElementById("leaderb").addEventListener("click", function () {
  document.getElementsByClassName("leaderboard_container2")[0].style.width =
    "100%";
});

buy_tokens.addEventListener("click", function () {
  buyTickets();
});

function buyTickets() {
  options.style.display = "block";
  leaderboard_hider.style.width = "100%";
  options_notf.style.height = 0;
  options_player.style.height = 0;
  options_player.style.border = "none";
  options_logout.style.width = 0;
  settings_container.style.width = 0;
  settings_container2.style.width = 0;
  settings_container3.style.width = 0;
  settings_container4.style.width = 0;
  options_comments.style.height = 0;
}
function buyTicketsOff() {
  options.style.display = "none";
  leaderboard_hider.style.width = "0";
}

notf.addEventListener("click", function () {
  options_notf.style.height = opt - 110 + "px";
  options.style.display = "none";
  options_player.style.height = "0";
  leaderboard_hider.style.width = "0";
  options_player.style.border = "none";
  options_logout.style.width = "0";
  options_comments.style.height = 0;
});

logout.addEventListener("click", function () {
  options_logout.style.width = "20%";
  log_out_hider.style.width = "100%";
  options_notf.style.height = "0";
  options_comments.style.height = 0;
  options.style.display = "none";
  leaderboard_hider.style.width = "0";
  options_player.style.height = 0;
  options_player.style.border = "none";
  options_comments.style.height = 0;
});

options_logout_1_1.addEventListener("click", function () {
  options_logout.style.width = 0;
  log_out_hider.style.width = 0;
});

function openManageAccount() {
  options_player.style.height = "370px";
  options_player.style.border = "1px solid #21262d";
  options.style.display = "none";
  options_logout.style.width = "0";
  options_notf.style.height = "0";
  leaderboard_hider.style.width = "0";
  options_comments.style.height = 0;
}

closee1.addEventListener("click", function () {
  options.style.display = "none";
  leaderboard_hider.style.width = "0";
});

closee2.addEventListener("click", function () {
  settings_container.style.width = 0;
});
closee3.addEventListener("click", function () {
  settings_container2.style.width = 0;
});
closee4.addEventListener("click", function () {
  settings_container3.style.width = 0;
});
closee5.addEventListener("click", function () {
  settings_container4.style.width = 0;
});
ask.addEventListener("click", function () {
  ask_holder.style.width = "100%";
});
closee11.addEventListener("click", function () {
  ask_holder.style.width = "0%";
});

for (x = 14; x <= 28; x += 2) {
  fontss.innerHTML += "<option>" + x + "px" + "</option>";
}

fontss.addEventListener("change", function () {
  font_changer.style.fontSize = fontss.value;
});

manage_account.addEventListener("click", function () {
  manage_account_holder.style.width = "23%";
  manage_account_holder.style.border = "1px solid #21262d";
});
changee.addEventListener("click", function () {
  change_pass.style.maxHeight = "300px";
  change_pass.style.opacity = "1";
});

manage_close3.addEventListener("click", function () {
  options_player.style.height = "0";
  options_player.style.border = "none";
  manage_account_holder.style.width = "0";
  manage_account_holder.style.border = "none";
});
manage_close1.addEventListener("click", function () {
  manage_account_holder.style.width = "0";
  manage_account_holder.style.border = "none";
});

manage_close2.addEventListener("click", function () {
  change_pass.style.maxHeight = 0;
  change_pass.style.opacity = 0;
});

write_comment.addEventListener("click", function () {
  comment_b.style.maxHeight = "300px";
});

document
  .getElementsByClassName("cont_btn")[0]
  .addEventListener("click", function () {
    resetGame();
    tips.style.display = "none";
    start.style.background = "orange";
    start.disabled = false;
    start.style.cursor = "pointer";
    start.style.outline = "1px solid orange";

    tryAgainBtn.disabled = false;
    tryAgainBtn.style.cursor = "pointer";
    tryAgainBtn.style.color = "orange";
  });

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    // User switched tabs or minimized the window
    // Perform actions like pausing videos, animations, etc.
  } else {
   
  }
});

document.querySelector(".onNot").addEventListener("click", function () {
  notifications.style.width = 0;
  notifications.style.opacity = 0;
});

const outOfTicketsHolder = document.querySelector(".outOfTicketsHolder");
const choosePaymet = document.querySelector(".choosePaymet");
const choosePaymet2 = document.getElementsByClassName("choosePaymet")[1];
const choosePaymet3 = document.getElementsByClassName("choosePaymet")[2];
const numberOfTickets = document.querySelector("#numberOfTickets");
const amount = document.querySelector("#amount");
const typeOfTickets = document.querySelector("#typeOfTickets");
const cancelBtn = document.getElementsByClassName("cancel-btn")[0];
const nextBtn = document.getElementsByClassName("next-btn")[0];
const BackBtn = document.getElementsByClassName("cancel-btn")[1];
const BackBtn2 = document.getElementsByClassName("cancel-btn")[2];
const contBtn = document.getElementsByClassName("next-btn")[1];
const contBtn2 = document.getElementsByClassName("next-btn")[2];
const contBtn3 = document.getElementsByClassName("next-btn")[3];
const loading2 = document.getElementsByClassName("loading")[1];
const loading3 = document.getElementsByClassName("loading")[2];
const loading = document.querySelector(".loading");
const fade = document.querySelector(".fade");
const errors = document.querySelector("#errors");
const container_error = document.querySelector(".container-error");
contBtn2.addEventListener("click", function () {
  verifyNumber(airtel.value);
});

function verifyNumber(a) {
  if (a == "") {
    loaderAndremover();
    setTimeout(callError1, 1000);
  } else if (a.length < 10) {
    loaderAndremover();
    setTimeout(callError2, 1000);
  } else if (checkTnmNumbers2() == 8) {
    loaderAndremover();
    setTimeout(callError3, 1000);
  } else {
    loaderAndremover();
    container_error.style.display = "none";
    choosePaymet2.style.display="none";
    callPaymentOn();
    document.querySelector('#newAirtel').innerHTML =a;
  }
}

function callError1() {
  container_error.style.display = "block";
  errors.innerHTML = "Enter phone number.";
}
function callError2() {
  container_error.style.display = "block";
  errors.innerHTML = "Enter a valid airtel phone number.";
}
function callError3() {
  container_error.style.display = "block";
  errors.innerHTML = "Enter airtel number.";
}

function loaderAndremover() {
  loaderAndFade();
  setTimeout(() => {
    removeLoaderAndFade();
  }, 1700);
}

function removeLoaderAndFade2() {
  loading.style.display = "block";
}
function removeLoaderAndFade2Off() {
  loading.style.display = "none";
}
function removeLoaderAndFade() {
  loading2.style.display = "none";
}

function loaderAndFade2() {
  loading.style.display = "block";
}
function loaderAndFade() {
  loading2.style.display = "block";
}

cancelBtn.addEventListener("click", function () {
  callOutOfticketsHolderOff();
});

function callOutOfticketsHolderOff() {
  outOfTicketsHolder.style.display = "none";
  leaderboard_hider.style.width = "0";
}
function callPaymentOff() {
  choosePaymet.style.display = "none";
  leaderboard_hider.style.width = "0";
}
function callPaymentOn(tkts, amt, typ) {
  choosePaymet.style.display = "block";
  leaderboard_hider.style.width = "100%";
  amount.innerHTML = amt;
  numberOfTickets.innerHTML = tkts;
  typeOfTickets.innerHTML = typ;
}

function callOutOfticketsHolderOn() {
  outOfTicketsHolder.style.display = "block";
  leaderboard_hider.style.width = "100%";
}

nextBtn.addEventListener("click", function () {
  callOutOfticketsHolderOff();
  buyTickets();
});

BackBtn.addEventListener("click", function () {
  callPaymentOff();
  buyTickets();
});

document
  .getElementsByClassName("price_box")[0]
  .addEventListener("click", function () {
    buyTicketsOff();
    callPaymentOn(1, "100", "STANDARD TICKETS");
  });
document
  .getElementsByClassName("price_box")[1]
  .addEventListener("click", function () {
    buyTicketsOff();
    callPaymentOn(3, "1000", "EPIC TICKETS");
  });
document
  .getElementsByClassName("price_box")[2]
  .addEventListener("click", function () {
    if (checkTnmNumbers() == 8) {
      buyTicketsOff();
      leaderboard_hider.style.width = "100%";
      choosePaymet2.style.display = "block";
      airtel.focus();
    } else {
      buyTicketsOff();
      callPaymentOn(5, "1500", "LEGENDARY TICKETS");
    }
  });

BackBtn2.addEventListener("click", function () {
  choosePaymet2.style.display = "none";
  leaderboard_hider.style.width = "0";
});

document
  .getElementsByClassName("next-btn")[1]
  .addEventListener("click", function () {
    removeLoaderAndFade2();
    setTimeout(callPaymentOff, 2000);
    setTimeout(removeLoaderAndFade2Off, 2000);
    setTimeout(callChoosePaymet3on, 2100);
    processPayment(numberOfTickets.innerHTML, amount.innerHTML);
    document.getElementsByClassName("next-btn")[1].disabled;
    document.getElementsByClassName("next-btn")[1].style.cursor = "not-allowed";
    document.getElementsByClassName("next-btn")[1].style.background = "gray";
  });

function callChoosePaymet3on() {
  callCountDown();
  leaderboard_hider.style.width = "100%";
  choosePaymet3.style.display = "block";
  loading3.style.display = "block";
}
function callChoosePaymet3off() {
  leaderboard_hider.style.width = "0%";
  choosePaymet3.style.display = "none";
  loading3.style.display = "none";
}

function processPayment(ticketb, amountb) {
  const amountX = amountb;
  const ticketX = ticketb;
  const numberX = document.body.getAttribute("data-number");
  const data = {
    amountX,
    ticketX,
    numberX,
    id,
  };
  const jsonData = JSON.stringify(data);
  var xhr = new XMLHttpRequest();
  const csrfToken7 = document.querySelector("#csrf_token7").value;
  xhr.open("POST", "/processPayment");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", csrfToken7);
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
      notifications.style.width = "40%";
      notifications.style.opacity = "1";
      document.querySelector("#notText").innerHTML = xhr.responseText;
      fetchTicketData(id);
    } else {
      console.log("Request failed. Returned status of " + xhr.status);
    }
  };
  xhr.send(jsonData);
}

function checkTnmNumbers() {
  const firstNum = document.body.getAttribute("data-number");
  const extracted = firstNum.slice(-9);
  const sliced = extracted.slice(0, 1);
  return sliced;
}
function checkTnmNumbers2() {
  const firstNum = airtel.value;
  const extracted = firstNum.slice(-9);
  const sliced = extracted.slice(0, 1);
  return sliced;
}

function callCountDown() {
  let count = 17;
  const countdown = setInterval(() => {
    document.querySelector("#countDown").innerHTML = count;
    count--;
    if (count < 0) {
      callChoosePaymet3off();
      document.getElementsByClassName("next-btn")[1].disabled = false;
      document.getElementsByClassName("next-btn")[1].style.cursor = "pointer";
      document.getElementsByClassName("next-btn")[1].style.background =
        "orange";
      clearInterval(countdown);
    }
  }, 1000);
}

contBtn3.addEventListener("click", function () {
  loaderAndremover();
  setTimeout(callChoosePaymet3off, 500);
});
