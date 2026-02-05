import {RuName,RuPass,CRuPass,RuRol,btnReg,URL_company,URL_users} from "./elements.js";

export function register() {
  btnReg.addEventListener("click", async (e) => {
    e.preventDefault();

    let username = RuName.value;
    let userpass = RuPass.value;
    let conpass = CRuPass.value;
    let Role = RuRol.value;

    if (
      username.trim() === "" ||userpass.trim() === "" ||conpass.trim() === "") {
      alert("Por favor llene los espacios");
      return;
    }

    if (userpass !== conpass) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // 🔹 Elegir URL según rol
    let targetURL;
    if (Role === "user") {
      targetURL = URL_users;
    } else if (Role === "company") {
      targetURL = URL_company;
    } else {
      alert("Seleccione un rol válido");
      return;
    }

    // 🔹 Verificar si ya existe
    const res = await fetch(`${targetURL}?username=${username}`);
    const data = await res.json();

    if (data.length > 0) {
      alert("Ya hay un usuario con ese nombre.");
      return;
    }

    // 🔹 Enviar al endpoint correcto
    const postRes = await fetch(targetURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, userpass, Role })
    });

    if (!postRes.ok) {
      alert("Error al registrar");
      return;
    }

    alert("Registro exitoso ");
  });
}
