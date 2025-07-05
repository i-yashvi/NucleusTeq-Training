document.addEventListener("DOMContentLoaded", function (event) {
    event.preventDefault();

    const user = getUser(); // Check if user is stored in localStorage
    if (user) {
        redirectToDashboard(); // Redirect to the correct dashboard
    }

    const signupPage = document.getElementById("signup-page");
    const signupUsingEmailButton = document.getElementById("email-signup-button");
    const loginFormButton = document.getElementById("login-form-button");

    const loginPage = document.getElementById("login-page");
    const loginUsingEmailButton = document.getElementById("email-login-button");
    const signupFormButton = document.getElementById("signup-form-button");

    loginFormButton.addEventListener("click", () => {
        signupPage.style.display = "none";
        loginPage.style.display = "flex";
        document.getElementById("signup-form").reset();
    });
    signupFormButton.addEventListener("click", () => {
        loginPage.style.display = "none";
        signupPage.style.display = "flex";
        document.getElementById("login-form").reset();
    })
    

    // SIGNUP FUNCTIONALITY
    signupUsingEmailButton.addEventListener("click", async function() {
        const nameInput = document.getElementById("name-input");
        const emailInput = document.getElementById("email-input");
        const passwordInput = document.getElementById("password-input");
        const roleOptions = document.getElementById("select-role");
        const departmentOptions = document.getElementById("select-dept");
    
        const fullName = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const role = roleOptions.value;
        const departmentName = departmentOptions.value;
    
        if (!fullName || !email || !password || !role || !departmentName) {
            alert("All fields are mandatory!");
            return;
        }
        if (password.length < 8) {
            alert("Password must be at least 8 characters long!");
            return;
        }
    
        const userData = { fullName, email, password, role, departmentName };
    
        try {
            await signupApi(userData);  // Call function from api.js
            alert("Signup successful! Redirecting to login...");
    
            signupPage.style.display = "none";
            loginPage.style.display = "flex";
            document.getElementById("signup-form").reset();
        } catch (error) {
            console.error("Signup failed:", error.message);
        }
    });
    

    // LOGIN FUNCTIONALITY
    loginUsingEmailButton.addEventListener("click", async function() {

        const email = document.getElementById("email-auth").value.trim();
        const password = document.getElementById("password-auth").value.trim();

        if (!email || !password) {
            alert("Please enter both email and password!");
            return;
        }

        try {
            const response = await loginApi({ email, password });  // Call function from api.js
            
            localStorage.setItem("user", JSON.stringify(response));  // Store user data in localStorage
            alert("Login successful! Redirecting to dashboard...");
            
            redirectToDashboard();  // Redirect based on role
    
        } catch (error) {
            alert(error.message);
        }
    });
});