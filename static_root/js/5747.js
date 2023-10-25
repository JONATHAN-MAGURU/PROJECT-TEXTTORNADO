const amtOfTicketsToShare = document.querySelector("#shareT");
const numberToShare = document.querySelector("#shareN");
const checkTickets = document.querySelector("#ticket-avail");
const checkTickets2 = document.querySelector(".ticket-avail");
const next_btn3 = document.querySelector(".next-btn3");
const next_btn4 = document.getElementsByClassName("next-btn3")[1];
const cancel_btnn3 = document.getElementsByClassName("cancel-btnn3")[0];
const cancel_btnn4 = document.getElementsByClassName("cancel-btnn3")[1];
const cancel_btnn5 = document.getElementsByClassName("cancel-btnn3")[2];
const loader_s = document.querySelector(".loader_s");
const macrot3 = document.querySelector("#k3");
const loader_s2 = document.querySelector(".loader_s2");
const errrors3 = document.querySelector("#errors3");
const ctnrerror = document.getElementsByClassName("container-error")[1];
const sharePart1 = document.getElementsByClassName("sharePart1")[0];
const sharePart3 = document.getElementsByClassName("sharePart2")[0];
const shareTickets2 = document.getElementsByClassName("shareTickets")[1];
const claim_box = document.querySelector(".claim_box");
const claimText = document.querySelector("#claimText");
amtOfTicketsToShare.addEventListener("focus", function () {
  amtOfTicketsToShare.style.border = "1px solid orange";
});

numberToShare.addEventListener("focus", function () {
  numberToShare.style.border = "1px solid orange";
});

next_btn3.addEventListener("click", function () {
  const checkTicketsInt = parseInt(checkTickets.innerHTML, 10);
  if (amtOfTicketsToShare.value == "" || numberToShare == "") {
    ctnrerror.style.display = "block";
    errrors3.innerHTML = "Fill all the fields below..";
    numberToShare.focus();
  } else if (numberToShare.value.length < 10) {
    ctnrerror.style.display = "block";
    errrors3.innerHTML = "Enter a valid number..";
  } else if (checkTicketsInt < 1) {
    ctnrerror.style.display = "block";
    errrors3.innerHTML = "You dont have enough tickets..";
  } else if (amtOfTicketsToShare.value == 0) {
    ctnrerror.style.display = "block";
    errrors3.innerHTML = "Enter tickets to share..";
  } else if (amtOfTicketsToShare.value > checkTicketsInt) {
    ctnrerror.style.display = "block";
    errrors3.innerHTML =
      "The specified tickets are greater than residual ticket..";
  } else if (
    extractNumberTosend() == document.body.getAttribute("data-number")
  ) {
    ctnrerror.style.display = "block";
    errrors3.innerHTML = "You can not send tickets to yourself.";
  } else {
    searchAccountTosend();
    callLoader_On();
  }
});

function extractNumberTosend() {
  const firstNum = numberToShare.value;
  const extracted = firstNum.slice(-9);
  const finalNumber = "+265" + extracted;
  return finalNumber;
}

