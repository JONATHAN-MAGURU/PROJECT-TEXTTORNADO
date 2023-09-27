let body_height = screen.availHeight;
const body = document.getElementById("home");
const nav = document.getElementsByClassName("left_side_nav")[0];
const top_nav = document.getElementsByClassName("top_side_nav")[0];
const settings = document.getElementsByClassName("settings")[0];
const clo = document.getElementsByClassName("clo")[0];
const ope = document.getElementsByClassName("ope")[0];
const admin_opt = document.getElementById("admins");
const user_opt = document.getElementById("users");
const comp_opt = document.getElementById("compt");
const test_opt = document.getElementById("test");
const res_opt = document.getElementById("res");
const pay_opt = document.getElementById("pay");
const mail_opt = document.getElementById("mail");
const leader_opt = document.getElementById("leader");
const analy_opt = document.getElementById("analy");
const game_opt = document.getElementById("game");
const secu_opt = document.getElementById("secu");
const repo_opt = document.getElementById("repo");
const sp = document.getElementById("sp");
const supp_opt = document.getElementById("supp");
const savedStatus = document.getElementById("savedStatus");
const clear_btn = document.getElementById("clear_btn");
const nav_options_hider =
  document.getElementsByClassName("nav_options_hider")[0];
const notifications = document.getElementsByClassName("notifications")[0];
const messages = document.getElementsByClassName("messages")[0];
const notff_hider = document.getElementById("notff");
const msgg_hider = document.getElementById("msgg");
document.getElementsByClassName("nav_options_container_A")[0].style.height =
  body_height - 180 + "px";
document.getElementsByClassName("nav_options_container_B")[0].style.height =
  body_height - 180 + "px";
document.getElementsByClassName("nav_options_container_A")[0].style.width =
  "29%";
document.getElementsByClassName("nav_options_container_B")[0].style.width =
  "70%";
document.getElementsByClassName("nav_options_container_A")[1].style.height =
  body_height - 180 + "px";
document.getElementsByClassName("nav_options_container_B")[1].style.height =
  body_height - 180 + "px";
const textarea = document.getElementById("textarea");
const typing_test = document.getElementById("typing_test");
const delete_ps = document.getElementsByClassName("delete");
const typing_test_p = document.getElementsByClassName("typing_test_p");
const checkedArray = [];
const checkedArray2 = [];
const toEdit = [];
const containerAction1 = document.getElementsByClassName("containerAction")[0];
const containerAction = document.getElementsByClassName("containerAction")[1];
const majorCheck = document.getElementById("majorCheck");
const majorCheck2 = document.getElementById("majorCheck2");

for (const delete_p of delete_ps) {
  delete_p.style.display = "none";
}

const savedStatusWarn = setInterval(function () {
  savedStatus.innerHTML = "";
}, 6000);

const typing_test_p_array = Array.from(typing_test_p);
typing_test_p_array.forEach((typing_test_p2, index) => {
  typing_test_p2.addEventListener("mouseover", () => {
    console.log("Index of typing_test_p2:", index);
    for (const delete_p of delete_ps) {
      delete_p.style.display = "inline-block";
    }
  });
});

for (const typing_test_p2 of typing_test_p) {
  typing_test_p2.addEventListener("mouseout", () => {
    for (const delete_p of delete_ps) {
      delete_p.style.display = "none";
    }
  });
}

const textareaUpdate = setInterval(() => {
  let x = textarea.value;
  let y = x.split(" ");
  document.getElementById("amoutW").textContent = x.length;
  document.getElementById("amoutC").textContent = y.length - 1;
}, 10);

