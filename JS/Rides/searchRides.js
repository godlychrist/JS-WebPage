document.addEventListener("DOMContentLoaded", () => {
  const fromSelect = document.querySelector(".from-rides");
  const toSelect = document.querySelector(".to-rides");
  const findRidesBtn = document.getElementById("findRidesBtn");
  const ridesTable = document.querySelector(".rides-found");

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser")); // Usuario logueado

  const allRoutes = [];

  users.forEach((user) => {
    if (user.viajes && Array.isArray(user.viajes)) {
      user.viajes.forEach((viaje) => {
        if (viaje.salida && viaje.llegada) {
          allRoutes.push({
            from: viaje.salida,
            to: viaje.llegada,
          });
        }
      });
    }
  });

  const uniqueFrom = [...new Set(allRoutes.map((r) => r.from))];
  const uniqueTo = [...new Set(allRoutes.map((r) => r.to))];

  fromSelect.innerHTML = uniqueFrom
    .map((loc) => `<option value="${loc}">${loc}</option>`)
    .join("");
  toSelect.innerHTML = uniqueTo
    .map((loc) => `<option value="${loc}">${loc}</option>`)
    .join("");

  findRidesBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const from = fromSelect.value;
    const to = toSelect.value;

    const rows = ridesTable.querySelectorAll("tr:not(.header-row)");
    rows.forEach((row) => row.remove());

    users.forEach((user) => {
      if (user.typeuser === "driver" && user.viajes) {
        user.viajes.forEach((viaje) => {
          if (viaje.salida === from && viaje.llegada === to) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <th><img src="../../MainView/Images/user.png" alt="user-logo" class="user-logo"> ${user.name}</th>
                <th>${viaje.salida}</th>
                <th>${viaje.llegada}</th>
                <th>${viaje.asientos}</th>
                <th>${viaje.marcac} ${viaje.modelo} ${viaje.anio}</th>
                <th>$${viaje.costo}</th>
                <th><a href="#" class="request-link">Request</a></th>
            `;
            ridesTable.appendChild(row);

            const requestBtn = row.querySelector(".request-link");
            requestBtn.addEventListener("click", (ev) => {
              ev.preventDefault();

              if (!currentUser) {
                alert("You must be logged in to request a ride.");
                return;
              }

              const booking = {
                driver: user.name,
                ride: `${viaje.salida} - ${viaje.llegada}`,
                status: "pending",
              };

              // 1. Agregar booking al currentUser
              if (!currentUser.bookings) {
                currentUser.bookings = [];
              }
              currentUser.bookings.push(booking);

              // 2. Actualizar currentUser en localStorage
              localStorage.setItem("currentUser", JSON.stringify(currentUser));

              // 3. También actualizar al usuario en el array de "users"
              const userIndex = users.findIndex(
                (u) => u.email === currentUser.email
              );

              if (userIndex !== -1) {
                if (!users[userIndex].bookings) {
                  users[userIndex].bookings = [];
                }
                users[userIndex].bookings.push(booking);
                localStorage.setItem("users", JSON.stringify(users));
              }

              alert("Booking request sent!");
            });
          }
        });
      }
    });
  });
});
