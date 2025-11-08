document.addEventListener("DOMContentLoaded", () => {
  
  const form = document.getElementById('verify-form');
  const msg = document.getElementById('msg');
  const resendBtn = document.getElementById('resend-btn');
  const verifyBtn = document.getElementById('verify-btn');
  const btnText = verifyBtn.querySelector('.btn-text');
  const spinner = verifyBtn.querySelector('.spinner-icon');
  const otpInputs = document.querySelectorAll('.otp-input');
  const idInput = document.getElementById('verify-id');

  // ----- 1. OTP BOX LOGIC -----
  
  otpInputs.forEach((input, index) => {
    // Handle digit input
    input.addEventListener('input', (e) => {
      if (e.target.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    // Handle Backspace
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
        otpInputs[index - 1].focus();
      }
    });

    // Handle Paste
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasteData = e.clipboardData.getData('text').trim();
      if (pasteData.length === otpInputs.length) {
        otpInputs.forEach((box, i) => {
          box.value = pasteData[i] || '';
        });
        otpInputs[otpInputs.length - 1].focus();
      }
    });
  });

  // ----- 2. FORM SUBMIT LOGIC (with Spinner) -----

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Combine OTP
    let otpCode = "";
    otpInputs.forEach(input => {
      otpCode += input.value;
    });

    const id = idInput.value.trim();

    if (id === "" || otpCode.length !== 6) {
      msg.textContent = "Please fill all fields and the 6-digit code!";
      msg.style.color = "red";
      return;
    }

    // --- Show Spinner ---
    btnText.style.display = "none";
    spinner.style.display = "inline-block";
    verifyBtn.disabled = true;
    otpInputs.forEach(input => input.disabled = true);
    
    // --- Simulate API Call (2 seconds) ---
    setTimeout(() => {
      
    // Simple fake verification check for demo
      if (otpCode === "123456") {
        msg.innerHTML = `<i class="fa-solid fa-check-circle"></i> Verified successful!`;
        msg.style.color = "green";
      } else {
        msg.innerHTML = `<i class="fa-solid fa-times-circle"></i> Invalid verification code!`;
        msg.style.color = "red";
      }

      // --- Hide Spinner ---
      btnText.style.display = "inline-block";
      spinner.style.display = "none";
      verifyBtn.disabled = false;
      otpInputs.forEach(input => input.disabled = false);

    }, 2000); // 2-second delay
  });

  // ----- 3. RESEND CODE LOGIC (with Timer) -----
  
  resendBtn.addEventListener('click', () => {
    // Show confirmation
    msg.style.color = "#0f3d91";
    msg.textContent = "Verification code resent successfully!";
    
    // Disable button and start timer
    resendBtn.disabled = true;
    let seconds = 30; // 30-second timer
    
    resendBtn.textContent = `Resend in 00:${seconds}`;

    const interval = setInterval(() => {
      seconds--;
      resendBtn.textContent = `Resend in 00:${seconds < 10 ? '0' : ''}${seconds}`;

      if (seconds <= 0) {
        clearInterval(interval);
        resendBtn.disabled = false;
        resendBtn.textContent = "Resend Code";
      }
    }, 1000);
  });

});