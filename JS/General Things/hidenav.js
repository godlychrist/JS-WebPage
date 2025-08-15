document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return;

  // Si es usuario normal, ocultar el menú de "Rides"
  if (currentUser.typeuser === "user") {
    const ridesNav = document.getElementById("myrides");
    const ridesFooter = document.getElementById("rides");
    const raya = document.getElementById("raya");
    if (ridesNav) {
      ridesNav.style.display = "none";
    }
    if(ridesFooter) {
        ridesFooter.style.display = "none";
    }
    if (raya) {
        raya.style.display = "none";
    }
  }

  // Si es driver, podrías ocultar "Bookings" si quisieras (opcional)
  if (currentUser.typeuser === "driver") {

  }
});
