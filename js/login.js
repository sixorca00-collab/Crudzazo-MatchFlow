import { URL_users, URL_company,btnLog } from "./elements.js";

export function Login() {
  const btn = document.getElementById("btnLogin");
  if (!btn) return;

  btnLog.addEventListener("click", async (e) => {
    e.preventDefault();

    const username = document.getElementById("lUser").value;
    const userpass = document.getElementById("lPass").value;

    if (!username || !userpass) {
      alert("LLene todos los campos");
      return;
    }

    try {
      // 🔹 Buscar en USERS
      let res = await fetch(
        `${URL_users}?username=${username}&userpass=${userpass}`
      );
      let data = await res.json();

      let user = null;
      let role = "users";

      // 🔹 Si no existe en users, buscar en companies
      if (data.length === 0) {
        res = await fetch(
          `${URL_company}?username=${username}&userpass=${userpass}`
        );
        data = await res.json();
        role = "companies";
      }

      if (data.length === 0) {
        alert("El usuario no esta registrado");
        return;
      }

      user = data[0];

      // 🔹 Guardar sesión
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("role", role);
      localStorage.setItem("userId", user.id);

      // 🔹 Redirección por rol
      if (role === "companies") {
        window.location.href = "./views/company.html";
      } else {
        window.location.href = "./views/user.html";
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Server error");
    }
  });
}
