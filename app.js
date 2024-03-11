// app.js

let player;
let playlist = []; // Array to store playlist video IDs
let currentVideoIndex = 0; // Index of the currently playing video

function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

function updateBattery(battery) {
  const batteryLevelElement = document.querySelector('.battery-level');

  const batteryIconElement = document.querySelector('.battery-icon');
  if (battery.level > 0.75) {
    batteryLevelElement.style.backgroundColor = '#2ecc71'; // Green
    batteryIconElement.style.backgroundColor = '#fff'; // White
  } else if (battery.level > 0.25) {
    batteryLevelElement.style.backgroundColor = '#f1c40f'; // Yellow
    batteryIconElement.style.backgroundColor = '#fff'; // White
  } else {
    batteryLevelElement.style.backgroundColor = '#e74c3c'; // Red
    batteryIconElement.style.backgroundColor = '#fff'; // White
  }
  batteryLevelElement.style.width = `${battery.level * 100}%`;
}

function initializeYoutubePlayer() {
  // Load YouTube Iframe API
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Create YouTube player
  window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('youtube-player', {
      height: '360',
      width: '640',
      playerVars: {
        controls: 0, // Hide video controls
        autoplay: 0, // Don't autoplay initially
        modestbranding: 1, // Show minimal YouTube branding
        fs: 0, // Hide fullscreen button
        cc_load_policy: 0, // Hide closed captions by default
        iv_load_policy: 3, // Don't show video annotations
        autohide: 1 // Hide video controls when not in use
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  };

  // When YouTube player is ready
  function onPlayerReady(event) {
    // Nothing to do here
  }

  // When YouTube player state changes
  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      // If the video ends, play the next video in the playlist
      playNextVideo();
    }
  }
}

function playNextVideo() {
  currentVideoIndex = (currentVideoIndex + 1) % playlist.length;
  player.loadVideoById(playlist[currentVideoIndex]);
}

function playPreviousVideo() {
  currentVideoIndex = (currentVideoIndex - 1 + playlist.length) % playlist.length;
  player.loadVideoById(playlist[currentVideoIndex]);
}

function playPauseVideo() {
  if (player.getPlayerState() === YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}

function toggleLoop() {
  player.setLoop(!player.getLoop());
}

document.getElementById('play-pause').addEventListener('click', playPauseVideo);
document.getElementById('loop').addEventListener('click', toggleLoop);
document.getElementById('previous').addEventListener('click', playPreviousVideo);
document.getElementById('next').addEventListener('click', playNextVideo);

setInterval(updateTime, 1000);

navigator.getBattery().then(battery => {
  updateBattery(battery);
  battery.addEventListener('levelchange', () => updateBattery(battery));
});

initializeYoutubePlayer(); // Initialize YouTube player
