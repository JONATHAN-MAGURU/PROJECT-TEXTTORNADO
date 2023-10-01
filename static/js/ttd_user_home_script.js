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
const history = document.getElementsByClassName("history")[0];
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
const open_comm = document.getElementById("open_comm");
const options_comments = document.getElementsByClassName("options_comments")[0];
const comment_body = document.getElementsByClassName("comment_body")[0];
const notifications = document.querySelector(".notifications");
const airtel = document.querySelector("#airtel");
const userImage = document.getElementsByClassName("ico")[0];
const outOfTicketsHolder = document.querySelector(".outOfTicketsHolder");
const outOfTicketsHolder2 =
  document.getElementsByClassName("outOfTicketsHolder")[1];
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
const icom = document.querySelector(".icom");
const leaderboardBody = document.querySelector(".leaderboardBody");
document.addEventListener("load", function () {
  userImage.width = 100;
  userImage.height = 100;
  icom.width = 3000;
  icom.height = 3000;
});

open_comm.addEventListener("click", function () {
  options_comments.style.display = "block";
  comment_body.style.maxHeight = opt - 200 + "px";
  options.style.display = "none";
  options_player.style.height = "0";
  options_player.style.border = "none";
  leaderboard_hider.style.width = "0";
  options_logout.style.width = "0";
  options_notf.style.display = "none";
});

close_comm.addEventListener("click", function () {
  options_comments.style.display = "none";
});

history.addEventListener("click", function () {
  settings_container.style.width = "28.5%";
  options_notf.style.display = "none";
  settings_container2.style.width = 0;
  settings_container3.style.width = 0;
  settings_container4.style.width = 0;
});

document
  .getElementsByClassName("customerCare")[0]
  .addEventListener("click", function () {
    settings_container2.style.width = "28.5%";
    settings_container.style.width = 0;
    settings_container3.style.width = 0;
    settings_container4.style.width = 0;
    options_notf.style.display = "none";
  });



settings_box3.addEventListener("click", function () {
  settings_container3.style.width = "27%";
  settings_container.style.width = 0;
  settings_container2.style.width = 0;
  options_notf.style.display = "none";
  settings_container4.style.width = 0;
});

settings_box4.addEventListener("click", function () {
  settings_container4.style.width = "27%";
  settings_container.style.width = 0;
  settings_container2.style.width = 0;
  options_notf.style.display = "none";
  settings_container3.style.width = 0;
});

window.addEventListener("load", function () {
  setTimeout(clearCover, 1000);
});

function clearCover() {
  document.querySelector(".bodyCover").style.width = "0%";
}

function reloadPage() {
  window.location.reload();
}

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
          setTimeout(reloadPage, 6000);
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
  options_notf.style.display = "none";
  options_player.style.height = 0;
  options_player.style.border = "none";
  options_logout.style.width = 0;
  settings_container.style.width = 0;
  settings_container2.style.width = 0;
  settings_container3.style.width = 0;
  settings_container4.style.width = 0;
  options_comments.style.display = "none";
}
function buyTicketsOff() {
  options.style.display = "none";
  leaderboard_hider.style.width = "0";
}

notf.addEventListener("click", function () {
  options_notf.style.display = "block";
  options.style.display = "none";
  options_player.style.height = "0";
  leaderboard_hider.style.width = "0";
  options_player.style.border = "none";
  options_logout.style.width = "0";
  options_comments.style.display = "none";
});

