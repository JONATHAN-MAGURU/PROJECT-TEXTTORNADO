const frontend = document.getElementById("frontend");
const leaderboardToggle = document.getElementById("leaderboard");
const typingArea = document.getElementById("typingArea");
const event1 = document.getElementById("event1");
const event2 = document.getElementById("event2");
const minsSlider = document.getElementById("minsSlider");
const maxmumInput = document.getElementById("maxmum");
const minmumInput = document.getElementById("minmum");
const timers1 = document.getElementById("timers1");
const minsSlider2 = document.getElementById("minsSlider2");
const maxmumInput2 = document.getElementById("maxmum2");
const minmumInput2 = document.getElementById("minmum2");
const timers2 = document.getElementById("timers2");
const startTimerOne = document.getElementById("endEvent");
const startTimerTwo = document.getElementById("nextEvent");
const actionStatus = document.querySelector("#actionStatus");
var messageHolderArray = [];
frontend.addEventListener("change", function () {
  const firstId = frontend.checked ? 5747 : 85747;
  const firstIdOb = { firstId };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken5 = document.querySelector("#csrf_token5").value;
  XHR3.open("POST", "/startFrontend", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken5);
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
        if (response.codes[key].FrontendId == 85747) {
          frontend.checked = false;
        } else {
          frontend.checked = true;
        }
      }
    } else {
      console.log("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
}, 2000);

maxmumInput.addEventListener("change", function () {
  minsSlider.max = maxmumInput.value;
  updateCountdown();
});

minmumInput.addEventListener("change", function () {
  minsSlider.min = minmumInput.value;
  updateCountdown();
});

minsSlider.addEventListener("input", function () {
  updateCountdown();
});

function updateCountdown() {
  const totalMilliseconds = minsSlider.value;
  const days = Math.floor(totalMilliseconds / (24 * 60 * 60 * 1000));
  const hours = Math.floor((totalMilliseconds / (60 * 60 * 1000)) % 24);
  const minutes = Math.floor((totalMilliseconds / (60 * 1000)) % 60);
  const seconds = Math.floor((totalMilliseconds / 1000) % 60);
  const milliseconds = Math.floor(totalMilliseconds % 1000);

  document.getElementById("days3").innerHTML = days;
  document.getElementById("hours3").innerHTML = hours;
  document.getElementById("mins3").innerHTML = minutes;
  document.getElementById("seconds3").innerHTML = seconds;
  document.getElementById("milliseconds3").innerHTML = milliseconds;
}

timers1.addEventListener("submit", async (event) => {
  event.preventDefault();

  const ms = minsSlider.value;
  const msObj = { ms };
  const mSjsonData = JSON.stringify(msObj);

  const csrfToken3 = document.querySelector("#csrf_token3").value;

  try {
    const response = await fetch("/setEventEnd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken3,
      },
      body: mSjsonData,
    });
    const responseText = await response.text();
    if (response.status === 200) {
      document.getElementById("timerAlets").innerHTML = responseText;
    } else {
      document.getElementById("timerAlets").innerHTML = responseText;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    document.getElementById("timerAlets").innerHTML =
      "An error occurred while processing the request.";
  }
});

setInterval(function () {
  document.getElementById("timerAlets").innerHTML = "";
}, 5000);

maxmumInput2.addEventListener("change", function () {
  minsSlider2.max = maxmumInput2.value;
  updateCountdown2();
});

minmumInput2.addEventListener("change", function () {
  minsSlider2.min = minmumInput2.value;
  updateCountdown2();
});

minsSlider2.addEventListener("input", function () {
  updateCountdown2();
});

function updateCountdown2() {
  const totalMilliseconds = minsSlider2.value;
  const days = Math.floor(totalMilliseconds / (24 * 60 * 60 * 1000));
  const hours = Math.floor((totalMilliseconds / (60 * 60 * 1000)) % 24);
  const minutes = Math.floor((totalMilliseconds / (60 * 1000)) % 60);
  const seconds = Math.floor((totalMilliseconds / 1000) % 60);
  const milliseconds = Math.floor(totalMilliseconds % 1000);

  document.getElementById("days2b").innerHTML = days;
  document.getElementById("hours2b").innerHTML = hours;
  document.getElementById("mins2b").innerHTML = minutes;
  document.getElementById("seconds2b").innerHTML = seconds;
  document.getElementById("milliseconds2b").innerHTML = milliseconds;
}

