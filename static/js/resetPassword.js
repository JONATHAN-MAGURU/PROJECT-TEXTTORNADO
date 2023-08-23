const nextbtn = document.querySelector(".next-btn");
const number = document.querySelector("#number");
const loading = document.querySelector(".loading");
const fade = document.querySelector(".fade");
const partOne = document.querySelector(".partOne");
const partTwo = document.querySelector(".partTwo");
const partThree = document.querySelector(".partThree");
const cont = document.getElementsByClassName('next-btn')[1];

nextbtn.addEventListener("click", function () {
  verifyNumber(number.value);
});

cont.addEventListener('click', function(){
  loaderAndremover();
  setTimeout(callPartThree,1200);
})

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
    searchAccount(a);
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
  document.querySelector('.container-new-acc').style.display='none';
}

function callPartThree() {
  partTwo.style.display = "none";
  partTwo.style.width = "0";
  partThree.style.display = "block";
  partThree.style.width = "100%";
  document.querySelector("#num2").innerHTML = extractNumber();
  requestOtp();
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

cont.addEventListener('click', function(){

})


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


async function searchAccount(number2) {
  try {
    const number = number2;
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
          setTimeout(callPartTwo,1300)
          for (var key in responseData.accountDetails) {
            document.querySelector('#img').src = "/images/"+responseData.accountDetails[key].profile_pic;
            document.querySelector('#username').innerHTML =responseData.accountDetails[key].username;
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