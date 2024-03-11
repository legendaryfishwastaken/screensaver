const wallpapers = [
  'url1',
  'url2',
  'url3',
  // Add more wallpaper URLs here
];

const setRandomWallpaper = () => {
  const randomIndex = Math.floor(Math.random() * wallpapers.length);
  document.body.style.backgroundImage = `url(${wallpapers[randomIndex]})`;
};

setRandomWallpaper();

setInterval(setRandomWallpaper, 30000); // Change wallpaper every 30 seconds

let wakeLock = null;

const requestWakeLock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Screen wake lock active');
  } catch (error) {
    console.error('Failed to activate screen wake lock: ', error);
  }
};

requestWakeLock();

// Release the wake lock when the page is hidden or closed
window.addEventListener('blur', () => {
  if (wakeLock) {
    wakeLock.release();
    wakeLock = null;
    console.log('Screen wake lock released');
  }
});
