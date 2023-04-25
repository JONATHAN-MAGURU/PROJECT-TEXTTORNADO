const username = document.body.getAttribute('data-username');
const id = document.body.getAttribute('data-ttd-id');
const save_data = document.getElementById('save_data');
const firstname = document.getElementsByClassName('edit1')[0];
const lastname = document.getElementsByClassName('edit1')[1];
const email = document.getElementsByClassName('edit1')[2];
const usern = document.getElementsByClassName('edit1')[3];

const element = document.getElementsByClassName('alerts')[0];
const alert2 = document.getElementById('alerts2');


save_data.addEventListener("submit", function (e) {
    e.preventDefault()
    var firstname2 = firstname.value;
    var lastname2 = lastname.value;
    var mail = email.value;
    var usern2 = usern.value;

    const prayer2 = {
        firstname2,
        lastname2,
        mail,
        username,
        id,
        usern2
    };

    const json_data3 = JSON.stringify(prayer2);
    const XHR3 = new XMLHttpRequest();
    const csrfToken4 = document.querySelector('#csrf_token4').value;
    XHR3.open('POST', '/second_player_data', true);
    XHR3.setRequestHeader('Content-Type', 'application/json');
    XHR3.setRequestHeader('X-CSRFToken', csrfToken4);
    XHR3.addEventListener("load", function () {
        if (XHR3.status === 200 && XHR3.readyState === 4) {
            const response = this.responseText;
                element.classList.add('animated');
                alert2.innerHTML= response;
        }
        else {
            alert('something went wrong !!!')
        }
    });
    XHR3.send(json_data3);

});