timers2.addEventListener("submit", async (event) => {
  event.preventDefault();

  const ms = minsSlider2.value;
  const msObj = { ms };
  const mSjsonData = JSON.stringify(msObj);

  const csrfToken4 = document.querySelector("#csrf_token4").value;

  try {
    const response = await fetch("/setEventNext", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken4,
      },
      body: mSjsonData,
    });

    if (response.status === 200) {
      const responseText = await response.text();
      document.getElementById("timerAlets2").innerHTML = responseText;
    } else {
      document.getElementById("timerAlets2").innerHTML =
        "something went wrong !!!";
    }
  } catch (error) {
    console.error("An error occurred:", error);
    document.getElementById("timerAlets2").innerHTML =
      "An error occurred while processing the request.";
  }
});

setInterval(function () {
  document.getElementById("timerAlets2").innerHTML = "";
}, 5000);

startTimerOne.addEventListener("change", function () {
  const firstId = startTimerOne.checked ? 5747 : 85747;
  const firstIdOb = { firstId };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken5 = document.querySelector("#csrf_token7").value;
  XHR3.open("POST", "/startTimerOne", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken5);
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
  xhr.open("GET", "/getStartTimerOneCodes");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      for (var key in response.codes) {
        if (response.codes[key].endEventId == 85747) {
          startTimerOne.checked = false;
        } else {
          startTimerOne.checked = true;
        }
      }
    } else {
      console.log("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
}, 3000);

startTimerTwo.addEventListener("change", function () {
  const firstId = startTimerTwo.checked ? 5747 : 85747;
  const firstIdOb = { firstId };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken5 = document.querySelector("#csrf_token7").value;
  XHR3.open("POST", "/startTimerTwo", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken5);
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
  xhr.open("GET", "/getStartTimerTwoCodes");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      for (var key in response.codes) {
        if (response.codes[key].nextEventId == 85747) {
          startTimerTwo.checked = false;
        } else {
          startTimerTwo.checked = true;
        }
      }
    } else {
      console.log("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
}, 3000);

leaderboardToggle.addEventListener("change", function () {
  const firstId = leaderboardToggle.checked ? 5747 : 85747;
  const firstIdOb = { firstId };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken = document.querySelector("#csrf_token11").value;
  XHR3.open("POST", "/startLeaderBoard", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken);
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
  xhr.open("GET", "/getLeaderBoardCode");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      for (var key in response.codes) {
        if (response.codes[key].leaderBoardId == 85747) {
          leaderboardToggle.checked = false;
        } else {
          leaderboardToggle.checked = true;
        }
      }
    } else {
      console.log("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
}, 3000);

typingArea.addEventListener("change", function () {
  const firstId = typingArea.checked ? 5747 : 85747;
  const firstIdOb = { firstId };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken = document.querySelector("#csrf_token12").value;
  XHR3.open("POST", "/startTypingArea", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken);
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
  xhr.open("GET", "/getTypingAreaCode");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      for (var key in response.codes) {
        if (response.codes[key].typingAreaId == 85747) {
          typingArea.checked = false;
        } else {
          typingArea.checked = true;
        }
      }
    } else {
      console.log("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
}, 3000);

event1.addEventListener("change", function () {
  if (leaderboardToggle.checked || typingArea.chacked) {
    document.querySelector("#eventWarn").innerHTML =
      "switch off leaderboard and type area first";
  } else {
    const firstId = event1.checked ? 15747 : 185747;
    const firstIdOb = { firstId };
    const jsonData = JSON.stringify(firstIdOb);
    const XHR3 = new XMLHttpRequest();
    const csrfToken = document.querySelector("#csrf_token19").value;
    XHR3.open("POST", "/starEvent1", true);
    XHR3.setRequestHeader("Content-Type", "application/json");
    XHR3.setRequestHeader("X-CSRFToken", csrfToken);
    XHR3.addEventListener("load", function () {
      if (XHR3.status === 200 && XHR3.readyState === 4) {
        console.log(XHR3.responseText);
      } else {
        console.log("something went wrong");
      }
    });
    XHR3.send(jsonData);
  }
});

setInterval(function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getEvent1Code");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      for (var key in response.codes) {
        if (response.codes[key].eventId == 185747) {
          event1.checked = false;
        } else {
          event1.checked = true;
        }
      }
    } else {
      console.log("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
}, 3000);

event2.addEventListener("change", function () {
  if (leaderboardToggle.checked || typingArea.chacked) {
    document.querySelector("#eventWarn").innerHTML =
      "switch off leaderboard and type area first";
  } else {
    const firstId = event2.checked ? 15747 : 185747;
    const firstIdOb = { firstId };
    const jsonData = JSON.stringify(firstIdOb);
    const XHR3 = new XMLHttpRequest();
    const csrfToken = document.querySelector("#csrf_token19").value;
    XHR3.open("POST", "/starEvent2", true);
    XHR3.setRequestHeader("Content-Type", "application/json");
    XHR3.setRequestHeader("X-CSRFToken", csrfToken);
    XHR3.addEventListener("load", function () {
      if (XHR3.status === 200 && XHR3.readyState === 4) {
        console.log(XHR3.responseText);
      } else {
        console.log("something went wrong");
      }
    });
    XHR3.send(jsonData);
  }
});

setInterval(function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getEvent2Code");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      for (var key in response.codes) {
        if (response.codes[key].eventId == 185747) {
          event2.checked = false;
        } else {
          event2.checked = true;
        }
      }
    } else {
      console.log("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
}, 3000);

function sendRequest() {
  const xhr = new XMLHttpRequest();
  const url = "/count_online_players";

  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const onlinePlayersCount = parseInt(xhr.responseText);
      document.querySelector("#online").innerHTML = onlinePlayersCount;
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      console.error(`Error: Status ${xhr.status}`);
    }
  };
  xhr.send();
}

