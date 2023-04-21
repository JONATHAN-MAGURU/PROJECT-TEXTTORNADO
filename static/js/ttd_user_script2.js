const to_write1 = document.getElementById('typing-text');
const to_write5 = document.getElementById('typing-text2');
const to_write2 = document.getElementById("header_text");
const to_write3 = document.getElementById("username");
const to_write4 = document.getElementById("passw");
const to_write7 = document.getElementById("number");
const to_write8 = document.getElementById("passw2");
const welcome_text = "WELCOME TO TEXTTORNADO ADMINISTRATION WINDOW, ENTER YOUR USERNAME AND PASSWORD TO CONTINUE. DON'T HAVE ADMIN ACCOUNT ,... CLICK BUTTON BELOW TO CREATE ACCOUNT...";
const welcome_text2 = "WELCOME TO TEXTTORNADO SIGN UP WINDOW, FILL THE FORM TO CREATE ACCOUNT,..IF YOU ALREADY HAVE ACCOUNT CLICK LOGIN BUTTON BELOW....";
const header_text = "TEXTTORNADO";
const username = "USERNAME";
const number = "PHONE NUMBER";
const password = "PASSWORD";
const password2 = "CONFIRM PASSWORD";


 
// auto typing feature
function typeText(identity, textToType) {
  for (let i = 0; i < textToType.length; i++) {
    setTimeout(() => {
      identity.textContent += textToType.charAt(i);
    }, i * 50);
  }
}

typeText(to_write1, welcome_text);
typeText(to_write2, header_text);
typeText(to_write3, username);
typeText(to_write4, password);
typeText(to_write5, welcome_text2);
typeText(to_write7, number);
typeText(to_write8, password2);
