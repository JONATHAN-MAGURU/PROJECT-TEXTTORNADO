const frontend = document.getElementById("frontend");
const minsSlider = document.getElementById("minsSlider");
const maxmumInput = document.getElementById("maxmum");
const minmumInput = document.getElementById("minmum");
const timers1 = document.getElementById("timers1");

frontend.addEventListener("change", function () {
  const firstId = frontend.checked ? 5747 : 85747;
  const firstIdOb = { firstId };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken3 = document.querySelector("#csrf_token2").value;
  XHR3.open("POST", "/startFrontend", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken3);
  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      console.log(XHR3.responseText);
    } else {
      console.log("something went wrong");
    }
  });
  XHR3.send(jsonData);
});

setInterval(function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getFontendCodes");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      for (var key in response.codes) {
        if (response.codes[key].FrontendId == 85747) {
          frontend.checked = false;
        } else {
          frontend.checked = true;
        }
      }
    } else {
      console.log("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
}, 1000);

maxmumInput.addEventListener("change", function () {
  minsSlider.max = maxmumInput.value;

  updateCountdown();
});

minmumInput.addEventListener("change", function () {
  minsSlider.min = minmumInput.value;
  updateCountdown();
});

minsSlider.addEventListener("input", function () {
  updateCountdown();
});

function updateCountdown() {
  const totalMilliseconds = minsSlider.value;
  const days = Math.floor(totalMilliseconds / (24 * 60 * 60 * 1000));
  const hours = Math.floor((totalMilliseconds / (60 * 60 * 1000)) % 24);
  const minutes = Math.floor((totalMilliseconds / (60 * 1000)) % 60);
  const seconds = Math.floor((totalMilliseconds / 1000) % 60);
  const milliseconds = Math.floor(totalMilliseconds % 1000);

  document.getElementById("days2").innerHTML = days;
  document.getElementById("hours2").innerHTML = hours;
  document.getElementById("mins2").innerHTML = minutes;
  document.getElementById("seconds2").innerHTML = seconds;
  document.getElementById("milliseconds2").innerHTML = milliseconds;
}

timers1.addEventListener("submit", async (event) => {
  event.preventDefault();

  const ms = minsSlider.value;
  const msObj = { ms };
  const mSjsonData = JSON.stringify(msObj);

  const csrfToken3 = document.querySelector("#csrf_token3").value;

  try {
    const response = await fetch("/setEventEnd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken3,
      },
      body: mSjsonData,
    });

    if (response.status === 200) {
      const responseText = await response.text();
      document.getElementById("timerAlets").innerHTML = responseText;
    } else {
      document.getElementById("timerAlets").innerHTML =
        "something went wrong !!!";
    }
  } catch (error) {
    console.error("An error occurred:", error);
    document.getElementById("timerAlets").innerHTML =
      "An error occurred while processing the request.";
  }
});

setInterval(function () {
  document.getElementById("timerAlets").innerHTML = "";
}, 5000);