sendRequest();
setInterval(sendRequest, 5000);

document.addEventListener("DOMContentLoaded", function () {
  var concernBody = document.querySelector(".support_containerA");
  var printedSources = {};

  setInterval(function () {
    var xhr = new XMLHttpRequest();
    const consern = { mail };

    const json_data = JSON.stringify(consern);
    const csrfToken = document.querySelector("#csrf_token512").value;
    xhr.open("POST", "/get_concern");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", csrfToken);

    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        printedSources = {};
        concernBody.innerHTML = "";

        for (var key in response.concerns) {
          var concernDate = new Date(response.concerns[key].source_date);
          if (response.concerns[key].reply == "no") {
            if (response.concerns[key].source == "TextTornado Assistant") {
              continue;
            } else {
              if (!printedSources[response.concerns[key].source]) {
                var formattedDate = concernDate.toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });

                var temp =
                  ' <div class="messageHolder"   data-id="' +
                  response.concerns[key].source_id +
                  '"><div class="messageHead"><h5> ' +
                  response.concerns[key].source +
                  '</h5><small style="color:orange; font-size:70%">' +
                  formattedDate +
                  "</small></div><p><small style='color: gray'>" +
                  response.concerns[key].source_text +
                  "</small></p></div>";
                concernBody.innerHTML += temp;
                printedSources[response.concerns[key].source] = true;
              }
            }
          } else {
            actionStatus.innerHTML = "no concerns";
          }
        }

        const messageContainer = document.querySelector(".support_containerA");
        const messsageHolders =
          messageContainer.querySelectorAll(".messageHolder");
        for (const messageHolder of messsageHolders) {
          messageHolder.addEventListener("click", () => {
            messageHolderArray.splice(0);
            messageHolderArray.push(messageHolder.dataset.id);
            getUserConcerns(messageHolderArray[0]);
          });
        }
      } else {
        actionStatus.innerHTML = xhr.status;
      }
    };

    xhr.send(json_data);
  }, 3000);
});

