// ==UserScript==
// @name         WDS Jira Ticket Timer
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Small Ticket Timer for WDS tickets in JIRA
// @author       Leon Redman - Website Builder 1
// @match        *https://godaddy-services.atlassian.net/browse/*
// @run-at document-end
// @icon         https://www.google.com/s2/favicons?domain=atlassian.net
// @grant        none
// ==/UserScript==

// script executed after load of content on page
window.addEventListener('load', function() {
    'use strict';
    let stopWatch = document.getElementsByClassName("css-1p5j0a7");

let p = stopWatch[0];

console.log(p);

let stpWtch = document.createElement("div")
stpWtch.id = 'display';
stpWtch.innerHTML = "00:00:00";

    //insert init counter text
p.insertBefore(document.createElement('br'), p.childNodes[0]);
p.insertBefore(stpWtch, p.childNodes[0]);

let btnTag = document.getElementsByClassName("css-1p5j0a7");
let s = btnTag[0];

console.log(s);

let btn = document.createElement("button")
btn.innerHTML = "START";
btn.id = 'startStop'
btn.onclick = function(){
    startStop()
}
// insert start button
s.insertBefore(document.createElement('br'), s.childNodes[0]);
s.insertBefore(btn, s.childNodes[0]);

// vars to hold time values
let seconds = 0;
let minutes = 0;
let hours = 0;
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

// var to hold setInterval function
let interval = null;

// init stopwatch status
let status = "stopped";

// stopwatch function increment
function timeIt(){
    seconds++;
// logic to determine increment of next value
    if(seconds / 60 === 1) {
        seconds = 0;
        minutes++;

        if(minutes / 60 ===1){
            minutes = 0;
            hours++;
        }
    }
   // If time is less that one digit add leading zero to value
    if(seconds < 10) {
        displaySeconds = "0" + seconds.toString();
    } else {
        displaySeconds = seconds;
    }

    if(minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    } else {
        displayMinutes = minutes;
    }

    if(hours < 10) {
        displayHours = "0" + hours.toString();
    } else {
        displayHours = hours
    }

   // Display updated time values to the user
     document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
}

    function startStop(){
    if(status === "stopped") {

        //start the stopwatch
        interval = window.setInterval(timeIt, 1000);
        document.getElementById("startStop").innerHTML = "Stop";
        status = "started";
    } else {
        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Start";
        status = "stopped";
    }
}
})();

