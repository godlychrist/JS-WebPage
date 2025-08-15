document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || !Array.isArray(currentUser.viajes)) {
    console.warn("No hay usuario logueado o no tiene viajes.");
    return;
  }

  const tbody = document.querySelector("#rides-table tbody");

  currentUser.viajes.forEach((viaje, index) => {
    const row = document.createElement("tr");

    // Reutilizando tu estructura original de tabla
    row.innerHTML = `
      <td>${viaje.salida}</td>
      <td>${viaje.llegada}</td>
      <td>${viaje.asientos}</td>
      <td>${viaje.marcac} ${viaje.modelo} ${viaje.anio}</td>
      <td>${viaje.costo ? `$${viaje.costo}` : "-"}</td>
      <td>
        <a href="../../EditRide/View/index.html?index=${index}">Edit</a> | 
        <a href="deleted.html" class="delete-ride" data-index="${index}">Delete</a>
      </td>
    `;

    tbody.appendChild(row);
  });
});
