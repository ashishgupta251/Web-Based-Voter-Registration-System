document.addEventListener("DOMContentLoaded", () => {
  
  const form = document.getElementById("login-form");
  const loginId = document.getElementById("login-id");
  const loginPassword = document.getElementById("login-password");
  const msg = document.getElementById("msg");
  
  const loginBtn = document.getElementById("login-btn");
  const btnText = loginBtn.querySelector('.btn-text');
  const spinner = loginBtn.querySelector('.spinner-icon');

  const emailValidationIcon = document.getElementById("email-validation-icon");
  const togglePassword = document.getElementById("togglePassword");
  
  const captchaTextEl = document.getElementById("captcha-text");
  const captchaRefreshBtn = document.getElementById("captcha-refresh-btn");
  const captchaInput = document.getElementById("captcha-input");
  const captchaValidationIcon = document.getElementById("captcha-validation-icon");

  const googleLoginBtn = document.getElementById("google-login-btn");
  const facebookLoginBtn = document.getElementById("facebook-login-btn");

  let currentCaptcha = "";
  let isEmailValid = false;
  let isCaptchaValid = false;

  function generateCaptcha() {
    let chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    currentCaptcha = captcha;
    captchaTextEl.textContent = captcha;
    
    isCaptchaValid = false;
    captchaInput.value = "";
    captchaValidationIcon.style.display = "none";
    checkFormValidity();
  }
  
  loginBtn.disabled = true;
  loginBtn.style.background = "#aaa";
  loginBtn.style.cursor = "not-allowed";

  function checkFormValidity() {
    if (isEmailValid && isCaptchaValid) {
      loginBtn.disabled = false;
      loginBtn.style.background = "#0f3d91";
      loginBtn.style.cursor = "pointer";
    } else {
      loginBtn.disabled = true;
      loginBtn.style.background = "#aaa";
      loginBtn.style.cursor = "not-allowed";
    }
  }

  // --- Password Toggle Logic ---
  if (togglePassword && loginPassword) {
      togglePassword.addEventListener("click", function() {
          if (loginPassword.type === "password") {
              loginPassword.type = "text";
              this.classList.remove("fa-eye");
              this.classList.add("fa-eye-slash");
          } else {
              loginPassword.type = "password";
              this.classList.remove("fa-eye-slash");
              this.classList.add("fa-eye");
          }
      });
  }

  // Live Email Validation
  loginId.addEventListener("input", () => {
    const email = loginId.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    
    if (email === "") {
      emailValidationIcon.style.display = "none";
      isEmailValid = false;
    } else if (emailRegex.test(email) || (!isNaN(email) && email.length === 10)) {
      emailValidationIcon.className = 'fa-solid fa-check validation-icon valid';
      isEmailValid = true;
    } else {
      emailValidationIcon.className = 'fa-solid fa-times validation-icon invalid';
      isEmailValid = false;
    }
    checkFormValidity();
  });

  // Live CAPTCHA Validation
  captchaInput.addEventListener("input", () => {
    const userInput = captchaInput.value;
    
    if (userInput.length < 6) {
        captchaValidationIcon.style.display = "none";
        isCaptchaValid = false;
    } else if (userInput === currentCaptcha) {
        captchaValidationIcon.className = 'fa-solid fa-check validation-icon valid';
        isCaptchaValid = true;
    } else {
        captchaValidationIcon.className = 'fa-solid fa-times validation-icon invalid';
        isCaptchaValid = false;
    }
    checkFormValidity();
  });

  captchaRefreshBtn.addEventListener("click", generateCaptcha);

  // --- Form Submission Logic ---
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!isEmailValid) {
      msg.innerHTML = `<i class="fa-solid fa-times-circle"></i> Please enter a valid Email or Mobile.`;
      msg.style.color = "red";
      return;
    }
    if (!isCaptchaValid) {
      msg.innerHTML = `<i class="fa-solid fa-times-circle"></i> Incorrect CAPTCHA.`;
      msg.style.color = "red";
      generateCaptcha();
      return;
    }

    const emailOrPhone = loginId.value.trim();
    const password = loginPassword.value.trim();

    btnText.style.display = "none";
    spinner.style.display = "inline-block";
    loginBtn.disabled = true;
    loginId.disabled = true;
    loginPassword.disabled = true;

    // Simulate API Call (2 seconds)
    setTimeout(() => {
      
      // --- NEW: Check user in localStorage ---
      let users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => (u.email === emailOrPhone || u.mobile === emailOrPhone) && u.pass === password);

      if (user) {
        // --- Login Successful ---
        msg.innerHTML = `<i class="fa-solid fa-check-circle"></i> Login successful! Redirecting...`;
        msg.style.color = "green";
        
        // --- NEW: Set session tokens ---
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loggedInUser', user.name); // User ka naam save kiya
        
        setTimeout(()=> window.location.href = "dashboard.html", 2000);
      
      } else {
        // --- Login Failed ---
        msg.innerHTML = `<i class="fa-solid fa-times-circle"></i> Invalid credentials!`;
        msg.style.color = "red";

        // Hide Spinner on fail
        btnText.style.display = "inline-block";
        spinner.style.display = "none";
        loginId.disabled = false;
        loginPassword.disabled = false;
        
        generateCaptcha();
        checkFormValidity();
      }
      // --- End of new code ---

    }, 2000);
  });

  generateCaptcha();

  googleLoginBtn.addEventListener("click", () => {
    alert("Google Sign-In feature is coming soon!");
  });

  facebookLoginBtn.addEventListener("click", () => {
    alert("Facebook Sign-In feature is coming soon!");
  });

});