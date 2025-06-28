function logout() {
  if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    alert('Sesión cerrada exitosamente');
    window.location.href = 'login.html';
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

// Mensaje de bienvenida cuando carga la página
window.addEventListener('load', function () {
  console.log('Dashboard cargado exitosamente');
  console.log('Redirect desde login funcionando correctamente');
});
