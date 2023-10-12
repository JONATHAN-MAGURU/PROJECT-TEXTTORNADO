const username = document.body.getAttribute("data-username");
const id = document.body.getAttribute("data-ttd-id");
const save_data = document.getElementById("save_data");
const firstname = document.getElementsByClassName("edit1")[0];
const lastname = document.getElementsByClassName("edit1")[1];
const email = document.getElementsByClassName("edit1")[2];
const element = document.getElementsByClassName("alerts")[0];
const comm = document.getElementsByClassName("comment")[0];
const concerns = document.getElementsByClassName("customer")[0];
const alert2 = document.getElementById("alerts2");
const send_comment = document.getElementById("comment_form");
const actionStatus = document.querySelector("#actionStatus");

save_data.addEventListener("submit", function (e) {
  e.preventDefault();
  const imageInput = document.getElementById("imageInput");
  var firstname2 = firstname.value;
  var lastname2 = lastname.value;
  var mail = email.value;

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
        const resizedImageBase64 = canvas.toDataURL("image/jpeg", 0.1);

        const data = {
          firstname2,
          lastname2,
          username,
          mail,
          id,
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
  emojiPicker.style.height = "0vh";
  document.getElementsByClassName("comment_body")[0].style.height = "75vh";
  document.getElementsByClassName("comment_foot")[0].style.borderTop = "none";
  e.preventDefault();
  var commentBody = document.querySelector(".comment_body");
  var isAutoScrollEnabled = true;

  function scrollToBottom() {
    commentBody.scrollTop = commentBody.scrollHeight;
  }
  var comment = comm.value;

  if (comment === "") {
    actionStatus.innerHTML = "write a comment";
  } else {
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
        actionStatus.innerHTML = XHR4.responseText;
        isAutoScrollEnabled = true;
        scrollToBottom();
      } else {
        actionStatus.innerHTML = "comment failed";
      }
    });
    XHR4.send(json_data4);
    actionStatus.innerHTML = "sending comment..";
    comm.value = "";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var commentBody = document.querySelector(".comment_body");
  var isAutoScrollEnabled = true;

  function scrollToBottom() {
    commentBody.scrollTop = commentBody.scrollHeight;
  }

  document.querySelector("#open_comm").addEventListener("click", function () {
    isAutoScrollEnabled = true;
    scrollToBottom();
  });
  window.addEventListener("load", function () {
    isAutoScrollEnabled = true;
    scrollToBottom();
  });

  commentBody.addEventListener("scroll", function () {
    if (
      commentBody.scrollTop + commentBody.clientHeight <
      commentBody.scrollHeight - 10
    ) {
      isAutoScrollEnabled = false;
    } else {
      isAutoScrollEnabled = true;
    }
  });

  setInterval(function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/get_comments");
    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        commentBody.innerHTML = "";
        for (var key in response.comments) {
          if (response.comments[key].player_id2 == id) {
            var commentDate = new Date(response.comments[key].comment_date);

            var formattedDate = commentDate.toLocaleString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            var temp =
              '<div class="comment_holder2"><p> ' +
              response.comments[key].comment +
              " </p><br><p><small  style='color:gray'>" +
              formattedDate +
              "</small></p></div>";
            commentBody.innerHTML += temp;
          } else {
            var commentDate = new Date(response.comments[key].comment_date);
            var formattedDate = commentDate.toLocaleString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            var temp =
              '<div class="comment_holder"><p style="color:white"><i style="color:gray; font-size:170%" class="fa fa-user-circle"></i> ' +
              response.comments[key].username2 +
              '</p><p style="color:gray">' +
              response.comments[key].comment +
              " </p><br><p><small  style='color:gray'>" +
              formattedDate +
              "</small></p></div>";
            commentBody.innerHTML += temp;
          }
        }

        if (isAutoScrollEnabled) {
          scrollToBottom();
        }
      } else {
        actionStatus.innerHTML = xhr.status;
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
            document.querySelector(".bodyCover2").style.width = "100%";
          }, 8000);
        }

        var temp =
          "<p>" +
          response.mydata[key].firstname +
          " " +
          response.mydata[key].lastname +
          "</p>";
        dat_body.innerHTML += temp;
      }
    } else {
      actionStatus.innerHTML = xhr1.status;
    }
  };
  xhr1.send(json_dat);
});

