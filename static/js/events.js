const eventName = document.querySelector("#eventName");
const eventType = document.querySelector("#eventType");
const nameOfE = document.querySelector("#nameOfE");
const nameOfE2 = document.querySelector("#nameOfE2");
const typeOfE = document.querySelector("#typeOfE");
const setseen3 = document.getElementsByClassName("setseen")[2];

setseen3.addEventListener("click", function () {
  welcomeUserHolder3.style.display = "none";
  document.querySelector(".bodyCover").style.width = "0%";
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
  document.querySelector(".bodyCover").style.width = "100%";
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

// Trigger the function immediately after defining it to send the initial status
sendUserStatus();

// Add the event listener for visibility change
document.addEventListener("visibilitychange", async function () {
  const onlineStatus =
    document.visibilityState === "visible" ? "online" : "offline";

  const data = {
    userId: id,
    status: onlineStatus,
  };

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
});

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
  const url = '/count_online_players';

  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const onlinePlayersCount = parseInt(xhr.responseText);
      document.querySelector('#online').innerHTML = onlinePlayersCount;
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      console.error(`Error: Status ${xhr.status}`);
    }
  };
  xhr.send();
}

sendRequest(); 
setInterval(sendRequest, 3000); 
