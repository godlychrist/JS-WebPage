document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById('name');
  const bioInput = document.getElementById('bio');
  const saveLink = document.querySelector('.sign-up');

  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let users = JSON.parse(localStorage.getItem('users')) || [];

  if (!currentUser) {
    alert("No user logged in");
    return;
  }

  // Mostrar el nombre actual y bio si existe
  nameInput.value = currentUser.name || "";
  bioInput.value = currentUser.bio || "";

  saveLink.addEventListener('click', (e) => {
    e.preventDefault(); // prevenir navegación del <a>

    currentUser.name = nameInput.value.trim();
    currentUser.bio = bioInput.value.trim(); // este sí puede ser nuevo

    // Actualizar el usuario en el array `users`
    const index = users.findIndex(u => u.email === currentUser.email);
    if (index !== -1) {
      users[index] = currentUser;
    }

    // Guardar cambios
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('users', JSON.stringify(users));

    alert("Profile updated successfully!");
    // Puedes redirigir si querés después de guardar
  });
});
