const passwordInput = document.getElementById("password");
const passwordInput2 = document.getElementById("password_u");
const showPasswordCheckbox = document.getElementById("checkbox");
const showPasswordCheckbox2 = document.getElementById("checkbox2");
const msg = document.getElementById("status");
const msg2 = document.getElementById("status2");
const pass_box = document.getElementById("displayPassword");
const pass_box2 = document.getElementById("displayPassword2");
const main = document.getElementsByClassName('main2')[0];
const main_height = window.innerHeight;
const main_width = window.innerWidth;
const os = navigator.platform;
const hidden_form_part = document.getElementsByClassName("hidden_form_part")[0];
const shown_form_part = document.getElementsByClassName("shown_form_part")[0];
const hidden_form = document.getElementById("hidden_form");
const shown_form = document.getElementById("shown_form");
const s_form = document.getElementsByClassName("s_form")[0];
const s_form2 = document.getElementsByClassName("s_form2")[0];
const signup_form = document.getElementById('myForm1');
const code = document.getElementById("verification1");
const position = document.getElementById("position");
const usern = document.getElementsByClassName("usern")[0];
const number_u = document.getElementById("number_u");
const pass = document.getElementById("password");
const pass2 = document.getElementById("password2");
const warn1 = document.getElementById("warn1");
const v_code = document.getElementById("v_code");
const log_user = document.getElementById("log_user");
const redirect_text = document.getElementById('redirect_text')
main.style.height = main_height + "px";

const rd_txt = ' YOU HAVE SUCCESSIFULLY CREATED YOUR ACCOUNT NOW CLICK LOG IN BUTTON';
//hidden form feature
s_form.addEventListener('submit', function (event) {
  event.preventDefault();
  let usern2 = usern.value;
  let arr = [];
  for (let i = 0; i < usern2.length; i++) {
    arr.push(usern2[i]);
  }
  let space_check = arr.includes(' ');
  if (usern.value == "" || number_u.value == "" || pass.value == "" || pass2.value == "") {
    warn1.innerHTML = "PLEASE FILL ALL THE FIELDS";
  }
  else {
    if (pass.value == pass2.value) {
      if (space_check == true) {
        warn1.innerHTML = "ENTER USERNAME WITHOUT SPACES";
      }
      else {
        if (pass.value.length >= 4) {
          var username = usern.value;
          var password = pass.value;
          var number = number_u.value;

          const player = {
            username,
            password,
            number,
            main_height,
            main_width,
            os,
          }

          var json_data = JSON.stringify(player)
          send_data(json_data);
          v_code.innerHTML = number_u.value;
        }
        else {
          warn1.innerHTML = "YOUR PASSWORD IS TOO SHORT";
        }
      }
    }

    else {
      warn1.innerHTML = "PASSWORDS NOT MATCHING";
    }
  }

});

shown_form.addEventListener('click', function () {
  hidden_form_part.style.height = "0";
  shown_form_part.style.height = "400px";
});

passwordInput.addEventListener('keydown', function () {
  if (passwordInput.value.length > 0) {
    pass_box.style.opacity = "1";
  }
  else {
    pass_box.style.opacity = "0";
  }
});
showPasswordCheckbox.addEventListener('change', function () {
  if (showPasswordCheckbox.checked) {
    passwordInput.type = 'text';
    pass2.type = 'text';
    msg.innerHTML = 'hide password';
  }
  else {
    passwordInput.type = 'password';
    pass.type = 'password';
    msg.innerHTML = 'show password';
  }
});


passwordInput2.addEventListener('keydown', function () {
  if (passwordInput2.value.length > 0) {
    pass_box2.style.opacity = "1";
  }
  else {
    pass_box2.style.opacity = "0";
  }
});
showPasswordCheckbox2.addEventListener('change', function () {
  if (showPasswordCheckbox2.checked) {
    passwordInput2.type = 'text';
    msg2.innerHTML = 'hide password';
  }
  else {
    passwordInput2.type = 'password';
    msg2.innerHTML = 'show password';
  }
});

function send_data(data) {
  var csrfToken = document.querySelector('#csrf_token').value;
  var XHR2 = new XMLHttpRequest();
  XHR2.open('POST', '/v_player', true);
  XHR2.setRequestHeader('Content-Type', 'application/json');
  XHR2.setRequestHeader('X-CSRFToken', csrfToken);
  XHR2.addEventListener("load", function () {
    if (XHR2.status === 200 && XHR2.readyState === 4) {
      if (XHR2.responseText == "not success") {
        warn1.innerHTML = "USERNAME ALREADY EXISTS"
      }
      else {
        let x = XHR2.responseText;
        let y = x.length;
        if (y == 7) {
          hidden_form_part.style.height = "auto";
          shown_form_part.style.height = "0";
          s_form2.addEventListener('submit', function (e) {
            e.preventDefault()
            var csrfToken = document.querySelector('#csrf_token').value;
            var XHR = new XMLHttpRequest();
            XHR.open('POST', '/v_player2', true);
            XHR.setRequestHeader('Content-Type', 'application/json');
            XHR.setRequestHeader('X-CSRFToken', csrfToken);
            XHR.addEventListener("load", function () {
              if (XHR.status === 200 && XHR.readyState === 4) {
                let response = XHR.responseText
                if (response == 'success') {
                  hidden_form_part.style.height = "0";
                  shown_form_part.style.height = "0";
                  typeText(redirect_text, rd_txt)
                }
              }
              else {
                alert("bad request")
              }
            });
            var code2 = code.value;
            const vp = {
              x,
              code2
            };
            const json_data2 = JSON.stringify(vp);
            XHR.send(json_data2);
          });
        }
      }
    }
    else {
      alert("something went wrong");
    }
  });
  return XHR2.send(data);
}