logout.addEventListener("click", function () {
  options_logout.style.width = "20%";
  log_out_hider.style.width = "100%";
  options_notf.style.display = "none";
  options_comments.style.display = "none";
  options.style.display = "none";
  leaderboard_hider.style.width = "0";
  options_player.style.height = 0;
  options_player.style.border = "none";
  options_comments.style.display = "none";
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
  options_notf.style.display = "none";
  leaderboard_hider.style.width = "0";
  options_comments.style.display = "none";
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

for (x = 8; x <= 28; x += 2) {
  fontss.innerHTML += "<option>" + x + "px" + "</option>";
}

fontss.addEventListener("change", function () {
  font_changer.style.fontSize = fontss.value;
});

const fontSelector = document.getElementById("fontSelector");
const fontChanger = document.getElementById("fontChanger");

fontSelector.addEventListener("change", function () {
  const selectedFontFamily = fontSelector.value;
  font_changer.style.fontFamily = selectedFontFamily;
});

const alignmentSelector = document.getElementById("alignmentSelector");

alignmentSelector.addEventListener("change", function () {
  const selectedAlignment = alignmentSelector.value;
  font_changer.style.textAlign = selectedAlignment;
});

window.addEventListener("load", function () {
  const selectedAlignment = alignmentSelector.value;
  font_changer.style.textAlign = selectedAlignment;
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
/*
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    console.log("is here");
  } else {
    location.reload();
  }
});
*/
document.querySelector(".onNot").addEventListener("click", function () {
  notifications.style.width = 0;
  notifications.style.opacity = 0;
});

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
    setTimeout(verifyNumberAirtel(a), 1200);
  }
}

function verifyNumberAirtel(a) {
  container_error.style.display = "none";
  choosePaymet2.style.display = "none";
  document.querySelector("#newAirtel").innerHTML = extractNumber(a);
  choosePaymet.style.display = "block";
  leaderboard_hider.style.width = "100%";
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
function callOutOfticketsHolderOff2() {
  outOfTicketsHolder2.style.display = "none";
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
function callOutOfticketsHolderOn2() {
  outOfTicketsHolder2.style.display = "block";
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
    document.querySelector("#newAirtel").innerHTML = "";
    amount.innerHTML = "";
    numberOfTickets.innerHTML = "";
    typeOfTickets.innerHTML = "";
    airtel.value = "";
    if (checkTnmNumbers() == 8) {
      buyTicketsOff();
      leaderboard_hider.style.width = "100%";
      choosePaymet2.style.display = "block";
      amount.innerHTML = "50";
      numberOfTickets.innerHTML = 1;
      typeOfTickets.innerHTML = "STANDARD TICKETS";
      airtel.focus();
    } else {
      buyTicketsOff();
      callPaymentOn(1, "50", "STANDARD TICKETS");
      document.querySelector("#newAirtel").innerHTML =
        document.body.getAttribute("data-number");
    }
  });

document
  .getElementsByClassName("price_box")[1]
  .addEventListener("click", function () {
    document.querySelector("#newAirtel").innerHTML = "";
    amount.innerHTML = "";
    numberOfTickets.innerHTML = "";
    typeOfTickets.innerHTML = "";
    airtel.value = "";
    if (checkTnmNumbers() == 8) {
      buyTicketsOff();
      leaderboard_hider.style.width = "100%";
      choosePaymet2.style.display = "block";
      amount.innerHTML = "100";
      numberOfTickets.innerHTML = 3;
      typeOfTickets.innerHTML = "EPIC TICKETS";
      airtel.focus();
    } else {
      buyTicketsOff();
      callPaymentOn(3, "100", "EPIC TICKETS");
      document.querySelector("#newAirtel").innerHTML =
        document.body.getAttribute("data-number");
    }
  });

document
  .getElementsByClassName("price_box")[2]
  .addEventListener("click", function () {
    document.querySelector("#newAirtel").innerHTML = "";
    amount.innerHTML = "";
    numberOfTickets.innerHTML = "";
    typeOfTickets.innerHTML = "";
    airtel.value = "";
    if (checkTnmNumbers() == 8) {
      buyTicketsOff();
      leaderboard_hider.style.width = "100%";
      choosePaymet2.style.display = "block";
      amount.innerHTML = "150";
      numberOfTickets.innerHTML = 5;
      typeOfTickets.innerHTML = "LEGENDARY TICKETS";
      airtel.focus();
    } else {
      buyTicketsOff();
      callPaymentOn(5, "150", "LEGENDARY TICKETS");
      document.querySelector("#newAirtel").innerHTML =
        document.body.getAttribute("data-number");
    }
  });

BackBtn2.addEventListener("click", function () {
  choosePaymet2.style.display = "none";
  document.querySelector("#newAirtel").innerHTML = "";
  amount.innerHTML = "";
  numberOfTickets.innerHTML = "";
  typeOfTickets.innerHTML = "";
  airtel.value = "";
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
  const numberX = document.querySelector("#newAirtel").innerHTML;
  const data = {
    amountX,
    ticketX,
    numberX,
    id,
  };
  const jsonData = JSON.stringify(data);
  var xhr = new XMLHttpRequest();
  const csrfToken = document.querySelector("#csrf_token13").value;
  xhr.open("POST", "/processPayment");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", csrfToken);
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
      notifications.style.width = "40%";
      notifications.style.opacity = "1";
      document.querySelector("#notText").innerHTML = xhr.responseText;
      fetchTicketData(id);
      setTimeout(callNotOff, 15000);
      document.querySelector("#newAirtel").innerHTML = "";
      amount.innerHTML = "";
      numberOfTickets.innerHTML = "";
      typeOfTickets.innerHTML = "";
      airtel.value = "";
    } else {
      console.log("Request failed. Returned status of " + xhr.status);
    }
  };
  xhr.send(jsonData);
}

function callNotOff() {
  notifications.style.width = "0%";
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
  let count = 25;
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

function extractNumber(k) {
  const firstNum = k;
  const extracted = firstNum.slice(-9);
  const finalNumber = "+265" + extracted;
  return finalNumber;
}

const timerMainBox1 = document.getElementsByClassName("timerMainBox")[0];
const timerMainBox2 = document.getElementsByClassName("timerMainBox")[1];
const timerMainBox3 = document.getElementsByClassName("timerMainBox")[2];
const mored = document.getElementsByClassName("mored")[0];
const loader2 = document.getElementsByClassName("loader2")[0];
const loader3 = document.getElementsByClassName("loader3")[0];

let isToggled = false;

document.querySelector(".moreD").addEventListener("click", function () {
  if (!isToggled) {
    timerMainBox1.style.display = "none";
    timerMainBox2.style.display = "none";
    mored.style.height = "100%";
    mored.style.opacity = "1";
    document.querySelector(".moreD").innerHTML = "less details";
  } else {
    mored.style.height = "0";
    mored.style.opacity = "0";
    document.querySelector(".moreD").innerHTML = "more details";
    setTimeout(bringTimerTwo, 800);
  }

  isToggled = !isToggled;
});

function bringTimerTwo() {
  timerMainBox1.style.display = "block";
  timerMainBox2.style.display = "block";
}

document.querySelector(".subscribe").addEventListener("click", function () {
  callLoader2On();
  document.querySelector(".subscribe").disabled;
  document.querySelector(".subscribe").style.background = "gray";
  document.querySelector(".subscribe").style.cursor = "not-allowed";

  setTimeout(subscription, 1500);
});

function callLoader2On() {
  loader2.style.display = "block";
  setTimeout(callLoader2off, 2000);
}

function callLoader2off() {
  loader2.style.display = "none";
  document.querySelector(".subscribe").disabled = false;
  document.querySelector(".subscribe").style.background = "#ed143d";
  document.querySelector(".subscribe").style.cursor = "pointer";
}

function subscription() {
  document.querySelector("#newAirtel").innerHTML = "";
  amount.innerHTML = "";
  numberOfTickets.innerHTML = "";
  typeOfTickets.innerHTML = "";
  airtel.value = "";
  if (checkTnmNumbers() == 8) {
    leaderboard_hider.style.width = "100%";
    choosePaymet2.style.display = "block";
    amount.innerHTML = newPrice.innerHTML;
    numberOfTickets.innerHTML = 20;
    typeOfTickets.innerHTML = "TEXTORNADO PASS";
    airtel.focus();
  } else {
    buyTicketsOff();
    callPaymentOn(20, newPrice.innerHTML, "TEXTORNADO PASS");
    document.querySelector("#newAirtel").innerHTML =
      document.body.getAttribute("data-number");
  }
}

function callNotification() {
  notifications.style.width = "40%";
  notifications.style.opacity = "1";
  document.querySelector("#notText").innerHTML =
    "Typing event is almost over, in the last two minutes you are not allowed to take the typing test.";
}

const getCodesForLeaderBoard = setInterval(function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getLeaderBoardCode");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      for (var key in response.codes) {
        if (response.codes[key].leaderBoardId == 5747) {
          loader3.style.display = "none";
          leaderboardBody.style.display = "block";
        } else {
          loader3.style.display = "block";
          leaderboardBody.style.display = "none";
        }
      }
    } else {
      console.log("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
}, 2000);

setInterval(function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getTypingAreaCode");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      for (var key in response.codes) {
        if (response.codes[key].typingAreaId == 5747) {
          document.querySelector(".loader3Holder").style.display = "none";
          document.querySelector(".container_A_2_2").style.display = "block";
        } else {
          document.querySelector(".loader3Holder").style.display = "block";
          document.querySelector(".container_A_2_2").style.display = "none";
        }
      }
    } else {
      console.log("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
}, 2000);

const availTicketsHolder =
  document.getElementsByClassName("availTicketsHolder")[0];
availTicketsHolder.addEventListener("click", () => {
  buyTickets();
});
