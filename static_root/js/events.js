const eventName = document.querySelector("#eventName");
const eventType = document.querySelector("#eventType");
const nameOfE = document.querySelector("#nameOfE");
const nameOfE2 = document.querySelector("#nameOfE2");
const typeOfE = document.querySelector("#typeOfE");
const setseen2 = document.getElementsByClassName("setseen")[1];
const setseen3 = document.getElementsByClassName("setseen")[4];
const setseen4 = document.getElementsByClassName("setseen")[2];
const setseen5 = document.getElementsByClassName("setseen")[3];
const setseen6 = document.getElementsByClassName("setseen6")[0];
let isClicked = false;
let isClicked2 = false;
let isClicked3 = false;
const eventRules = document.querySelector(".eventRules");
const eventPrizes = document.querySelector(".eventPrizes");

const termsLink = document.getElementById("termsLink");
const linkPolicy = document.getElementById("linkPolicy");
const toPolicy = document.getElementsByClassName("cancel-btn2")[1];
function redirectToTerms() {
  window.location.href = termsLink.href;
}
function redirectTopolicy() {
  window.location.href = linkPolicy.href;
}

setseen4.addEventListener("click", function (event) {
  redirectToTerms();
});

toPolicy.addEventListener("click", function () {
  redirectTopolicy();
});
setseen2.addEventListener("click", () => {
  if (isClicked) {
    eventPrizes.style.display = "block";
    setseen2.innerHTML = "event rules";
    document.getElementById("eventTitle").innerHTML = "EVENT REWARDS";
    eventRules.style.display = "none";
  } else {
    setseen2.innerHTML = "Monetary";
    document.getElementById("eventTitle").innerHTML =
      "NEW EVENT HAS JUST STARTED !!!";
    eventRules.style.display = "block";
    eventPrizes.style.display = "none";
  }
  isClicked = !isClicked;
});

document.getElementsByClassName("setseenn")[0].addEventListener("click", () => {
  if (isClicked2) {
    eventPrizes.style.display = "block";
    document.getElementsByClassName("setseenn")[0].innerHTML = "event rules";
    document.getElementById("eventTitle").innerHTML =
      "REWARDS ARE GIVEN AT THE END OF EVENT";
    eventRules.style.display = "none";
    quest.style.display = "none";
    monetary.style.display = "block";
  } else {
    document.getElementsByClassName("setseenn")[0].innerHTML = "Monetary";
    document.getElementById("eventTitle").innerHTML =
      "NEW EVENT HAS JUST STARTED !!!";
    eventRules.style.display = "block";
    eventPrizes.style.display = "none";
  }
  isClicked2 = !isClicked2;
});

setseen3.addEventListener("click", () => {
  welcomeUserHolder3.style.display = "none";
  document.querySelector(".bodyCover2").style.width = "0%";
});
setseen5.addEventListener("click", () => {
  welcomeUserHolder3.style.display = "none";
  document.querySelector(".bodyCover2").style.width = "0%";
  setTimeout(customerCare, 800);
});
setseen6.addEventListener("click", () => {
  document.querySelector(".spinnerContainer").style.display = "none";
  callWinnerOff();
  setTimeout(customerCare, 800);
});

const welcomeUserHolder3 =
  document.getElementsByClassName("welcomeUserHolder")[2];

const event1RulesAndTips = [
  "Participants must have a valid ticket to enter the event. Tickets can be purchased through the platform.",
  "The 'Vocab Vault Showdown' consists of two challenges: 'Word Jumble' and 'Technical Terminology'.",
  "Rank High, Win Big: The top performers on the leaderboard at the end of the event may be eligible for exciting prizes!",
  "In the 'Word Jumble' challenge, the objective is to type complex words that are randomly jumbled and presented to you.",
  "Your WPM is important in 'Word Jumble', but accuracy is equally crucial.",
  "Each jumbled word challenge has a time limit.",
  "There will be no hints or definitions provided for the jumbled words in 'Word Jumble'. Rely on your vocabulary and word-solving skills.",
  "In the 'Technical Terminology' challenge, the objective is to test your knowledge and typing skills by typing challenging technical terms from various fields such as medicine, science, or law.",
  "Pay close attention to spelling and precision in 'Technical Terminology'. Technical terminology requires accuracy.",
  "Brief definitions of the technical terms may be provided to help you understand the word's meaning in 'Technical Terminology'. However, the primary challenge is to spell it correctly.",
  "Scoring for each challenge is based on both words per minute (WPM) and accuracy. Your final score is a combination of these factors.",
  "Accuracy is determined by the ratio of correctly typed words to total words typed.",
  "Any violation of the rules, including cheating or unsportsmanlike conduct, will result in disqualification from the event.",
  "Be fair and respectful to fellow participants. Cheating or attempting to exploit the challenges in any way is strictly prohibited.",
  "Above all, have fun and enjoy the challenge! These events are designed to improve your vocabulary and typing skills while having a great time with fellow word enthusiasts.",
];

