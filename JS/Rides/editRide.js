document.addEventListener("DOMContentLoaded", () => {
  // Obtener el índice del viaje de la URL
  const params = new URLSearchParams(window.location.search);
  const index = params.get("index");
  
  if (index === null) {
    alert("No se especificó viaje a editar.");
    return;
  }
  
  // Obtener currentUser y sus viajes
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || !Array.isArray(currentUser.viajes)) {
    alert("Usuario o viajes no encontrados.");
    return;
  }
  
  const viaje = currentUser.viajes[index];
  if (!viaje) {
    alert("Viaje no encontrado.");
    return;
  }
  
  // Llenar los inputs con los datos del viaje
  document.getElementById("departure").value = viaje.salida || "";
  document.getElementById("arrival").value = viaje.llegada || "";
  
  // Por ejemplo, si tenés días como array ['mon', 'wed'], marcás checkboxes
  const days = viaje.dias || [];
  ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].forEach(day => {
    document.getElementById(day).checked = days.includes(day);
  });
  
  document.getElementById("time").value = viaje.hora || "0";
  document.getElementById("seats").value = viaje.asientos || 1;
  document.getElementById("fee").value = viaje.costo || 1;
  document.getElementById("brand").value = viaje.marcac || "0";
  document.getElementById("model").value = viaje.modelo || "";
  document.getElementById("year").value = viaje.anio || 2020;
  
  // Capturar click en el "Save" (el <a> con clase .save)
  document.querySelector(".save").addEventListener("click", (e) => {
    e.preventDefault(); // Evitar que navegue de inmediato
    
    // Actualizar el viaje con valores actuales
    viaje.salida = document.getElementById("departure").value.trim();
    viaje.llegada = document.getElementById("arrival").value.trim();
    
    // Obtener días marcados
    viaje.dias = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].filter(day => document.getElementById(day).checked);
    
    viaje.hora = document.getElementById("time").value;
    viaje.asientos = parseInt(document.getElementById("seats").value, 10);
    viaje.costo = parseFloat(document.getElementById("fee").value);
    viaje.marcac = document.getElementById("brand").value;
    viaje.modelo = document.getElementById("model").value.trim();
    viaje.anio = parseInt(document.getElementById("year").value, 10);
    
    // Guardar en localStorage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    
    // Redirigir a la página que quieras (por ejemplo: la lista de rides)
    window.location.href = "../../MyRides/View/index.html";
  });
});
