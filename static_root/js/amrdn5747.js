const text_D2_1 = document.getElementsByClassName("test_D2")[0];
const text_D2_2 = document.getElementsByClassName("test_D2")[1];
const text_D2_3 = document.getElementsByClassName("test_D2")[2];
const paragraphs = [];
const mistakesLimit = 15;
const start = document.querySelector("#start");
const back = document.querySelector("#back");
const wrapper = document.querySelector(".wrapper");

document.addEventListener("DOMContentLoaded", function () {
  const firstIdOb = { id };
  const jsonData = JSON.stringify(firstIdOb);
  var xhrA = new XMLHttpRequest();
  xhrA.open("POST", "/get_paragraph", true);
  const csrfToken = document.querySelector("#csrf_tokena6").value;
  xhrA.setRequestHeader("Content-Type", "application/json");
  xhrA.setRequestHeader("X-CSRFToken", csrfToken);
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
  xhrA.send(jsonData);
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

  inpField.addEventListener("keydown", function (event) {
    inpField.focus();
    if (!hasStartedTyping) {
      updateTickets();
      hasStartedTyping = true;
    }
    if (event.keyCode === 8) {
      event.preventDefault();
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
  const sCa1 = macrot1.innerHTML;
  const sCb1 = macrot2.innerHTML;
  const sCc1 = macrot3.innerHTML;
  const sCd1 = macrot4.innerHTML;
  const sCe1 = macrot5.innerHTML;
  const sCf1 = macrot6.innerHTML;
  const sCg1 = macrot7;
  const sCh1 = macrot8;
  const serverC22ache = document.body.getAttribute("data-username");
  const serverCachedt2 = document.body.getAttribute("data-ttd-id");
  isRequestInProgress = true;

  const t22 = wpmTag.innerText;
  const tk34 = mistakeTag.innerText;
  const tkd21 = cpmTag.innerText;
  accurencyLoader(
    parseInt(document.getElementsByClassName("aow")[0].innerHTML),
    parseInt(t22),
    parseInt(tk34)
  );

  const judavinc_amge2 = {
    t22,
    tk34,
    tkd21,
    serverCachedt2,
    serverC22ache,
    sCa1,
    sCb1,
    sCc1,
    sCd1,
    sCe1,
    sCf1,
    sCg1,
    sCh1,
  };

  tips.style.display = "block";
  document.querySelector(".resCover").style.display = "block";
  text_D2_1.innerHTML = t22;
  text_D2_2.innerHTML = tkd21;
  text_D2_3.innerHTML = tk34;

  const csrfToken6 = document.querySelector("#csrf_token6").value;

  if (tk34 > mistakesLimit) {
    document.getElementById("mistakeError").innerHTML =
      "YOUR RESULTS ARE NOT GOING TO BE VERIFIED BECAUSE YOU HAVE EXCEEDED MISTAKES LIMIT";
  } else {
    try {
      const response = await fetch(urlpatterns1747[2], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken6,
        },
        body: JSON.stringify(judavinc_amge2),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      document.getElementById("mistakeError").innerHTML = " ";
      updateHistory();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  isRequestInProgress = false;
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

document.getElementsByClassName("cont_btn")[1].addEventListener("click", () => {
  resetGame();
  removeResHold();
  document.getElementsByClassName("leaderboard_container")[0].style.width =
    "100%";
});
