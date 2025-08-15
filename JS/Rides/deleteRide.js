document.querySelector("#rides-table tbody").addEventListener("click", function(e) {
  if (e.target.classList.contains("delete-ride")) {
    e.preventDefault(); // evito que haga link

    const index = parseInt(e.target.dataset.index, 10);

    if (isNaN(index)) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || !Array.isArray(currentUser.viajes)) return;

    // Confirmar antes de borrar
    if (!confirm("¿Querés eliminar este viaje?")) return;

    currentUser.viajes.splice(index, 1);

    // Guardar cambios en localStorage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Actualizar usuarios también
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.name === currentUser.name);
    if (userIndex !== -1) {
      users[userIndex] = currentUser;
      localStorage.setItem("users", JSON.stringify(users));
    }

    // Re-renderizar tabla para reflejar cambios
    renderRides();
    location.reload();

  }
});