const lexiLympicsRulesAndTips = [
  "Participation Eligibility: To enter the 'Advanced LexiLympics,' participants must have a valid event ticket, which can be acquired through the platform.",

  "Respectful Conduct: Maintain a respectful and sportsmanlike attitude throughout the event. Any form of offensive or inappropriate behavior will result in immediate disqualification.",

  "Event Format: The 'Advanced LexiLympics' consists of two exciting challenges: 'Technical Terminology' and 'Multilingual Marvel.' Participants can choose to compete in either or both challenges.",

  "'Technical Terminology' Challenge: In this challenge, participants must type complex terms from specialized fields accurately and swiftly. Scoring is based on a combination of words per minute (WPM) and accuracy.",

  "'Multilingual Marvel' Challenge: In this challenge, participants will type words from various languages. Scoring follows the same pattern as the 'Technical Terminology' challenge, taking into account WPM and accuracy.",

  "Scoring and Ranking: Participants will be ranked based on their combined performance in both challenges. The highest-scoring participants will earn top positions on the leaderboard.",

  "Prizes: Top performers in the 'Advanced LexiLympics' may receive exciting prizes, including certificates of achievement, virtual badges, or other rewards, based on event rules.",

  "Fair Play: Fair play and respectful conduct are paramount. Cheating or unsportsmanlike behavior will lead to disqualification.",

  "Enjoy the Challenge: Above all, have fun and embrace the linguistic adventure! The 'Advanced LexiLympics' is an opportunity to celebrate language diversity, precision, and knowledge in a competitive yet friendly environment.",
];

const output = document.getElementsByClassName("welcomeUserB2")[0];

function callEvent(arryofRules) {
  welcomeUserHolder3.style.display = "block";
  document.querySelector(".bodyCover2").style.width = "100%";
  for (const xx of arryofRules) {
    var tempp =
      '<div class="ruleAndpic"><div style="margin-right: 5px"><img src="/images/right-arrow.png" style="width: 15px; height: 15px"/></div><p>' +
      xx +
      "</p> </div>";
    output.innerHTML += tempp;
  }
}

const event1f = setInterval(function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getEvent1Code");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      for (var key in response.codes) {
        if (response.codes[key].eventId == 185747) {
        } else {
          callEvent(event1RulesAndTips);
          clearInterval(event1f);
          eventName.innerHTML = response.codes[key].name;
          nameOfE.innerHTML = response.codes[key].name;
          nameOfE2.innerHTML = response.codes[key].name;
          eventType.innerHTML = response.codes[key].type;
          typeOfE.innerHTML = response.codes[key].type;
        }
      }
    } else {
      console.log("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
}, 3000);

const event2f = setInterval(function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getEvent2Code");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      for (var key in response.codes) {
        if (response.codes[key].eventId == 185747) {
        } else {
          callEvent(lexiLympicsRulesAndTips);
          clearInterval(event2f);
          eventName.innerHTML = response.codes[key].name;
          nameOfE.innerHTML = response.codes[key].name;
          nameOfE2.innerHTML = response.codes[key].name;
          eventType.innerHTML = response.codes[key].type;
          typeOfE.innerHTML = response.codes[key].type;
        }
      }
    } else {
      console.log("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
}, 3000);

