const rules1 = document.getElementsByClassName("rules")[0];
const rules2 = document.getElementsByClassName("rules2")[0];
const partA = document.getElementsByClassName("partA")[0];
const partB = document.getElementsByClassName("partB")[0];



function callRules() {
  document.querySelector("#slogan").innerHTML =
    "Tips and rules for Getting started";
  partA.style.display = "none";
  partB.style.display = "block";
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
document.addEventListener("DOMContentLoaded", () => {
  rules1.innerHTML = rules1Text;
  rules2.innerHTML = rules2Text;
});


document
  .getElementsByClassName("cancel-btn2")[0]
  .addEventListener("click", function () {
    redirectToTerms();
  });

const textEl = document.getElementById("texttt");
const textEl2 = document.getElementById("textttt");
const speedEl = 2;
const text = "SUBSCRIBE TEXTTORNADO PASS";
const text2 = "NO EVENT, WAIT NEXT EVENT";
let idx = 1;
let speed = 400 / speedEl;

writeText();
writeText2();

function writeText() {
  textEl.innerText = text.slice(0, idx);

  idx++;

  if (idx > text.length) {
    idx = 2;
  }

  setTimeout(writeText, speed);
}

function writeText2() {
  textEl2.innerText = text2.slice(0, idx);

  idx++;

  if (idx > text2.length) {
    idx = 3;
  }

  setTimeout(writeText2, speed);
}

document.querySelector(".callRules").addEventListener("click", function () {
  document.querySelector(".welcomeUserHolder").style.width = "60%";
  document.querySelector(".welcomeUserHolder").style.display = "block";
  document.querySelector(".bodyCover2").style.width = "100%";
  partA.style.display = "block";
  partB.style.display = "none";
});
