const oldPrice = document.querySelector("#oldprice");
const dropBy = document.querySelector("#dropBy");
const newPrice = document.querySelector("#newprice");

const stdnew = document.querySelector("#stdnew");
const stdold = document.querySelector("#stdold");
const stdTks = document.querySelector("#stdTks");
const stdDb = document.querySelector("#stdDb");

const epnew = document.querySelector("#epnew");
const epold = document.querySelector("#epold");
const epTks = document.querySelector("#epTks");
const epDb = document.querySelector("#epDb");

const legnew = document.querySelector("#legnew");
const legold = document.querySelector("#legold");
const legTks = document.querySelector("#legTks");
const legDb = document.querySelector("#legDb");

function getTicketsPrice() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getTicketsPrices2");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      for (var key in response.ticketPrice) {
        if (response.ticketPrice[key].type == "STAN") {
          stdnew.innerHTML = response.ticketPrice[key].newPrice;
          stdold.innerHTML = response.ticketPrice[key].oldPrice;
          stdDb.innerHTML = response.ticketPrice[key].dropBy;
          stdTks.innerHTML = response.ticketPrice[key].amount;
          const dbIsnegative = parseInt(response.ticketPrice[key].dropBy, 10);
          if (dbIsnegative < 1) {
            document.querySelector("#saveSTD").innerHTML = "OFF";
          }
        }
        if (response.ticketPrice[key].type == "EPIC") {
          epnew.innerHTML = response.ticketPrice[key].newPrice;
          epold.innerHTML = response.ticketPrice[key].oldPrice;
          epDb.innerHTML = response.ticketPrice[key].dropBy;
          epTks.innerHTML = response.ticketPrice[key].amount;
          const dbIsnegative = parseInt(response.ticketPrice[key].dropBy, 10);
          if (dbIsnegative < 1) {
            document.querySelector("#saveEP").innerHTML = "OFF";
          }
        }
        if (response.ticketPrice[key].type == "LEGE") {
          legnew.innerHTML = response.ticketPrice[key].newPrice;
          legold.innerHTML = response.ticketPrice[key].oldPrice;
          legDb.innerHTML = response.ticketPrice[key].dropBy;
          legTks.innerHTML = response.ticketPrice[key].amount;
          const dbIsnegative = parseInt(response.ticketPrice[key].dropBy, 10);
          if (dbIsnegative < 1) {
            document.querySelector("#saveLEG").innerHTML = "OFF";
          }
        }
      }
    } else {
      actionStatus.innerHTML = "Tickets prices failed.";
    }
  };
  xhr.send();
}

window.addEventListener("DOMContentLoaded", () => {
  getTicketsPrice();
});
function getSubscription() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getSubscription");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      for (var key in response.subscriptionPrice) {
        newPrice.innerHTML = response.subscriptionPrice[key].newPrice;
        oldPrice.innerHTML = response.subscriptionPrice[key].oldPrice;
        dropBy.innerHTML = response.subscriptionPrice[key].dropBy;
        actionStatus.innerHTML = "subscription prices loaded.";
        const dbIsnegative = parseInt(response.subscriptionPrice[key].dropBy, 10);
          if (dbIsnegative < 1) {
            document.querySelector("#saveSUB").innerHTML = "OFF";
          }
      }
    } else {
      actionStatus.innerHTML = "subscription prices failed.";
    }
  };
  xhr.send();
}

window.addEventListener("DOMContentLoaded", () => {
  getSubscription();
});
