'use strict';

function decisecond(){
    time = core_round({
      'decimals': 1,
      'number': time - .1,
    });

    core_ui_update({
      'ids': {
        'time': core_number_format({
          'decimals-min': 1,
          'number': time,
        }),
      },
    });

    if(time <= 0){
        core_interval_pause_all();
        core_elements['text'].readOnly = true;
    }
}

function enter(){
    if(core_intervals['interval']['paused']){
        start();
    }

    if(core_elements['text'].value !== core_elements['target'].textContent){
        return;
    }

    audio_start('boop');
    core_ui_update({
      'ids': {
        'score': ++score,
        'target': core_random_string({
          'characters': letters,
          'length': core_storage_data['length'],
        }),
      },
    });
    core_elements['text'].value = '';

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
        'go': {
          'onclick': function(){
              enter();
              core_elements['text'].focus();
          },
        },
        'start-button': {
          'onclick': function(){
              core_escape();
              start();
          },
        },
      },
      'globals': {
        'letters': 'abcdefghijklmnopqrstuvwxyz',
        'score': 0,
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
      'storage-menu': '<table><tr><td><input class=mini id=length min=1 step=1 type=number><td>Length'
        + '<tr><td><input class=mini id=time-decrease step=any type=number><td>Time Decrease'
        + '<tr><td><input class=mini id=time-max step=any type=number><td>Time Max</table>',
      'title': 'SpeedType.htm',
    });
}

function set_time_remaining(new_time_remaining){
    time_remaining = new_time_remaining;
    time = time_remaining;
    core_ui_update({
      'ids': {
        'time': core_round({
          'decimals': 1,
          'number': time_remaining,
        }),
      },
    });
}

function start(){
    if(score > 0
      && !globalThis.confirm('Start new game?')){
        return;
    }
    score = 0;
    set_time_remaining(core_storage_data['time-max']);

    core_ui_update({
      'ids': {
        'score': 0,
        'target': core_random_string({
          'characters': letters,
          'length': core_storage_data['length'],
        }),
        'text': '',
      },
    });
    core_elements['text'].readOnly = false;
    core_elements['text'].focus();

    core_interval_modify({
      'id': 'interval',
      'interval': 100,
      'todo': decisecond,
    });
}
