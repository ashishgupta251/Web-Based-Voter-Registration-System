// --- NEW: Route Guard ---
// Yeh check karega ki user logged in hai ya nahi
// Yeh DOMContentLoaded se pehle run hona chahiye
if (localStorage.getItem('isLoggedIn') !== 'true') {
    // Agar logged in nahi hai, toh login page par bhej do
    alert("Access Denied. Please login first.");
    window.location.href = "login.html";
}


document.addEventListener("DOMContentLoaded", () => {
    
    // --- NEW: Show User Name ---
    const welcomeHeader = document.querySelector(".welcome-header h1");
    const userName = localStorage.getItem('loggedInUser');
    if (welcomeHeader && userName) {
        welcomeHeader.textContent = `Welcome, ${userName.split(' ')[0]}!`;
    }

    // --- Logout Button Logic (Updated) ---
    const logoutBtn = document.getElementById("logout-btn");

    if(logoutBtn) { // Check if logout button exists on this page
      logoutBtn.addEventListener("click", () => {
          alert("You have been logged out successfully.");
          
          // --- NEW: Clear session from localStorage ---
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('loggedInUser');
          
          window.location.href = "login.html";
      });
    }

    // --- Demo Link Alerts (Same as before) ---
    const profileLink = document.getElementById("profile-link");
    const appsLink = document.getElementById("apps-link");

    if (profileLink) {
      profileLink.addEventListener("click", (e) => {
          e.preventDefault();
          alert("Profile page is coming soon!");
      });
    }

    if (appsLink) {
      appsLink.addEventListener("click", (e) => {
          e.preventDefault();
          alert("Applications page is coming soon!");
      });
    }

});