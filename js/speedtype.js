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

    if(document.getElementById('text').value !== document.getElementById('target').innerHTML){
        return;
    }

    core_audio_start({
      'id': 'boop',
    });

    document.getElementById('score').innerHTML = parseInt(
      document.getElementById('score').innerHTML,
      10
    ) + 1;
    document.getElementById('target').innerHTML = core_random_string({
      'characters': letters,
      'length': 5,
    });
    document.getElementById('text').value = '';

    set_time_remaining(time_remaining - .1);
}

function repo_escape(){
    stop();
}

function repo_init(){
    core_repo_init({
      'keybinds': {
        13: {
          'todo': enter,
        },
      },
      'title': 'SpeedType.htm',
    });
    core_audio_create({
      'id': 'boop',
      'properties': {
        'duration': .1,
      },
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
    document.getElementById('start-button').value = 'Stop [ESC]';
    document.getElementById('start-button').onclick = stop;
    document.getElementById('target').innerHTML = core_random_string({
      'characters': letters,
      'length': 5,
    });
    document.getElementById('text').focus();
    document.getElementById('text').value = '';

    interval = window.setInterval(
      decisecond,
      100
    );
}

function stop(){
    window.clearInterval(interval);
    interval = 0;

    document.getElementById('start-button').value = 'Start [ENTER]';
    document.getElementById('start-button').onclick = start;
}

var interval = 0;
var letters = 'abcdefghijklmnopqrstuvwxyz';
var time = 0;
var time_remaining = 0;
