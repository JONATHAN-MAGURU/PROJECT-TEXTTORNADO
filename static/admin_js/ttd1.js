const toReward = document.querySelector("#toReward");
const mail = document.body.getAttribute("data-email");
const rewardBtn = document.querySelector("#rewards");


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
