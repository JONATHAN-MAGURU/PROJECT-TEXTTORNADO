const hidden = document.querySelector(".Hidden");
hidden.addEventListener("dblclick", () => {
  document.querySelector(".ttd_admin_container").style.opacity = "1";
});
setBack = () => {
  document.querySelector(".ttd_admin_container").style.opacity = "0";
};
setInterval(setBack, 20000);
