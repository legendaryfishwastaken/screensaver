// app.js

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

setInterval(updateTime, 1000);

navigator.getBattery().then(battery => {
  updateBattery(battery);
  battery.addEventListener('levelchange', () => updateBattery(battery));
});

function expandPlayer() {
  document.getElementById('spotify-player').style.width = '300px';
}

function collapsePlayer() {
  document.getElementById('spotify-player').style.width = '50px';
}

function validateAndEmbedPlaylist() {
  const input = document.getElementById('playlist-url');
  const spotifyIframe = document.getElementById('spotify-iframe');
  const url = input.value.trim();
  const spotifyEmbedUrl = 'https://open.spotify.com/embed/playlist/';

  if (url.startsWith('https://open.spotify.com/playlist/')) {
    const playlistId = url.split('/playlist/')[1];
    spotifyIframe.src = `${spotifyEmbedUrl}${playlistId}`;
  } else {
    input.value = '';
    input.placeholder = 'Invalid Spotify playlist URL';
  }
}
