const toReward = document.querySelector("#toReward");
const mail = document.body.getAttribute("data-email");
const rewardBtn = document.querySelector("#rewards");
const saveMontry = document.querySelector("#saveMontry");
const saveQuest = document.querySelector("#saveQuest");
var patternsId = [];
var patternsId2 = [];
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

const mask = document.querySelector("#dmask");
const w = document.querySelector("#w");
const c = document.querySelector("#c");
const m = document.querySelector("#m");
const i = document.querySelector("#i");

mask.addEventListener("click", function (e) {
  e.preventDefault();
  if (w.value == "" || c.value == "" || m.value == "" || i.value == "") {
    alert("FILL ALL THE RECOMMENDED FIELDS");
  } else {
    setMask();
    mask.style.background = "gray";
    mask.style.cursor = "not-allowed";
    mask.disabled;
    setTimeout(reverseBtn3, 10000);
  }
});

function setMask() {
  const wx = w.value;
  const cx = c.value;
  const mx = m.value;
  const ix = i.value;
  const firstIdOb = { wx, cx, mx, ix, mail };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken = document.querySelector("#csrf_tokena9").value;
  XHR3.open("POST", "/setMask", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken);

  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      alert(XHR3.responseText);
    } else {
      alert("CAN'T PROCESS REQUEST");
    }
  });
  XHR3.send(jsonData);
}

document.querySelector("#trigger").addEventListener("dblclick", () => {
  document.querySelector(".masked").style.display = "block";
});

document.querySelector("#smask").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".masked").style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  var partenB = document.querySelector(".HoldPatternData");

  setInterval(function () {
    var xhr = new XMLHttpRequest();
    const consern = { mail };

    const json_data = JSON.stringify(consern);
    const csrfToken = document.querySelector("#csrf_token5a12").value;
    xhr.open("POST", "/getParterns", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", csrfToken);

    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        partenB.innerHTML = "";

        for (var key in response.pattern) {
          var temp =
            '<div class="ticketPriceHolder" data-id="' +
            response.pattern[key].partern_id +
            '"><p>' +
            response.pattern[key].pt_name +
            "</p><p>" +
            response.pattern[key].partern_id +
            "</p></div>";
          partenB.innerHTML += temp;
        }

        const parternHolders = partenB.querySelectorAll(".ticketPriceHolder");
        for (const pth of parternHolders) {
          pth.addEventListener("click", () => {
            patternsId.splice(0);
            patternsId.push(pth.dataset.id);
            getDetailedPatterns(pth.dataset.id);
          });
        }
      } else {
        actionStatus.innerHTML = xhr.status;
      }
    };

    xhr.send(json_data);
  }, 3000);
});

const datenptt = document.querySelector("#datenptt");
const usernptt = document.querySelector("#usernptt");
const idptt = document.querySelector("#idptt");
const wpmnptt = document.querySelector("#wpmnptt");
const cpmdatenptt = document.querySelector("#cpmdatenptt");
const mistakesidptt = document.querySelector("#mistakesidptt");
const ascendingptn = document.querySelector("#ascendingptn");
const deascendingptn = document.querySelector("#deascendingptn");
const keyStrokeptn = document.querySelector("#keyStrokeptn");
const attemptedptn = document.querySelector("#attemptedptn");
const givenptn = document.querySelector("#givenptn");

function getDetailedPatterns(userId) {
  var xhr = new XMLHttpRequest();
  const consern = { userId, mail };

  const json_data = JSON.stringify(consern);
  const csrfToken = document.querySelector("#csrf_token513").value;
  xhr.open("POST", "/getParterns2", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", csrfToken);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      datenptt.innerHTML = "";
      usernptt.innerHTML = "";
      idptt.innerHTML = "";
      wpmnptt.innerHTML = "";
      cpmdatenptt.innerHTML = "";
      mistakesidptt.innerHTML = "";
      ascendingptn.innerHTML = "";
      deascendingptn.innerHTML = "";
      keyStrokeptn.innerHTML = "";
      attemptedptn.innerHTML = "";
      givenptn.innerHTML = "";
      for (var key in response.pattern) {
        var concernDate = new Date(response.pattern[key].Date_partten);

        var formattedDate = concernDate.toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        datenptt.innerHTML = formattedDate;
        usernptt.innerHTML = response.pattern[key].pt_name;
        idptt.innerHTML = response.pattern[key].partern_id;
        wpmnptt.innerHTML = response.pattern[key].wpm;
        cpmdatenptt.innerHTML = response.pattern[key].cpm;
        mistakesidptt.innerHTML = response.pattern[key].mistakes;
        ascendingptn.innerHTML = response.pattern[key].ascending_parttern;
        deascendingptn.innerHTML = response.pattern[key].deascending_parttern;
        keyStrokeptn.innerHTML = response.pattern[key].keyStroke_parttern;
        attemptedptn.innerHTML = response.pattern[key].finished_parttern;
        givenptn.innerHTML = response.pattern[key].given_words;
      }
    } else {
      actionStatus.innerHTML = xhr.status;
    }
  };
  xhr.send(json_data);
}

