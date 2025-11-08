document.addEventListener("DOMContentLoaded", () => {
    
    // --- Form Elements ---
    const form = document.getElementById("new-pass-form");
    const newPass = document.getElementById("new-password");
    const confirmNewPass = document.getElementById("confirm-new-password");
    const msg = document.getElementById("msg");

    // --- Validation Icons ---
    const passIcon = document.getElementById("pass-validation-icon");
    const confirmPassIcon = document.getElementById("confirm-pass-validation-icon");
    
    // --- Toggles ---
    const togglePasswordBtn = document.getElementById("togglePassword");
    const toggleConfirmPasswordBtn = document.getElementById("toggleConfirmPassword");

    // --- Button & Spinner ---
    const resetBtn = document.getElementById("reset-pass-btn");
    const btnText = resetBtn.querySelector('.btn-text');
    const spinner = resetBtn.querySelector('.spinner-icon');

    // --- State ---
    let isPassValid = false;
    let isConfirmPassValid = false;

    // --- 1. Password Toggles ---
    function toggleField(field, icon) {
        if (field.type === "password") {
            field.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            field.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    }
    togglePasswordBtn.addEventListener("click", () => toggleField(newPass, togglePasswordBtn));
    toggleConfirmPasswordBtn.addEventListener("click", () => toggleField(confirmNewPass, toggleConfirmPasswordBtn));

    // --- 2. Live Validation ---
    newPass.addEventListener('input', () => {
        isPassValid = newPass.value.length >= 6;
        passIcon.className = `fa-solid ${isPassValid ? 'fa-check valid' : 'fa-times invalid'} validation-icon`;
        // Check confirm password match as well
        if (confirmNewPass.value.length > 0) {
            isConfirmPassValid = (newPass.value === confirmNewPass.value);
            confirmPassIcon.className = `fa-solid ${isConfirmPassValid ? 'fa-check valid' : 'fa-times invalid'} validation-icon`;
        }
    });

    confirmNewPass.addEventListener('input', () => {
        isConfirmPassValid = (newPass.value === confirmNewPass.value) && (confirmNewPass.value.length > 0);
        confirmPassIcon.className = `fa-solid ${isConfirmPassValid ? 'fa-check valid' : 'fa-times invalid'} validation-icon`;
    });

    // --- 3. Form Submission ---
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        if (!isPassValid || !isConfirmPassValid) {
            msg.innerHTML = `<i class="fa-solid fa-times-circle"></i> Please ensure passwords match and are 6+ characters.`;
            msg.style.color = "red";
            return;
        }

        // Show Spinner
        btnText.style.display = "none";
        spinner.style.display = "inline-block";
        resetBtn.disabled = true;

        // Simulate API call (1.5 seconds)
        setTimeout(() => {
            msg.innerHTML = `<i class="fa-solid fa-check-circle"></i> Password reset successfully! Redirecting to login...`;
            msg.style.color = "green";

            // Redirect to login page
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);

        }, 1500);
    });
});