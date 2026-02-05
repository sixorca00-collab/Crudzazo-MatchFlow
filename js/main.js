import { Login } from "./login.js";
import { register } from "./register.js";

const registerView = document.getElementById("registerView");
const loginView = document.getElementById("loginView");

// Estado inicial → solo login
registerView.classList.add("hidden");
loginView.classList.remove("hidden");

document.getElementById("goLogin").onclick = () => {
  registerView.classList.add("hidden");
  loginView.classList.remove("hidden");
};

document.getElementById("goRegister").onclick = () => {
  loginView.classList.add("hidden");
  registerView.classList.remove("hidden");
};

register();
Login();
