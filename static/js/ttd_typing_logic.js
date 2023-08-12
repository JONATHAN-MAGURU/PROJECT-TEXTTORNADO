const text_D2_1 = document.getElementsByClassName("test_D2")[0];
const text_D2_2 = document.getElementsByClassName("test_D2")[1];
const text_D2_3 = document.getElementsByClassName("test_D2")[2];
const cont_btn = document.getElementsByClassName("cont_btn")[0];
const paragraphs = [];
const mistakesLimit = 10;
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

  inpField.addEventListener("keydown", function () {
    inpField.focus();
    tryAgainBtn.style.display = "none";
  });
  typingText.addEventListener("click", function () {
    inpField.focus();
    typingText.querySelectorAll("span")[0].classList.add("active");
  });
}

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
    timeLeft--;
    timeTag.innerText = timeLeft;
    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpmTag.innerText = wpm;
  } else {
    clearInterval(timer);
  }
}

function saveDetails() {
  const wpm = wpmTag.innerText;
  const mistakes22 = mistakeTag.innerText;
  const cpm = cpmTag.innerText;
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

  const json_dat2 = JSON.stringify(dat2);
  var xhr2 = new XMLHttpRequest();
  const csrfToken6 = document.querySelector("#csrf_token6").value;
  xhr2.open("POST", "/typing_details", true);
  xhr2.setRequestHeader("Content-Type", "application/json");
  xhr2.setRequestHeader("X-CSRFToken", csrfToken6);

  if (mistakes22 > mistakesLimit) {
    document.getElementById("mistakeError").innerHTML ="YOUR RESULTS ARE NOT GOING TO BE  VERIFIED BECAUSE YOU HAVE EXCEEDED MISTAKES LIMIT";
  } else {
    xhr2.send(json_dat2);
    document.getElementById("mistakeError").innerHTML =" ";
  }
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