function getUserConcerns(userId) {
  var concernBody = document.querySelector(".support_containerB_1_Body");
  function scrollToBottom() {
    concernBody.scrollTop = concernBody.scrollHeight;
  }

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
  var xhr = new XMLHttpRequest();
  const consern = { userId };

  const json_data = JSON.stringify(consern);
  const csrfToken = document.querySelector("#csrf_token513").value;
  xhr.open("POST", "/get_concern3");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", csrfToken);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      concernBody.innerHTML = "";
      for (var key in response.concerns) {
        if (response.concerns[key].source !== "TextTornado Assistant") {
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
            '<div class="comment_holder"><h5> ' +
            response.concerns[key].source +
            '</h5><p style="color: gray">' +
            response.concerns[key].source_text +
            "</p><br><small style='color: gray'>" +
            formattedDate +
            "</small></div>";
          concernBody.innerHTML += temp;
        } else {
          var concernDate = new Date(response.concerns[key].source_id);
          var formattedDate = concernDate.toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          var temp =
            '<div class="comment_holder2"><h5> ' +
            response.concerns[key].source +
            '</h5><p style="color: gray">' +
            response.concerns[key].source_text +
            "</p><br><small style='color: gray'>" +
            formattedDate +
            "</small></div>";
          concernBody.innerHTML += temp;
        }
      }
    } else {
      actionStatus.innerHTML = xhr.status;
    }
  };
  xhr.send(json_data);
}

const concerns = document.querySelector(".replyConcern");

document.querySelector(".issue_input").addEventListener("submit", function (e) {
  e.preventDefault();
  var concern = concerns.value;
  var userData = messageHolderArray[0];

  if (concern === "") {
    actionStatus.innerHTML = "WRITE A REPLY...";
  } else {
    const consernss = {
      userData,
      concern,
    };

    const json_data = JSON.stringify(consernss);
    const XHR4 = new XMLHttpRequest();
    const csrfToken = document.querySelector("#csrf_token518").value;
    XHR4.open("POST", "/sending_concern_response", true);
    XHR4.setRequestHeader("Content-Type", "application/json");
    XHR4.setRequestHeader("X-CSRFToken", csrfToken);

    XHR4.addEventListener("load", function () {
      if (XHR4.status === 200 && XHR4.readyState === 4) {
        actionStatus.innerHTML = XHR4.responseText;
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
  subsubscriber();
});

function subsubscriber() {
  var subscribersBody = document.getElementsByClassName("holdSubscriptions")[0];
  var xhr = new XMLHttpRequest();
  const subscriber = { mail };

  const json_data = JSON.stringify(subscriber);
  const csrfToken = document.querySelector("#csrf_token612").value;
  xhr.open("POST", "/get_subscribers");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", csrfToken);

  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      subscribersBody.innerHTML = "";

      for (var key in response.subscriber) {
        var subscriberDate = new Date(
          response.subscriber[key].subscriptionDate
        );

        var formattedDate = subscriberDate.toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        var temp =
          '<div class="subscriberHolder"><p>' +
          response.subscriber[key].subscriptionId +
          "</p><p>" +
          response.subscriber[key].subscriptionStatus +
          "</p><p>" +
          response.subscriber[key].subscriptionCounter +
          "/5</p><p>" +
          response.subscriber[key].subscriptionTimes +
          "</p><p>" +
          formattedDate +
          "</p></div>";

        subscribersBody.innerHTML += temp;
      }
    }
  };
  xhr.send(json_data);
}

document.addEventListener("DOMContentLoaded", function () {
  getTicketsPrices();
});

function getTicketsPrices() {
  const TicketspriceContainer = document.querySelector(
    ".TicketspriceContainer"
  );
  var xhr = new XMLHttpRequest();
  const subscriber = { mail };

  const json_data = JSON.stringify(subscriber);
  const csrfToken = document.querySelector("#csrf_token615").value;
  xhr.open("POST", "/getTicketsPrices");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", csrfToken);

  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      TicketspriceContainer.innerHTML = "";

      for (var key in response.ticketPrice) {
        var temp =
          '<div class="ticketPriceHolder"><p>' +
          response.ticketPrice[key].type +
          "</p><p>" +
          response.ticketPrice[key].newPrice +
          "</p><p>" +
          response.ticketPrice[key].oldPrice +
          "</p><p>" +
          response.ticketPrice[key].dropBy +
          "</p><p>" +
          response.ticketPrice[key].amount +
          "</p></div>";

        TicketspriceContainer.innerHTML += temp;
      }
    }
  };
  xhr.send(json_data);
}
const ticktType = document.querySelector("#tktType");
const ticketstatus2 = document.querySelector("#ticketstatus2");
const newprice2 = document.querySelector("#newprice2");
const oldprice2 = document.querySelector("#oldprice2");
const totalTickets2 = document.querySelector("#totalTickets2");
const saveticketsPrice = document.querySelector("#saveTicketsPrice");

