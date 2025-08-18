document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById('first-name');
  const lastnameInput = document.getElementById('last-name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('first-password');
  const password2Input = document.getElementById('second-password');
  const addressInput = document.getElementById('address');
  const countrySelect = document.getElementById('country');
  const stateInput = document.getElementById('state');
  const cityInput = document.getElementById('city');
  const phoneInput = document.getElementById('phone-number');

  const saveLink = document.querySelector('.sign-up');

  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let users = JSON.parse(localStorage.getItem('users')) || [];

  if (!currentUser) {
    alert('No user logged in');
    return;
  }

  function fillForm() {
    nameInput.value = currentUser.name || "";
    lastnameInput.value = currentUser.lastname || "";
    emailInput.value = currentUser.email || "";
    passwordInput.value = currentUser.password || "";
    password2Input.value = currentUser.password || "";
    addressInput.value = currentUser.address || "";
    cityInput.value = currentUser.city || "";
    stateInput.value = currentUser.state || "";
    phoneInput.value = currentUser.phoneCode || "";

    const countries = ['Costa Rica', 'USA', 'Mexico'];
    countrySelect.innerHTML = countries.map(c =>
      `<option value="${c}" ${c === currentUser.country ? 'selected' : ''}>${c}</option>`
    ).join('');
  }

  fillForm();

  saveLink.addEventListener('click', (e) => {
    e.preventDefault(); // Evita que el <a> navegue

    if (passwordInput.value !== password2Input.value) {
      alert("Passwords don't match!");
      return;
    }

    currentUser.name = nameInput.value.trim();
    currentUser.lastname = lastnameInput.value.trim();
    currentUser.email = emailInput.value.trim();
    currentUser.password = passwordInput.value;
    currentUser.address = addressInput.value.trim();
    currentUser.country = countrySelect.value;
    currentUser.state = stateInput.value.trim();
    currentUser.city = cityInput.value.trim();
    currentUser.phoneCode = phoneInput.value.trim();

    const index = users.findIndex(u => u.email === currentUser.email);
    if (index !== -1) {
      users[index] = currentUser;
    } else {
      users.push(currentUser);
    }

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    alert("Profile updated successfully!");
    // Aquí decides si quieres redirigir o no, ejemplo:
    // window.location.href = '../../MainView/View/empty.html';
  });
});
