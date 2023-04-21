const loader = document.getElementsByClassName('loader')[0];
const main_body = document.getElementsByClassName('main_body')[0];



const delay_loader = setTimeout(function () {
        loader.style.height = '0vh';
        loader.style.opacity = '0';
        main_body.style.display = 'block';
}, 3000);

