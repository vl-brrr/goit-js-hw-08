import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

pageStart();

function pageStart() {
  if (localStorage.getItem('videoplayer-current-time')) {
    const currentTime = JSON.parse(
      localStorage.getItem('videoplayer-current-time')
    );
    player.setCurrentTime(currentTime);
  } else {
    return;
  }
}

player.on('timeupdate', throttle(timeUpdate, 1000));

function timeUpdate() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      localStorage.setItem('videoplayer-current-time', JSON.stringify(seconds));
    })
    .catch(function (error) {
      console.log(`Error: ${error}`);
    });
}
