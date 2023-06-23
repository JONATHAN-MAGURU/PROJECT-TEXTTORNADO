const ends = document.getElementById("ends");
const ends_text = "EVENT ENDS IN";
const type = document.getElementById("type");
const lang = document.getElementById("lang");
const word1 = document.getElementById("word1");
const name1 = document.getElementById("name1");
const given_time = document.getElementById("given_time");
const type_text = "EVENT TYPE :";
const lang_text = "LANGUAGE :";
const word_text = "AOF :";
const name1_text = "EVENT NAME :";
const tim_text = "GIVEN TIME";

const start = document.getElementById("start");
const start_text = "NEXT EVENT START IN";
const type2= document.getElementById("type2");
const lang2 = document.getElementById("lang2");
const word2 = document.getElementById("word2");
const name2 = document.getElementById("name2");
const given_time2 = document.getElementById("given_time2");
const type_text2 = "EVENT TYPE :";
const lang_text2 = "LANGUAGE :";
const word_text2 = "AOF :";
const name1_text2 = "EVENT NAME :";
const tim_text2 = "GIVEN TIME";


const t_overview = document.getElementById("t_overview");
const t_overview_text = 'TICKETS OVERVIEW';
const st_tickets = document.getElementById('st_tickets');
const st_tickets1 = document.getElementById('st_tickets1');
const ep_tickets = document.getElementById('ep_tickets');
const ep_tickets1 = document.getElementById('ep_tickets1');
const lg_tickets = document.getElementById('lg_tickets');
const lg_tickets1 = document.getElementById('lg_tickets1');
const st_tickets_text = 'STARDARD PACKAGE - COST : K500 ';
const st_tickets_text1 = '-:This package have one (1) ticket to enter texttornado typing tests.., starndad package is the cheapest pack we have in our texttornado typing speed but if you want to take many typing test we can consider you choosing epic pack or legendary pack....';
const ep_tickets_text = 'EPIC PACKAGE - COST : K1000 ';
const ep_tickets_text1 = '-:This package have three (3) tickets to enter texttornado typing test using 1 ticket per test.., epic package is favoured by many as it lies between our lower(starndad) and higher(legendary) packs....';
const lg_tickets_text = 'LEGENDARY PACKAGE - COST : K1500 ';
const lg_tickets_text1 = '-:This package have five (5) to enter texttornado typing test using 1 ticket per test.., This pack gives you a free two (2) tickets bonus at your first try';

function typeText1(identity1, textToType1) {
  for (let i = 0; i < textToType1.length; i++) {
    setTimeout(() => {
      identity1.textContent += textToType1.charAt(i);
    }, i * 50);
  }
}

typeText1(ends, ends_text);
typeText1(type, type_text);
typeText1(lang, lang_text);
typeText1(word1, word_text);
typeText1(name1, name1_text);
typeText1(given_time, tim_text);
typeText1(start, start_text);
typeText1(type2, type_text2);
typeText1(lang2, lang_text2);
typeText1(word2, word_text2);
typeText1(name2, name1_text2);
typeText1(given_time2, tim_text2);
