const newPrice = document.querySelector("#newprice");
const oldPrice = document.querySelector("#oldprice");
const dropBy = document.querySelector("#dropBy");

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
