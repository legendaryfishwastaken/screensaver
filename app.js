function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTime, 1000);

// Register service worker
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

// Keep screen always on
if ('wakeLock' in navigator) {
  const requestWakeLock = async () => {
    try {
      const wakeLock = await navigator.wakeLock.request('screen');
      console.log('Screen wake lock is active:', wakeLock.isActive);
    } catch (err) {
      console.error(`${err.name}, ${err.message}`);
    }
  };
  requestWakeLock();
} else {
  console.error('Wake Lock API is not supported.');
}
