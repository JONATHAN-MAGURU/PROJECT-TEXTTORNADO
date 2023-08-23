const err = document.querySelector('#err')
const errr = document.querySelector('.container-error')

if(err.innerHTML == 'Incorect username or password.'){
 setTimeout(clear,3000)
}

function clear(){
  window.location.href = "http://127.0.0.1:8000/";
}
