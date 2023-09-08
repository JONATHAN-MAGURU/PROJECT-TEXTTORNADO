const text_D2_1 = document.getElementsByClassName("test_D2")[0];
const text_D2_2 = document.getElementsByClassName("test_D2")[1];
const text_D2_3 = document.getElementsByClassName("test_D2")[2];
const paragraphs = [];
const mistakesLimit = 15;
const start = document.querySelector("#start");
const back = document.querySelector("#back");
const wrapper = document.querySelector(".wrapper");

document.addEventListener("DOMContentLoaded", function () {
  var xhrA = new XMLHttpRequest();
  xhrA.open("GET", "/get_paragraph");
  xhrA.onload = function () {
    if (xhrA.status === 200) {
      var response = JSON.parse(xhrA.responseText);
      for (var key in response.paragraphs) {
        paragraphs.push(response.paragraphs[key].variant_p);
      }
      loadParagraph();
    } else {
      console.log("Request failed. Returned status of " + xhrA.status);
    }
  };
  xhrA.send();
});

const tips = document.getElementsByClassName("tips")[0];
const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".wrapper .input-field"),
  tryAgainBtn = document.getElementById("reshulf"),
  timeTag = document.getElementsByClassName("time_left")[0],
  mistakeTag = document.getElementById("mistakee"),
  wpmTag = document.getElementById("wpm"),
  cpmTag = document.getElementById("cpm");

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = (mistakes = isTyping = 0);

function callBack() {
  back.style.background = "orange";
  back.style.outline = "1px solid orange";
  back.disabled = false;
  back.style.cursor = "pointer";
}

function callBackoff() {
  back.style.background = "gray";
  back.disabled = true;
  back.style.cursor = "not-allowed";
  back.style.outline = "none";
}

function loadParagraph() {
  const ranIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[ranIndex].split("").forEach((char) => {
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });

  const wrds = typingText.innerText.length;
  const char = typingText.innerHTML.split(" ");
  document.getElementsByClassName("aow")[0].innerHTML = char.length;
  document.getElementsByClassName("aol")[0].innerHTML = wrds;

  var hasStartedTyping = false;

  inpField.addEventListener("keydown", function () {
    inpField.focus();
    if (!hasStartedTyping) {
      updateTickets();
      hasStartedTyping = true;
    }
  });

  typingText.addEventListener("click", function () {
    if (document.getElementById("ticket-avail").innerHTML == 0) {
      callOutOfticketsHolderOn();
    } else if (
      document.getElementById("days").innerHTML == 0 &&
      document.getElementById("hours").innerHTML == 0 &&
      document.getElementById("mins").innerHTML < 2
    ) {
      callOutOfticketsHolderOn2();
      setTimeout(callNotification, 5000);
    } else {
      callBack();
      inpField.focus();
      tryAgainBtn.disabled = true;
      tryAgainBtn.style.cursor = "not-allowed";
      tryAgainBtn.style.color = "gray";
      start.style.background = "gray";
      start.disabled = true;
      start.style.cursor = "not-allowed";
      start.style.outline = "none";
      typingText.querySelectorAll("span")[0].classList.add("active");
    }
  });
}

back.addEventListener("click", function () {
  callBackoff();
  start.style.background = "orange";
  start.disabled = false;
  start.style.cursor = "pointer";
  start.style.outline = "1px solid orange";
  typingText.querySelectorAll("span")[0].classList.remove("active");
  tryAgainBtn.disabled = false;
  tryAgainBtn.style.cursor = "pointer";
  tryAgainBtn.style.color = "orange";
});

