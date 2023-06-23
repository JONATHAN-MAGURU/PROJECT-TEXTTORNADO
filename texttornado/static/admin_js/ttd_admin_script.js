const passwordInput = document.getElementById("password");
const showPasswordCheckbox = document.getElementById("checkbox");
const msg = document.getElementById("status");
const pass_box = document.getElementById("displayPassword");
const main = document.getElementsByClassName('main2')[0];
const main_height = window.innerHeight;
const hidden_form_part = document.getElementsByClassName("hidden_form_part")[0];
const shown_form_part = document.getElementsByClassName("shown_form_part")[0];
const hidden_form = document.getElementById("hidden_form");
const shown_form = document.getElementById("shown_form");
const signup_form = document.getElementById('myForm1');
const code = document.getElementById("verification");
const position = document.getElementById("position");
const fname = document.getElementById("firstname");
const lname = document.getElementById("lastname");
const pass = document.getElementById("password");
const pass2 = document.getElementById("password2");
const warn1 = document.getElementById("warn1");
main.style.height = main_height + "px";

//hidden form feature
hidden_form.addEventListener('click', function () {
  if (fname.value == "" || lname.value == "" || pass.value == "" || pass2.value == "") {
    warn1.innerHTML = "PLEASE FILL ALL THE FIELDS";
  }
  else {
    if (pass.value == pass2.value) {
      if (pass.value.length >= 4) {
        hidden_form_part.style.height = "auto";
        shown_form_part.style.height = "0";
      }
      else {
        warn1.innerHTML = "YOUR PASSWORD IS SHORT";
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
    msg.innerHTML = 'hide password';
  }
  else {
    passwordInput.type = 'password';
    msg.innerHTML = 'show password';
  }
});