typing_test.addEventListener("submit", function (event) {
  event.preventDefault();
  let textarea2 = textarea.value;
  const typing_words = { textarea2 };
  const json_data_4 = JSON.stringify(typing_words);
  const XHR3 = new XMLHttpRequest();
  const csrfToken3 = document.querySelector("#csrf_token2").value;
  XHR3.open("POST", "/typing_tests", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken3);
  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      savedStatus.innerHTML = XHR3.responseText;
      checkedArray.splice(0);
      getTypingTests();
    } else {
      savedStatus.innerHTML = "something went wrong !!!";
    }
  });
  XHR3.send(json_data_4);
});
clear_btn.addEventListener("click", function () {
  textarea.value = "";
  document.getElementById("amoutW").innerHTML = "";
  document.getElementById("amoutC").innerHTML = "";
});
const lengthOfArryUpdater = setInterval(function () {
  if (checkedArray.length == 0) {
    containerAction.style.width = "0%";
    containerAction.style.padding = "0";
    majorCheck.checked = false;
  }
}, 10);
const lengthOfArryUpdater2 = setInterval(function () {
  if (checkedArray2.length == 0) {
    containerAction1.style.width = "0%";
    containerAction1.style.padding = "0";
    majorCheck2.checked = false;
  }
}, 10);

function getTypingTests() {
  document.getElementById("typeOfparagraphs").innerText = "SAVED TESTS :";
  document.getElementById("edit").style.display = "block";
  const xhrttd1 = new XMLHttpRequest();
  xhrttd1.open("GET", "/get_typing_tests");
  xhrttd1.onload = function () {
    if (xhrttd1.status === 200) {
      var response = JSON.parse(xhrttd1.responseText);
      var test_typing_p = document.getElementsByClassName(
        "nav_options_container_B"
      )[1];
      test_typing_p.innerHTML = "";

      sp.innerHTML = response.Typing_testings.length;
      for (var key in response.Typing_testings) {
        var temp =
          '<div class="typing_test_p"><label class="custom-checkbox"><input type="checkbox" data-id="' +
          response.Typing_testings[key].test_id +
          '" data-test="' +
          response.Typing_testings[key].test +
          '"><span class="checkmark"></span></label>' +
          response.Typing_testings[key].test +
          '<p style="display:none">' +
          response.Typing_testings[key].test_id +
          "</p></div>";
        test_typing_p.innerHTML += temp;
      }
    } else {
      console.log("Request failed. Returned status of " + xhrttd1.status);
    }

    const checkboxes = test_typing_p.querySelectorAll('input[type="checkbox"]');
    majorCheck.addEventListener("change", function () {
      checkedArray.splice(0);

      if (majorCheck.checked) {
        for (const check of checkboxes) {
          check.checked = true;
          checkedArray.push(check.dataset.id);
        }
      } else {
        for (const check of checkboxes) {
          check.checked = false;
        }
      }

      document.getElementById("numOfChecked").innerHTML =
        checkedArray.length + " SELECTED";
    });

    for (const check of checkboxes) {
      check.addEventListener("change", () => {
        if (check.checked) {
          checkedArray.push(check.dataset.id);
          toEdit.push(check.dataset.test);
        } else {
          const index = checkedArray.indexOf(check.dataset.id);
          const index2 = toEdit.indexOf(check.dataset.test);
          if (index !== -1) {
            checkedArray.splice(index, 1);
          }
          if (index2 !== -1) {
            toEdit.splice(index2, 1);
          }
        }
        document.getElementById("numOfChecked").innerHTML =
          checkedArray.length + " SELECTED";
        containerAction.style.width = checkedArray.length > 0 ? "50%" : "0%";
        containerAction.style.padding = checkedArray.length > 0 ? "10px" : "0";
      });
    }
  };
  xhrttd1.send();
}
getTypingTests();

document.getElementById("edit").addEventListener("click", function () {
  showEditor();
  for (const edit of toEdit) {
    document.getElementById("textarea2").value = edit;
  }
});