start.addEventListener("click", function () {
  if (document.getElementById("ticket-avail").innerHTML == 0) {
    callOutOfticketsHolderOn();
  } else if (
    document.getElementById("days").innerHTML == 0 &&
    document.getElementById("hours").innerHTML == 0 &&
    document.getElementById("mins").innerHTML < 2
  ) {
    callOutOfticketsHolderOn2();
    setTimeout(callNotification, 5000);
  } else {
    start.disabled = true;
    start.style.cursor = "not-allowed";
    tryAgainBtn.disabled = true;
    tryAgainBtn.style.cursor = "not-allowed";
    tryAgainBtn.style.color = "gray";
    start.style.background = "gray";
    start.style.outline = "none";
    inpField.focus();
    callBack();
    typingText.querySelectorAll("span")[0].classList.add("active");
  }
});

inpField.addEventListener("focus", function () {
  wrapper.style.outline = "1px solid rgb(255, 140, 0)";
});

inpField.addEventListener("blur", function () {
  wrapper.style.outline = "none";
});

function initTyping() {
  let characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if (typedChar == null) {
      if (charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
          mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      if (characters[charIndex].innerText == typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
  } else {
    clearInterval(timer);
    saveDetails();
    inpField.value = "";
  }
}

function initTimer() {
  if (timeLeft > 0) {
    callBackoff();
    timeLeft--;
    timeTag.innerText = timeLeft;
    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpmTag.innerText = wpm;
  } else {
    saveDetails();
    clearInterval(timer);
  }
}

let isRequestInProgress = false;

async function saveDetails() {
  if (isRequestInProgress) {
    return;
  }

  isRequestInProgress = true;

  const wpm = wpmTag.innerText;
  const mistakes22 = mistakeTag.innerText;
  const cpm = cpmTag.innerText;
  accurencyLoader(
    parseInt(document.getElementsByClassName("aow")[0].innerHTML),
    parseInt(wpm),
    parseInt(mistakes22)
  );

  const dat2 = {
    wpm,
    mistakes22,
    cpm,
    username,
    id,
  };

  tips.style.display = "block";
  text_D2_1.innerHTML = wpm;
  text_D2_2.innerHTML = cpm;
  text_D2_3.innerHTML = mistakes22;

  const csrfToken6 = document.querySelector("#csrf_token6").value;

  if (mistakes22 > mistakesLimit) {
    document.getElementById("mistakeError").innerHTML =
      "YOUR RESULTS ARE NOT GOING TO BE VERIFIED BECAUSE YOU HAVE EXCEEDED MISTAKES LIMIT";
  } else {
    try {
      const response = await fetch("/typing_details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken6,
        },
        body: JSON.stringify(dat2),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      document.getElementById("mistakeError").innerHTML = " ";
    } catch (error) {
      console.error("Error:", error);
    }
  }

  isRequestInProgress = false; // Allow the next request to be initiated
}

function resetGame() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  inpField.value = "";
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeTag.innerText = 0;
  cpmTag.innerText = 0;
}

inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);

function accurencyLoader(totalWords, finalWpm, misTakes) {
  let number = document.getElementById("numberr");
  let circle = document.querySelector(".circle3");
  let counter = 0;
  let maxProgress = (finalWpm / totalWords) * 100;
  circle.style.setProperty("--progress", 0);
  number.innerHTML = "0%";
  if (finalWpm <= totalWords && misTakes < 20) {
    let interval = setInterval(() => {
      if (counter >= maxProgress) {
        clearInterval(interval);
      } else {
        counter += 1;

        circle.style.setProperty("--progress", counter);
        number.innerHTML = counter + "%";
      }
    }, 20);
  } else {
    circle.style.setProperty("--progress", 0);
  }
}

let isRequestPending = false;

function updateTickets() {
  if (isRequestPending) {
    console.log("An ongoing request is already in progress.");
    return;
  }

  isRequestPending = true;

  const firstIdOb = { id };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken = document.querySelector("#csrf_token5").value;
  XHR3.open("POST", "/updateTickets", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken);

  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      console.log(XHR3.responseText);
      fetchTicketData(id);
    } else {
      console.log("Something went wrong");
    }

    isRequestPending = false;
  });

  XHR3.send(jsonData);
}

document.querySelector(".cancel-btnn").addEventListener("click", function () {
  callOutOfticketsHolderOff2();
});
