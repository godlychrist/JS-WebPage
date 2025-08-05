document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('general-container');
  if (!form) {
    console.error('No se encontró el formulario con id "general-container"');
    return;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const success = storeInputs();
    if (success) {
      window.location.href = '../../index.html';
    }
  });
});

function storeInputs() {
  const name = document.getElementById('first-name').value;
  const lastname = document.getElementById('last-name').value;
  const cedula = document.getElementById('cedula').value;
  const bornDate = document.getElementById('born-date').value;
  const email = document.getElementById('email').value;
  const phoneCode = document.getElementById('phone-code').value;
  const password = document.getElementById('first-password').value;
  const password2 = document.getElementById('second-password').value;

  const typeuser = "user";

  if (password === password2) {
    const userData = {
      name: name,
      email: email,
      lastname: lastname,
      cedula: cedula,
      phoneCode: phoneCode,
      password: password,
      typeuser: typeuser
    };

    let users = JSON.parse(localStorage.getItem('users'));
    if (users) {
      users.push(userData);
    } else {
      users = [userData];
    }

    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful!');
    return true;
  } else {
    alert('Passwords do not match. Please try again.');
    return false;
  }
}
