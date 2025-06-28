document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';

    if (email === 'admin@test.com' && password === '123456') {
      successMessage.style.display = 'block';

      setTimeout(function () {
        window.location.href = 'dashboard.html';
      }, 1500);
    } else {
      errorMessage.style.display = 'block';
    }
  });
});

function redirectToDashboard() {
  window.location.href = 'dashboard.html';
}
