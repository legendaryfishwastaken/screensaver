const wallpapers = [
  'https://images7.alphacoders.com/133/thumb-440-1330715.webp',
  'https://images3.alphacoders.com/133/thumb-440-1330825.webp',
  'https://images7.alphacoders.com/133/thumb-440-1337829.webp',
  // Add more wallpaper URLs here
];
const setRandomWallpaper = () => {
  const randomIndex = Math.floor(Math.random() * wallpapers.length);
  const randomWallpaperUrl = wallpapers[randomIndex];
  const styleTag = document.createElement('style');
  styleTag.innerHTML = `body { background-image: url(${randomWallpaperUrl}); }`;
  document.head.appendChild(styleTag);
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
