document.addEventListener("DOMContentLoaded", () => {
  
  const form = document.getElementById('otp-form');
  const msg = document.getElementById('msg');
  const resendBtn = document.getElementById('resend-btn');
  const verifyBtn = document.getElementById('verify-otp-btn');
  const btnText = verifyBtn.querySelector('.btn-text');
  const spinner = verifyBtn.querySelector('.spinner-icon');
  const otpInputs = document.querySelectorAll('.otp-input');

  // ----- 1. OTP BOX LOGIC (Same as verify.js) -----
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      if (e.target.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
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

  // ----- 2. FORM SUBMIT LOGIC -----
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let otpCode = "";
    otpInputs.forEach(input => {
      otpCode += input.value;
    });

    if (otpCode.length !== 6) {
      msg.innerHTML = `<i class="fa-solid fa-times-circle"></i> Please enter the 6-digit code!`;
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
      
      // Demo: Koi bhi 6-digit code chalega (ya "123456" use karein)
      if (otpCode === "123456") { // Demo code
        msg.innerHTML = `<i class="fa-solid fa-check-circle"></i> Code verified! Redirecting...`;
        msg.style.color = "green";
        
        // Redirect to the final step (New Password page)
        setTimeout(() => {
          window.location.href = "new-password.html";
        }, 1500);

      } else {
        msg.innerHTML = `<i class="fa-solid fa-times-circle"></i> Invalid verification code!`;
        msg.style.color = "red";

        // --- Hide Spinner ---
        btnText.style.display = "inline-block";
        spinner.style.display = "none";
        verifyBtn.disabled = false;
        otpInputs.forEach(input => input.disabled = false);
      }
    }, 2000);
  });

  // ----- 3. RESEND CODE LOGIC (Same as verify.js) -----
  resendBtn.addEventListener('click', () => {
    msg.style.color = "#0f3d91";
    msg.innerHTML = `<i class="fa-solid fa-check-circle"></i> New OTP sent successfully!`;
    
    resendBtn.disabled = true;
    let seconds = 30;
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