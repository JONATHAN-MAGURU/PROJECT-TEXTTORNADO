const loader = document.getElementsByClassName('loader')[0];
const main_body = document.getElementsByClassName('main_body')[0];
const buy_tokens = document.getElementsByClassName('buy_tokens')[0];
const notf = document.getElementsByClassName('notf')[0];
const options_notf = document.getElementsByClassName('options_notf')[0];
const options = document.getElementsByClassName('options')[0];
const logout = document.getElementsByClassName('logout')[0];
const closee1 = document.getElementsByClassName('closee')[0];
const closee2 = document.getElementsByClassName('closee')[1];
const closee3 = document.getElementsByClassName('closee')[2];
const closee4 = document.getElementsByClassName('closee')[3];
const closee5 = document.getElementsByClassName('closee')[4];
const closee11 = document.getElementsByClassName('closee1')[0];
const player_name = document.getElementsByClassName('player_name')[0];
const options_player = document.getElementsByClassName('options_player')[0];
const options_logout = document.getElementsByClassName('options_logout')[0];
const leaderboard_hider = document.getElementsByClassName('leaderboard_hider')[0];
const main_container = document.getElementsByClassName('main_container')[0];
const settings_box = document.getElementsByClassName('settings_box')[0];
const settings_box2 = document.getElementsByClassName('settings_box')[1];
const settings_box3 = document.getElementsByClassName('settings_box')[2];
const settings_box4 = document.getElementsByClassName('settings_box')[3];
const settings_container = document.getElementsByClassName('settings_container')[0];
const settings_container2 = document.getElementsByClassName('settings_container')[1];
const settings_container3 = document.getElementsByClassName('settings_container')[2];
const settings_container4 = document.getElementsByClassName('settings_container')[3];
const ask = document.getElementsByClassName('ask')[0];
const ask_holder = document.getElementsByClassName('ask_holder')[0];
const options_logout_1_1 = document.getElementsByClassName('options_logout_1_1')[1];
const log_out_hider = document.getElementsByClassName('log_out_hider')[0];
const opt = screen.availHeight;
const fontss = document.getElementById('fontss');
const font_changer = document.getElementsByClassName('typing-text')[0];
const manage_account_holder = document.getElementsByClassName('manage_account_holder')[0];
const manage_account = document.getElementsByClassName('manage_account')[0];
const changee = document.getElementsByClassName('change')[0];
const change_pass = document.getElementsByClassName('change_pass')[0];
const manage_close1 = document.getElementsByClassName('manage_close')[0];
const manage_close2 = document.getElementsByClassName('manage_close')[1];
const manage_close3 = document.getElementsByClassName('manage_close')[2];

main_container.style.height = opt - 120 + "px";
settings_container.style.height = opt - 150 + "px";
settings_container2.style.height = opt - 150 + "px";
settings_container3.style.height = opt - 150 + "px";
settings_container4.style.height = opt - 150 + "px";


settings_box.addEventListener('click', function () {
        settings_container.style.width = "27%";
        settings_container2.style.width = 0;
        settings_container3.style.width = 0;
        settings_container4.style.width = 0;

});

settings_box2.addEventListener('click', function () {
        settings_container2.style.width = "27%";
        settings_container.style.width = 0;
        settings_container3.style.width = 0;
        settings_container4.style.width = 0;
});
settings_box3.addEventListener('click', function () {
        settings_container3.style.width = "27%";
        settings_container.style.width = 0
        settings_container2.style.width = 0;
        settings_container4.style.width = 0;

});
settings_box4.addEventListener('click', function () {
        settings_container4.style.width = "27%";
        settings_container.style.width = 0;
        settings_container2.style.width = 0;
        settings_container3.style.width = 0;
});


const delay_loader = setTimeout(function () {
        loader.style.height = '0vh';
        loader.style.opacity = '0';
        main_body.style.display = 'block';
}, 10);

buy_tokens.addEventListener('click', function () {
        options.style.height = opt + "px";
        leaderboard_hider.style.width = "25%";
        options_notf.style.height = 0;
        options_player.style.height = "0";
        options_logout.style.width = "0";
        settings_container.style.width = 0;
        settings_container2.style.width = 0;
        settings_container3.style.width = 0;
        settings_container4.style.width = 0;
});

notf.addEventListener('click', function () {
        options_notf.style.height = opt - 110 + "px";
        options.style.height = "0";
        options_player.style.height = "0";
        leaderboard_hider.style.width = "0";
        options_logout.style.width = "0";
});

logout.addEventListener('click', function () {
        options_logout.style.width = "20%";
        log_out_hider.style.width = "100%";
        options_notf.style.height = '0';
        options.style.height = 0;
        leaderboard_hider.style.width = "0";
        options_player.style.height = 0;
});
options_logout_1_1.addEventListener('click', function () {
        options_logout.style.width = 0;
        log_out_hider.style.width = 0;
       
});

player_name.addEventListener('click', function () {
        options_player.style.maxHeight ='300px';
        options.style.height = 0;
        options_logout.style.width = "0";
        options_notf.style.height = "0";
        leaderboard_hider.style.width = "0";
});

closee1.addEventListener('click', function () {
        options.style.height = 0;
        leaderboard_hider.style.width = "0";
});
closee2.addEventListener('click', function () {
        settings_container.style.width = 0;
});
closee3.addEventListener('click', function () {
        settings_container2.style.width = 0;
});
closee4.addEventListener('click', function () {
        settings_container3.style.width = 0;
});
closee5.addEventListener('click', function () {
        settings_container4.style.width = 0;
});
ask.addEventListener('click', function () {
        ask_holder.style.width = "100%";
});
closee11.addEventListener('click', function () {
        ask_holder.style.width = "0%";
});


for (x = 10; x <= 30; x += 2) {
        fontss.innerHTML += "<option>" + x + "px" + "</option>";
}

fontss.addEventListener("change", function () {
        font_changer.style.fontSize = fontss.value;
});

manage_account.addEventListener('click',  function(){
        manage_account_holder.style.width = "23%";
})
changee.addEventListener('click',  function(){
        change_pass.style.maxHeight = "300px";
        change_pass.style.opacity = '1';
})

manage_close3.addEventListener('click', function(){
        options_player.style.maxHeight = '0';
})
manage_close1.addEventListener('click', function(){
        manage_account_holder.style.width = "0";
})

manage_close2.addEventListener('click', function () {
        change_pass.style.maxHeight = 0;
        change_pass.style.opacity = 0;
})

