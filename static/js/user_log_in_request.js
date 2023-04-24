
const passwordInput22 = document.getElementById("password_u");
const username_u = document.getElementById("username_u");


log_user.addEventListener("submit", function (e) {
    e.preventDefault()
    var username_u2 = username_u.value;
    var password2 = passwordInput22.value;

    const prayer2 = {
        username_u2,
        password2
    };

    const json_data3 = JSON.stringify(prayer2);
    const XHR3 = new XMLHttpRequest();
    const csrfToken3 = document.querySelector('#csrf_token3').value;
    XHR3.open('POST', '/login_user', true);
    XHR3.setRequestHeader('Content-Type', 'application/json');
    XHR3.setRequestHeader('X-CSRFToken', csrfToken3);
    XHR3.addEventListener("load", function () {
        if (XHR3.status === 200 && XHR3.readyState === 4) {
            let url = '/ttd_user_homepage/';
            window.location.href = url;
        }
        else {
            alert('something went wrong !!!')
        }
    });
    XHR3.send(json_data3);
});