document.addEventListener("DOMContentLoaded", () => {
    
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    // --- Dynamic Header Navigation ---
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentFile = window.location.pathname.split('/').pop();

    if (isLoggedIn) {
        // User LOGGED IN hai
        navLinks.innerHTML = `
            <li><a href="index.html" class="${(currentFile === 'index.html' || currentFile === '') ? 'active' : ''}">Home</a></li>
            <li><a href="dashboard.html" class="${currentFile === 'dashboard.html' ? 'active' : ''}">Dashboard</a></li>
            <li><a href="#" id="common-logout-btn">Logout</a></li>
        `;
        
        const logoutBtn = document.getElementById("common-logout-btn");
        if(logoutBtn) {
            logoutBtn.addEventListener("click", (e) => {
                e.preventDefault();
                alert("You have been logged out.");
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('loggedInUser');
                window.location.href = 'login.html';
            });
        }
    } else {
        // User LOGGED OUT hai
        navLinks.innerHTML = `
            <li><a href="index.html" class="${(currentFile === 'index.html' || currentFile === '') ? 'active' : ''}">Home</a></li>
            <li><a href="register.html" class="${currentFile === 'register.html' ? 'active' : ''}">Register</a></li>
            <li><a href="login.html" class="${currentFile === 'login.html' ? 'active' : ''}">Login</a></li>
            <li><a href="verify.html" class="${currentFile === 'verify.html' ? 'active' : ''}">Verify</a></li>
        `;
    }

    // --- Hamburger menu toggle ---
    if(hamburger && navLinks){
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });
    }

    // --- Dark Mode Logic ---
    const themeSwitchHTML = `
      <i class="fa-solid fa-sun"></i>
      <label class="theme-switch">
        <input type="checkbox" id="theme-toggle-checkbox">
        <span class="slider"></span>
      </label>
      <i class="fa-solid fa-moon"></i>
    `;
    
    const header = document.querySelector("header");
    const themeWrapper = document.createElement("div");
    themeWrapper.className = "theme-switch-wrapper";
    themeWrapper.innerHTML = themeSwitchHTML;
    
    if (header && hamburger) {
        header.insertBefore(themeWrapper, hamburger);
    }

    const themeToggle = document.getElementById("theme-toggle-checkbox");
    const body = document.body;

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.checked = true;
        } else {
            body.classList.remove('dark-mode');
            themeToggle.checked = false;
        }
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            applyTheme('light');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- NEW: Back to Top Button Logic ---
    
    // 1. Create the button
    const toTopButton = document.createElement("button");
    toTopButton.id = "back-to-top-btn";
    toTopButton.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
    body.appendChild(toTopButton); // Button ko body mein add karo

    // 2. Show/Hide on Scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) { // 300px scroll karne ke baad
            toTopButton.classList.add("show");
        } else {
            toTopButton.classList.remove("show");
        }
    });

    // 3. Scroll to Top on Click
    toTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll
        });
    });

});