function getVAriants() {
  document.getElementById("typingTests").style.display = "block";
  document.getElementById("getVAriants").style.display = "none";
  document.getElementById("edit").style.display = "none";
  document.getElementById("typeOfparagraphs").innerText = "SAVED VARIANTS :";
  const xhrttd1 = new XMLHttpRequest();
  xhrttd1.open("GET", "/get_typing_variants");
  xhrttd1.onload = function () {
    if (xhrttd1.status === 200) {
      var response = JSON.parse(xhrttd1.responseText);
      var test_typing_p = document.getElementsByClassName(
        "nav_options_container_B"
      )[1];
      test_typing_p.innerHTML = "";

      sp.innerHTML = response.variant_paragraphs.length;
      for (var key in response.variant_paragraphs) {
        var temp =
          '<div class="typing_test_p"><label class="custom-checkbox"><input type="checkbox" data-id="' +
          response.variant_paragraphs[key].variant_id +
          '"><span class="checkmark"></span></label>' +
          response.variant_paragraphs[key].variant_p +
          '<p style="display:none">' +
          response.variant_paragraphs[key].variant_id +
          "</p></div>";
        test_typing_p.innerHTML += temp;
      }
    } else {
      console.log("Request failed. Returned status of " + xhrttd1.status);
    }
    const checkboxes = test_typing_p.querySelectorAll('input[type="checkbox"]');
    majorCheck.addEventListener("change", function () {
      checkedArray.splice(0);

      if (majorCheck.checked) {
        for (const check of checkboxes) {
          check.checked = true;
          checkedArray.push(check.dataset.id);
        }
      } else {
        for (const check of checkboxes) {
          check.checked = false;
        }
      }
      document.getElementById("numOfChecked").innerHTML =
        checkedArray.length + " SELECTED";
    });

    for (const check of checkboxes) {
      check.addEventListener("change", () => {
        if (check.checked) {
          checkedArray.push(check.dataset.id);
        } else {
          const index = checkedArray.indexOf(check.dataset.id);
          if (index !== -1) {
            checkedArray.splice(index, 1);
          }
        }

        document.getElementById("numOfChecked").innerHTML =
          checkedArray.length + " SELECTED";
        containerAction.style.width = checkedArray.length > 0 ? "50%" : "0%";
        containerAction.style.padding = checkedArray.length > 0 ? "10px" : "0";
      });
    }
  };
  xhrttd1.send();
}

document
  .getElementsByClassName("deleteBtn")[0]
  .addEventListener("click", function () {
    if (document.getElementById("typingTests").style.display == "none") {
      var deleteDestination = "/delete_paragraphs";
    } else {
      var deleteDestination = "/delete_variants";
    }
    const paragraphToDelete = { checkedArray };
    const paragraphToDeleteJson = JSON.stringify(paragraphToDelete);
    const xhrttd2 = new XMLHttpRequest();
    const csrfToken3 = document.querySelector("#csrf_token2").value;
    xhrttd2.open("POST", deleteDestination, true);
    xhrttd2.setRequestHeader("Content-Type", "application/json");
    xhrttd2.setRequestHeader("X-CSRFToken", csrfToken3);
    xhrttd2.addEventListener("load", function () {
      if (xhrttd2.status === 200 && xhrttd2.readyState === 4) {
        savedStatus.innerHTML = xhrttd2.responseText;
        checkedArray.splice(0);
        hideDialogBox();
        if (document.getElementById("typingTests").style.display == "none") {
          getTypingTests();
        } else {
          getVAriants();
        }
      } else {
        savedStatus.innerHTML = "something went wrong !!!";
      }
    });
    xhrttd2.send(paragraphToDeleteJson);
  });

document.getElementById("typingTests").addEventListener("click", function () {
  document.getElementById("typingTests").style.display = "none";
  document.getElementById("getVAriants").style.display = "block";
  document.getElementById("typeOfparagraphs").innerText = "SAVED PARAGRAPHS :";
});

