
  const err = document.querySelector("#err");
  const errr = document.querySelector(".container-error");
  const form = document.querySelector('#form2')

  if (err.innerHTML == "Incorect username or password.") {
    setTimeout(clear, 3000);
    errr.style.display = 'block';
    form.style.borderTopLeftRadius ='0';
    form.style.borderTopRightRadius ='0';
    
  }

function clear() {
  window.location.href = "http://127.0.0.1:8000/";
}
