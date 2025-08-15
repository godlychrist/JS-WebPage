document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("form-container");

  if (!loginForm) {
    console.error('No se encontró el formulario con id "border-container"');
    return;
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar el usuario en la lista
    const userFound = users.find(
      (user) => user.name === username && user.password === password
    );

    if (userFound) {
      localStorage.setItem("currentUser", JSON.stringify(userFound));
      if (userFound.typeuser === "driver") {
        window.location.href = "../../MainView/View/empty.html";
      }
      if (userFound.typeuser === "user") {
 
          window.location.href = "../../MainView/View/empty.html";
  
      }
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  });
});