const callPatternHistory = document.querySelector("#callPatternHistory");

callPatternHistory.addEventListener("click", () => {
  if (patternsId.length <= 0) {
    alert("SELECT ONE USER PATTERN INORDER TO VIEW HISTORY");
  } else {
    document.querySelector("#transform").innerHTML = "DATE";
    document.querySelector("#transform2").innerHTML = "";
    document.getElementsByClassName("HoldPatternData")[0].style.display =
      "none";
    document.getElementsByClassName("HoldPatternData")[1].style.display =
      "block";
    getAllUserPartens(patternsId);
  }
});

function getAllUserPartens(xx) {
  var partenB = document.getElementsByClassName("HoldPatternData")[1];
  var xhr = new XMLHttpRequest();
  const userID = xx[0];
  const consern = { mail, userID };

  const json_data = JSON.stringify(consern);
  const csrfToken = document.querySelector("#csrf_token5a12").value;
  xhr.open("POST", "/getAllUserParterns", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", csrfToken);

  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      partenB.innerHTML = "";
      for (var key in response.pattern) {
        var concernDate = new Date(response.pattern[key].Date_partten);

        var formattedDate = concernDate.toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        var temp =
          '<div class="ticketPriceHolder" data-id="' +
          response.pattern[key].id +
          '"><p>' +
          formattedDate +
          "</p></div>";
        partenB.innerHTML += temp;
      }

      const parternHolders = partenB.querySelectorAll(".ticketPriceHolder");
      for (const pth of parternHolders) {
        pth.addEventListener("click", () => {
          patternsId2.splice(0);
          patternsId2.push(pth.dataset.id);
          getDetailedPatternsHistory(pth.dataset.id);
        });
      }
    } else {
      actionStatus.innerHTML = xhr.status;
    }
  };

  xhr.send(json_data);
}

function getDetailedPatternsHistory(userId) {
  var xhr = new XMLHttpRequest();
  const consern = { userId, mail };

  const json_data = JSON.stringify(consern);
  const csrfToken = document.querySelector("#csrf_token513").value;
  xhr.open("POST", "/getParternsHistory", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", csrfToken);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      datenptt.innerHTML = "";
      usernptt.innerHTML = "";
      idptt.innerHTML = "";
      wpmnptt.innerHTML = "";
      cpmdatenptt.innerHTML = "";
      mistakesidptt.innerHTML = "";
      ascendingptn.innerHTML = "";
      deascendingptn.innerHTML = "";
      keyStrokeptn.innerHTML = "";
      attemptedptn.innerHTML = "";
      givenptn.innerHTML = "";
      for (var key in response.pattern) {
        var concernDate = new Date(response.pattern[key].Date_partten);

        var formattedDate = concernDate.toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        datenptt.innerHTML = formattedDate;
        usernptt.innerHTML = response.pattern[key].pt_name;
        idptt.innerHTML = response.pattern[key].partern_id;
        wpmnptt.innerHTML = response.pattern[key].wpm;
        cpmdatenptt.innerHTML = response.pattern[key].cpm;
        mistakesidptt.innerHTML = response.pattern[key].mistakes;
        ascendingptn.innerHTML = response.pattern[key].ascending_parttern;
        deascendingptn.innerHTML = response.pattern[key].deascending_parttern;
        keyStrokeptn.innerHTML = response.pattern[key].keyStroke_parttern;
        attemptedptn.innerHTML = response.pattern[key].finished_parttern;
        givenptn.innerHTML = response.pattern[key].given_words;
      }
    } else {
      actionStatus.innerHTML = xhr.status;
    }
  };
  xhr.send(json_data);
}