document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector(".table-container table");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    table.innerHTML += `<tr><td colspan="3">Please login to see your bookings.</td></tr>`;
    return;
  }

  // Limpiar filas demo si las hay (opcional)
  const demoRows = table.querySelectorAll("tr:not(.first-row)");
  demoRows.forEach((row) => row.remove());

  if (currentUser.typeuser === "driver") {
    // Mostrar bookings recibidos por este driver, con botones si status pending
    // Buscamos en todos los usuarios sus bookings dirigidos a este driver
    const receivedBookings = [];

    users.forEach((user) => {
      if (user.bookings && Array.isArray(user.bookings)) {
        user.bookings.forEach((booking, idx) => {
          if (booking.driver === currentUser.name) {
            receivedBookings.push({
              requester: user.name,
              ride: booking.ride,
              status: booking.status,
              userEmail: user.email,
              bookingIndex: idx,
            });
          }
        });
      }
    });

    if (receivedBookings.length === 0) {
      table.innerHTML += `<tr><td colspan="3">No bookings received yet.</td></tr>`;
      return;
    }

    receivedBookings.forEach((booking) => {
      const row = document.createElement("tr");

      let actionHTML = "";
      if (booking.status === "pending") {
        actionHTML = `
          <a href="#" class="accept-btn" data-email="${booking.userEmail}" data-index="${booking.bookingIndex}">Accept</a> |
          <a href="#" class="reject-btn" data-email="${booking.userEmail}" data-index="${booking.bookingIndex}">Reject</a>
        `;
      } else {
        actionHTML = `<span>${booking.status}</span>`;
      }

      row.innerHTML = `
        <td>
          <div class="driver-cell">
            <img src="../Images/user.png" alt="user-logo" class="user-logo">
            <span>${booking.requester}</span>
          </div>
        </td>
        <th>${booking.ride}</th>
        <th>${actionHTML}</th>
      `;

      table.appendChild(row);
    });

    // Event delegation para Accept/Reject
    table.addEventListener("click", (e) => {
      if (e.target.classList.contains("accept-btn") || e.target.classList.contains("reject-btn")) {
        e.preventDefault();

        const email = e.target.dataset.email;
        const index = parseInt(e.target.dataset.index);
        const action = e.target.classList.contains("accept-btn") ? "accepted" : "rejected";

        // Encontrar el usuario y actualizar el booking
        const userToUpdate = users.find((u) => u.email === email);
        if (userToUpdate && userToUpdate.bookings && userToUpdate.bookings[index]) {
          userToUpdate.bookings[index].status = action;
          localStorage.setItem("users", JSON.stringify(users));
          location.reload(); // Recargar para actualizar la vista
        }
      }
    });
  } else {
    // Usuario normal: mostrar sus bookings (sin botones, solo estado)
    if (!currentUser.bookings || currentUser.bookings.length === 0) {
      table.innerHTML += `<tr><td colspan="3">No bookings made yet.</td></tr>`;
      return;
    }

    currentUser.bookings.forEach((booking) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>
          <div class="driver-cell">
            <img src="../Images/user.png" alt="user-logo" class="user-logo">
            <span>${booking.driver}</span>
          </div>
        </td>
        <th>${booking.ride}</th>
        <th><span>${booking.status}</span></th>
      `;

      table.appendChild(row);
    });
  }
});