async function searchAccountTosend() {
  try {
    const number = extractNumberTosend();
    const objData = { number };
    const jsonData = JSON.stringify(objData);

    const csrfToken = document.querySelector("#csrf_token00").value;

    const response = await fetch("/searchAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: jsonData,
    });
    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const responseData = await response.json();
        if (responseData.accountDetails) {
          setTimeout(callSharePart3, 800);
          ctnrerror.style.display = "none";
          next_btn3.style.display = "none";
          next_btn4.style.display = "block";
          cancel_btnn3.style.display = "none";
          cancel_btnn4.style.display = "block";
          errrors3.innerHTML = "";
          for (var key in responseData.accountDetails) {
            document.querySelector("#imgTosend").src =
              "/images/" + responseData.accountDetails[key].profile_pic;
            document.querySelector("#usernameTosend").innerHTML =
              responseData.accountDetails[key].username;
          }
        } else {
          // JSON response with error message
        }
      } else {
        const responseData = await response.text();

        // Handle the non-JSON response
        if (responseData == "There is no account with such number") {
          ctnrerror.style.display = "block";
          errrors3.innerHTML = responseData;
        } else {
          console.log(responseData);
        }
      }
    } else {
      console.log("something went wrong");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function callLoader_On() {
  loader_s.style.display = "block";
  setTimeout(callLoader_Off, 1200);
}
function callLoader_On2() {
  loader_s2.style.display = "block";
  setTimeout(callLoader_Off2, 1200);
}

function callLoader_Off() {
  loader_s.style.display = "none";
}
function callLoader_Off2() {
  loader_s2.style.display = "none";
}

function callSharePart3() {
  sharePart1.style.display = "none";
  sharePart3.style.display = "block";
  document.querySelector("#amtT").innerHTML = amtOfTicketsToShare.value;
  document.querySelector("#userT").innerHTML = numberToShare.value;
}

next_btn4.addEventListener("click", function () {
  callLoader_On();
  sendTickets();
  next_btn4.style.background = "gray";
  next_btn4.disbled;
  next_btn4.style.cursor = "not-allowed";
  setTimeout(restoreSendbtn, 3000);
});

function restoreSendbtn() {
  next_btn4.style.background = "orange";
  next_btn4.disbled = false;
  next_btn4.style.cursor = "pointer";
}

function sendTickets() {
  const to = extractNumberTosend();
  const from = document.body.getAttribute("data-username");
  const amtOft = amtOfTicketsToShare.value;
  const firstIdOb = { to, from, amtOft };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken5 = document.querySelector("#csrf_token55").value;
  XHR3.open("POST", "/shareTickets", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken5);
  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      console.log(XHR3.responseText);
      fetchTicketData(id);
      document.querySelector(".shareTickets").style.display = "none";
      notifications.style.width = "40%";
      notifications.style.opacity = "1";
      document.querySelector(".covers").style.display = "none";
      document.querySelector("#notText").innerHTML = XHR3.responseText;
      notificationsmob.style.top = "2px";
      notText2.innerHTML = XHR3.responseText;
      setTimeout(closeNotification, 5000);
      reverseAction();
      numberToShare.value = "";
      amtOfTicketsToShare.value = "";
      setTimeout(closeNotBar, 5000);
    } else {
      console.log("something went wrong");
    }
  });
  XHR3.send(jsonData);
}

const otherOptions1 = document.getElementsByClassName("otherOptions")[0];
const otherOptions2 = document.getElementsByClassName("otherOptions")[1];
var otherOptions3 = document.getElementsByClassName("otherOptions")[2];

otherOptions3.addEventListener("click", function () {
  options.style.display = "none";
  leaderboard_hider.style.width = "0";
  setTimeout(callCustomerCare, 700);
});

function callCustomerCare() {
  settings_container2.style.width = "28.5%";
  settings_container.style.width = 0;
  settings_container3.style.width = 0;
  settings_container4.style.width = 0;
}
otherOptions1.addEventListener("click", function () {
  document.querySelector(".shareTickets").style.display = "block";
  document.querySelector(".covers").style.display = "block";
});

otherOptions2.addEventListener("click", function () {
  shareTickets2.style.display = "block";
  document.querySelector(".covers").style.display = "block";
});

document.querySelector(".closeShare").addEventListener("click", function () {
  document.querySelector(".shareTickets").style.display = "none";
  ctnrerror.style.display = "none";
  errrors3.innerHTML = "";
  document.querySelector(".covers").style.display = "none";
});

cancel_btnn3.addEventListener("click", function () {
  document.querySelector(".shareTickets").style.display = "none";
  ctnrerror.style.display = "none";
  errrors3.innerHTML = "";
  document.querySelector(".covers").style.display = "none";
});
cancel_btnn4.addEventListener("click", function () {
  reverseAction();
});

