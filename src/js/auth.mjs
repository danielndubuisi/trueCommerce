import { alertMessage } from "./utils.mjs";

const pathname = window.location.pathname;
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

// check url
const formElement = pathname.includes("signup.html") ? signupForm : loginForm;
// validate form
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;

  if (form.checkValidity()) {
    // add a session
    sessionStorage.setItem("isLoggedIn", "true");
    // Simulate successful signup
    alertMessage("Successful! Logging you in...");
    setTimeout(() => {
      window.location.href = "../news/index.html";
    }, 2000);
  }
});
