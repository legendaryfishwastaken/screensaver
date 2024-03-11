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