async function sendUserStatus() {
  const onlineStatus =
    document.visibilityState === "visible" ? "online" : "offline";

  const data = {
    userId: id,
    status: onlineStatus,
  };

  try {
    const csrfToken = document.querySelector("#csrf_token0").value;
    const apiUrl = `/update_user_status?id=${id}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log("User status sent to the server:", result);
    } else {
      console.error(
        "Error sending user status. Server returned:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error sending user status:", error);
  }
}

sendUserStatus();
/*
document.addEventListener("visibilitychange", async function () {
  const onlineStatus =
    document.visibilityState === "visible" ? "online" : "offline";

  const data = {
    userId: id,
    status: onlineStatus,
  };

  try {
    if (document.visibilityState === "hidden") {
      console.log(
        `Sending user status (${onlineStatus}) to the server offline...`
      );
      await simulateDatabaseUpdate(false, `/update_user_status?id=${id}`, data);
    } else {
      console.log(
        `Sending user status (${onlineStatus}) to the server online...`
      );
      await simulateDatabaseUpdate(true, `/update_user_status?id=${id}`, data);
    }
  } catch (error) {
    console.error("An error occurred while updating the user status:", error);
  }
});
*/
window.addEventListener("beforeunload", async function () {
  const onlineStatus = "offline";
  const data = {
    userId: id,
    status: onlineStatus,
  };

  console.log(
    `Sending user status (${onlineStatus}) before leaving the page...`
  );

  try {
    const csrfToken = document.querySelector("#csrf_token0").value;
    const apiUrl = `/update_user_status?id=${id}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log("User status sent before leaving the page:", result);
    } else {
      console.error(
        "Error sending user status before leaving the page. Server returned:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error sending user status before leaving the page:", error);
  }
});

function sendRequest() {
  const xhr = new XMLHttpRequest();
  const url = "/count_online_players";

  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const onlinePlayersCount = parseInt(xhr.responseText);
      document.querySelector("#online").innerHTML = onlinePlayersCount;
      document.querySelector(".online").innerHTML = onlinePlayersCount;
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      console.error(`Error: Status ${xhr.status}`);
    }
  };
  xhr.send();
}

sendRequest();
setInterval(sendRequest, 3000);

document.addEventListener("DOMContentLoaded", () => {
  getRewards();
  getQuest();
});

function getRewards() {
  const viewPrize1 = document.getElementsByClassName("viewPrize1")[0];
  var xhr = new XMLHttpRequest();
  const mtry = { id };

  const json_data = JSON.stringify(mtry);
  const csrfToken = document.querySelector("#csrf_token66").value;
  xhr.open("POST", "/getPrizes");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", csrfToken);

  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      viewPrize1.innerHTML = "";
      for (var key in response.monetary) {
        var temp =
          '<div class="viewPrizeA"> <h4><i class="fa fa-trophy tickettss tpy"></i>&nbsp;' +
          response.monetary[key].title +
          "</h4><ul><li>" +
          response.monetary[key].des1 +
          "</li><li>" +
          response.monetary[key].des2 +
          "</li></ul></div>";

        viewPrize1.innerHTML += temp;
      }
    }
  };
  xhr.send(json_data);
}

function getQuest() {
  const viewPrize1 = document.getElementsByClassName("viewPrize1")[1];
  var xhr = new XMLHttpRequest();
  const mtry = { id };
  const json_data = JSON.stringify(mtry);
  const csrfToken = document.querySelector("#csrf_token67").value;
  xhr.open("POST", "/getQuest");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", csrfToken);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      viewPrize1.innerHTML = "";
      for (var key in response.quest) {
        var temp =
          '<div class="viewPrizeA quest"><div class="questText"><p>' +
          response.quest[key].des2 +
          '</p></div><div class="questImag"><img id="QuestImg" src="/images/' +
          response.quest[key].pic +
          '"></div></div>';

        viewPrize1.innerHTML += temp;
      }
    }
  };
  xhr.send(json_data);
}

const eventEndDivision1 =
  document.getElementsByClassName("eventEndDivision")[0];
const eventEndDivision2 =
  document.getElementsByClassName("eventEndDivision")[1];

document.getElementsByClassName("setseen9")[0].addEventListener("click", () => {
  if (isClicked3) {
    document.getElementsByClassName("setseen9")[0].innerHTML = "my results";
    eventEndDivision1.style.display = "block";
    eventEndDivision2.style.display = "none";
  } else {
    document.getElementsByClassName("setseen9")[0].innerHTML = "Winners";
    eventEndDivision1.style.display = "none";
    eventEndDivision2.style.display = "block";
  }
  isClicked3 = !isClicked3;
});
