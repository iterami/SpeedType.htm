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
      'storage': {
        'length': 5,
        'time-max': 10,
      },
      'storage-menu': '<table><tr><td><input id=length><td>Length<tr><td><input id=time-max><td>Time</table>',
      'title': 'SpeedType.htm',
    });
}
