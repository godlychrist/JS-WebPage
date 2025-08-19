document.addEventListener("DOMContentLoaded", function () {
  // FORMULARIO DE LOGIN
  const loginForm = document.getElementById("form-container");

  if (!loginForm) {
    console.error('No se encontró el formulario con id "form-container"');
  } else {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const userFound = users.find(
        (user) => user.name === username && user.password === password
      );

      if (userFound) {
        localStorage.setItem("currentUser", JSON.stringify(userFound));

        // Redirigir según el tipo de usuario
        window.location.href = "../../MainView/View/empty.html";
      } else {
        alert("Usuario o contraseña incorrectos.");
      }
    });
  }

  // PROTECCIÓN DEL FOOTER
  const footer = document.getElementById("footer");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser && footer) {
    footer.style.display = "none";
  }
});
