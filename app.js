const wallpapers = [
    'url1',
    'url2',
    'url3',
    // Add more wallpaper URLs here
];

function setWallpaper() {
    const randomWallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];
    document.body.style.backgroundImage = `url(${randomWallpaper})`;
}

// Set the initial wallpaper
setWallpaper();

// Rotate wallpapers every 30 seconds
setInterval(setWallpaper, 30000);

// Keep the screen on
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        document.body.requestPointerLock();
    }
});
