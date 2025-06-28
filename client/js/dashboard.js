function logout() {
  if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    localStorage.removeItem('user');
    alert('Sesión cerrada exitosamente');
    window.location.href = '/login';
  }
}

function goToTasks() {
  alert('Redirigiendo a la sección de tareas... (Página próximamente)');
}

function goToStats() {
  alert('Redirigiendo a estadísticas... (Página próximamente)');
}

function goToSettings() {
  alert('Redirigiendo a configuración... (Página próximamente)');
}

// Función para probar la conexión con tu API backend
async function testAPI() {
  try {
    const response = await fetch('/api/tasks');
    if (response.ok) {
      const tasks = await response.json();
      alert(`¡API funcionando! Se encontraron ${tasks.length || 0} tareas.`);
    } else {
      alert(
        'Error al conectar con la API. Verifica que el backend esté ejecutándose.',
      );
    }
  } catch (error) {
    alert('Error al conectar con la API: ' + error.message);
  }
}

function updateWelcomeMessage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const welcomeSection = document.querySelector('.welcome-section h2');

  if (user.name && welcomeSection) {
    welcomeSection.textContent = `¡Bienvenido/a de vuelta, ${user.name}!`;
  }
}

// Mensaje de bienvenida cuando carga la página
window.addEventListener('load', function () {
  console.log('Dashboard cargado exitosamente');
  console.log('Redirect desde login funcionando correctamente');

  updateWelcomeMessage();

  const user = localStorage.getItem('user');
  if (!user) {
    alert('Debes iniciar sesión primero');
    window.location.href = '/login';
  }
});
