const frontend = document.getElementById("frontend");
const minsSlider = document.getElementById("minsSlider");
const maxmumInput = document.getElementById("maxmum");
const minmumInput = document.getElementById("minmum");
const timers1 = document.getElementById("timers1");
const minsSlider2 = document.getElementById("minsSlider2");
const maxmumInput2 = document.getElementById("maxmum2");
const minmumInput2 = document.getElementById("minmum2");
const timers2 = document.getElementById("timers2");
const startTimerOne = document.getElementById("endEvent");

frontend.addEventListener("change", function () {
  const firstId = frontend.checked ? 5747 : 85747;
  const firstIdOb = { firstId };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken5 = document.querySelector("#csrf_token5").value;
  XHR3.open("POST", "/startFrontend", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken5);
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

  document.getElementById("days3").innerHTML = days;
  document.getElementById("hours3").innerHTML = hours;
  document.getElementById("mins3").innerHTML = minutes;
  document.getElementById("seconds3").innerHTML = seconds;
  document.getElementById("milliseconds3").innerHTML = milliseconds;
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
    const responseText = await response.text();
    if (response.status === 200) {
      
      document.getElementById("timerAlets").innerHTML = responseText;
    } else {
      document.getElementById("timerAlets").innerHTML =responseText;
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

maxmumInput2.addEventListener("change", function () {
  minsSlider2.max = maxmumInput2.value;
  updateCountdown2();
});

minmumInput2.addEventListener("change", function () {
  minsSlider2.min = minmumInput2.value;
  updateCountdown2();
});

minsSlider2.addEventListener("input", function () {
  updateCountdown2();
});

function updateCountdown2() {
  const totalMilliseconds = minsSlider2.value;
  const days = Math.floor(totalMilliseconds / (24 * 60 * 60 * 1000));
  const hours = Math.floor((totalMilliseconds / (60 * 60 * 1000)) % 24);
  const minutes = Math.floor((totalMilliseconds / (60 * 1000)) % 60);
  const seconds = Math.floor((totalMilliseconds / 1000) % 60);
  const milliseconds = Math.floor(totalMilliseconds % 1000);

  document.getElementById("days2b").innerHTML = days;
  document.getElementById("hours2b").innerHTML = hours;
  document.getElementById("mins2b").innerHTML = minutes;
  document.getElementById("seconds2b").innerHTML = seconds;
  document.getElementById("milliseconds2b").innerHTML = milliseconds;
}

timers2.addEventListener("submit", async (event) => {
  event.preventDefault();

  const ms = minsSlider2.value;
  const msObj = { ms };
  const mSjsonData = JSON.stringify(msObj);

  const csrfToken4 = document.querySelector("#csrf_token4").value;

  try {
    const response = await fetch("/setEventNext", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken4,
      },
      body: mSjsonData,
    });

    if (response.status === 200) {
      const responseText = await response.text();
      document.getElementById("timerAlets2").innerHTML = responseText;
    } else {
      document.getElementById("timerAlets2").innerHTML =
        "something went wrong !!!";
    }
  } catch (error) {
    console.error("An error occurred:", error);
    document.getElementById("timerAlets2").innerHTML =
      "An error occurred while processing the request.";
  }
});

setInterval(function () {
  document.getElementById("timerAlets2").innerHTML = "";
}, 5000);

startTimerOne.addEventListener("change", function () {
  const firstId = startTimerOne.checked ? 5747 : 85747;
  const firstIdOb = { firstId };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken5 = document.querySelector("#csrf_token7").value;
  XHR3.open("POST", "/startTimerOne", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken5);
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
  xhr.open("GET", "/getStartTimerOneCodes");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      for (var key in response.codes) {
        if (response.codes[key].endEventId == 85747) {
          startTimerOne.checked = false;
        } else {
          startTimerOne.checked = true;
        }
      }
    } else {
      console.log("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
}, 2000);
