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

  batteryLevelElement.style.width = `${battery.level * 100}%`;
}

setInterval(updateTime, 1000);

navigator.getBattery().then(battery => {
  updateBattery(battery);
  battery.addEventListener('levelchange', () => updateBattery(battery));
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
