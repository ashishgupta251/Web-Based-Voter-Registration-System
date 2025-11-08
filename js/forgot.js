document.addEventListener("DOMContentLoaded", () => {
  
  const form = document.getElementById("forgot-form");
  const emailInput = document.getElementById("forgot-email");
  const emailIcon = document.getElementById("email-validation-icon");
  const msg = document.getElementById("msg");
  
  const sendBtn = document.getElementById("send-otp-btn");
  const btnText = sendBtn.querySelector('.btn-text');
  const spinner = sendBtn.querySelector('.spinner-icon');

  let isEmailValid = false;

  // --- 1. Live Email Validation ---
  emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(email)) {
      emailIcon.className = 'fa-solid fa-check validation-icon valid';
      isEmailValid = true;
    } else {
      emailIcon.className = 'fa-solid fa-times validation-icon invalid';
      isEmailValid = false;
    }
  });

  // --- 2. Form Submission ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!isEmailValid) {
      msg.innerHTML = `<i class="fa-solid fa-times-circle"></i> Please enter a valid email address.`;
      msg.style.color = "red";
      return;
    }

    // Show Spinner
    btnText.style.display = "none";
    spinner.style.display = "inline-block";
    sendBtn.disabled = true;
    emailInput.disabled = true;

    // Simulate sending OTP (2 seconds)
    setTimeout(() => {
      // Demo: Assume email exists and OTP is sent
      msg.innerHTML = `<i class="fa-solid fa-check-circle"></i> OTP sent successfully to ${emailInput.value}!`;
      msg.style.color = "green";
      
      // Redirect to the next step (OTP entry page)
      setTimeout(() => {
        // Hum user ka email agle page par bhej sakte hain (demo)
        // localStorage.setItem("resetEmail", emailInput.value); 
        window.location.href = "reset-otp.html";
      }, 2000);

    }, 2000);
  });

});