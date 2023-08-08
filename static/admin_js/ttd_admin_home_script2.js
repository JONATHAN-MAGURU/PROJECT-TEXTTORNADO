const frontend = document.getElementById("frontend");

frontend.addEventListener("change", function () {
  const firstId = frontend.checked ? 5747 : 85747;
  const firstIdOb = { firstId };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken3 = document.querySelector("#csrf_token2").value;
  XHR3.open("POST", "/startFrontend", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken3);
  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      console.log(XHR3.responseText);
    } else {
      console.log("something went wrong");
    }
  });
  XHR3.send(jsonData);
});

setInterval(function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/getFontendCodes");
    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        for (var key in response.codes) {
          if(response.codes[key].FrontendId == 85747){
            frontend.checked = false;
          }
          else{
            frontend.checked = true;
          }
        }
      } else {
        console.log("Request failed.  Returned status of " + xhr.status);
      }
    };
    xhr.send();
  }, 1000);
