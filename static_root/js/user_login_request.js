
  const err = document.querySelector("#err");
  const errr = document.querySelector(".container-error");
  const form = document.querySelector('#form2')
  const username = document.querySelector('#username')

  if (err.innerHTML == "Incorect username or password.") {
    errr.style.display = 'block';
    form.style.borderTopLeftRadius ='0';
    form.style.borderTopRightRadius ='0';
    
  }

username.addEventListener('change', function(){
  errr.style.display = 'none';
  form.style.borderTopLeftRadius ='6px';
  form.style.borderTopRightRadius ='6px';
})