function showDialogBox(dialogHead, dialogBody) {
  document.getElementsByClassName("nav_options_container_C")[0].style.display =
    "block";
  document.getElementsByClassName("dialogCover")[1].style.display = "block";
  document.getElementById("dialogaHead").textContent = dialogHead;
  document.getElementById("dialogBody").textContent = dialogBody;
}
function hideDialogBox() {
  document.getElementsByClassName("nav_options_container_C")[0].style.display =
    "none";
  document.getElementsByClassName("dialogCover")[1].style.display = "none";
}

function showEditor() {
  document.getElementsByClassName("dialogCover")[1].style.display = "block";
  document.getElementsByClassName("editor")[0].style.display = "block";
}
function hideEditor() {
  document.getElementsByClassName("dialogCover")[1].style.display = "none";
  document.getElementsByClassName("editor")[0].style.display = "none";
}

showUserData = () => {
  document.getElementsByClassName("userInfoHolder")[0].style.display = "block";
  document.getElementsByClassName("dialogCover")[0].style.display = "block";
};

hideUserData = () => {
  document.getElementsByClassName("userInfoHolder")[0].style.display = "none";
  document.getElementsByClassName("dialogCover")[0].style.display = "none";
};

document
  .getElementsByClassName("deleteBtn")[1]
  .addEventListener("click", function () {
    if (document.getElementById("typingTests").style.display == "none") {
      showDialogBox(
        "Delete these test paragraphs?",
        "Are you sure you want to dalete these paragraphs from database?"
      );
    } else {
      showDialogBox(
        "Delete these variants?",
        "Are you sure you want to dalete these variant paragraphs from database?"
      );
    }
  });

const denieEdit = setInterval(() => {
  const editButton = document.getElementById("edit");
  const checkedArrayLength = checkedArray.length;

  if (checkedArrayLength !== 1) {
    editButton.style.cursor = "not-allowed";
    editButton.disabled = true;
  } else {
    editButton.style.cursor = "pointer";
    editButton.disabled = false;
  }
}, 100);

document.getElementById("cancel").addEventListener("click", function () {});

document
  .getElementById("typing_test_edit")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const toEditId = checkedArray[0];
    const toEditText = document.getElementById("textarea2").value;
    const editingWords = { toEditId, toEditText };

    try {
      const response = await fetch("/editing_tests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": document.querySelector("#csrf_token2").value,
        },
        body: JSON.stringify(editingWords),
      });

      if (response.status === 200 && response.ok) {
        const savedStatus = document.getElementById("savedStatus");
        savedStatus.innerHTML = await response.text();
        getTypingTests();
        checkedArray.splice(0);
        hideEditor();
      } else {
        throw new Error("Something went wrong !!!");
      }
    } catch (error) {
      const savedStatus = document.getElementById("savedStatus");
      savedStatus.innerHTML = "Something went wrong !!!";
      console.error(error);
    }
  });

