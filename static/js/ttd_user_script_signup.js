const loading = document.querySelector(".loading");
const fade = document.querySelector(".fade");
const firstNext = document.getElementsByClassName("next-btn")[0];
const secondNext = document.getElementsByClassName("next-btn")[1];
const thirdNext = document.getElementsByClassName("next-btn")[2];
const fourthNext = document.getElementsByClassName("next-btn")[3];
const verify = document.getElementsByClassName("next-btn")[4];
const firstForm = document.querySelector(".firstForm");
const secondForm = document.querySelector(".secondForm");
const thirdForm = document.querySelector(".thirdForm");
const fourthForm = document.querySelector(".fourthForm");
const fiveForm = document.querySelector(".fiveForm");
const form = document.querySelector("#form");
const notAllowedCharacters = "'~`!@#$%^&*()-+=?/><,.'123456789 ";
const notAllowedCharacters2 = "'~`!@#$%^&*()-+=?/><,.' ";
const ppassword = document.querySelector("#ppassword");
const cpassword = document.querySelector("#cpassword");
const username = document.getElementById("username");
const number = document.querySelector("#number");
const code = document.querySelector("#code");
const resend = document.querySelector(".resend");
const checkbox = document.querySelector("#checkbox");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");

const main_height = window.innerHeight;
const main_width = window.innerWidth;
const userAgent = navigator.userAgent;

var deviceInfo = "Unknown Device";

if (userAgent.match(/(iPhone|iPod|iPad)/)) {
  deviceInfo = "Apple Device";
} else if (userAgent.match(/Android/)) {
  deviceInfo = "Android Device";
} else if (userAgent.match(/Windows Phone/)) {
  deviceInfo = "Windows Phone";
} else if (userAgent.match(/Windows/)) {
  deviceInfo = "Windows PC";
} else if (userAgent.match(/Macintosh/)) {
  deviceInfo = "Macintosh";
} else if (userAgent.match(/Linux/)) {
  deviceInfo = "Linux PC";
}

checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    ppassword.type = "text";
    cpassword.type = "text";
  } else {
    ppassword.type = "password";
    cpassword.type = "password";
  }
});

firstNext.addEventListener("click", function () {
  const firstn = firstname.value;
  const lastn = lastname.value;

  if (verifyUserInputs(firstn) && verifyUserInputs(lastn)) {
    loaderAndFade();
    setTimeout(() => {
      removeLoaderAndFade();
    }, 1500);
    verifyFields(firstn, lastn);
  } else {
    loaderAndFade();
    setTimeout(() => {
      removeLoaderAndFade();
    }, 1500);
    setTimeout(InvalidNames, 1400);
  }
});
function loaderAndFade() {
  loading.style.display = "block";
  fade.style.display = "block";
}

function callErrorContainer() {
  form.style.borderTopRightRadius = "0";
  form.style.borderTopLeftRadius = "0";
  document.getElementsByClassName("container-error")[0].style.display = "block";
}
function callErrorContainerOff() {
  form.style.borderTopRightRadius = "6px";
  form.style.borderTopLeftRadius = "6px";
  document.getElementsByClassName("container-error")[0].style.display = "none";
}
function verifyFields(a, b) {
  if (a == "" || b == "" || a.length < 2 || b.length < 2) {
    setTimeout(fillFeildsError, 1000);
  } else {
    setTimeout(callSecondForm, 1400);
    callErrorContainerOff();
  }
}
function removeLoaderAndFade() {
  loading.style.display = "none";
  fade.style.display = "none";
}

function verifyUserInputs(input) {
  for (const char of input) {
    if (notAllowedCharacters.includes(char)) {
      return false; // Found a disallowed character
    }
  }
  return true; // No disallowed characters found
}
function verifyUserInputs2(input) {
  for (const char of input) {
    if (notAllowedCharacters2.includes(char)) {
      return false; // Found a disallowed character
    }
  }
  return true; // No disallowed characters found
}

