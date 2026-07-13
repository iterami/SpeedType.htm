'use strict';

function decisecond(){
    if(time > 0){
        time = core_round({
          'decimals': 1,
          'number': time - .1,
        });

        core_ui_update({
          'ids': {
            'time': core_number_format({
              'decimals_min': 1,
              'number': time,
            }),
          },
        });
    }

    if(time <= 0){
        core_interval_lock('interval');
        core_elements.text.readOnly = true;
        core_elements.text.blur();
    }
}

function enter(){
    if(core_intervals.interval.paused){
        start();
    }

    if(core_elements.text.value !== core_elements.target.textContent){
        return;
    }

    audio_start('boop');
    core_ui_update({
      'ids': {
        'score': ++score,
        'target': core_random_string({
          'characters': core_storage_data.letters,
          'length': core_storage_data.length,
        }),
      },
    });
    core_elements.text.value = '';

    set_time_remaining(time_remaining - core_storage_data.time_decrease);
}

function repo_escape(){
    audio_state_all(!core_menu_open);

    if(!core_intervals.interval
      && !core_menu_open){
        start();
    }

    core_elements.text.readOnly = core_menu_open || time <= 0;
}

function repo_init(){
    core_repo_init({
      'beforeunload': function(event){
          if(score !== 0){
              core_escape(true);
              event.preventDefault();
          }
      },
      'events': {
        'start': {
          'onclick': function(){
              core_escape(false);
              start();
          },
        },
        'text': {
          'onkeydown': function(event){
              if(event.key === 'Enter'){
                  event.preventDefault();
                  enter();
              }
          },
        },
      },
      'globals': {
        'score': 0,
        'time': 0,
        'time_remaining': 0,
      },
      'info': '<button class=medium id=start type=button>Start New Game</button>',
      'menu': true,
      'storage': {
        'length': 5,
        'letters': 'abcdefghijklmnopqrstuvwxyz',
        'time_decrease': .1,
        'time_max': 10,
      },
      'storage_menu': '<textarea id=letters></textarea>'
        + '<table><tr><td><input class=mini id=length min=1 step=1 type=number><td>Length'
        + '<tr><td><input class=mini id=time_decrease step=any type=number><td>Time Decrease'
        + '<tr><td><input class=mini id=time_max min=.1 step=any type=number><td>Time Max</table>',
      'title': 'SpeedType.htm',
      'ui': ' <span id=score></span> | <span id=time></span>',
      'ui_elements': ['text'],
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
    if(score !== 0
      && !globalThis.confirm('Start new game?')){
        return;
    }
    score = 0;
    set_time_remaining(core_storage_data.time_max);

    core_ui_update({
      'ids': {
        'score': 0,
        'target': core_random_string({
          'characters': core_storage_data.letters,
          'length': core_storage_data.length,
        }),
        'text': '',
      },
    });
    core_elements.text.readOnly = false;
    core_elements.text.focus();

    core_interval_modify({
      'id': 'interval',
      'interval': 100,
      'todo': decisecond,
    });
}
