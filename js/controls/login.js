// Init Auth Service
const auth = new AuthService();
// Init Message Module
const message = new Message();
message.init();

// Login UI
const form = document.forms["loginForm"];
const emailInput = form.elements["email"];
const passwordInput = form.elements["password"];

// Login handler
function submitHandler(e) {
    e.preventDefault();

    const validation = new Validation(form);
    validation.init();

    if (!validation.check()) return console.error("Validation error.");
    
    auth.login(emailInput.value, passwordInput.value)
        .then((res) => {
            if (!res.error) {
                localStorage.setItem("social_user_id", res.id);
                localStorage.setItem("social_user_token", res.token);
                window.location = "index1.html";
            } else {
                message.show({text: res.message, error: res.error});
            }
        });
}

form.addEventListener("submit", submitHandler);