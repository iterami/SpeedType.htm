'use strict';

function repo_escape(){
    stop();
}

function repo_init(){
    core_repo_init({
      'audios': {
        'boop': {
          'duration': .1,
        },
      },
      'events': {
        'start-button': {
          'onclick': start,
        },
      },
      'globals': {
        'interval': 0,
        'letters': 'abcdefghijklmnopqrstuvwxyz',
        'time': 0,
        'time_remaining': 0,
      },
      'keybinds': {
        13: {
          'todo': enter,
        },
      },
      'title': 'SpeedType.htm',
    });

    document.getElementById('score').innerHTML = '0';
    document.getElementById('target').innerHTML = '-----';
    document.getElementById('time').innerHTML = '10.0';
}
