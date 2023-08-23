const loader = document.getElementsByClassName("loader")[0];
const main_body = document.getElementsByClassName("main_body")[0];
const buy_tokens = document.getElementsByClassName("buy_tokens")[0];
const notf = document.getElementsByClassName("notf")[0];
const options_notf = document.getElementsByClassName("options_notf")[0];
const options = document.getElementsByClassName("options")[0];
const logout = document.getElementsByClassName("logout")[0];
const closee1 = document.getElementsByClassName("closee")[0];
const closee2 = document.getElementsByClassName("closee")[1];
const closee3 = document.getElementsByClassName("closee")[2];
const closee4 = document.getElementsByClassName("closee")[3];
const closee5 = document.getElementsByClassName("closee")[4];
const close_comm = document.getElementsByClassName("closee6")[0];
const closee11 = document.getElementsByClassName("closee1")[0];
const options_player = document.getElementsByClassName("options_player")[0];
const options_logout = document.getElementsByClassName("options_logout")[0];
const leaderboard_hider =
  document.getElementsByClassName("leaderboard_hider")[0];
const main_container = document.getElementsByClassName("main_container")[0];
const settings_box = document.getElementsByClassName("settings_box")[0];
const settings_box2 = document.getElementsByClassName("settings_box")[1];
const settings_box3 = document.getElementsByClassName("settings_box")[2];
const settings_box4 = document.getElementsByClassName("settings_box")[3];
const settings_container =
  document.getElementsByClassName("settings_container")[0];
const settings_container2 =
  document.getElementsByClassName("settings_container")[1];
const settings_container3 =
  document.getElementsByClassName("settings_container")[2];
const settings_container4 =
  document.getElementsByClassName("settings_container")[3];
const ask = document.getElementsByClassName("ask")[0];
const ask_holder = document.getElementsByClassName("ask_holder")[0];
const options_logout_1_1 =
  document.getElementsByClassName("options_logout_1_1")[1];
const log_out_hider = document.getElementsByClassName("log_out_hider")[0];
const opt = screen.availHeight;
const opt2 = screen.availWidth;
const fontss = document.getElementById("fontss");
const font_changer = document.getElementsByClassName("typing-text")[0];
const manage_account_holder = document.getElementsByClassName(
  "manage_account_holder"
)[0];
const manage_account = document.getElementsByClassName("manage_account")[0];
const changee = document.getElementsByClassName("change")[0];
const change_pass = document.getElementsByClassName("change_pass")[0];
const manage_close1 = document.getElementsByClassName("manage_close")[0];
const manage_close2 = document.getElementsByClassName("manage_close")[1];
const manage_close3 = document.getElementsByClassName("manage_close")[2];
const write_comment = document.getElementsByClassName("write_comment")[0];
const comment_b = document.getElementsByClassName("write_coment_holder")[0];
const open_comm = document.getElementById("open_comm");
const options_comments = document.getElementsByClassName("options_comments")[0];
const comment_body = document.getElementsByClassName("comment_body")[0];
const leaderboard = (document.getElementsByClassName(
  "leaderboard_container"
)[0].style.height = opt - 140 + "px");

const userImage = document.getElementsByClassName("ico")[0]
window.addEventListener("load", function(){
  userImage.width = 300
})

main_container.style.height = opt - 120 + "px";
settings_container.style.height = opt - 150 + "px";
settings_container2.style.height = opt - 150 + "px";
settings_container3.style.height = opt - 150 + "px";
settings_container4.style.height = opt - 150 + "px";

open_comm.addEventListener("click", function () {
  options_comments.style.height = opt - 160 + "px";
  comment_body.style.maxHeight = opt - 200 + "px";
  options.style.display = "none";
  options_player.style.height = "0";
  options_player.style.border = "none";
  leaderboard_hider.style.width = "0";
  options_logout.style.width = "0";
  options_notf.style.height = 0;
  t_overview.innerHTML = "";
  st_tickets.innerHTML = "";
  st_tickets1.innerHTML = "";
  ep_tickets.innerHTML = "";
  ep_tickets1.innerHTML = "";
  lg_tickets.innerHTML = "";
  lg_tickets1.innerHTML = "";
});

close_comm.addEventListener("click", function () {
  options_comments.style.height = 0;
  t_overview.innerHTML = "";
  st_tickets.innerHTML = "";
  st_tickets1.innerHTML = "";
  ep_tickets.innerHTML = "";
  ep_tickets1.innerHTML = "";
  lg_tickets.innerHTML = "";
  lg_tickets1.innerHTML = "";
});

settings_box.addEventListener("click", function () {
  settings_container.style.width = "27%";
  settings_container2.style.width = 0;
  settings_container3.style.width = 0;
  settings_container4.style.width = 0;
});

settings_box2.addEventListener("click", function () {
  settings_container2.style.width = "27%";
  settings_container.style.width = 0;
  settings_container3.style.width = 0;
  settings_container4.style.width = 0;
});

settings_box3.addEventListener("click", function () {
  settings_container3.style.width = "27%";
  settings_container.style.width = 0;
  settings_container2.style.width = 0;
  settings_container4.style.width = 0;
});

settings_box4.addEventListener("click", function () {
  settings_container4.style.width = "27%";
  settings_container.style.width = 0;
  settings_container2.style.width = 0;
  settings_container3.style.width = 0;
});

setInterval(function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getFontendCodes");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      for (var key in response.codes) {
        if (response.codes[key].FrontendId == 5747) {
          loader.style.height = "0vh";
          loader.style.opacity = "0";
          main_body.style.display = "block";
        } else {
          loader.style.height = "100vh";
          loader.style.opacity = "1";
          main_body.style.display = "none";
        }
      }
    } else {
      console.log("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
}, 1000);

  document.getElementById("leaderb").addEventListener("click", function () {
    
    document.getElementsByClassName("leaderboard_container2")[0].style.width =
      "100%";
  });

