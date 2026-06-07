export const getGreeting = (): string => {
    const now = new Date();
const utcHour = now.getUTCHours();
    const hour = utcHour % 24; // Convert to UTC+1
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 16) {
      return 'Good Day';
    } else {
      return 'Good Evening';
    }
  };


  
  