function fillFeildsError() {
  callErrorContainer();
  document.querySelector("#error").innerHTML = "fill all the fields correctly";
}
function fillFeildsError2() {
  callErrorContainer();
  document.querySelector("#error").innerHTML = "Enter username ";
  username.focus();
}
function fillFeildsError3() {
  callErrorContainer();
  document.querySelector("#error").innerHTML = "Enter phone number ";
}
function fillFeildsError4() {
  callErrorContainer();
  document.querySelector("#error").innerHTML =
    "Enter code sent to your phone number ";
}
function passwordLengthError() {
  callErrorContainer();
  document.querySelector("#error").innerHTML =
    "Use 6 characters or more for your password";
}
function notMatching() {
  callErrorContainer();
  document.querySelector("#error").innerHTML =
    "Those passwords didn’t match. Try again";
}

function callSecondForm() {
  firstForm.style.width = "0";
  firstForm.style.display = "none";
  secondForm.style.width = "100%";
  secondForm.style.display = "block";
}
function callThirdForm() {
  secondForm.style.width = "0";
  secondForm.style.display = "none";
  thirdForm.style.width = "100%";
  thirdForm.style.display = "block";
}
function callFourthForm() {
  thirdForm.style.width = 0;
  thirdForm.style.display = "none";
  fourthForm.style.width = "100%";
  fourthForm.style.display = "block";
}
function callFiveForm() {
  fourthForm.style.width = "0";
  fourthForm.style.display = "none";
  fiveForm.style.width = "100%";
  fiveForm.style.display = "block";
  document.querySelector(".container-new-acc").style.display = "none";
}

function InvalidNames() {
  callErrorContainer();
  document.querySelector("#error").innerHTML = "Invalid Firstname or Lastname";
}
function numberLength() {
  callErrorContainer();
  document.querySelector("#error").innerHTML = "Your number is too short";
}
function codeValidity() {
  callErrorContainer();
  document.querySelector("#error").innerHTML = "Invalid code";
}

function Invalidusernames() {
  callErrorContainer();
  document.querySelector("#error").innerHTML =
    "Enter username without space and special characters except underscore";
}
function alreadyExist() {
  callErrorContainer();
  document.querySelector("#error").innerHTML =
    "username already exist, try another one";
}

function alreadyExist2() {
  callErrorContainer();
  document.querySelector("#error").innerHTML =
    'That number already exist with another account';
}

secondNext.addEventListener("click", function () {
  verifyPasswords(ppassword.value, cpassword.value);
});

function loaderAndremover() {
  loaderAndFade();
  setTimeout(() => {
    removeLoaderAndFade();
  }, 1700);
}
function verifyPasswords(a, b) {
  if (a == "" || b == "") {
    loaderAndremover();
    setTimeout(fillFeildsError, 1000);
  } else if (a.length < 6 || b.length < 6) {
    loaderAndremover();
    setTimeout(passwordLengthError, 1000);
  } else if (a !== b) {
    loaderAndremover();
    setTimeout(notMatching, 1000);
  } else {
    loaderAndremover();
    setTimeout(callThirdForm, 1400);
    callErrorContainerOff();
  }
}
thirdNext.addEventListener("click", function () {
  if (verifyUserInputs2(username.value)) {
    loaderAndremover();
    verifyUsernam(username.value);
  } else {
    loaderAndremover();
    setTimeout(Invalidusernames, 1400);
  }
});
function verifyUsernam(a) {
  if (a == "") {
    loaderAndremover();
    setTimeout(fillFeildsError2, 1000);
  } else {
    verifyUsername(username);
  }
}
function verifyNumber(a) {
  if (a == "") {
    loaderAndremover();
    setTimeout(fillFeildsError3, 1000);
  } else if (a.length < 10) {
    loaderAndremover();
    setTimeout(numberLength, 1000);
  } else {
    verifyExistenceOfNumber();
  }
}

function verifyCode(a) {
  if (a == "") {
    loaderAndFade();
    loaderAndremover();
    setTimeout(fillFeildsError4, 1000);
  } else {
    loaderAndremover();
    callErrorContainerOff();
    VerifyOtp();
  }
}

