document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("No hay usuario logueado.");
    return;
  }

  const agregarBtn = document.getElementById("save");

  agregarBtn.addEventListener("click", function () {
    const salida = document.getElementById("departure").value;
    const llegada = document.getElementById("arrival").value;
    const hora = document.getElementById("timeid").value;
    const asientos = document.getElementById("seatsid").value;
    const costo = document.getElementById("feeid").value;
    const marcac = document.getElementById("brand").value;
    const modelo = document.getElementById("model").value;
    const anio = document.getElementById("yearid").value;

    const nuevoViaje = {
      salida: salida,
      llegada: llegada,
      hora: hora,
      asientos: Number(asientos),
      costo: costo,
      marcac: marcac,
      modelo: modelo,
      anio: anio,
    };

    // Asegurar que existe el array de viajes
    if (!currentUser.viajes) {
      currentUser.viajes = [];
    }

    currentUser.viajes.push(nuevoViaje);

    // Guardar en currentUser
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Actualizar el array de usuarios
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(
      (u) => u.name === currentUser.name
    );

    if (index !== -1) {
      users[index] = currentUser;
      localStorage.setItem("users", JSON.stringify(users));
    }
    alert("Viaje agregado correctamente");
  });
});
