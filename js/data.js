'use strict';

function decisecond(){
    time = core_round({
      'decimals': 1,
      'number': time - .1,
    });

    document.getElementById('time').innerHTML = time;

    if(time <= 0){
        core_interval_pause_all();
        document.getElementById('text').readOnly = true;
    }
}

function enter(){
    if(core_intervals['interval']['paused']){
        start();
    }

    let targetelement = document.getElementById('target');
    let textelement = document.getElementById('text');
    if(textelement.value !== targetelement.innerHTML){
        return;
    }

    core_audio_start({
      'id': 'boop',
    });

    let element = document.getElementById('score');
    element.innerHTML = Number.parseInt(
      element.innerHTML,
      10
    ) + 1;
    targetelement.innerHTML = core_random_string({
      'characters': letters,
      'length': core_storage_data['length'],
    });
    textelement.value = '';

    set_time_remaining(time_remaining - core_storage_data['time-decrease']);
}

function set_time_remaining(new_time_remaining){
    time_remaining = new_time_remaining;
    time = time_remaining;
    document.getElementById('time').innerHTML = core_round({
      'decimals': 1,
      'number': time_remaining,
    });
}

function start(){
    set_time_remaining(core_storage_data['time-max']);

    document.getElementById('score').innerHTML = 0;
    document.getElementById('target').innerHTML = core_random_string({
      'characters': letters,
      'length': core_storage_data['length'],
    });
    let element = document.getElementById('text');
    element.value = '';
    element.readOnly = false;
    element.focus();

    core_interval_modify({
      'id': 'interval',
      'interval': 100,
      'todo': decisecond,
    });
}
