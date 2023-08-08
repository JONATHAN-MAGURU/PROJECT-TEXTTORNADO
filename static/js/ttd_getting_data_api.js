const username = document.body.getAttribute("data-username");
const id = document.body.getAttribute("data-ttd-id");
const save_data = document.getElementById("save_data");
const firstname = document.getElementsByClassName("edit1")[0];
const lastname = document.getElementsByClassName("edit1")[1];
const email = document.getElementsByClassName("edit1")[2];
const usern = document.getElementsByClassName("edit1")[3];
const element = document.getElementsByClassName("alerts")[0];
const comm = document.getElementsByClassName("comment")[0];
const alert2 = document.getElementById("alerts2");
const send_comment = document.getElementById("comment_form");

save_data.addEventListener("submit", function (e) {
  e.preventDefault();
  const imageInput = document.getElementById("imageInput");
  var firstname2 = firstname.value;
  var lastname2 = lastname.value;
  var mail = email.value;
  var usern2 = usern.value;

  const selectedImage = imageInput.files[0];

  if (selectedImage) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const maxWidth = 800;
        const maxHeight = 800;
        let newWidth = img.width;
        let newHeight = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        if (img.width > maxWidth) {
          newWidth = maxWidth;
          newHeight = (img.height * maxWidth) / img.width;
        }
        if (newHeight > maxHeight) {
          newHeight = maxHeight;
          newWidth = (img.width * maxHeight) / img.height;
        }

        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convert the resized image to base64
        const resizedImageBase64 = canvas.toDataURL("image/jpeg", 0.8); // Adjust quality if needed

        const data = {
          firstname2,
          lastname2,
          mail,
          username,
          id,
          usern2,
         resizedImageBase64,
        };

        const json_data3 = JSON.stringify(data);
        const XHR3 = new XMLHttpRequest();
        const csrfToken4 = document.querySelector("#csrf_token4").value;
        XHR3.open("POST", "/second_player_data", true);
        XHR3.setRequestHeader("Content-Type", "application/json");
        XHR3.setRequestHeader("X-CSRFToken", csrfToken4);
        XHR3.addEventListener("load", function () {
          if (XHR3.status === 200 && XHR3.readyState === 4) {
            const response = this.responseText;
            element.classList.add("animated");
            alert2.innerHTML = response;
            window.location.reload();
          } else {
            alert("something went wrong !!!");
          }
        });
        XHR3.send(json_data3);
      };

      img.src = event.target.result;
    };
    reader.readAsDataURL(selectedImage); 
  } else {
    alert("Please select an image.");
  }
});

send_comment.addEventListener("submit", function (e) {
  e.preventDefault();
  var comment = comm.value;
  const comments = {
    username,
    id,
    comment,
  };

  const json_data4 = JSON.stringify(comments);
  const XHR4 = new XMLHttpRequest();
  const csrfToken5 = document.querySelector("#csrf_token5").value;
  XHR4.open("POST", "/sending_comments", true);
  XHR4.setRequestHeader("Content-Type", "application/json");
  XHR4.setRequestHeader("X-CSRFToken", csrfToken5);
  XHR4.addEventListener("load", function () {
    if (XHR4.status === 200 && XHR4.readyState === 4) {
      
    } else {
      alert("something went wrong !!!");
    }
  });
  XHR4.send(json_data4);
  comm.value = "";
  comment_b.style.maxHeight = 0;
});

document.addEventListener("DOMContentLoaded", function () {
  setInterval(function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/get_comments");
    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        var commentBody = document.querySelector(".comment_body");
        commentBody.innerHTML = "";
        for (var key in response.comments) {
          if (response.comments[key].player_id2 == id) {
            var temp =
              '<div class="comment_holder2"><p> <small style="font-size:80%; text-align:justify;">' +
              response.comments[key].comment +
              "</small> </p></div>";
            commentBody.innerHTML += temp;
          } else {
            var temp =
              '<div class="comment_holder"><p style="color:dodgerblue"><i style="color:slateblue" class="fa fa-user-circle"></i> <small>' +
              response.comments[key].username2 +
              '</small></p><p> <small style="color:font-size:80%; text-align:justify;">' +
              response.comments[key].comment +
              "</small> </p></div>";
            commentBody.innerHTML += temp;
          }
        }
      } else {
        console.log("Request failed.  Returned status of " + xhr.status);
      }
    };
    xhr.send();
  }, 1000);
});

