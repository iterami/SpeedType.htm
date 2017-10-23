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

function set_time_remaining(new_time_remaining){
    time_remaining = new_time_remaining;
    time = time_remaining;
    document.getElementById('time').innerHTML = time_remaining.toFixed(1);
}

function start(){
    window.clearInterval(interval);

    set_time_remaining(10.0);

    document.getElementById('score').innerHTML = 0;
    core_html_modify({
      'id': 'start-button',
      'properties': {
        'onclick': stop,
        'value': 'End [ESC]',
      },
    });
    document.getElementById('target').innerHTML = core_random_string({
      'characters': letters,
      'length': 5,
    });
    var element = document.getElementById('text');
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

    core_html_modify({
      'id': 'start-button',
      'properties': {
        'onclick': start,
        'value': 'Start [ENTER]',
      },
    });
}
