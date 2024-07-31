
import { Button, Container } from '@mui/material';

// Function to clear all localStorage data
const clearLocalStorage = () => {
  localStorage.clear();
  alert('Local Storage cleared');
};

// Function to clear all sessionStorage data
const clearSessionStorage = () => {
  sessionStorage.clear();
  alert('Session Storage cleared');
};

// Function to clear all cookies
const clearAllCookies = () => {
  document.cookie.split(";").forEach((c) => {
    document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  });
  alert('Cookies cleared');
};

// Main component to clear session data
const ClearSessionData = () => {
  const clearAllData = () => {
    clearLocalStorage();
    clearSessionStorage();
    clearAllCookies();
  };

  return (
    <Container style={{ marginTop: '20px', textAlign: 'center' }}>
      <Button variant="contained" color="secondary" onClick={clearAllData}>
        Clear All Session Data
      </Button>
    </Container>
  );
};

export default ClearSessionData;
