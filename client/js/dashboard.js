let id = 0;

function logout() {
  if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    localStorage.removeItem('user');
    alert('Sesión cerrada exitosamente');
    window.location.href = '/login';
  }
}

function goToTasks() {
  const tasksSection = document.querySelector('.tasks-section');
  tasksSection.scrollIntoView({ behavior: 'smooth' });
}

function goToStats() {
  alert('Redirigiendo a estadísticas... (Página próximamente)');
}

function goToSettings() {
  alert('Redirigiendo a configuración... (Página próximamente)');
}

// Función para cargar tareas
async function loadTasks() {
  const container = document.getElementById('tasksContainer');

  try {
    container.innerHTML = '<div class="loading">Cargando tareas...</div>';

    const response = await fetch('http://localhost:3000/api/tasks');

    if (response.ok) {
      const tasks = await response.json();
      renderTasks(tasks);
    } else {
      container.innerHTML =
        '<div class="no-tasks">Error al cargar las tareas. Código: ' +
        response.status +
        '</div>';
    }
  } catch (error) {
    container.innerHTML =
      '<div class="no-tasks">Error de conexión: ' + error.message + '</div>';
    console.error('Error loading tasks:', error);
  }
}

function renderTasks(tasks) {
  const container = document.getElementById('tasksContainer');

  if (!tasks || tasks.length === 0) {
    container.innerHTML =
      '<div class="no-tasks">No hay tareas disponibles. ¡Crea tu primera tarea!</div>';
    return;
  }

  const tasksHTML = tasks
    .map(
      (task) => `
    <div class="task-item">
      <div class="task-content">
        <div class="task-info">
          <h4>${task.task}</h4>
          <div class="task-date">
             Fecha límite: ${formatTaskDate(task.dueDate)}
          </div>
        </div>
        <div class="task-actions">
          <button class="task-btn edit" onclick="editTask('${task.id}')">
          Editar  
          </button>
          <button class="task-btn delete" onclick="deleteTask('${task.id}')">
             Eliminar
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join('');

  container.innerHTML = tasksHTML;
}

function formatTaskDate(dateString) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    return dateString;
  }
}

async function editTask(taskId) {
  try {
    // Primero obtenemos la tarea actual
    const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`);

    if (!response.ok) {
      // Si no hay endpoint específico para una tarea, obtenemos todas y filtramos
      const allTasksResponse = await fetch('http://localhost:3000/api/tasks');
      if (allTasksResponse.ok) {
        const allTasks = await allTasksResponse.json();
        const task = allTasks.find((t) => t.id === taskId);
        if (task) {
          openEditModal(task);
        } else {
          alert('Tarea no encontrada');
        }
      } else {
        alert('Error al cargar la tarea');
      }
      return;
    }

    const task = await response.json();
    openEditModal(task);
  } catch (error) {
    alert('Error de conexión: ' + error.message);
  }
}

async function deleteTask(taskId) {
  if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Tarea eliminada exitosamente');
      loadTasks();
    } else {
      alert('Error al eliminar la tarea');
    }
  } catch (error) {
    alert('Error de conexión: ' + error.message);
  }
}

// Función simple para agregar tareas
async function createNewTask(event) {
  event.preventDefault();

  const taskDescription = document.getElementById('taskDescription').value;
  const taskDueDate = String(document.getElementById('taskDueDate').value);

  const taskData = {
    task: taskDescription,
    date: taskDueDate,
    id: `task${id++}`,
  };

  try {
    const response = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      alert('Tarea creada exitosamente');
      document.getElementById('addTaskForm').reset();
      loadTasks();
    } else {
      alert('Error al crear la tarea');
    }
  } catch (error) {
    alert('Error de conexión: ' + error.message);
  }
}

async function testAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/tasks');
    if (response.ok) {
      const tasks = await response.json();
      alert(`¡API funcionando! Se encontraron ${tasks.length || 0} tareas.`);
      loadTasks();
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

// Cuando carga la página
window.addEventListener('load', function () {
  console.log('Dashboard cargado exitosamente');
  console.log('Redirect desde login funcionando correctamente');

  updateWelcomeMessage();

  const user = localStorage.getItem('user');
  if (!user) {
    alert('Debes iniciar sesión primero');
    window.location.href = '/login';
    return;
  }

  // Configurar el evento del formulario simple
  const addTaskForm = document.getElementById('addTaskForm');
  addTaskForm.addEventListener('submit', createNewTask);

  loadTasks();
});
