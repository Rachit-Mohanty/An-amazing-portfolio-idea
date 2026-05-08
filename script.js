
export const initClock = (setTimeCallback) => {
  const updateTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
    if (setTimeCallback) setTimeCallback(timeString);
    return timeString;
  };

  updateTime();
  const interval = setInterval(updateTime, 1000);
  return () => clearInterval(interval);
};

export const initTheme = (currentTheme, setThemeCallback) => {
  const root = document.documentElement;
  
  if (currentTheme === 'dark') {
    root.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    root.classList.remove('dark');
    localStorage.theme = 'light';
  }
};


export const handleImageProcess = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject("No file provided");
    
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};
