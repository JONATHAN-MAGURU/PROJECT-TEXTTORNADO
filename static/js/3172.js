const bars = document.querySelector('.fa-bars');
const navBar = document.querySelector('.navigationBar')
const backArrow =document.querySelector('.backArrow')


bars.addEventListener('click', ()=>{
    navBar.style.display="block";
})
backArrow.addEventListener('click', ()=>{
    navBar.style.display="none";
})