buy_tokens.addEventListener("click", function () {
  options.style.display ="block";
  leaderboard_hider.style.width = "100%";
  options_notf.style.height = 0;
  options_player.style.height = 0;
  options_player.style.border = "none";
  options_logout.style.width = 0;
  settings_container.style.width = 0;
  settings_container2.style.width = 0;
  settings_container3.style.width = 0;
  settings_container4.style.width = 0;
  options_comments.style.height = 0;
  typeText1(t_overview, t_overview_text);
  typeText1(st_tickets, st_tickets_text);
  typeText1(st_tickets1, st_tickets_text1);
  typeText1(ep_tickets, ep_tickets_text);
  typeText1(ep_tickets1, ep_tickets_text1);
  typeText1(lg_tickets, lg_tickets_text);
  typeText1(lg_tickets1, lg_tickets_text1);
});

notf.addEventListener("click", function () {
  options_notf.style.height = opt - 110 + "px";
  options.style.display = "none";
  options_player.style.height = "0";
  leaderboard_hider.style.width = "0";
  options_player.style.border = "none";
  options_logout.style.width = "0";
  options_comments.style.height = 0;
  t_overview.innerHTML = "";
  st_tickets.innerHTML = "";
  st_tickets1.innerHTML = "";
  ep_tickets.innerHTML = "";
  ep_tickets1.innerHTML = "";
  lg_tickets.innerHTML = "";
  lg_tickets1.innerHTML = "";
});

logout.addEventListener("click", function () {
  options_logout.style.width = "20%";
  log_out_hider.style.width = "100%";
  options_notf.style.height = "0";
  options_comments.style.height = 0;
  options.style.display = "none";
  leaderboard_hider.style.width = "0";
  options_player.style.height = 0;
  options_player.style.border = "none";
  options_comments.style.height = 0;
  t_overview.innerHTML = "";
  st_tickets.innerHTML = "";
  st_tickets1.innerHTML = "";
  ep_tickets.innerHTML = "";
  ep_tickets1.innerHTML = "";
  lg_tickets.innerHTML = "";
  lg_tickets1.innerHTML = "";
});

options_logout_1_1.addEventListener("click", function () {
  options_logout.style.width = 0;
  log_out_hider.style.width = 0;
  t_overview.innerHTML = "";
  st_tickets.innerHTML = "";
  st_tickets1.innerHTML = "";
  ep_tickets.innerHTML = "";
  ep_tickets1.innerHTML = "";
  lg_tickets.innerHTML = "";
  lg_tickets1.innerHTML = "";
});

function openManageAccount() {
  options_player.style.height = "370px";
  options_player.style.border = "1px solid #21262d";
  options.style.display = "none";
  options_logout.style.width = "0";
  options_notf.style.height = "0";
  leaderboard_hider.style.width = "0";
  options_comments.style.height = 0;
  t_overview.innerHTML = "";
  st_tickets.innerHTML = "";
  st_tickets1.innerHTML = "";
  ep_tickets.innerHTML = "";
  ep_tickets1.innerHTML = "";
  lg_tickets.innerHTML = "";
  lg_tickets1.innerHTML = "";
}

closee1.addEventListener("click", function () {
  options.style.display = "none";
  leaderboard_hider.style.width = "0";
  t_overview.innerHTML = "";
  st_tickets.innerHTML = "";
  st_tickets1.innerHTML = "";
  ep_tickets.innerHTML = "";
  ep_tickets1.innerHTML = "";
  lg_tickets.innerHTML = "";
  lg_tickets1.innerHTML = "";
});

closee2.addEventListener("click", function () {
  settings_container.style.width = 0;
});
closee3.addEventListener("click", function () {
  settings_container2.style.width = 0;
});
closee4.addEventListener("click", function () {
  settings_container3.style.width = 0;
});
closee5.addEventListener("click", function () {
  settings_container4.style.width = 0;
});
ask.addEventListener("click", function () {
  ask_holder.style.width = "100%";
});
closee11.addEventListener("click", function () {
  ask_holder.style.width = "0%";
});

for (x = 14; x <= 28; x += 2) {
  fontss.innerHTML += "<option>" + x + "px" + "</option>";
}

fontss.addEventListener("change", function () {
  font_changer.style.fontSize = fontss.value;
});

manage_account.addEventListener("click", function () {
  manage_account_holder.style.width = "23%";
  manage_account_holder.style.border = "1px solid #21262d";
});
changee.addEventListener("click", function () {
  change_pass.style.maxHeight = "300px";
  change_pass.style.opacity = "1";
});

manage_close3.addEventListener("click", function () {
  options_player.style.height = "0";
  options_player.style.border = "none";
  manage_account_holder.style.width = "0";
  manage_account_holder.style.border = "none";
});
manage_close1.addEventListener("click", function () {
  manage_account_holder.style.width = "0";
  manage_account_holder.style.border = "none";
});

manage_close2.addEventListener("click", function () {
  change_pass.style.maxHeight = 0;
  change_pass.style.opacity = 0;
});

write_comment.addEventListener("click", function () {
  comment_b.style.maxHeight = "300px";
});

document
  .getElementsByClassName("cont_btn")[0]
  .addEventListener("click", function () {
    resetGame();
    tips.style.display = "none";
    tryAgainBtn.style.display = "block";
  });

  document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === "hidden") {
      // User switched tabs or minimized the window
      // Perform actions like pausing videos, animations, etc.
    } else {
      window.location.reload();
    }
  });
  