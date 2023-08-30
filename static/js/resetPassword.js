const nextbtn = document.querySelector(".next-btn");
const number = document.querySelector("#number");
const loading = document.querySelector(".loading");
const fade = document.querySelector(".fade");
const partOne = document.querySelector(".partOne");
const partTwo = document.querySelector(".partTwo");
const partThree = document.querySelector(".partThree");
const partFour = document.querySelector(".partFour");
const cont = document.getElementsByClassName("next-btn")[1];
const verify = document.getElementsByClassName("next-btn")[2];
const save = document.getElementsByClassName("next-btn")[3];
const code = document.querySelector("#numberCode");
const checkbox = document.querySelector("#checkbox");
const password = document.querySelector("#password");
const cancel = document.getElementsByClassName("cancel-btn")[0];
const notYou = document.getElementsByClassName("cancel-btn")[1];

checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    password.type = "text";
  } else {
    password.type = "password";
  }
});

nextbtn.addEventListener("click", function () {
  verifyNumber(number.value);
});

cont.addEventListener("click", function () {
  loaderAndremover();
  setTimeout(callPartThree, 1200);
});

function verifyNumber(a) {
  if (a == "") {
    loaderAndremover();
    setTimeout(fillFeildsError3, 1000);
  } else if (a.length < 10) {
    loaderAndremover();
    setTimeout(numberLength, 1000);
  } else {
    loaderAndremover();
    callErrorContainerOff();
    searchAccount();
  }
}

function loaderAndremover() {
  loaderAndFade();
  setTimeout(() => {
    removeLoaderAndFade();
  }, 1700);
}

function removeLoaderAndFade() {
  loading.style.display = "none";
  fade.style.display = "none";
}

function loaderAndFade() {
  loading.style.display = "block";
  fade.style.display = "block";
}

function callPartTwo() {
  partOne.style.display = "none";
  partOne.style.width = "0";
  partTwo.style.display = "block";
  partTwo.style.width = "100%";
  document.querySelector("#num").innerHTML = extractNumber();
  document.querySelector(".container-new-acc").style.display = "none";
}

function callBackPartOne() {
  partOne.style.display = "block";
  partOne.style.width = "100%";
  partTwo.style.display = "none";
  partTwo.style.width = "0";
  document.querySelector(".container-new-acc").style.display = "none";
}

notYou.addEventListener("click", function () {
  loaderAndremover();
  setTimeout(callBackPartOne, 1000);
  number.value = " ";
  number.focus();
});

window.addEventListener("load", function () {
  number.focus();
  number.value = " ";
});

save.addEventListener("click", function () {
  verifyPasswords(password.value);
  resetPassword(password.value, extractNumber());
});

function verifyPasswords(a) {
  if (a == "") {
    loaderAndremover();
    setTimeout(fillFeildsError, 1400);
  } else if (a.length < 6) {
    loaderAndremover();
    setTimeout(passwordLengthError, 1400);
  } else {
    loaderAndremover();
    callErrorContainerOff();
  }
}

function codeValidity() {
  callErrorContainer();
  document.querySelector("#error").innerHTML = "Invalid code";
}

function passwordLengthError() {
  callErrorContainer();
  document.querySelector("#error").innerHTML =
    "Use 6 characters or more for your password";
}
function callPartThree() {
  partTwo.style.display = "none";
  partTwo.style.width = "0";
  partThree.style.display = "block";
  partThree.style.width = "100%";
  document.querySelector("#num2").innerHTML = extractNumber();
  code.focus();
  document.querySelector(".container-new-acc").style.display = "none";
  requestOtp();
}
function callPartFour() {
  partThree.style.display = "none";
  partThree.style.width = "0";
  partFour.style.display = "block";
  document.querySelector(".container-new-acc").style.display = "none";
  partFour.style.width = "100%";
  password.focus();
}

function fillFeildsError() {
  callErrorContainer();
  document.querySelector("#error").innerHTML = "Enter new password";
}

function fillFeildsError3() {
  callErrorContainer();
  document.querySelector("#error").innerHTML = "Enter phone number ";
  number.focus();
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

function numberLength() {
  callErrorContainer();
  document.querySelector("#error").innerHTML = "Your number is too short";
}

function noAccount() {
  callErrorContainer();
  document.querySelector("#error").innerHTML =
    "There is no account with such number, Please try again with other number.";
}

cont.addEventListener("click", function () {});

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

async function searchAccount() {
  try {
    const number = extractNumber();
    const objData = { number };
    const jsonData = JSON.stringify(objData);

    const csrfToken = document.querySelector("#csrf_token").value;

    const response = await fetch("/searchAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: jsonData,
    });
    if (response.ok) {
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const responseData = await response.json();

        // Handle the JSON response data
        if (responseData.accountDetails) {
          setTimeout(callPartTwo, 1300);
          for (var key in responseData.accountDetails) {
            document.querySelector("#img").src =
              "/images/" + responseData.accountDetails[key].profile_pic;
            document.querySelector("#username").innerHTML =
              responseData.accountDetails[key].username;
          }
        } else {
          // JSON response with error message
        }
      } else {
        const responseData = await response.text();

        // Handle the non-JSON response
        if (responseData == "There is no account with such number") {
          loaderAndremover();
          setTimeout(noAccount, 1200);
        } else {
          console.log(responseData);
        }
      }
    } else {
      console.log("something went wrong");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function extractNumber() {
  const firstNum = number.value;
  const extracted = firstNum.slice(-9);
  const finalNumber = "+265" + extracted;
  return finalNumber;
}

verify.addEventListener("click", function () {
  verifyCode(code.value);
});

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

function fillFeildsError4() {
  callErrorContainer();
  document.querySelector("#error").innerHTML =
    "Enter code sent to your phone number ";
}

async function VerifyOtp() {
  try {
    const number = extractNumber();
    const otp = code.value;
    const objData = { number, otp };
    const jsonData = JSON.stringify(objData);
    const csrfToken = document.querySelector("#csrf_token").value;
    const response = await fetch("/verifyOtpReset", {
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
        setTimeout(callPartFour, 1000);
      } else if (responseData == "pending") {
        loaderAndremover();
        setTimeout(codeValidity, 1100);
      }
    } else {
      console.log("something went wrong");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function resetPassword(pw, pn) {
  try {
    const password = pw;
    const number = pn;
    const objData = { number, password };
    const jsonData = JSON.stringify(objData);
    const csrfToken = document.querySelector("#csrf_token").value;
    const response = await fetch("/resetPassword2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: jsonData,
    });

    if (response.ok) {
      const responseData = await response.text();
      if (responseData == "saved") {
        loaderAndremover();
        window.location.href = "http://127.0.0.1:8000/";
      }
    } else {
      console.log("something went wrong");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

cancel.addEventListener('click', function(){
  window.location.href = "http://127.0.0.1:8000/";
})