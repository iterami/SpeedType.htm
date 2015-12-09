'use strict';

function decisecond(){
    var time = (parseFloat(document.getElementById('time').innerHTML) - .1).toFixed(1);

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

    document.getElementById('score').innerHTML =
      parseInt(document.getElementById('score').innerHTML) + 1;

    document.getElementById('target').innerHTML = random_word(5);

    time_remaining -= .1;
    document.getElementById('time').innerHTML = time_remaining.toFixed(1);
}

function random_word(length){
    var letters = 'abcdefghijklmnopqrstuvwxyz';
    var loop_counter = 0;
    var word = '';

    while(loop_counter < length){
        word += letters[Math.floor(Math.random() * 26)];
        loop_counter++;
    }

    return word;
}

function start(){
    window.clearInterval(interval);

    time_remaining = 10.0;

    document.getElementById('target').innerHTML = random_word(5);

    document.getElementById('text').value = '';
    document.getElementById('text').disabled = false;
    document.getElementById('text').focus();

    document.getElementById('time').innerHTML = time_remaining;

    document.getElementById('score').innerHTML = 0;

    document.getElementById('start-button').value = 'Stop [ESC]';
    document.getElementById('start-button').onclick = stop;

    interval = window.setInterval(
      'decisecond()',
      100
    );
}

function stop(){
    window.clearInterval(interval);
    interval = 0;

    document.getElementById('text').disabled = true;

    document.getElementById('start-button').value = 'Start [H]';
    document.getElementById('start-button').onclick = start;
}

var interval = 0;
var time_remaining = 0;

window.onkeydown = function(e){
    var key = e.keyCode || e.which;

    // ENTER: enter typed value for validation.
    if(key === 13){
        enter();

    // ESC: stop current game.
    }else if(key === 27){
        stop();
    }
};

window.onload = function(e){
    document.getElementById('score').innerHTML = '0';
    document.getElementById('target').innerHTML = '-----';
    document.getElementById('time').innerHTML = '10.0';
};

window.onkeyup = function(e){
    // Doesn't work if the game is running.
    if(interval !== 0){
        return;
    }

    var key = e.keyCode || e.which;

    if(key === 72){
        start();
    }
};
