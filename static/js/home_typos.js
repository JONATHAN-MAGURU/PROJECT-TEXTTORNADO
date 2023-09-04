const rules1 = document.getElementsByClassName("rules")[0];
const rules2 = document.getElementsByClassName("rules2")[0];
const contToRules = document.getElementsByClassName("next-btn2")[0];
const partA = document.getElementsByClassName("partA")[0];
const partB = document.getElementsByClassName("partB")[0];

contToRules.addEventListener("click", function () {
  setTimeout(callRules, 500);
});

function callRules() {
  document.querySelector("#slogan").innerHTML =
    "Tips and rules for Getting started";
  partA.style.display = "none";
  partB.style.display = "block";
  document.getElementsByClassName("cancel-btn2")[0].style.display = "none";
  document.getElementsByClassName("next-btn2")[0].style.display = "none";
  document.getElementsByClassName("next-btn2")[1].style.display = "block";
  document.getElementsByClassName("next-btn2")[1].style.opacity = "0.9";
}
const rules1Text =
  " Welcome to TextTornado, the ultimate destination for honing your typing skills while embracing friendly competition and fun! Whether you're a seasoned typist or just starting out, TextTornado offers an exhilarating platform to put your typing speed and accuracy to the test. Get ready to embark on weekly typing events that challenge your dexterity on the keyboard. To join the excitement, simply secure your spot by purchasing a ticket for the upcoming event of your choice. Our dynamic events are scheduled regularly, ensuring there's always a thrilling challenge just around the corner.";

const rules2Text =
  " As you conquer our typing challenges, opportunities to earn prizes and free tickets every week await those who rank top on the leaderboard. Additionally, rest assured that your data and privacy are of paramount importance to us, and we treat your information in accordance with our privacy policy.";
function typeText1(identity1, textToType1) {
  for (let i = 0; i < textToType1.length; i++) {
    setTimeout(() => {
      identity1.textContent += textToType1.charAt(i);
    }, i * 20);
  }
}

document
  .getElementsByClassName("next-btn2")[1]
  .addEventListener("click", function () {
    document.querySelector(".welcomeUserHolder").style.width = 0;
    document.querySelector(".welcomeUserHolder").style.display = "none";
    document.querySelector(".bodyCover").style.width = "0%";
  });

window.addEventListener("load", function () {
  setTimeout(callSecondRule1, 3000);
  setTimeout(callSecondRule2, 13000);
  setTimeout(callButtons, 19000);
});

function callSecondRule1() {
  typeText1(rules1, rules1Text);
}
function callSecondRule2() {
  typeText1(rules2, rules2Text);
}

function callButtons() {
  document.getElementsByClassName("cancel-btn2")[0].style.opacity = "0.8";
  document.getElementsByClassName("cancel-btn2")[0].style.display = "block";
  document.getElementsByClassName("next-btn2")[0].style.opacity = "0.8";
  document.getElementsByClassName("next-btn2")[0].style.display = "block";
  document.getElementsByClassName("next-btn2")[1].style.opacity = "0";
  document.getElementsByClassName("next-btn2")[1].style.display = "none";
}
function callButtons2() {
  document.getElementsByClassName("cancel-btn2")[0].style.opacity = "0.8";
  document.getElementsByClassName("cancel-btn2")[0].style.display = "block";
  document.getElementsByClassName("next-btn2")[0].style.opacity = "0.8";
  document.getElementsByClassName("next-btn2")[0].style.display = "block";
}

document
  .getElementsByClassName("cancel-btn2")[0]
  .addEventListener("click", function () {
    document.querySelector(".welcomeUserHolder").style.width = 0;
    document.querySelector(".welcomeUserHolder").style.display = "none";
    document.querySelector(".bodyCover").style.width = "0%";
  });

const textEl = document.getElementById("texttt");
const speedEl = 2;
const text = "SUBSCRIBE TEXTTORNADO PASS";
let idx = 1;
let speed = 300 / speedEl;

writeText();

function writeText() {
  textEl.innerText = text.slice(0, idx);

  idx++;

  if (idx > text.length) {
    idx = 1;
  }

  setTimeout(writeText, speed);
}

document.querySelector(".callRules").addEventListener("click", function () {
  document.getElementsByClassName("next-btn2")[1].style.opacity = "0";
  document.getElementsByClassName("next-btn2")[1].style.display = "none";
  document.querySelector(".welcomeUserHolder").style.width = "60%";
  document.querySelector(".welcomeUserHolder").style.display = "block";
  document.querySelector(".bodyCover").style.width = "100%";
  partA.style.display = "block";
  partB.style.display = "none";
  setTimeout(callButtons2, 6000);
});
