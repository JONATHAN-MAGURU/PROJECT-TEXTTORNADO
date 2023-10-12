const login = document.querySelector("#login");
const signup = document.querySelector("#signup");
const getStarted2 = document.querySelector(".getStarted2");
const intro = document.querySelector(".intro");

login.addEventListener("click", () => {
  window.location.href = "ttd_user_login.html";
  login.style.background = "gray";
  login.disabled;
  login.style.cursor = "not-allowed";
  setTimeout(reverseAction, 5000);
});
signup.addEventListener("click", () => {
  signup.style.background = "gray";
  signup.disabled;
  signup.style.cursor = "not-allowed";
  setTimeout(reverseAction2, 5000);
});
reverseAction = () => {
  login.style.background = "orange";
  login.disabled = false;
  login.style.cursor = "pointer";
};
reverseAction2 = () => {
  signup.style.background = "orange";
  signup.disabled = false;
  signup.style.cursor = "pointer";
};

const toTypeText1 = document.querySelector("#toTypeText1");
const toTypeText2 = document.querySelector("#toTypeText2");
const text1 =
  "Type words. Rank on Leaderboard. Win Exciting Events. Earn Rewards.";
const text2 =
  "Reach new milestones. Test your speed and accuracy. The path to victory starts with every keystroke.";
const text3 = "Share tickets. Receive free tickets. Claim free tickets";
const text4 = "Win money weekly . Win gadgets weekly. Win free tickets";

const heading = "Join TextTornado.";
const heading2 = "Experience Unlimited joy.";
function typeText(identity1, textToType1) {
  for (let i = 0; i < textToType1.length; i++) {
    setTimeout(() => {
      identity1.textContent += textToType1.charAt(i);
    }, i * 70);
  }
}
repeat = () => {
  firstP();
  setTimeout(secondP, 6000);
  setTimeout(setHeightZero, 14000);
  setTimeout(thirdp, 14800);
  setTimeout(fourthp,20500)
  setTimeout(setHeightZero,25000)
};

setInterval(repeat, 26000);

window.addEventListener("load", () => {
  repeat();
  getStarted2.style.opacity = "1";
});

firstP = () => {
  getStarted2.style.height = "300px";
  toTypeText1.innerHTML = "";
  toTypeText2.innerHTML = "";
  typeText(toTypeText1, text1);
  intro.innerHTML = heading;
};

secondP = () => {
  toTypeText1.innerHTML = "";
  typeText(toTypeText2, text2);
};

thirdp = () => {
  getStarted2.style.height = "300px";
  intro.innerHTML = heading2;
  toTypeText1.innerHTML = "";
  toTypeText2.innerHTML = "";
  typeText(toTypeText1, text3);
};

fourthp =()=>{
  toTypeText1.innerHTML = "";
  toTypeText2.innerHTML = "";
  typeText(toTypeText1, text4);
}

setHeightZero = () => {
  getStarted2.style.height = "0px";
};

const createAccountLink = document.getElementById("createAccountLink");

function redirectToSignup() {
  window.location.href = createAccountLink.href;
}

login.addEventListener("click", function (event) {
  redirectToSignup();
});

const createAccountLink2 = document.getElementById("createAccountLink2");

function redirectToSignup2() {
  window.location.href = createAccountLink2.href;
}

signup.addEventListener("click", function (event) {
  redirectToSignup2();
});
