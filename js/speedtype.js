function decisecond(){
    document.getElementById('time').innerHTML =
      (parseFloat(document.getElementById('time').innerHTML) - .1).toFixed(1);

    if(parseFloat(document.getElementById('time').innerHTML) <= 0){
        stop();
    }
}

function enter(){
    if(document.getElementById('text').value != document.getElementById('target').innerHTML){
        return;
    }

    document.getElementById('text').value='';

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
        loop_counter++;
        word += letters[Math.floor(Math.random() * 26)];
    }

    return word;
}

function start(){
    clearInterval(interval);

    time_remaining = 10.0;

    document.getElementById('target').innerHTML = random_word(5);

    document.getElementById('text').value = '';
    document.getElementById('text').disabled = false;
    document.getElementById('text').focus();

    document.getElementById('time').innerHTML = time_remaining;

    document.getElementById('score').innerHTML = 0;

    document.getElementById('start-button').value = 'Stop [ESC]';
    document.getElementById('start-button').onclick = function(){
        stop();
    };

    interval = setInterval(
      'decisecond()',
      100
    );
}

function stop(){
    clearInterval(interval);

    document.getElementById('text').disabled = true;
    interval = 0;

    document.getElementById('start-button').value = 'Start [H]';
    document.getElementById('start-button').onclick = function(){
        start();
    };
}

var interval = 0;
var time_remaining = 0;

window.onkeydown = function(e){
    var key = window.event ? event : e;
    key = key.charCode ? key.charCode : key.keyCode;

    // ENTER: enter typed value for validation.
    if(key == 13){
        enter();

    // ESC: stop current game.
    }else if(key == 27){
        stop();
    }
};

window.onkeyup = function(e){
    // Doesn't work if the game is running.
    if(interval != 0){
        return;
    }

    var key = window.event ? event : e;
    key = key.charCode ? key.charCode : key.keyCode

    if(key == 72){
        start();
    }
};