document.addEventListener("DOMContentLoaded", function () {
  const dat = {
    username,
    id,
  };
  const json_dat = JSON.stringify(dat);
  setInterval(function () {
    var xhr1 = new XMLHttpRequest();
    const csrfToken7 = document.querySelector("#csrf_token4").value;
    xhr1.open("POST", "/get_my_data");
    xhr1.setRequestHeader("Content-Type", "application/json");
    xhr1.setRequestHeader("X-CSRFToken", csrfToken7);
    xhr1.onload = function () {
      if (xhr1.status === 200) {
        var response = JSON.parse(xhr1.responseText);
        var dat_body = document.querySelector(".user_d");
        dat_body.innerHTML = "";
        for (var key in response.mydata) {
          var temp =
            "<p>" +
            response.mydata[key].firstname +
            " " +
            response.mydata[key].lastname +
            "</p>";
          dat_body.innerHTML += temp;
        }
      } else {
        console.log("Request failed. Returned status of " + xhr1.status);
      }
    };
    xhr1.send(json_dat);
  }, 1000);
});

document.addEventListener("DOMContentLoaded", function () {
  setInterval(function () {
    var xhr3 = new XMLHttpRequest();
    xhr3.open("GET", "/get_test_details");
    xhr3.onload = function () {
      if (xhr3.status === 200) {
        var response = JSON.parse(xhr3.responseText);
        var res_Body = document.querySelector(".res_body");
        res_Body.innerHTML = "";
        let x = 1;
        for (var key in response.results) {
          if (response.results[key].play_id == id) {
            var temp =
              '<tr style="background-image:linear-gradient(to top right,#020412 20%, #383235 40%,#04071c 70%);"><td>' +
              x++ +
              "</td><td>" +
              response.results[key].username +
              "</td><td>" +
              response.results[key].wpm +
              "</td><td>" +
              response.results[key].cpm +
              "</td><td>" +
              response.results[key].mistakes +
              "</td></tr>";
            res_Body.innerHTML += temp;
          } else {
            var temp =
              "<tr><td>" +
              x++ +
              "</td><td>" +
              response.results[key].username +
              "</td><td>" +
              response.results[key].wpm +
              "</td><td>" +
              response.results[key].cpm +
              "</td><td>" +
              response.results[key].mistakes +
              "</td></tr >";
            res_Body.innerHTML += temp;
          }
        }
      } else {
        console.log("Request failed.  Returned status of " + xhr3.status);
      }
    };
    xhr3.send();
  }, 1000);
});

document.addEventListener("DOMContentLoaded", function () {
  setInterval(function () {
    var xhr5 = new XMLHttpRequest();
    xhr5.open("GET", "/get_history");
    xhr5.onload = function () {
      if (xhr5.status === 200) {
        var response = JSON.parse(xhr5.responseText);
        var history_Body = document.querySelector(".test_history_holder");
        history_Body.innerHTML = "";
        for (var key in response.history) {
          if (response.history[key].play_id == id) {
            var temp =
              '<div class="test_history_box"><p> DATE : ' +
              response.history[key].date +
              "<br/>WPM : " +
              response.history[key].wpm +
              "<br/>CPM : " +
              response.history[key].cpm +
              "<br> MISTAKES : " +
              response.history[key].mistakes +
              "</p></div>";
            history_Body.innerHTML += temp;
          }
        }
      } else {
        console.log("Request failed.  Returned status of " + xhr5.status);
      }
    };
    xhr5.send();
  }, 5000);
});

