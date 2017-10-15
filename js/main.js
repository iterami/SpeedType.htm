'use strict';

function decisecond(){
    time = (time - .1).toFixed(1);

    document.getElementById('time').innerHTML = time;

    if(time <= 0){
        stop();
    }
}

function enter(){
    if(interval === 0){
        start();
    }

    var targetelement = document.getElementById('target');
    var textelement = document.getElementById('text');
    if(textelement.value !== targetelement.innerHTML){
        return;
    }

    core_audio_start({
      'id': 'boop',
    });

    var element = document.getElementById('score');
    element.innerHTML = parseInt(
      element.innerHTML,
      10
    ) + 1;
    targetelement.innerHTML = core_random_string({
      'characters': letters,
      'length': 5,
    });
    textelement.value = '';

    set_time_remaining(time_remaining - .1);
}

function repo_escape(){
    stop();
}

function repo_init(){
    core_repo_init({
      'audios': {
        'boop': {
          'duration': .1,
        },
      },
      'keybinds': {
        13: {
          'todo': enter,
        },
      },
      'title': 'SpeedType.htm',
    });

    document.getElementById('start-button').onclick = start;
    document.getElementById('score').innerHTML = '0';
    document.getElementById('target').innerHTML = '-----';
    document.getElementById('time').innerHTML = '10.0';
}

function set_time_remaining(new_time_remaining){
    time_remaining = new_time_remaining;
    time = time_remaining;
    document.getElementById('time').innerHTML = time_remaining.toFixed(1);
}

function start(){
    window.clearInterval(interval);

    set_time_remaining(10.0);

    document.getElementById('score').innerHTML = 0;
    var element = document.getElementById('start-button');
    element.value = 'Stop [ESC]';
    element.onclick = stop;
    document.getElementById('target').innerHTML = core_random_string({
      'characters': letters,
      'length': 5,
    });
    element = document.getElementById('text');
    element.value = '';
    element.focus();

    interval = window.setInterval(
      decisecond,
      100
    );
}

function stop(){
    window.clearInterval(interval);
    interval = 0;

    var element = document.getElementById('start-button');
    element.value = 'Start [ENTER]';
    element.onclick = start;
}

var interval = 0;
var letters = 'abcdefghijklmnopqrstuvwxyz';
var time = 0;
var time_remaining = 0;
