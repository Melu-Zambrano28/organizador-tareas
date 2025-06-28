# 🌹 Cliente HTML - Organizador de Tareas

## 📁 Estructura de Archivos

```
client/
├── css/
│   ├── common.css     # Estilos comunes (botones, formularios, utilidades)
│   ├── login.css      # Estilos específicos para la página de login
│   └── dashboard.css  # Estilos específicos para el dashboard
├── js/
│   ├── common.js      # Funciones JavaScript comunes (utilidades, validaciones)
│   ├── login.js       # Lógica específica para la página de login
│   └── dashboard.js   # Lógica específica para el dashboard
├── login.html         # Página de inicio de sesión
├── dashboard.html     # Panel principal después del login
└── README.md          # Este archivo
```

## 🚀 Cómo usar

### 1. **Abrir la página de login**

- Abre `login.html` en tu navegador
- Puedes hacer doble clic en el archivo o arrastrar al navegador

### 2. **Credenciales de prueba**

Para hacer el login exitoso, usa:

- **Email:** `admin@test.com`
- **Contraseña:** `123456`

### 3. **Redirect automático**

- Después de un login exitoso, te redirigirá automáticamente a `dashboard.html`
- El redirect ocurre después de 1.5 segundos

## ✨ Características

### Login (login.html)

- ✅ Formulario de login con validación
- ✅ Diseño moderno y responsivo
- ✅ Mensajes de error y éxito
- ✅ **Redirect automático con `window.location.href`**
- ✅ **CSS separado y organizado**

### Dashboard (dashboard.html)

- ✅ Panel principal con tarjetas informativas
- ✅ Botón de logout que regresa al login
- ✅ Botón para probar la API de tu backend
- ✅ Diseño moderno con gradientes
- ✅ **CSS separado y organizado**

### Archivos CSS

- ✅ **common.css**: Estilos reutilizables (botones, formularios, mensajes)
- ✅ **login.css**: Estilos específicos para la página de login
- ✅ **dashboard.css**: Estilos específicos para el dashboard
- ✅ **Estructura modular y mantenible**

### Archivos JavaScript

- ✅ **common.js**: Funciones utilitarias (validaciones, HTTP requests, mensajes)
- ✅ **login.js**: Lógica del formulario de login y redirect
- ✅ **dashboard.js**: Funciones del dashboard (logout, navegación, API)
- ✅ **Código modular y reutilizable**

## 🔧 Personalización

### Cambiar credenciales de login

En `js/login.js`, línea ~18:

```javascript
if (email === 'admin@test.com' && password === '123456') {
  // Cambia estas credenciales aquí
}
```

### Cambiar URL de redirect

En `js/login.js`, línea ~23:

```javascript
window.location.href = 'dashboard.html'; // Cambia aquí
```

### Conectar con tu API

El dashboard incluye una función `testAPI()` que intenta conectar con `/api/tasks`

### Importación de archivos externos

Los archivos HTML ahora importan CSS y JS externos:

**CSS:**

```html
<link rel="stylesheet" href="css/common.css" />
<link rel="stylesheet" href="css/login.css" />
```

**JavaScript:**

```html
<script src="js/common.js"></script>
<script src="js/login.js"></script>
```

### Ventajas de la separación:

- 🎯 **Mantenibilidad**: Código organizado por responsabilidad
- 🔄 **Reutilización**: Archivos comunes para múltiples páginas
- 🚀 **Performance**: Los archivos se pueden cachear
- 📝 **Legibilidad**: HTML más limpio sin código inline
- 🧪 **Testing**: JavaScript separado es más fácil de probar
- 👥 **Colaboración**: Múltiples desarrolladores pueden trabajar en paralelo

## 📝 Diferentes formas de hacer redirect en HTML

1. **Con JavaScript (usado en el proyecto):**

```javascript
window.location.href = 'pagina.html';
```

2. **Con link HTML básico:**

```html
<a href="dashboard.html">Ir al Dashboard</a>
```

3. **Con botón y JavaScript:**

```html
<button onclick="window.open('dashboard.html', '_blank')">
  Abrir en nueva pestaña
</button>
```

4. **Con setTimeout (usado para el delay):**

```javascript
setTimeout(function () {
  window.location.href = 'dashboard.html';
}, 1500);
```

¡Listo para usar! 🎉
