// app.js

function loadPlaylist() {
  const playlistUrl = document.getElementById('playlist-url').value;
  const spotifyIframe = document.getElementById('spotify-iframe');
  spotifyIframe.src = playlistUrl;
}

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
