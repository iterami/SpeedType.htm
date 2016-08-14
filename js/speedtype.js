'use strict';

function decisecond(){
    time = (time - .1).toFixed(1);

    document.getElementById('time').innerHTML = time;

    if(time <= 0){
        stop();
    }
}

function enter(){
    if(document.getElementById('text').value !== document.getElementById('target').innerHTML){
        return;
    }

    document.getElementById('text').value = '';

    document.getElementById('score').innerHTML = parseInt(
      document.getElementById('score').innerHTML,
      10
    ) + 1;

    document.getElementById('target').innerHTML = random_word(5);

    time_remaining -= .1;
    document.getElementById('time').innerHTML = time_remaining.toFixed(1);
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

function start(){
    window.clearInterval(interval);

    time_remaining = 10.0;
    time = time_remaining;

    document.getElementById('score').innerHTML = 0;
    document.getElementById('start-button').value = 'Stop [ESC]';
    document.getElementById('start-button').onclick = stop;
    document.getElementById('target').innerHTML = random_word(5);
    document.getElementById('text').focus();
    document.getElementById('text').value = '';
    document.getElementById('time').innerHTML = time_remaining;

    interval = window.setInterval(
      decisecond,
      100
    );
}

function stop(){
    window.clearInterval(interval);
    interval = 0;

    document.getElementById('start-button').value = 'Start [H]';
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
        72: {
          'todo': function(){
              if(interval === 0){
                  start();
              }
          },
        },
      }
    );

    document.getElementById('score').innerHTML = '0';
    document.getElementById('target').innerHTML = '-----';
    document.getElementById('time').innerHTML = '10.0';
};
