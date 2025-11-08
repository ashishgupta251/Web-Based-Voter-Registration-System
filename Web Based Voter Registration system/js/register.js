document.addEventListener("DOMContentLoaded", () => {
    
    // --- Stepper Elements ---
    let currentStep = 1;
    const steps = [document.getElementById("step-1"), document.getElementById("step-2"), document.getElementById("step-3")];
    const formSteps = [document.getElementById("form-step-1"), document.getElementById("form-step-2"), document.getElementById("form-step-3")];

    // --- Buttons ---
    const nextStep1 = document.getElementById("next-step-1");
    const prevStep2 = document.getElementById("prev-step-2");
    const nextStep2 = document.getElementById("next-step-2");
    const prevStep3 = document.getElementById("prev-step-3");
    
    // --- Form & Fields ---
    const form = document.getElementById("registerForm");
    const msg = document.getElementById("msg"); // Ab yeh 'null' nahi hoga
    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    
    // --- Validation Icons ---
    const nameIcon = document.getElementById("name-validation-icon");
    const emailIcon = document.getElementById("email-validation-icon");
    const passIcon = document.getElementById("pass-validation-icon");
    const confirmPassIcon = document.getElementById("confirm-pass-validation-icon");

    // --- Toggles ---
    const togglePasswordBtn = document.getElementById("togglePassword");
    const toggleConfirmPasswordBtn = document.getElementById("toggleConfirmPassword");

    // --- CAPTCHA ---
    const captchaTextEl = document.getElementById("captcha-text");
    const captchaRefreshBtn = document.getElementById("captcha-refresh-btn");
    const captchaInput = document.getElementById("captcha-input");
    const captchaIcon = document.getElementById("captcha-validation-icon");

    // --- Button & Spinner ---
    const registerBtn = document.getElementById("register-btn");
    const btnText = registerBtn.querySelector('.btn-text');
    const spinner = registerBtn.querySelector('.spinner-icon');

    // --- State & Logic ---
    let currentCaptcha = "";
    let validState = {
        email: false,
        pass: false,
        confirmPass: false,
        name: false,
        otherFields: false,
        captcha: false,
    };

    // --- 1. Stepper Navigation Function ---
    function goToStep(stepNumber) {
        currentStep = stepNumber;
        formSteps.forEach(step => step.classList.remove('active'));
        document.getElementById(`form-step-${stepNumber}`).classList.add('active');
        
        steps.forEach((step, index) => {
            if (index + 1 === stepNumber) {
                step.classList.add('active');
            } else if (index + 1 < stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        document.title = `Voter Registration - Step ${stepNumber}`;
    }

    // --- 2. Step Validation Functions ---
    function validateStep1() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validState.email = emailRegex.test(email.value);
        validState.pass = password.value.length >= 6;
        validState.confirmPass = (password.value === confirmPassword.value) && (confirmPassword.value.length > 0);
        
        emailIcon.className = `fa-solid ${validState.email ? 'fa-check valid' : 'fa-times invalid'} validation-icon`;
        passIcon.className = `fa-solid ${validState.pass ? 'fa-check valid' : 'fa-times invalid'} validation-icon`;
        confirmPassIcon.className = `fa-solid ${validState.confirmPass ? 'fa-check valid' : 'fa-times invalid'} validation-icon`;
        
        return validState.email && validState.pass && validState.confirmPass;
    }
    
    function validateStep2() {
        const gender = document.getElementById("gender").value;
        const dob = document.getElementById("dob").value;
        const address = document.getElementById("address").value;
        
        validState.name = fullname.value.trim().length > 2;
        validState.otherFields = gender !== "" && dob !== "" && address !== "";

        nameIcon.className = `fa-solid ${validState.name ? 'fa-check valid' : 'fa-times invalid'} validation-icon`;
        
        return validState.name && validState.otherFields;
    }
    
    function validateStep3() {
        validState.captcha = captchaInput.value === currentCaptcha;
        captchaIcon.className = `fa-solid ${validState.captcha ? 'fa-check valid' : 'fa-times invalid'} validation-icon`;
        return validState.captcha;
    }

    // --- 3. Stepper Button Listeners ---
    nextStep1.addEventListener('click', () => {
        if (validateStep1()) {
            goToStep(2);
        } else {
            alert("Please correct the errors in Step 1.");
        }
    });

    prevStep2.addEventListener('click', () => goToStep(1));
    nextStep2.addEventListener('click', () => {
        if (validateStep2()) {
            goToStep(3);
        } else {
            alert("Please fill all personal details.");
        }
    });

    prevStep3.addEventListener('click', () => goToStep(2));

    // --- 4. CAPTCHA Generator ---
    function generateCaptcha() {
        let chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
        let captcha = "";
        for (let i = 0; i < 5; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        currentCaptcha = captcha;
        captchaTextEl.textContent = captcha;
        
        validState.captcha = false;
        captchaInput.value = "";
        captchaIcon.style.display = "none";
    }
    captchaRefreshBtn.addEventListener('click', generateCaptcha);

    // --- 5. Password Toggles ---
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
    togglePasswordBtn.addEventListener("click", () => toggleField(password, togglePasswordBtn));
    toggleConfirmPasswordBtn.addEventListener("click", () => toggleField(confirmPassword, toggleConfirmPasswordBtn));

    // --- 6. Live Validation (Step 1) ---
    email.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validState.email = emailRegex.test(email.value);
        emailIcon.className = `fa-solid ${validState.email ? 'fa-check valid' : 'fa-times invalid'} validation-icon`;
        checkFormValidity();
    });
    password.addEventListener('input', () => {
        validState.pass = password.value.length >= 6;
        passIcon.className = `fa-solid ${validState.pass ? 'fa-check valid' : 'fa-times invalid'} validation-icon`;
        if (confirmPassword.value.length > 0) {
            if (password.value === confirmPassword.value) {
                validState.confirmPass = true;
                confirmPassIcon.className = 'fa-solid fa-check valid validation-icon';
            } else {
                validState.confirmPass = false;
                confirmPassIcon.className = 'fa-solid fa-times invalid validation-icon';
            }
        }
        checkFormValidity();
    });
    confirmPassword.addEventListener('input', () => {
        validState.confirmPass = (password.value === confirmPassword.value) && (confirmPassword.value.length > 0);
        confirmPassIcon.className = `fa-solid ${validState.confirmPass ? 'fa-check valid' : 'fa-times invalid'} validation-icon`;
        checkFormValidity();
    });

    // --- 7. Live Validation (Step 2 & 3) ---
    fullname.addEventListener("input", () => {
        validState.name = fullname.value.trim().length > 2;
        nameIcon.className = `fa-solid ${validState.name ? 'fa-check valid' : 'fa-times invalid'} validation-icon`;
        checkFormValidity();
    });
    
    captchaInput.addEventListener("input", () => {
        if (captchaInput.value === currentCaptcha) {
            captchaIcon.className = 'fa-solid fa-check validation-icon valid';
            validState.captcha = true;
        } else {
            captchaIcon.className = 'fa-solid fa-times validation-icon invalid';
            validState.captcha = false;
        }
        checkFormValidity();
    });

    document.getElementById("gender")?.addEventListener("change", checkFormValidity);
    document.getElementById("dob")?.addEventListener("change", checkFormValidity);
    document.getElementById("address")?.addEventListener("input", checkFormValidity);
    
    // --- 8. Check Form Validity (Enables/Disables Register Button) ---
    function checkFormValidity() {
        const gender = document.getElementById("gender").value;
        const dob = document.getElementById("dob").value;
        const address = document.getElementById("address").value;
        
        validState.otherFields = gender !== "" && dob !== "" && address !== "";

        if (validState.name && validState.email && validState.pass && 
            validState.confirmPass && validState.captcha && validState.otherFields) {
            registerBtn.disabled = false;
            registerBtn.style.background = "#0f3d91";
            registerBtn.style.cursor = "pointer";
        } else {
            registerBtn.disabled = true;
            registerBtn.style.background = "#aaa";
            registerBtn.style.cursor = "not-allowed";
        }
    }

    // --- 9. Final Form Submission (LOGIC CORRECTED) ---
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validateStep1() || !validateStep2() || !validateStep3()) {
            if (msg) {
                msg.innerHTML = `<i class="fa-solid fa-times-circle"></i> Please correct all errors before submitting.`;
                msg.style.color = "red";
            }
            if (!validateStep1()) goToStep(1);
            else if (!validateStep2()) goToStep(2);
            return;
        }

        btnText.style.display = "none";
        spinner.style.display = "inline-block";
        registerBtn.disabled = true;

        setTimeout(() => {
            try {
                let users = JSON.parse(localStorage.getItem('users')) || [];
                
                if (users.find(user => user.email === email.value)) {
                    if(msg) {
                        msg.innerHTML = `<i class="fa-solid fa-times-circle"></i> This email is already registered!`;
                        msg.style.color = "red";
                    }
                    btnText.style.display = "inline-block";
                    spinner.style.display = "none";
                    registerBtn.disabled = false;
                    generateCaptcha();
                    checkFormValidity();
                
                } else {
                    users.push({
                        name: fullname.value,
                        email: email.value,
                        pass: password.value 
                    });
                    localStorage.setItem('users', JSON.stringify(users));
                    
                    if(msg) {
                        msg.innerHTML = `<i class="fa-solid fa-check-circle"></i> Registration successful!...`;
                        msg.style.color = "green";
                    }
                    
                    btnText.style.display = "inline-block";
                    spinner.style.display = "none";

                    setTimeout(() => {
                        form.reset();
                        goToStep(1);
                        if(msg) msg.innerHTML = "";
                        generateCaptcha();
                        validState = { email: false, pass: false, confirmPass: false, name: false, otherFields: false, captcha: false };
                        [nameIcon, emailIcon, passIcon, confirmPassIcon, captchaIcon].forEach(icon => { if(icon) icon.style.display = 'none'; });
                        checkFormValidity();
                    }, 2000); 
                }
            } catch (error) {
                console.error("Error saving to localStorage", error);
                if(msg) {
                    msg.innerHTML = `<i class="fa-solid fa-times-circle"></i> Registration failed. Please try again.`;
                    msg.style.color = "red";
                }
                btnText.style.display = "inline-block";
                spinner.style.display = "none";
                registerBtn.disabled = false;
                generateCaptcha();
                checkFormValidity();
            }

        }, 2000);
    });

    // --- 10. Initial Setup ---
    goToStep(1);
    generateCaptcha();
    checkFormValidity();
});