'use strict';

function decisecond(){
    time = core_round({
      'decimals': 1,
      'number': time - .1,
    });

    core_elements['time'].textContent = core_number_format({
      'decimals-min': 1,
      'number': time,
    });

    if(time <= 0){
        core_interval_pause_all();
        document.getElementById('text').readOnly = true;
    }
}

function enter(){
    if(core_intervals['interval']['paused']){
        start();
    }

    const targetelement = document.getElementById('target');
    const textelement = document.getElementById('text');
    if(textelement.value !== targetelement.textContent){
        return;
    }

    audio_start('boop');

    const element = document.getElementById('score');
    element.textContent = Number.parseInt(
      element.textContent,
      10
    ) + 1;
    targetelement.textContent = core_random_string({
      'characters': letters,
      'length': core_storage_data['length'],
    });
    textelement.value = '';

    set_time_remaining(time_remaining - core_storage_data['time-decrease']);
}

function repo_escape(){
    if(!core_intervals['interval']
      && !core_menu_open){
        start();
    }
}

function repo_init(){
    core_repo_init({
      'events': {
        'start-button': {
          'onclick': function(){
              core_escape();
              start();
          },
        },
      },
      'globals': {
        'letters': 'abcdefghijklmnopqrstuvwxyz',
        'time': 0,
        'time_remaining': 0,
      },
      'info': '<button id=start-button type=button>Restart</button>',
      'keybinds': {
        'Enter': {
          'todo': enter,
        },
      },
      'menu': true,
      'storage': {
        'length': 5,
        'time-decrease': .1,
        'time-max': 10,
      },
      'storage-menu': '<table><tr><td><input class=mini id=length min=1 step=any type=number><td>Length'
        + '<tr><td><input class=mini id=time-decrease step=any type=number><td>Time Decrease'
        + '<tr><td><input class=mini id=time-max step=any type=number><td>Time Max</table>',
      'title': 'SpeedType.htm',
    });
    core_html_store([
      'time',
    ]);
}

function set_time_remaining(new_time_remaining){
    time_remaining = new_time_remaining;
    time = time_remaining;
    core_elements['time'].textContent = core_round({
      'decimals': 1,
      'number': time_remaining,
    });
}

function start(){
    set_time_remaining(core_storage_data['time-max']);

    document.getElementById('score').textContent = 0;
    document.getElementById('target').textContent = core_random_string({
      'characters': letters,
      'length': core_storage_data['length'],
    });
    const element = document.getElementById('text');
    element.value = '';
    element.readOnly = false;
    element.focus();

    core_interval_modify({
      'id': 'interval',
      'interval': 100,
      'todo': decisecond,
    });
}