saveticketsPrice.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    newprice2.value == "" ||
    oldprice2.value == "" ||
    totalTickets2.value == ""
  ) {
    ticketstatus2.innerHTML = "PLEASE FILL ALL FIELDS";
  } else {
    saveTicketsPrice();
  }
});

function saveTicketsPrice() {
  const np = newprice2.value;
  const op = oldprice2.value;
  const amt = totalTickets2.value;
  const typ = ticktType.value;

  const ticketData = { np, op, amt, typ, mail };
  const jsonData = JSON.stringify(ticketData);
  const XHR3 = new XMLHttpRequest();
  const csrfToken = document.querySelector("#csrf_token2440").value;
  XHR3.open("POST", "/setTicketsPrice", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken);

  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      getTicketsPrices();
      ticketstatus2.innerHTML = XHR3.responseText;
    } else {
      ticketstatus2.innerHTML = "CAN'T PROCESS REQUEST";
    }
  });
  XHR3.send(jsonData);
}

function getTickets() {
  const TicketspriceContainer = document.querySelector(".HoldTicketsData");
  var xhr = new XMLHttpRequest();
  const subscriber = { mail };

  const json_data = JSON.stringify(subscriber);
  const csrfToken = document.querySelector("#csrf_token615").value;
  xhr.open("POST", "/getTickets");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", csrfToken);

  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      TicketspriceContainer.innerHTML = "";

      for (var key in response.ticket) {
        var temp =
          '<div class="ticketPriceHolder"><p>' +
          response.ticket[key].tickets_id +
          "</p><p>" +
          response.ticket[key].tickets_available +
          "</p><p>" +
          response.ticket[key].tickets_used +
          "</p><p>" +
          response.ticket[key].claim_tickets +
          "</p></div>";

        TicketspriceContainer.innerHTML += temp;
      }
    }
  };
  xhr.send(json_data);
}

window.addEventListener("DOMContentLoaded", () => {
  getTickets();
});

function getTicketsSearch(userName) {
  const TicketspriceContainer = document.querySelector(".HoldTicketsData");
  var xhr = new XMLHttpRequest();
  const subscriber = { mail, userName };

  const json_data = JSON.stringify(subscriber);
  const csrfToken = document.querySelector("#csrf_token619").value;
  xhr.open("POST", "/getTicketsSeach");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", csrfToken);

  xhr.onload = function () {
    if (xhr.status === 200) {
      TicketspriceContainer.innerHTML = "";
      if (xhr.responseText == "NO PLAYER WITH SUCH NAME") {
        ticketstatus2.innerHTML = "NO PLAYER WITH SUCH NAME";
      } else {
        var response = JSON.parse(xhr.responseText);
        ticketstatus2.innerHTML = "";
        for (var key in response.ticket) {
          var temp =
            '<div class="ticketPriceHolder"><p>' +
            response.ticket[key].tickets_id +
            "</p><p>" +
            response.ticket[key].tickets_available +
            "</p><p>" +
            response.ticket[key].tickets_used +
            "</p><p>" +
            response.ticket[key].claim_tickets +
            "</p></div>";

          TicketspriceContainer.innerHTML += temp;
        }
      }
    }
  };
  xhr.send(json_data);
}

const search2 = document.querySelector("#search2");
const search22 = document.querySelector("#search22");
search2.addEventListener("submit", (e) => {
  e.preventDefault();
  if (search22.value == "") {
    ticketstatus2.innerHTML = "PLEASE ENTER USERNAME TO SEARCH";
  } else {
    getTicketsSearch(search22.value);
  }
});

const search223 = document.querySelector("#search223");
const search23 = document.querySelector("#search23");
search23.addEventListener("submit", (e) => {
  e.preventDefault();
  if (search223.value == "") {
    ticketstatus2.innerHTML = "PLEASE ENTER USERNAME TO SEARCH";
  } else {
    subsubscriberSerch(search223.value);
  }
});

