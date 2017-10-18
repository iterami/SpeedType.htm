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
      'info-events': {
        'start-button': {
          'todo': start,
        },
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
