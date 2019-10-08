'use strict';

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
      'info': '<input id=start-button type=button value=Restart>',
      'keybinds': {
        13: {
          'todo': enter,
        },
      },
      'menu': true,
      'storage': {
        'length': 5,
        'time-decrease': .1,
        'time-max': 10,
      },
      'storage-menu': '<table><tr><td><input id=length><td>Length'
        + '<tr><td><input id=time-decrease><td>Time Decrease'
        + '<tr><td><input id=time-max><td>Time Max</table>',
      'title': 'SpeedType.htm',
    });
    audio_create({
      'audios': {
        'boop': {
          'duration': .1,
        },
      },
    });
}