function subsubscriberSerch(tosearch) {
  var subscribersBody = document.getElementsByClassName("holdSubscriptions")[0];
  var xhr = new XMLHttpRequest();
  const subscriber = { tosearch, mail };

  const json_data = JSON.stringify(subscriber);
  const csrfToken = document.querySelector("#csrf_token6122").value;
  xhr.open("POST", "/subsubscriberSerch");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", csrfToken);

  xhr.onload = function () {
    if (xhr.status === 200) {
      if (xhr.responseText == "NO PLAYER WITH SUCH NAME") {
        substatus.innerHTML = xhr.responseText;
      } else if (xhr.responseText == "NO SUBSCRIPTION WITH THAT NAME") {
        substatus.innerHTML = xhr.responseText;
      } else {
        var response = JSON.parse(xhr.responseText);
        substatus.innerHTML = "";
        subscribersBody.innerHTML = "";
        for (var key in response.subcr) {
          var subscriberDate = new Date(response.subcr[key].subscriptionDate);

          var formattedDate = subscriberDate.toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          var temp =
            '<div class="subscriberHolder"><p>' +
            response.subcr[key].subscriptionId +
            "</p><p>" +
            response.subcr[key].subscriptionStatus +
            "</p><p>" +
            response.subcr[key].subscriptionCounter +
            "/5</p><p>" +
            response.subcr[key].subscriptionTimes +
            "</p><p>" +
            formattedDate +
            "</p></div>";

          subscribersBody.innerHTML += temp;
        }
      }
    }
  };
  xhr.send(json_data);
}

window.addEventListener("DOMContentLoaded", () => {
  getSubScrPrices();
});

function getSubScrPrices() {
  const TicketspriceContainer = document.querySelector(".TicketsubbContainer");
  var xhr = new XMLHttpRequest();
  const subscriber = { mail };

  const json_data = JSON.stringify(subscriber);
  const csrfToken = document.querySelector("#csrf_token6615").value;
  xhr.open("POST", "/getTicketsubscriPrices");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", csrfToken);

  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      TicketspriceContainer.innerHTML = "";
      for (var key in response.subticketPrice) {
        var temp =
          '<div class="ticketPriceHolder"><p>' +
          response.subticketPrice[key].newPrice +
          "</p><p>" +
          response.subticketPrice[key].oldPrice +
          "</p><p>" +
          response.subticketPrice[key].dropBy +
          "</p></div>";

        TicketspriceContainer.innerHTML += temp;
      }
    }
  };
  xhr.send(json_data);
}

const limiter = document.querySelector("#limiter");
const saveLimiter = document.querySelector("#saveLimiter");
const limitName = document.querySelector("#limitName");
const limStatus = document.querySelector("#limStatus");
saveLimiter.addEventListener("click", (e) => {
  e.preventDefault();
  if (limiter.value == "") {
    limStatus.innerHTML = "PLEASE FILL ALL FIELDS";
  } else {
    saveLimitation();
  }
});

function saveLimitation() {
  const lim = limiter.value;
  const lname = limitName.value;
  const limiterData = { lim, lname, mail };
  const jsonData = JSON.stringify(limiterData);
  const XHR3 = new XMLHttpRequest();
  const csrfToken = document.querySelector("#csrf_token24460").value;
  XHR3.open("POST", "/setLimitation", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken);

  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      limStatus.innerHTML = XHR3.responseText;
      getLimitations();
    } else {
      limStatus.innerHTML = "CAN'T PROCESS REQUEST";
    }
  });
  XHR3.send(jsonData);
}

window.addEventListener("DOMContentLoaded", () => {
  getLimitations();
});
function getLimitations() {
  const limContainer = document.querySelector(".limitationsContainer");
  var xhr = new XMLHttpRequest();
  const subscriber = { mail };

  const json_data = JSON.stringify(subscriber);
  const csrfToken = document.querySelector("#csrf_token66").value;
  xhr.open("POST", "/getLimitations");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", csrfToken);

  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      limContainer.innerHTML = "";
      for (var key in response.limresults) {
        var temp =
          '<div class="ticketPriceHolder"><p>' +
          response.limresults[key].limiter_name +
          "</p><p>" +
          response.limresults[key].limiter +
          "</p></div>";

        limContainer.innerHTML += temp;
      }
    }
  };
  xhr.send(json_data);
}



function sendRequest2() {
  const xhr = new XMLHttpRequest();
  const url = "/count_registerd";

  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const onlinePlayersCount = parseInt(xhr.responseText);
      document.querySelector("#registerd").innerHTML = onlinePlayersCount;
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      console.error(`Error: Status ${xhr.status}`);
    }
  };
  xhr.send();
}

sendRequest2();
setInterval(sendRequest2, 5000);