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
        const resizedImageBase64 = canvas.toDataURL("image/jpeg", 1);

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
              '<div class="comment_holder"><p style="color:gray"><i style="color:gray; font-size:170%" class="fa fa-user-circle"></i> <small>' +
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
  }, 4000);
});

document.addEventListener("DOMContentLoaded", function () {
  const dat = {
    username,
    id,
  };
  const json_dat = JSON.stringify(dat);
  var xhr1 = new XMLHttpRequest();
  const csrfToken7 = document.querySelector("#csrf_token7").value;
  xhr1.open("POST", "/get_my_data");
  xhr1.setRequestHeader("Content-Type", "application/json");
  xhr1.setRequestHeader("X-CSRFToken", csrfToken7);
  xhr1.onload = function () {
    if (xhr1.status === 200) {
      var response = JSON.parse(xhr1.responseText);
      var dat_body = document.querySelector(".user_d");
      dat_body.innerHTML = "";
      for (var key in response.mydata) {
        if (response.mydata[key].account == "new") {
          setTimeout(function () {
            document.querySelector(".welcomeUserHolder").style.display =
              "block";
            document.querySelector(".bodyCover").style.width = "100%";
          }, 8000);
        }

        var temp =
          "<p>" +
          response.mydata[key].username +
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
});

document.addEventListener("DOMContentLoaded", function () {
  var xhrInProgress = false; // Track if a request is already in progress

  function updateLeaderboard() {
    if (xhrInProgress) {
      return; // If a request is already in progress, don't start another
    }

    xhrInProgress = true;

    var xhr3 = new XMLHttpRequest();
    xhr3.open("GET", "/get_test_details");
    xhr3.onload = function () {
      xhrInProgress = false; // Reset the flag when the request is complete

      if (xhr3.status === 200) {
        var response = JSON.parse(xhr3.responseText);
        var res_Body = document.querySelector(".leaderboardBody");
        res_Body.innerHTML = "";
        let x = 1;
        for (var key in response.results) {
          if (response.results[key].play_id == id) {
            if (x % 2 == 0) {
              var temp =
                '<div class="userBox" style="border: 1px solid orange; box-shadow:1px 1px 20px black;"><div style="color:white;" class="rankLB">' +
                x++ +
                '</div><div class="firstnameLB" style="color:white;"><img style="width:35px;height:35px; border-radius:50%;" src="' +
                response.results[key].profile_pic +
                '">&nbsp;&nbsp; <div style="margin-top:6.5px">' +
                response.results[key].username +
                '</div></div><div  style="color:white;" class="wpmLB">' +
                response.results[key].wpm +
                '</div><div style="color:white;" class="charLB">' +
                response.results[key].cpm +
                '</div> <div style="color:white;" class="mistLB">' +
                response.results[key].mistakes +
                "</div></div>";

              res_Body.innerHTML += temp;
            } else {
              var temp =
                '<div class="userBox" style="border: 1px solid #ed143d; background:transparent; box-shadow:1px 1px 20px black;"><div style="color:white;" class="rankLB">' +
                x++ +
                '</div><div class="firstnameLB" style="color:white;"><img style="width:35px;height:35px; border-radius:50%;" src="' +
                response.results[key].profile_pic +
                '">&nbsp;&nbsp; <div style="margin-top:6.5px">' +
                response.results[key].username +
                '</div></div><div  style="color:white;" class="wpmLB">' +
                response.results[key].wpm +
                '</div><div style="color:white;" class="charLB">' +
                response.results[key].cpm +
                '</div> <div style="color:white;" class="mistLB">' +
                response.results[key].mistakes +
                "</div></div>";

              res_Body.innerHTML += temp;
            }
          } else {
            if (x % 2 == 0) {
              var temp =
                '<div class="userBox"><div class="rankLB">' +
                x++ +
                '</div><div class="firstnameLB"><img style="width:35px;height:35px; border-radius:50%;" src="' +
                response.results[key].profile_pic +
                '">&nbsp;&nbsp;<div style="margin-top:6.5px">' +
                response.results[key].username +
                '</div></div><div class="wpmLB">' +
                response.results[key].wpm +
                '</div><div class="charLB">' +
                response.results[key].cpm +
                '</div> <div class="mistLB">' +
                response.results[key].mistakes +
                "</div></div>";
              res_Body.innerHTML += temp;
            } else {
              var temp =
                '<div  style="background:transparent; border:none;" class="userBox"><div class="rankLB">' +
                x++ +
                '</div><div class="firstnameLB"><img style="width:35px;height:35px; border-radius:50%;" src="' +
                response.results[key].profile_pic +
                '">&nbsp;&nbsp;<div style="margin-top:6.5px">' +
                response.results[key].username +
                '</div></div><div class="wpmLB">' +
                response.results[key].wpm +
                '</div><div class="charLB">' +
                response.results[key].cpm +
                '</div> <div class="mistLB">' +
                response.results[key].mistakes +
                "</div></div>";
              res_Body.innerHTML += temp;
            }
          }
        }
      } else {
        console.log("Request failed. Returned status of " + xhr3.status);
      }
    };
    xhr3.send();
  }
  updateLeaderboard();
  setInterval(updateLeaderboard, 2000);
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

function fetchTicketData(userId) {
  fetch(`/get_ticket_data?user_id=${userId}`)
    .then((response) => response.json())
    .then((data) => {
      const ticketInfoDiv = document.getElementById("ticket-avail");
      ticketInfoDiv.innerHTML = `${data.tickets_available}`;
    })
    .catch((error) => {
      console.error("Error fetching ticket data:", error);
    });
}
window.onload = function () {
  fetchTicketData(id);
};

document
  .getElementsByClassName("cancel-btn2")[0]
  .addEventListener("click", function () {
    setOld();
  });
document
  .getElementsByClassName("next-btn2")[0]
  .addEventListener("click", function () {
    setOld();
  });

function setOld() {
  const dat = {
    username,
    id,
  };
  const json_dat = JSON.stringify(dat);
  var xhr1 = new XMLHttpRequest();
  const csrfToken = document.querySelector("#csrf_token14").value;
  xhr1.open("POST", "/setToOld");
  xhr1.setRequestHeader("Content-Type", "application/json");
  xhr1.setRequestHeader("X-CSRFToken", csrfToken);
  xhr1.onload = function () {
    if (xhr1.status === 200) {
      console.log("set to old");
    } else {
      console.log("something went wrong");
    }
  };
  xhr1.send(json_dat);
}

function showWinner() {
  document.querySelector(".winnerOutput").innerHTML = "";
  var xhr3 = new XMLHttpRequest();
  xhr3.open("GET", "/leaderBoardHistory");
  xhr3.onload = function () {
    if (xhr3.status === 200) {
      var response = JSON.parse(xhr3.responseText);
      var WinnerBody = document.querySelector(".winnerOutput");
      var x = 1;
      for (var key in response.results) {
        if (x < 2) {
          var temp =
            ' <div class="winnerOutput"><div class="winerImg"> <img src="' +
            response.results[key].profile_pic +
            '" alt="image" style="width: 120px; height: 120px; border-radius: 50%"/></div><p style="color: gray; text-align: center; font-size: 90%">' +
            response.results[key].username +
            '</p><div class="winnerDetailsHolder"><div class="winnerDetailsA"><p class="centered">RANK</p><p class="centered">WPM</p><p class="centered">CPM</p><p class="centered">MISTAKES</p></div><div class="winnerDetailsB">  <p class="centered">' +
            response.results[key].rank +
            '</p> <p class="centered">' +
            response.results[key].wpm +
            '</p><p class="centered">' +
            response.results[key].cpm +
            '</p><p class="centered">' +
            response.results[key].mistakes +
            "</p> </div></div>";
          WinnerBody.innerHTML += temp;

          x++;
        }
      }
    }
  };
  xhr3.send();
}

function showLooser() {
  document.querySelector(".looserOutput").innerHTML = "";
  var xhr3 = new XMLHttpRequest();
  xhr3.open("GET", "/leaderBoardHistory");
  xhr3.onload = function () {
    if (xhr3.status === 200) {
      var response = JSON.parse(xhr3.responseText);
      var WinnerBody = document.querySelector(".looserOutput");
      for (var key in response.results) {
        if (response.results[key].play_id == id) {
          if(response.results[key].rank == 1){
           document.querySelector('#winnerRemark').innerHTML ="LEARN MORE HOW TO GET YOUR PRIZE";
           document.querySelector('#winnerRemark2').innerHTML ="We're thrilled to announce that you've emerged victorious in our recent event! Your outstanding performance has earned you a well-deserved prize: a fantastic gadget! 📱 To ensure you receive your prize smoothly, our team will be giving you a call shortly. During this call, we'll discuss the details of how to arrange the delivery of your gadget. We want to make sure it reaches you securely and on time. Keep an eye on your phone; our call will be coming your way soon. We're excited to connect with you and make the process as seamless as possible. Once again, congratulations on your impressive win, and thank you for being a part of our event. Enjoy your new gadget, and may it bring you endless joy and utility! Stay tuned for more exciting events and opportunities in the future. You could be our next winner! <br>Best regards, texttornado Team";
          }
          else{
            document.querySelector('#winnerRemark').innerHTML ="YOUR RESULTS";
            document.querySelector('#winnerRemark2').innerHTML ="WE ARE SORRY TO ANNOUNCE THAT YOU DIDN'T MAKE IT";
          var temp =
            ' <div class="winnerOutput"><div class="winerImg"> <img src="' +
            response.results[key].profile_pic +
            '" alt="image" style="width: 120px; height: 120px; border-radius: 50%"/></div><p style="color: gray; text-align: center; font-size: 90%">' +
            response.results[key].username +
            '</p><div class="winnerDetailsHolder"><div class="winnerDetailsA"><p class="centered">RANK</p><p class="centered">WPM</p><p class="centered">CPM</p><p class="centered">MISTAKES</p></div><div class="winnerDetailsB">  <p class="centered">' +
            response.results[key].rank +
            '</p> <p class="centered">' +
            response.results[key].wpm +
            '</p><p class="centered">' +
            response.results[key].cpm +
            '</p><p class="centered">' +
            response.results[key].mistakes +
            "</p> </div></div>";
          WinnerBody.innerHTML += temp;
          }
        }
      }
    }
  };
  xhr3.send();
}