function getUser() {
  const xhrttd1 = new XMLHttpRequest();
  xhrttd1.open("GET", "/getUsers");
  xhrttd1.onload = function () {
    if (xhrttd1.status === 200) {
      var response = JSON.parse(xhrttd1.responseText);
      var userHold = document.getElementsByClassName(
        "nav_options_container_B"
      )[0];
      userHold.innerHTML = "";
      for (var key in response.user) {
        var temp =
          '<div class="userHolder"><div style="display:flex;flex-direction:row;"><label class="custom-checkbox3"><input type="checkbox" data-id="' +
          response.user[key].player_id +
          '" data-test="' +
          response.user[key].username +
          '"><span class="checkmark3"></span></label>' +
          '<img style="width:30px;height:30px; border-radius:50%;" src="/images/' +
          response.user[key].profile_pic +
          '">&nbsp;<P>' +
          response.user[key].username +
          "</P></div><p>" +
          response.user[key].player_id +
          "</p></div>";
        userHold.innerHTML += temp;
      }
    } else {
      console.log("Request failed. Returned status of " + xhrttd1.status);
    }
    const checkboxes = userHold.querySelectorAll('input[type="checkbox"]');
    majorCheck2.addEventListener("change", function () {
      checkedArray2.splice(0);
      if (majorCheck2.checked) {
        for (const check of checkboxes) {
          check.checked = true;
          checkedArray2.push(check.dataset.id);
        }
      } else {
        for (const check of checkboxes) {
          check.checked = false;
        }
      }
      document.getElementById("numOfChecked2").innerHTML =
        checkedArray2.length + " SELECTED";
    });
    for (const check of checkboxes) {
      check.addEventListener("change", () => {
        if (check.checked) {
          checkedArray2.push(check.dataset.id);
        } else {
          const index = checkedArray2.indexOf(check.dataset.id);
          if (index !== -1) {
            checkedArray2.splice(index, 1);
          }
        }
        document.getElementById("numOfChecked2").innerHTML =
          checkedArray2.length + " SELECTED";
        containerAction1.style.width = checkedArray2.length > 0 ? "70%" : "0%";
        containerAction1.style.padding =
          checkedArray2.length > 0 ? "10px" : "0";
      });
    }
  };
  xhrttd1.send();
}
getUser();

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const toSearch = document.getElementById("search").value;
    const toSearch1 = { toSearch };
    const jsonData = JSON.stringify(toSearch1);
    const XHR3 = new XMLHttpRequest();
    const csrfToken3 = document.querySelector("#csrf_token2").value;
    const test_typing_p = document.getElementsByClassName(
      "nav_options_container_B"
    )[0];
    XHR3.open("POST", "/getSearch", true);
    XHR3.setRequestHeader("Content-Type", "application/json");
    XHR3.setRequestHeader("X-CSRFToken", csrfToken3);
    XHR3.addEventListener("load", function () {
      if (XHR3.status === 200 && XHR3.readyState === 4) {
        var response = JSON.parse(XHR3.responseText);
        test_typing_p.innerHTML = "";
        for (var key in response.searchResults) {
          var temp =
            '<div class="userHolder"><label class="custom-checkbox3"><input type="checkbox" data-id="' +
            response.searchResults[key].player_id +
            '" data-test="' +
            response.searchResults[key].username +
            '"><span class="checkmark3"></span></label>' +
            '<img style="width:30px;height:30px; border-radius:50%;" src="/images/' +
            response.searchResults[key].profile_pic +
            '">&nbsp;' + 
            response.searchResults[key].username +
            '<p style="display:none">' +
            response.searchResults[key].player_id +
            "</p></div>";
          test_typing_p.innerHTML += temp;
        }
      } else {
        console.error("not good");
      }

      const checkboxes = test_typing_p.querySelectorAll(
        'input[type="checkbox"]'
      );
      majorCheck2.addEventListener("change", function () {
        checkedArray2.splice(0);
        if (majorCheck2.checked) {
          for (const check of checkboxes) {
            check.checked = true;
            checkedArray2.push(check.dataset.id);
          }
        } else {
          for (const check of checkboxes) {
            check.checked = false;
          }
        }
        document.getElementById("numOfChecked2").innerHTML =
          checkedArray2.length + " SELECTED";
      });
      for (const check of checkboxes) {
        check.addEventListener("change", () => {
          if (check.checked) {
            checkedArray2.push(check.dataset.id);
          } else {
            const index = checkedArray2.indexOf(check.dataset.id);
            if (index !== -1) {
              checkedArray2.splice(index, 1);
            }
          }
          document.getElementById("numOfChecked2").innerHTML =
            checkedArray.length + " SELECTED";
          containerAction1.style.width =
            checkedArray2.length > 0 ? "70%" : "0%";
          containerAction1.style.padding =
            checkedArray2.length > 0 ? "10px" : "0";
        });
      }
    });
    XHR3.send(jsonData);
  });