function reverseAction() {
  next_btn3.style.display = "block";
  next_btn4.style.display = "none";
  cancel_btnn3.style.display = "block";
  cancel_btnn4.style.display = "none";
  sharePart1.style.display = "block";
  sharePart3.style.display = "none";
}

cancel_btnn5.addEventListener("click", function () {
  shareTickets2.style.display = "none";
  document.querySelector(".covers").style.display = "none";
});

document
  .getElementsByClassName("closeClaim")[0]
  .addEventListener("click", function () {
    shareTickets2.style.display = "none";
    document.querySelector(".covers").style.display = "none";
  });

let isRequestPending2 = false;

function claimTickets() {
  if (isRequestPending2) {
    console.log("An ongoing request is already in progress.");
    return;
  }

  isRequestPending2 = true;

  const firstIdOb = { id };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken = document.querySelector("#csrf_token59").value;
  XHR3.open("POST", "/claimTickets", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken);

  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      notifications.style.width = "40%";
      notifications.style.opacity = "1";
      document.querySelector("#notText").innerHTML = XHR3.responseText;
      notificationsmob.style.top = "2px";
      notText2.innerHTML = XHR3.responseText;
      setTimeout(closeNotification, 5000);
      fetchTicketData(id);
      setTimeout(closeNotBar, 5000);
    } else {
      console.log("Something went wrong");
    }

    isRequestPending2 = false;
  });

  XHR3.send(jsonData);
}

claim_box.addEventListener("click", function () {
  callLoader_On2();
  claimTickets();
  setTimeout(disableClaimBtn, 300);
  searchFreeTickets();
  document.querySelector(".claimed").style.animationDuration = "0.5s";
});

claimText.addEventListener("click", function () {
  callLoader_On2();
  claimTickets();
  setTimeout(disableClaimBtn, 300);
  searchFreeTickets();
  document.querySelector(".claimed").style.animationDuration = "0.5s";
});

function disableClaimBtn() {
  claim_box.disbled;
  claim_box.style.background = "gray";
  claim_box.style.cursor = "not-allowed";
  setTimeout(eableClaimBtn, 2000);
}

function eableClaimBtn() {
  claim_box.disbled = false;
  claim_box.style.background = "#ed143d";
  claim_box.style.cursor = "pointer";
  document.querySelector(".claimed").style.animationDuration = "8s";
}

function searchFreeTickets() {
  const firstIdOb = { id };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken = document.querySelector("#csrf_token59").value;
  XHR3.open("POST", "/claimTickets2", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken);

  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      if (XHR3.responseText !== "No free tickets available") {
        notifications.style.width = "40%";
        notifications.style.opacity = "1";
        document.querySelector("#notText").innerHTML = XHR3.responseText;
        document.querySelector(".claimed").style.color = "yellowgreen";
        notificationsmob.style.top = "2px";
        notText2.innerHTML = XHR3.responseText;
        setTimeout(closeNotification, 5000);
        clearInterval(searchFreeTkts);
      } else {
        document.querySelector(".claimed").style.color = "gray";
      }
    } else {
      console.log("Something went wrong");
    }
  });
  XHR3.send(jsonData);
}

const searchFreeTkts = setInterval(searchFreeTickets, 6000);
const readerBoardOptions = document.querySelector(".readerBoardOptions");
const readerBoardOptions2 =
  document.getElementsByClassName("readerBoardOptions")[1];

let optionsVisible = false;
document.querySelector(".fa-ellipsis-v").addEventListener("click", () => {
  if (optionsVisible) {
    readerBoardOptions.style.right = "-51%";
  } else {
    readerBoardOptions.style.right = "1%";
  }
  optionsVisible = !optionsVisible;
});

let optionsVisible2 = false;
document
  .getElementsByClassName("fa-ellipsis-v")[1]
  .addEventListener("click", () => {
    if (optionsVisible2) {
      readerBoardOptions2.style.right = "-51%";
    } else {
      readerBoardOptions2.style.right = "1%";
    }
    optionsVisible2 = !optionsVisible2;
  });