const leaderboard_status = document.querySelector("#leaderboard_status");
document.addEventListener("DOMContentLoaded", function () {
  var xhrInProgress = false;
  leaderboard_status.innerHTML = "active";
  function updateLeaderboard() {
    if (xhrInProgress) {
      return;
    }

    xhrInProgress = true;

    var xhr3 = new XMLHttpRequest();
    xhr3.open("GET", "/get_test_details");
    xhr3.onload = function () {
      xhrInProgress = false;

      if (xhr3.status === 200) {
        var response = JSON.parse(xhr3.responseText);
        var res_Body = document.querySelector(".leaderboardBody");
        res_Body.innerHTML = "";

        let x = 1;
        let userIndex = -1; // Initialize the index of the user's score

        for (var key in response.results) {
          if (response.results[key].play_id == id) {
            if (x % 2 == 0) {
              var temp =
                '<div class="userBox" style="border: 2px solid orange; box-shadow:1px 1px 20px black;"><div style="color:white;" class="rankLB">' +
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
                '<div class="userBox" style="border: 2px solid #ed143d; background:transparent; box-shadow:1px 1px 20px black;"><div style="color:white;" class="rankLB">' +
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

            // Set the userIndex to the current index
            userIndex = x - 1;
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
        if (userIndex !== -1) {
          var userScoreElement = res_Body.children[userIndex];
          userScoreElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      } else {
        leaderboard_status.innerHTML = +xhr3.status;
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
            var historyDate = new Date(response.history[key].date);

            var temp =
              '<div class="test_history_box"><p> DATE : ' +
              historyDate.toLocaleDateString("en-US") +
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
        actionStatus.innerHTML = xhr5.status;
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
      const ticketInfoDiv2 = document.querySelector(".ticket-avail");
      ticketInfoDiv.innerHTML = `${data.tickets_available}`;
      ticketInfoDiv2.innerHTML = `${data.tickets_available}`;
    })
    .catch((error) => {
      (actionStatus.innerHTML = "Error fetching ticket data:"), error;
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
      document.querySelector(".welcomeUserHolder").style.width = 0;
      document.querySelector(".welcomeUserHolder").style.display = "none";
      document.querySelector(".bodyCover2").style.width = "0%";
    } else {
      console.log("something went wrong");
    }
  };
  xhr1.send(json_dat);
}

function showWinner() {
  document.querySelector(".winnerOutputMain").innerHTML = "";
  var xhr3 = new XMLHttpRequest();
  xhr3.open("POST", "/leaderBoardHistory");
  const csrfToken5 = document.querySelector("#csrf_token775").value;
  const dat = { id };
  const jsonDat = JSON.stringify(dat);
  xhr3.setRequestHeader("Content-Type", "application/json");
  xhr3.setRequestHeader("X-CSRFToken", csrfToken5);
  xhr3.onload = function () {
    if (xhr3.status === 200) {
      var response = JSON.parse(xhr3.responseText);
      var WinnerBody = document.querySelector(".winnerOutputMain");
      for (var key in response.results) {
        var temp =
          ' <div class="winnerOutput"><div class="winerImg"> <img src="' +
          response.results[key].profile_pic +
          '" alt="image" style="width: 120px; height: 120px; border-radius: 50%"/></div><p style="color: gray; text-align: center; font-weight:600">' +
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
  };
  xhr3.send(jsonDat);
}

function showLooser() {
  document.querySelector(".looserOutputMain").innerHTML = "";
  var xhr3 = new XMLHttpRequest();

  xhr3.open("POST", "/leaderBoardHistory2");
  const csrfToken5 = document.querySelector("#csrf_token7775").value;
  const dat = { id };
  const jsonDat = JSON.stringify(dat);
  xhr3.setRequestHeader("Content-Type", "application/json");
  xhr3.setRequestHeader("X-CSRFToken", csrfToken5);
  xhr3.onload = function () {
    if (xhr3.status === 200) {
      const contentType = xhr3.getResponseHeader("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        var response = JSON.parse(xhr3.responseText);
        var WinnerBody = document.querySelector(".looserOutputMain");
        for (var key in response.results) {
          document.querySelector("#winnerRemark").innerHTML = "YOUR RESULTS";
          document.querySelector("#winnerRemark2").innerHTML =
            "WE ARE SORRY TO ANNOUNCE THAT YOU DIDN'T MAKE IT";
          var temp =
            ' <div class="winnerOutput"><div class="winerImg"> <img src="' +
            response.results[key].profile_pic +
            '" alt="image" style="width: 120px; height: 120px; border-radius: 50%"/></div><p style="color: gray; text-align: center; font-weight:600">' +
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
      } else {
        document.querySelector("#winnerRemark").innerHTML =
          "LEARN MORE HOW TO GET YOUR PRIZE";
        document.querySelector("#winnerRemark2").innerHTML = xhr3.responseText;
      }
    }
  };
  xhr3.send(jsonDat);
}

document.addEventListener("DOMContentLoaded", function () {
  var notificationBody = document.querySelector(".notf_body");
  var isAutoScrollEnabled = true;
  function scrollToBottom() {
    notificationBody.scrollTop = notificationBody.scrollHeight;
  }

  document.querySelector(".notf").addEventListener("click", function () {
    isAutoScrollEnabled = true;
    scrollToBottom();
  });

  window.addEventListener("load", function () {
    isAutoScrollEnabled = true;
    scrollToBottom();
  });
  notificationBody.addEventListener("scroll", function () {
    if (
      notificationBody.scrollTop + notificationBody.clientHeight <
      notificationBody.scrollHeight - 10
    ) {
      isAutoScrollEnabled = false;
    } else {
      isAutoScrollEnabled = true;
    }
  });
  setInterval(function () {
    var xhr = new XMLHttpRequest();
    var url = "/get_notifications";
    const dat = { id };
    const dat2 = JSON.stringify(dat);
    const csrfToken = document.querySelector("#csrf_token114").value;
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", csrfToken);

    xhr.onload = function () {
      if (xhr.status === 200) {
        var contentType = xhr.getResponseHeader("Content-Type");

        if (contentType && contentType.includes("application/json")) {
          try {
            var response = JSON.parse(xhr.responseText);
            notificationBody.innerHTML = "";
            for (var key in response.notification) {
              if (response.notification[key].notf_id == id) {
                var notificationDate = new Date(
                  response.notification[key].notification_date
                );
                var formattedDate = notificationDate.toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });

                var temp =
                  '<div class="notfH"><h5>' +
                  response.notification[key].tittle +
                  '</h5><p style="color:gray">' +
                  response.notification[key].description +
                  '</p><br><p style="color:gray; font-size:80%">' +
                  formattedDate +
                  "</p></div>";

                notificationBody.innerHTML += temp;
              }
            }
            if (isAutoScrollEnabled) {
              scrollToBottom();
            }
          } catch (error) {
            console.log("Error parsing JSON response: " + error);
          }
        } else if (contentType) {
        }
      } else {
        console.log("Request failed. Returned status of " + xhr.status);
      }
    };

    xhr.onerror = function () {
      console.log("Network error occurred.");
    };

    xhr.send(dat2);
  }, 8000);
});

document.querySelector(".issue_input").addEventListener("submit", function (e) {
  e.preventDefault();
  var support = document.querySelector(".test_history_holder2");
  var isAutoScrollEnabled = true;
  var concern = concerns.value;

  scrollToBottom = () => {
    support.scrollTop = support.scrollHeight;
  };
  if (concern === "") {
    actionStatus.innerHTML = "Write a concern";
  } else {
    const consernss = {
      username,
      id,
      concern,
    };

    const json_data = JSON.stringify(consernss);
    const XHR4 = new XMLHttpRequest();
    const csrfToken = document.querySelector("#csrf_token511").value;
    XHR4.open("POST", "/sending_concern", true);
    XHR4.setRequestHeader("Content-Type", "application/json");
    XHR4.setRequestHeader("X-CSRFToken", csrfToken);

    XHR4.addEventListener("load", function () {
      if (XHR4.status === 200 && XHR4.readyState === 4) {
        actionStatus.innerHTML = XHR4.responseText;
        isAutoScrollEnabled = true;
        scrollToBottom();
      } else {
        actionStatus.innerHTML = "Concern failed";
      }
    });

    XHR4.addEventListener("error", function () {
      actionStatus.innerHTML = "An error occurred while sending the concern.";
    });

    XHR4.addEventListener("abort", function () {
      actionStatus.innerHTML = "The concern request was aborted.";
    });

    try {
      XHR4.send(json_data);
      actionStatus.innerHTML = "Sending concern...";
      concerns.value = "";
    } catch (error) {
      actionStatus.innerHTML = "Error sending concern: " + error.message;
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var concernBody = document.querySelector(".test_history_holder2");
  var isAutoScrollEnabled = true;

  function scrollToBottom() {
    concernBody.scrollTop = concernBody.scrollHeight;
  }

  document
    .querySelector(".customerCare")
    .addEventListener("click", function () {
      isAutoScrollEnabled = true;
      scrollToBottom();
    });

  concernBody.addEventListener("scroll", function () {
    if (
      concernBody.scrollTop + concernBody.clientHeight <
      concernBody.scrollHeight - 10
    ) {
      isAutoScrollEnabled = false;
    } else {
      isAutoScrollEnabled = true;
    }
  });

  setInterval(function () {
    var xhr = new XMLHttpRequest();
    const consern = { id };

    const json_data = JSON.stringify(consern);
    const csrfToken = document.querySelector("#csrf_token512").value;
    xhr.open("POST", "/get_concern2");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", csrfToken);
    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        concernBody.innerHTML = "";
        for (var key in response.concerns) {
          if (response.concerns[key].source == username) {
            var concernDate = new Date(response.concerns[key].source_date);

            var formattedDate = concernDate.toLocaleString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            var temp =
              '<div class="issue_holder2"><h4> ' +
              response.concerns[key].source +
              '</h4><p style="color: gray">' +
              response.concerns[key].source_text +
              "</p><br><small style='color: gray'>" +
              formattedDate +
              "</small></div>";
            concernBody.innerHTML += temp;
          } else {
            var concernDate = new Date(response.concerns[key].source_date);
            var formattedDate = concernDate.toLocaleString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            var temp =
              '<div class="issue_holder3"><h4> ' +
              response.concerns[key].source +
              '</h4><p style="color: gray">' +
              response.concerns[key].source_text +
              "</p><br><small style='color: gray'>" +
              formattedDate +
              "</small></div>";
            concernBody.innerHTML += temp;
          }
        }

        if (isAutoScrollEnabled) {
          scrollToBottom();
        }
      } else {
        actionStatus.innerHTML = xhr.status;
      }
    };
    xhr.send(json_data);
  }, 5000);
});

const emojiButton = document.querySelector(".emoji-button");
const emojiPicker = document.getElementById("emoji-picker");
const commentInput = document.querySelector(".send-inputcomme.comment");

const emojis = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😙",
  "😎",
  "🤓",
  "🧐",
  "🤨",
  "🤪",
  "😜",
  "😝",
  "😛",
  "😋",
  "😚",
  "🤩",
  "🥳",
  "😏",
  "😒",
  "😞",
  "😔",
  "😟",
  "😕",
  "🙁",
  "☹",
  "😣",
  "😖",
  "😫",
  "😩",
  "🥺",
  "😢",
  "😭",
  "😤",
  "😠",
  "😡",
  "🤬",
  "🤯",
  "😳",
  "🥵",
  "🥶",
  "😶",
  "😱",
  "😨",
  "😰",
  "😥",
  "😓",
  "🤗",
  "🤔",
  "🤭",
  "🤫",
  "🤥",
  "😶",
  "😐",
  "😑",
  "😬",
  "🙄",
  "😯",
  "😦",
  "😧",
  "😮",
  "😲",
  "🥱",
  "😴",
  "🤤",
  "😪",
  "😮",
  "😵",
  "😵",
  "🤐",
  "🥴",
  "🤢",
  "🤮",
  "🤧",
  "😷",
  "🤒",
  "🤕",
  "🤑",
  "🤠",
  "😈",
  "👿",
  "👹",
  "👺",
  "🤡",
  "💩",
  "👻",
  "💀",
  "☠",
  "👽",
  "👾",
  "🤖",
  "🎃",
  "😺",
  "😸",
  "😹",
  "😻",
  "😼",
  "😽",
  "🙀",
  "😿",
  "🤲",
  "👐",
  "🙌",
  "👏",
  "🤝",
  "👍",
  "👎",
  "👊",
  "✊",
  "🐛",
  "🦋",
  "🐌",
  "🐞",
  "🐍",
  "🌝",
  "🐢",
  "🌚",
  "🐜",
  "🌦️",
  "🦟",
  "🦗",
  "🕷️",
  "🕸️",
  "🦂",
  "🌛",
  "🌹",
  "🌙",
  "🌩️",
  "🔥",
  "🌧️",
  "☁️",
  "🌥️",
  "🌬️",
  "💦",
  "💨",
  "❄️",
  "🌨️",
  "🌪️",
  "🌈",
  "⛅",
  "🌤️",
  "☔",
  "☂️",
  "🌫️",
  "🌊",
  "🍒",
  "🍑",
  "🍅",
  "🍉",
  "🤸‍♂️",
  "🤸‍♀️",
  "⛹️‍♂️",
  "✊",
  "🤛",
  "🤜",
  "🤞",
  "✌️",
  "🤟",
  "🤘",
  "👌",
  "🤏",
  "👈",
  "👉",
  "👆",
  "👇",
  "☝️",
  "✋",
  "🤚",
  "🖐",
  "🖖",
  "🤙",
  "💪",
  "💪",
  "🖕",
  "✍️",
  "🙏",
  "🦶",
  "🦵",
  "🦿",
  "💄",
  "💋",
  "👄",
  "🦷",
  "👅",
  "👂",
  "🦻",
  "👃",
  "👣",
  "👁️",
  "👀",
  "🧠",
  "🗣️",
  "👤",
  "👥",
  "👶",
  "👧",
  "🧒",
  "👦",
  "👩",
  "🧑",
  "👨",
  "👩‍🦱",
  "🧑",
  "👨‍🦱",
  "👩‍🦰",
  "🧑",
  "👨‍🦰",
  "👱‍♀️",
  "👱‍♂️",
  "👩‍🦳",
  "🧑",
  "👨‍🦳",
  "👩‍🦲",
  "🧑",
  "👨‍🦲",
  "🧔",
  "🧔",
  "👵",
  "🧓",
  "👴",
  "👲",
  "👳‍♀️",
  "👳‍♂️",
  "🧕",
  "👮‍♀️",
  "👮‍♂️",
  "👷‍♂️",
  "💂‍♀️",
  "❤️",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🖤",
  "🤍",
  "🤎",
  "💔",
  "❤️",
  "❤️",
  "❣️",
  "💕",
  "💞",
  "💓",
  "💗",
  "💖",
  "💘",
  "💝",
  "💟",
];

emojis.forEach((emoji) => {
  const span = document.createElement("span");
  span.textContent = emoji;
  span.onclick = () => insertEmoji(emoji);
  emojiPicker.appendChild(span);
});

let isPickerOpen = false;

emojiButton.addEventListener("click", () => {
  if (isPickerOpen) {
    emojiPicker.style.height = "0";
    document.getElementsByClassName("comment_body")[0].style.height = "75vh";
    document.getElementsByClassName("comment_foot")[0].style.borderTop = "none";
  } else {
    emojiPicker.style.height = "20vh";
    document.getElementsByClassName("comment_body")[0].style.height = "55vh";
    document.getElementsByClassName("comment_foot")[0].style.borderTop =
      "1px solid #2e2f3a";
  }
  isPickerOpen = !isPickerOpen;
});

function insertEmoji(emoji) {
  commentInput.value += emoji;
}
