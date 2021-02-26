"use strict";

var total_ms= 25 * 60 * 1000; // 25 minutes to study
var ms_left = total_ms;
var pomodoro_count = 0;
var t = {};

setTime(total_ms);

function displayTime(start_time, remaining) {
  var dt = new Date() - start_time;
  ms_left = remaining - dt


  if (ms_left <= 0) {
    endPomodoro();
    return;
  }

  setTime(ms_left);
}

function endPomodoro() {
  ms_left = 0
  clearInterval(t);
  setTime(0);
  document.getElementById("play_pause").innerHTML = "play_arrow";
  updatePomodoroCount();
}


function setTime(ms_left) {
  var h = ms_left / (1000 * 60 * 60);
  var m = ms_left / (1000*60);
  var s = ms_left / 1000;
  h = formatTime(h);
  m = formatTime(m);
  s = formatTime(s);
  document.getElementById("timer").innerText = h + " : " + m + " : " + s;
}

function updatePomodoroCount() {
  ++pomodoro_count;
  document.getElementById("count").innerHTML = "Pomodoros: " + pomodoro_count;
  new Audio('beep.mp3').play();
}


function formatTime(k) {
  // converts digit into a 2 character string
  k = Math.floor(k);
  k %= 60
  if (k < 10){
    return "0" + k;
  } else {
    return k
  }
}


function start_pause() {
  var elem = document.getElementById("play_pause");
  if (elem.innerHTML === "play_arrow" && ms_left != 0) {
    var start_time = new Date();
    t = window.setInterval(displayTime, 40, start_time, ms_left);
    elem.innerHTML = "pause";
  } else {
    elem.innerHTML = "play_arrow";
    clearInterval(t);
  }
}

function reset() {
  ms_left = total_ms;
  setTime(total_ms);

  var elem = document.getElementById("play_pause");
  if (elem.innerHTML === "pause") {
    clearInterval(t);
    var start_time = new Date();
    t = window.setInterval(displayTime, 40, start_time, ms_left);
  }


}