document.getElementById("viewDetails").addEventListener("click", function () {
  showUserData();
  var imageContainer = document.getElementById("imageContainer");
  var imgElement = document.createElement("img");
  imageContainer.innerHTML = "";
  const userId = checkedArray2[0];
  const userId1 = { userId };
  const jsonData = JSON.stringify(userId1);
  const XHR3 = new XMLHttpRequest();
  const csrfToken3 = document.querySelector("#csrf_token2").value;
  const userRes = document.getElementsByClassName("userDBody")[0];
  XHR3.open("POST", "/getPlayerData", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken3);
  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      var response = JSON.parse(XHR3.responseText);
      userRes.innerHTML = "";
      for (var key in response.playerResults) {
        var temp0 =
          '<div class="userText"> <p>STATUS</p>' +
          response.playerResults[key].statuss +
          "</div>";
        var temp =
          '<div class="userText"> <p>USERNAME</p>' +
          response.playerResults[key].username +
          "</div>";
        var temp1 =
          '<div class="userText"> <p>PLAYER ID</p>' +
          response.playerResults[key].player_id +
          "</div>";
        var temp2 =
          '<div class="userText"> <p>FIRSTNAME</p>' +
          response.playerResults[key].firstname +
          "</div>";
        var temp3 =
          '<div class="userText"> <p>LASTNAME</p>' +
          response.playerResults[key].lastname +
          "</div>";
        var temp4 =
          '<div class="userText"> <p>EMAIL</p>' +
          response.playerResults[key].mail +
          "</div>";
        var temp5 =
          '<div class="userText"> <p>NUMBER</p>' +
          response.playerResults[key].number +
          "</div>";
        var temp6 =
          '<div class="userText"> <p>OPERATING SYSTEM</p>' +
          response.playerResults[key].os +
          "</div>";
        var temp7 =
          '<div class="userText"> <p>DEVICE WIDTH</p>' +
          response.playerResults[key].width +
          "</div>";
        var temp8 =
          '<div class="userText"> <p>DEVICE HEIGHT</p>' +
          response.playerResults[key].height +
          "</div>";

        userRes.innerHTML += temp0;
        userRes.innerHTML += temp;
        userRes.innerHTML += temp1;
        userRes.innerHTML += temp2;
        userRes.innerHTML += temp3;
        userRes.innerHTML += temp4;
        userRes.innerHTML += temp5;
        userRes.innerHTML += temp6;
        userRes.innerHTML += temp7;
        userRes.innerHTML += temp8;
        imgElement.src = "/images/" + response.playerResults[key].profile_pic;
        imgElement.style.width = "100%";
        imgElement.style.height = "auto";
        imgElement.style.borderRadius = "3px";

        imageContainer.appendChild(imgElement);
      }
    } else {
      console.log("something went bad");
    }
  });
  XHR3.send(jsonData);
});

function open_notf() {
  notifications.style.height = body_height - 130 + "px";
  notff_hider.style.height = body_height + "px";
  notff_hider.style.opacity = "0.5";
}
function close_notf() {
  notifications.style.height = 0;
  notff_hider.style.height = 0;
  notff_hider.style.opacity = "0";
}

function open_msg() {
  messages.style.height = body_height - 130 + "px";
  msgg_hider.style.height = body_height + "px";
  msgg_hider.style.opacity = "0";
}
function close_msg() {
  messages.style.height = 0;
  msgg_hider.style.height = 0;
  msgg_hider.style.opacity = "0";
}

function open_admin() {
  admin_opt.style.width = "85%";
  nav_options_hider.style.width = "15%";
}
function close_option_admin() {
  admin_opt.style.width = "0%";
  nav_options_hider.style.width = "0%";
}

function open_users() {
  user_opt.style.width = "85%";
  nav_options_hider.style.width = "15%";
}
function close_option_users() {
  user_opt.style.width = "0%";
  nav_options_hider.style.width = "0%";
}

function open_comp() {
  comp_opt.style.width = "85%";
  nav_options_hider.style.width = "15%";
}
function close_option_comp() {
  comp_opt.style.width = "0%";
  nav_options_hider.style.width = "0%";
}