const otherOptions = document.getElementsByClassName("otherOptions2")[0];
const otherOptionsA = document.getElementsByClassName("otherOptions2")[1];
const otherOptionsB = document.getElementsByClassName("otherOptions2")[2];
const otherOptionsC = document.getElementsByClassName("otherOptions2")[3];
const otherOptionsD = document.getElementsByClassName("otherOptions2")[4];

otherOptions.addEventListener("click", () => {
  readerBoardOptions.style.right = "-51%";
});

let optionsAVisible = false;
let getCodesForLeaderBoardInterval;

otherOptionsA.addEventListener("click", () => {
  const readerBoardOptions = document.querySelector(".readerBoardOptions");
  const res_Body1 = document.getElementsByClassName("leaderboardBody")[0];
  const res_Body = document.getElementsByClassName("leaderboardBody")[1];
  if (optionsAVisible) {
    readerBoardOptions.style.right = "-51%";
    window.location.reload();
  } else {
    clearInterval(getCodesForLeaderBoard);
    readerBoardOptions.style.right = "-51%";
    updateLeaderboard2();
    document.querySelector("#lastEvent").innerHTML = "Current Event";
    res_Body.style.display = "block";
    res_Body1.style.display = "none";
  }
  optionsAVisible = !optionsAVisible;
});

let xhrInProgress2 = false;

function updateLeaderboard2() {
  if (xhrInProgress2) {
    return;
  }

  xhrInProgress2 = true;

  var xhr3 = new XMLHttpRequest();
  xhr3.open("POST", "/leaderBoardHistory3", true);
  const csrfToken = document.querySelector("#csrf_token509").value;
  xhr3.setRequestHeader("Content-Type", "application/json");
  xhr3.setRequestHeader("X-CSRFToken", csrfToken);
  const firstIdOb = { id };
  const jsonData = JSON.stringify(firstIdOb);
  xhr3.onload = function () {
    xhrInProgress2 = false;

    if (xhr3.status === 200) {
      var response = JSON.parse(xhr3.responseText);
      var res_Body = document.getElementsByClassName("leaderboardBody")[1];
      document.querySelector(".loader3").style.display = "none";
      res_Body.innerHTML = "";
      let x = 1;
      for (var key in response.results) {
        if (response.results[key].play_id == id) {
          if (x % 2 == 0) {
            var temp =
              '<div class="userBox" style="border: 1px solid orange; box-shadow:1px 1px 20px black;"><div style="color:white;" class="rankLB">' +
              x++ +
              '</div><div class="firstnameLB" style="color:white;"><img style="width:35px;height:35px; border-radius:50%;" src="' +
              response.results[key].profile_pic +
              '">&nbsp;&nbsp; <div style="margin-top:6.5px">' +
              response.results[key].username +
              '</div></div><div  style="color:white;" class="wpmLB">' +
              response.results[key].wpm +
              '</div><div style="color:white;" class="charLB">' +
              response.results[key].cpm +
              '</div> <div style="color:white;" class="mistLB">' +
              response.results[key].mistakes +
              "</div></div>";

            res_Body.innerHTML += temp;
          } else {
            var temp =
              '<div class="userBox" style="border: 1px solid #ed143d; background:transparent; box-shadow:1px 1px 20px black;"><div style="color:white;" class="rankLB">' +
              x++ +
              '</div><div class="firstnameLB" style="color:white;"><img style="width:35px;height:35px; border-radius:50%;" src="' +
              response.results[key].profile_pic +
              '">&nbsp;&nbsp; <div style="margin-top:6.5px">' +
              response.results[key].username +
              '</div></div><div  style="color:white;" class="wpmLB">' +
              response.results[key].wpm +
              '</div><div style="color:white;" class="charLB">' +
              response.results[key].cpm +
              '</div> <div style="color:white;" class="mistLB">' +
              response.results[key].mistakes +
              "</div></div>";

            res_Body.innerHTML += temp;
          }
        } else {
          if (x % 2 == 0) {
            var temp =
              '<div class="userBox"><div class="rankLB">' +
              x++ +
              '</div><div class="firstnameLB"><img style="width:35px;height:35px; border-radius:50%;" src="' +
              response.results[key].profile_pic +
              '">&nbsp;&nbsp;<div style="margin-top:6.5px">' +
              response.results[key].username +
              '</div></div><div class="wpmLB">' +
              response.results[key].wpm +
              '</div><div class="charLB">' +
              response.results[key].cpm +
              '</div> <div class="mistLB">' +
              response.results[key].mistakes +
              "</div></div>";
            res_Body.innerHTML += temp;
          } else {
            var temp =
              '<div  style="background:transparent; border:none;" class="userBox"><div class="rankLB">' +
              x++ +
              '</div><div class="firstnameLB"><img style="width:35px;height:35px; border-radius:50%;" src="' +
              response.results[key].profile_pic +
              '">&nbsp;&nbsp;<div style="margin-top:6.5px">' +
              response.results[key].username +
              '</div></div><div class="wpmLB">' +
              response.results[key].wpm +
              '</div><div class="charLB">' +
              response.results[key].cpm +
              '</div> <div class="mistLB">' +
              response.results[key].mistakes +
              "</div></div>";
            res_Body.innerHTML += temp;
          }
        }
      }
    } else {
      console.log("Request failed. Returned status of " + xhr3.status);
    }
  };
  xhr3.send(jsonData);
}

