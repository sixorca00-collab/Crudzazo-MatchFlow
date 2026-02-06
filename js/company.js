import { URL_jobs } from "./elements.js";

/* =======================
   AUTH GUARD (COMPANY)
======================= */

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const role = localStorage.getItem("role");

if (!currentUser || role !== "companies") {
  alert("Unauthorized");
  window.location.href = "../index.html";
}

/* =======================
   MODAL LOGIC
======================= */

const createBtn = document.getElementById("createBtn");
const modal = document.getElementById("jobModal");
const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const saveJobBtn = document.getElementById("saveJob");

createBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
});

function hideModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

closeModal.addEventListener("click", hideModal);
cancelBtn.addEventListener("click", hideModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) hideModal();
});

/* =======================
   CREATE JOB (JSON SERVER)
======================= */

saveJobBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const jobNameInput = document.getElementById("nameJob");
  const jobSalInput = document.getElementById("sal");
  const jobIndustryInput = document.getElementById("industry");
  const jobCountryInput = document.getElementById("country");

  if (
    !jobNameInput ||
    !jobSalInput ||
    !jobIndustryInput ||
    !jobCountryInput
  ) {
    console.error("Inputs not found");
    return;
  }

  const jobName = jobNameInput.value.trim();
  const jobSal = jobSalInput.value.trim();
  const jobIndustry = jobIndustryInput.value.trim();
  const jobCountry = jobCountryInput.value;

  if (!jobName || !jobSal || !jobIndustry || !jobCountry) {
    alert("Complete all fields");
    return;
  }

  const newJob = {
    title: jobName,
    salary: Number(jobSal),
    industry: jobIndustry,
    country: jobCountry,
    status: "Aplicado",
    companyId: currentUser.id, // 🔐 MISMA SESIÓN DEL LOGIN
    createdAt: new Date().toISOString()
  };

  try {
    const response = await fetch(URL_jobs, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newJob)
    });

    if (!response.ok) throw new Error("Error creating job");

    hideModal();
    const form = saveJobBtn.closest("form");
    if (form) form.reset();

    console.log("Job created");

  } catch (error) {
    console.error(error);
    alert("Could not save job");
  }
});
//Cerrar session.
const btnLogout = document.getElementById("logoutBtn");

if (btnLogout) {
  btnLogout.addEventListener("click", () => {
    // Limpiar sesión
    localStorage.removeItem("isAuth");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("role");

    //  Redirigir al login
    window.location.href = "../index.html";
  });
}
