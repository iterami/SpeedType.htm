'use strict';

function decisecond(){
    time = (time - .1).toFixed(1);

    document.getElementById('time').innerHTML = time;

    if(time <= 0){
        core_interval_pause_all();
    }
}

function enter(){
    if(core_intervals['interval']['paused']){
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
      'length': core_storage_data['length'],
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
    set_time_remaining(core_storage_data['time-max']);

    document.getElementById('score').innerHTML = 0;
    document.getElementById('target').innerHTML = core_random_string({
      'characters': letters,
      'length': core_storage_data['length'],
    });
    var element = document.getElementById('text');
    element.value = '';
    element.focus();

    core_interval_modify({
      'id': 'interval',
      'interval': 100,
      'todo': decisecond,
    });
}