function displayKeyName(event) {
  const keyName = event.key;
  document.getElementById("keyOutput").textContent = `key pressed: ${keyName}`;
}

document.addEventListener("keydown", displayKeyName);

function checkCapsLock(event) {
  const capsLockStatus = event.getModifierState("CapsLock");
  const capsLockText = capsLockStatus ? "ON" : "OFF";
  document.getElementById(
    "capsOutput"
  ).textContent = `Caps Lock: ${capsLockText}`;
}

document.addEventListener("keydown", checkCapsLock);

function checkNetworkStatus() {
  if (navigator.connection) {
    const networkType = navigator.connection.effectiveType;
    document.getElementById(
      "Netoutput"
    ).textContent = `network : ${networkType}`;
  } else {
    document.getElementById("Netoutput").textContent =
      "network information not available.";
  }
}

window.addEventListener("load", checkNetworkStatus);

function checkBatteryStatus() {
  if ("getBattery" in navigator) {
    navigator.getBattery().then(function (battery) {
      const batteryPercentage = (battery.level * 100).toFixed(2);
      document.getElementById(
        "batOutput"
      ).textContent = `battery : ${batteryPercentage}%`;
    });
  } else {
    document.getElementById("batOutput").textContent =
      "Battery information not available.";
  }
}

window.addEventListener("load", checkBatteryStatus);

const macrot4 = document.querySelector('#k4')

otherOptionsC.addEventListener("click", function () {
  readerBoardOptions2.style.right = "-51%";
  options_notf.style.display = "none";
});

otherOptionsD.addEventListener("click", function () {
  clearNotifications();
});

function clearNotifications() {
  const firstIdOb = { id };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken5 = document.querySelector("#csrf_token58").value;
  XHR3.open("POST", "/clearNotification", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken5);
  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      document.querySelector(".notf_body").innerHTML = "";
      notifications.style.width = "40%";
      notifications.style.opacity = "1";
      document.querySelector("#notText").innerHTML = XHR3.responseText;
      setTimeout(closeNotBar, 5000);
      notificationsmob.style.top = "2px";
      notText2.innerHTML = XHR3.responseText;
      setTimeout(closeNotification, 5000);
    } else {
      notifications.style.width = "40%";
      notifications.style.opacity = "1";
      document.querySelector("#notText").innerHTML = XHR3.responseText;
      notificationsmob.style.top = "2px";
      notText2.innerHTML = XHR3.responseText;
      setTimeout(closeNotification, 5000);
    }
  });
  XHR3.send(jsonData);
}

function closeNotBar() {
  notifications.style.width = "0%";
  notifications.style.opacity = "0";
}
