const toReward = document.querySelector("#toReward");
const mail = document.body.getAttribute("data-email");
const rewardBtn = document.querySelector("#rewards");
const saveMontry = document.querySelector("#saveMontry");
const saveQuest = document.querySelector("#saveQuest");

const substatus = document.querySelector("#substatus");
const newprice = document.querySelector("#newprice");
const oldprice = document.querySelector("#oldprice");
const subscriptions = document.querySelector("#subscriptions");

subscriptions.addEventListener("click", (e) => {
  e.preventDefault();
  if (newprice.value == "" || oldprice.value == "") {
    substatus.innerHTML = "FILL ALL FIELDS";
  } else {
    saveSubscription();
  }
});

function saveSubscription() {
  const np = newprice.value;
  const op = oldprice.value;

  const subscriptionData = { np, op, mail };
  const jsonData = JSON.stringify(subscriptionData);
  const XHR3 = new XMLHttpRequest();
  const csrfToken = document.querySelector("#csrf_token239").value;
  XHR3.open("POST", "/setSubscriptionPrice", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken);

  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      substatus.innerHTML = XHR3.responseText;
      getSubScrPrices();
    } else {
      substatus.innerHTML = "CAN'T PROCESS REQUEST";
    }
  });
  XHR3.send(jsonData);
}

rewardBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (toReward.value == "") {
    document.querySelector("#gamificationStatus").innerHTML =
      "FILL ALL THE FIELDS";
  } else {
    sendRewards();
    rewardBtn.style.background = "gray";
    rewardBtn.style.cursor = "not-allowed";
    rewardBtn.disabled;
    setTimeout(reverseBtn, 10000);
  }
});

function sendRewards() {
  const rewardDat = toReward.value;
  const firstIdOb = { rewardDat, mail };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken = document.querySelector("#csrf_token59").value;
  XHR3.open("POST", "/rewardData", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken);

  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      document.querySelector("#gamificationStatus").innerHTML =
        XHR3.responseText;
    } else {
      document.querySelector("#gamificationStatus").innerHTML =
        "CAN'T PROCESS REQUEST";
    }
  });
  XHR3.send(jsonData);
}

setInterval(() => {
  document.querySelector("#gamificationStatus").innerHTML = "";
}, 5000);

reverseBtn = () => {
  rewardBtn.style.background = "orange";
  rewardBtn.style.cursor = "pointer";
  rewardBtn.disabled = false;
};

reverseBtn2 = () => {
  saveMontry.style.background = "orange";
  saveMontry.style.cursor = "pointer";
  saveMontry.disabled = false;
};
reverseBtn3 = () => {
  saveQuest.style.background = "orange";
  saveQuest.style.cursor = "pointer";
  saveQuest.disabled = false;
};

const rank = document.querySelector("#rankX");
const des1 = document.querySelector("#desX");
const des2 = document.querySelector("#desX2");

saveMontry.addEventListener("click", function (e) {
  e.preventDefault();
  if (rank.value == "" || des1.value == "") {
    document.querySelector("#gamificationStatus").innerHTML =
      "FILL ALL THE RECOMMENDED FIELDS";
  } else {
    setMotry();
    saveMontry.style.background = "gray";
    saveMontry.style.cursor = "not-allowed";
    saveMontry.disabled;
    setTimeout(reverseBtn2, 10000);
  }
});

function setMotry() {
  const rankX = rank.value;
  const des1X = des1.value;
  const des2X = des2.value;

  const firstIdOb = { rankX, des1X, des2X, mail };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken = document.querySelector("#csrf_tokena1").value;
  XHR3.open("POST", "/setMonetry", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken);

  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      document.querySelector("#gamificationStatus").innerHTML =
        XHR3.responseText;
    } else {
      document.querySelector("#gamificationStatus").innerHTML =
        "CAN'T PROCESS REQUEST";
    }
  });
  XHR3.send(jsonData);
}

const rankx = document.querySelector("#rankXX");
saveQuest.addEventListener("click", function (e) {
  e.preventDefault();
  if (rankx.value == "") {
    document.querySelector("#gamificationStatus").innerHTML =
      "FILL ALL THE RECOMMENDED FIELDS";
  } else {
    setQuest();
    saveQuest.style.background = "gray";
    saveQuest.style.cursor = "not-allowed";
    saveQuest.disabled;
    setTimeout(reverseBtn3, 10000);
  }
});

function setQuest() {
  const rankXX = rankx.value;
  const firstIdOb = { rankXX, mail };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken = document.querySelector("#csrf_tokena4").value;
  XHR3.open("POST", "/setQuest", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken);

  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      document.querySelector("#gamificationStatus").innerHTML =
        XHR3.responseText;
    } else {
      document.querySelector("#gamificationStatus").innerHTML =
        "CAN'T PROCESS REQUEST";
    }
  });
  XHR3.send(jsonData);
}

function deleteMotey() {
  const firstIdOb = { mail };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken = document.querySelector("#csrf_tokena2").value;
  XHR3.open("POST", "/deleteMotey", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken);

  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      document.querySelector("#gamificationStatus").innerHTML =
        XHR3.responseText;
    } else {
      document.querySelector("#gamificationStatus").innerHTML =
        "CAN'T PROCESS REQUEST";
    }
  });
  XHR3.send(jsonData);
}
function deleteQuest() {
  const firstIdOb = { mail };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken = document.querySelector("#csrf_tokena6").value;
  XHR3.open("POST", "/deleteQuest", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken);

  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      document.querySelector("#gamificationStatus").innerHTML =
        XHR3.responseText;
    } else {
      document.querySelector("#gamificationStatus").innerHTML =
        "CAN'T PROCESS REQUEST";
    }
  });
  XHR3.send(jsonData);
}

const deleteMontry = document.querySelector("#deleteMontry");
const deleteQst = document.querySelector("#deleteQuest");

deleteMontry.addEventListener("click", (e) => {
  e.preventDefault();
  deleteMotey();
});
deleteQst.addEventListener("click", (e) => {
  e.preventDefault();
  deleteQuest();
});