function sendUserData() {
  const firstnameX = firstname.value;
  const lastnameX = lastname.value;
  const passwordX = ppassword.value;
  const usernameX = username.value;
  const numberX = extractNumber();

  const dataObj = {
    firstnameX,
    lastnameX,
    passwordX,
    usernameX,
    numberX,
    deviceInfo,
    main_height,
    main_width,
  };
  const jsonData = JSON.stringify(dataObj);
  send_data(jsonData);
  window.location.href = "http://192.168.1.198:8000/";
}

fourthNext.addEventListener("click", function () {
  verifyNumber(number.value);
});

function extractNumber() {
  const firstNum = number.value;
  const extracted = firstNum.slice(-9);
  const finalNumber = "+265" + extracted;
  return finalNumber;
}

verify.addEventListener("click", function () {
  verifyCode(code.value);
});

resend.addEventListener("click", function () {
  loaderAndremover();
  requestOtp();
  callErrorContainerOff();
  code.value = "";
});

async function requestOtp() {
  try {
    const number = extractNumber();
    const objData = { number };
    const jsonData = JSON.stringify(objData);
    const csrfToken = document.querySelector("#csrf_token").value;
    const response = await fetch("/verifyPhoneNumber", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: jsonData,
    });

    if (response.ok) {
      const responseData = await response.text();
      console.log(responseData);
    } else {
      console.log("something went wrong");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function VerifyOtp() {
  try {
    const number = extractNumber();
    const otp = code.value;
    const objData = { number, otp };
    const jsonData = JSON.stringify(objData);
    const csrfToken = document.querySelector("#csrf_token").value;
    const response = await fetch("/verifyOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: jsonData,
    });

    if (response.ok) {
      const responseData = await response.text();
      if (responseData == "approved") {
        loaderAndremover();
        sendUserData();
      } else {
        loaderAndremover();
        setTimeout(codeValidity, 1500);
      }
    } else {
      console.log("something went wrong");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function verifyUsername(username3) {
  try {
    const username2 = username3.value;
    const objData = { username2 };
    const jsonData = JSON.stringify(objData);

    const csrfToken = document.querySelector("#csrf_token").value;

    const response = await fetch("/checkUsername", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: jsonData,
    });

    if (response.ok) {
      const responseData = await response.text();
      if (responseData == "not success") {
        loaderAndremover();
        setTimeout(alreadyExist, 1200);
      } else {
        callErrorContainerOff();
        loaderAndremover();
        setTimeout(callFourthForm, 1000);
      }
    } else {
      console.log("something went wrong");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function verifyExistenceOfNumber() {
  try {
    const number = extractNumber();
    const objData = { number };
    const jsonData = JSON.stringify(objData);

    const csrfToken = document.querySelector("#csrf_token").value;

    const response = await fetch("/checkNumber", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: jsonData,
    });

    if (response.ok) {
      const responseData = await response.text();
      if (responseData == "not success") {
        loaderAndremover();
        setTimeout(alreadyExist2, 1200);
      } else {
        loaderAndremover();
        requestOtp();
        loaderAndremover();
        callErrorContainerOff();
        document.querySelector("#num").innerHTML = extractNumber();
        setTimeout(callFiveForm, 1000);
      }
    } else {
      console.log("something went wrong");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function send_data(data) {
  const csrfToken = document.querySelector("#csrf_token").value;
  const XHR = new XMLHttpRequest();
  XHR.open("POST", "/v_player", true);
  XHR.setRequestHeader("Content-Type", "application/json");
  XHR.setRequestHeader("X-CSRFToken", csrfToken);
  XHR.addEventListener("load", function () {
    if (XHR.status === 200 && XHR.readyState === 4) {
      if (XHR.responseText == "saved") {
        console.log("successfully created account");
      }
    } else {
      console.log("something went wrong");
    }
  });
  return XHR.send(data);
}