function open_test() {
  test_opt.style.width = "85%";
  nav_options_hider.style.width = "15%";
}
function close_option_test() {
  test_opt.style.width = "0%";
  nav_options_hider.style.width = "0%";
  checkedArray.splice(0);
}

function open_res() {
  res_opt.style.width = "85%";
  res_opt.style.height = body_height - 60 + "px";
  nav_options_hider.style.width = "15%";
}
function close_option_res() {
  res_opt.style.width = "0%";
  nav_options_hider.style.width = "0%";
}

function open_mail() {
  mail_opt.style.width = "85%";
  mail_opt.style.height = body_height - 60 + "px";
  nav_options_hider.style.width = "15%";
}
function close_option_mail() {
  mail_opt.style.width = "0%";
  nav_options_hider.style.width = "0%";
}

function open_pay() {
  pay_opt.style.width = "85%";
  nav_options_hider.style.width = "15%";
}
function close_option_pay() {
  pay_opt.style.width = "0%";
  nav_options_hider.style.width = "0%";
}

function open_analy() {
  analy_opt.style.width = "85%";
  nav_options_hider.style.width = "15%";
}
function close_option_analy() {
  analy_opt.style.width = "0%";
  nav_options_hider.style.width = "0%";
}

function open_leader() {
  leader_opt.style.width = "85%";
  nav_options_hider.style.width = "15%";
}
function close_option_leader() {
  leader_opt.style.width = "0%";
  nav_options_hider.style.width = "0%";
}

function open_game() {
  game_opt.style.width = "85%";
  nav_options_hider.style.width = "15%";
}
function close_option_game() {
  game_opt.style.width = "0%";
  nav_options_hider.style.width = "0%";
}

function open_secu() {
  secu_opt.style.width = "85%";
  nav_options_hider.style.width = "15%";
}
function close_option_secu() {
  secu_opt.style.width = "0%";
  nav_options_hider.style.width = "0%";
}

function open_repo() {
  repo_opt.style.width = "85%";
  nav_options_hider.style.width = "15%";
}
function close_option_repo() {
  repo_opt.style.width = "0%";
  nav_options_hider.style.width = "0%";
}

function open_supp() {
  supp_opt.style.width = "85%";
  nav_options_hider.style.width = "15%";
}
function close_option_supp() {
  supp_opt.style.width = "0%";
  nav_options_hider.style.width = "0%";
}

function close_nav() {
  body.style.width = "100%";
  top_nav.style.width = "100%";
  top_nav.style.left = "0%";
  body.style.marginLeft = "0%";
  nav.style.width = "0%";
  nav.style.opacity = "0";
  clo.style.display = "none";
  ope.style.display = "block";
}
function open_nav() {
  body.style.width = "85%";
  top_nav.style.width = "85%";
  top_nav.style.left = "15%";
  body.style.marginLeft = "16%";
  nav.style.width = "15%";
  nav.style.opacity = "1";
  clo.style.display = "block";
  ope.style.display = "none";
}

function body_lengths() {
  body.style.height = body_height + "px";
  nav.style.height = body_height + "px";
  settings.style.height = body_height - 60 + "px";
  nav_options_hider.style.height = body_height + "px";
}
body_lengths();

nav.addEventListener("resize", function () {
  nav.style.height = body_height + "px";
  nav_options_hider.style.height = body_height + "px";
});

function open_settings() {
  settings.style.width = "30%";
  settings.style.opacity = "1";
}
function close_settings() {
  settings.style.width = "0";
  settings.style.opacity = "0";
}

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "January",
      "Feb",
      "March",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Number of People",
        data: [12, 15, 5, 9, 5, 7, 6, 9, 5, 10, 12, 3],
        backgroundColor: "rgba(106, 90, 205, 0.6)",
        borderColor: "rgba(106, 90, 205, 1)",
        borderWidth: 2,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    title: {
      display: true,
      text: "Number of users per Month",
    },
    legend: {
      display: false,
    },
  },
});
