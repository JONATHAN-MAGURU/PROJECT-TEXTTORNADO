let body_height = screen.availHeight;
const body = document.getElementById('home');
const nav = document.getElementsByClassName('left_side_nav')[0];
const top_nav = document.getElementsByClassName('top_side_nav')[0];
const settings = document.getElementsByClassName('settings')[0];
const clo = document.getElementsByClassName('clo')[0];
const ope = document.getElementsByClassName('ope')[0];
const admin_opt = document.getElementById('admins');
const user_opt = document.getElementById('users');
const comp_opt = document.getElementById('compt');
const test_opt = document.getElementById('test');
const res_opt = document.getElementById('res');
const pay_opt = document.getElementById('pay');
const mail_opt = document.getElementById('mail');
const leader_opt = document.getElementById('leader');
const analy_opt = document.getElementById('analy');
const game_opt = document.getElementById('game');
const secu_opt = document.getElementById('secu');
const repo_opt = document.getElementById('repo');
const supp_opt = document.getElementById('supp');
const nav_options_hider = document.getElementsByClassName("nav_options_hider")[0];
const notifications = document.getElementsByClassName("notifications")[0];
const messages = document.getElementsByClassName("messages")[0];
const notff_hider = document.getElementById('notff');
const msgg_hider = document.getElementById('msgg');



function open_notf(){
    notifications.style.height = body_height - 130 + 'px';
    notff_hider.style.height = body_height  + 'px';
    notff_hider.style.opacity ="0.5";
}
function close_notf() {
    notifications.style.height = 0;
    notff_hider.style.height = 0;
    notff_hider.style.opacity = "0";

}


function open_msg(){
    messages.style.height = body_height - 130 + 'px';
    msgg_hider.style.height = body_height + 'px';
    msgg_hider.style.opacity = "0.5";
}
function close_msg() {
    messages.style.height = 0;
    msgg_hider.style.height = 0;
    msgg_hider.style.opacity = "0.5";
}


function open_admin() {
    admin_opt.style.width = '85%';
    admin_opt.style.height = body_height - 60 + 'px';
    nav_options_hider.style.width = '15%';
}
function close_option_admin() {
    admin_opt.style.width = '0%';
    nav_options_hider.style.width = '0%';
}




function open_users() {
    user_opt.style.width = '85%';
    user_opt.style.height = body_height - 60 + 'px';
    nav_options_hider.style.width = '15%';
}
function close_option_users() {
    user_opt.style.width = '0%';
    nav_options_hider.style.width = '0%';
}


function open_comp() {
    comp_opt.style.width = '85%';
    comp_opt.style.height = body_height - 60 + 'px';
    nav_options_hider.style.width = '15%';
}
function close_option_comp() {
    comp_opt.style.width = '0%';
    nav_options_hider.style.width = '0%';
}


function open_test() {
    test_opt.style.width = '85%';
    test_opt.style.height = body_height - 60 + 'px';
    nav_options_hider.style.width = '15%';
}
function close_option_test() {
    test_opt.style.width = '0%';
    nav_options_hider.style.width = '0%';
}


function open_res() {
    res_opt.style.width = '85%';
    res_opt.style.height = body_height - 60 + 'px';
    nav_options_hider.style.width = '15%';
}
function close_option_res() {
    res_opt.style.width = '0%';
    nav_options_hider.style.width = '0%';
}


function open_mail() {
    mail_opt.style.width = '85%';
    mail_opt.style.height = body_height - 60 + 'px';
    nav_options_hider.style.width = '15%';
}
function close_option_mail() {
    mail_opt.style.width = '0%';
    nav_options_hider.style.width = '0%';
}

function open_pay() {
    pay_opt.style.width = '85%';
    pay_opt.style.height = body_height - 60 + 'px';
    nav_options_hider.style.width = '15%';
}
function close_option_pay() {
    pay_opt.style.width = '0%';
    nav_options_hider.style.width = '0%';
}

function open_analy() {
    analy_opt.style.width = '85%';
    analy_opt.style.height = body_height - 60 + 'px';
    nav_options_hider.style.width = '15%';
}
function close_option_analy() {
    analy_opt.style.width = '0%';
    nav_options_hider.style.width = '0%';
}


function open_leader() {
    leader_opt.style.width = '85%';
    leader_opt.style.height = body_height - 60 + 'px';
    nav_options_hider.style.width = '15%';
}
function close_option_leader() {
    leader_opt.style.width = '0%';
    nav_options_hider.style.width = '0%';
}


function open_game() {
    game_opt.style.width = '85%';
    game_opt.style.height = body_height - 60 + 'px';
    nav_options_hider.style.width = '15%';
}
function close_option_game() {
    game_opt.style.width = '0%';
    nav_options_hider.style.width = '0%';
}


function open_secu() {
    secu_opt.style.width = '85%';
    secu_opt.style.height = body_height - 60 + 'px';
    nav_options_hider.style.width = '15%';
}
function close_option_secu() {
    secu_opt.style.width = '0%';
    nav_options_hider.style.width = '0%';
}


function open_repo() {
    repo_opt.style.width = '85%';
    repo_opt.style.height = body_height - 60 + 'px';
    nav_options_hider.style.width = '15%';
}
function close_option_repo() {
    repo_opt.style.width = '0%';
    nav_options_hider.style.width = '0%';
}


function open_supp() {
    supp_opt.style.width = '85%';
    supp_opt.style.height = body_height - 60 + 'px';
    nav_options_hider.style.width = '15%';
}
function close_option_supp() {
    supp_opt.style.width = '0%';
    nav_options_hider.style.width = '0%';
}


function close_nav() {
    body.style.width = '100%';
    top_nav.style.width = '100%';
    top_nav.style.left = '0%';
    body.style.marginLeft = '0%';
    nav.style.width = "0%";
    nav.style.opacity = "0";
    clo.style.display="none";
    ope.style.display="block";
}
function open_nav() {
    body.style.width = '85%';
    top_nav.style.width = '85%';
    top_nav.style.left = '15%';
    body.style.marginLeft = '16%';
    nav.style.width = "15%";
    nav.style.opacity = "1";
    clo.style.display = "block";
    ope.style.display = "none";
}


function body_lengths() {
    body.style.height = body_height + 'px';
    nav.style.height = body_height + 'px';
    settings.style.height = body_height - 60 + 'px';
    nav_options_hider.style.height = body_height + 'px';
}
body_lengths();

nav.addEventListener('resize', function () {
    nav.style.height = body_height + 'px';
    nav_options_hider.style.height = body_height + 'px';
});

function open_settings() {
    settings.style.width = "30%";
    settings.style.opacity = "1";
}
function close_settings() {
    settings.style.width = "0";
    settings.style.opacity = "0";
}

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'Feb', 'March', 'Apr', 'May', 'June', 'July','Aug','Sept','Oct','Nov','Dec'],
        datasets: [{
            label: 'Number of People',
            data: [12, 15, 5, 9, 5, 7,6,9,5,10,12,3],
            backgroundColor: 'rgba(106, 90, 205, 0.2)',
            borderColor: 'rgba(106, 90, 205, 1)',
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title: {
            display: true,
            text: 'Number of users per Month'
        },
        legend: {
            display: false
        }
    }
});



