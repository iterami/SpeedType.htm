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

    audio_start('boop');

    document.getElementById('score').innerHTML = parseInt(
      document.getElementById('score').innerHTML,
      10
    ) + 1;
    document.getElementById('target').innerHTML = random_word(5);
    document.getElementById('text').value = '';

    set_time_remaining(time_remaining - .1);
}

function random_word(length){
    var letters = 'abcdefghijklmnopqrstuvwxyz';
    var loop_counter = 0;
    var word = '';

    while(loop_counter < length){
        word += letters[random_integer(26)];
        loop_counter++;
    }

    return word;
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
    document.getElementById('target').innerHTML = random_word(5);
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
var time = 0;
var time_remaining = 0;

window.onload = function(e){
    input_init(
      {
        13: {
          'todo': enter,
        },
        27: {
          'todo': stop,
        },
      }
    );
    audio_init();
    audio_create(
      'boop',
      {
        'duration': .1,
        'volume': .1,
      }
    );

    document.getElementById('start-button').onclick = start;
    document.getElementById('score').innerHTML = '0';
    document.getElementById('target').innerHTML = '-----';
    document.getElementById('time').innerHTML = '10.0';
};
