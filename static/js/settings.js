const on = id;
let off = 0;
const bk1 = " #d1dad3";
const bk2 = " rgb(13, 23, 33)";
const body = document.getElementById("body");
const container_head = document.getElementsByClassName("container_head")[0];
const container_A = document.getElementsByClassName("container_A")[0];
const container_A_1_2 = document.getElementsByClassName("container_A_1_2")[0];
const dark_mode = document.getElementById("dark_mode");

//dark mode feature
let z = localStorage.getItem("id1");
let user_id_local = localStorage.getItem("user_id");
if (z == 1 && id == user_id_local) {
  dark_mode.checked = true;
  body.style.backgroundColor = bk1;
  container_head.style.backgroundColor = bk1;
  container_A.style.backgroundColor = bk1;
  container_A_1_2.style.backgroundColor = bk1;
} else {
  dark_mode.checked = false;
  body.style.backgroundColor = bk2;
  container_head.style.backgroundColor = bk2;
  container_A.style.backgroundColor = bk2;
  container_A_1_2.style.backgroundColor = bk2;
}
dark_mode.addEventListener("change", function () {
  if (dark_mode.checked) {
    body.style.backgroundColor = bk1;
    container_head.style.backgroundColor = bk1;
    container_A.style.backgroundColor = bk1;
    container_A_1_2.style.backgroundColor = bk1;
    localStorage.setItem("id1", on);
    localStorage.setItem("user_id", id);
  }
  if (!dark_mode.checked) {
    body.style.backgroundColor = bk2;
    container_head.style.backgroundColor = bk2;
    container_A.style.backgroundColor = bk2;
    container_A_1_2.style.backgroundColor = bk2;
    localStorage.setItem("id1", off);
  }
});
