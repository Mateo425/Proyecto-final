// Variables y selectores
const nuevaTareaInput = document.getElementById('nueva-tarea');
const agregarTareaBtn = document.getElementById('agregar-tarea');
const listaTareas = document.getElementById('lista-tareas');

let tareas = [];
async function cargarDatos() {
    try {
        const response = await axios.get('tasks.json');
        tareas = response.data;
        renderTareas();
    } catch (error) {
        console.error('Error cargando datos:', error);
    }
}

function agregarTarea() {
    const descripcion = nuevaTareaInput.value.trim();

    if (descripcion) {
        tareas.push({ descripcion, completada: false });
        renderTareas();
        nuevaTareaInput.value = '';
    } else {
        alert('Por favor ingrese una descripción válida');
    }
}

function eliminarTarea(index) {
    tareas.splice(index, 1);
    renderTareas();
}

function toggleTarea(index) {
    tareas[index].completada = !tareas[index].completada;
    renderTareas();
}

function renderTareas() {
    listaTareas.innerHTML = '';
    tareas.forEach((tarea, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span style="text-decoration: ${tarea.completada ? 'line-through' : 'none'}">
                ${tarea.descripcion}
            </span>
            <div>
                <button onclick="toggleTarea(${index})">
                    ${tarea.completada ? 'Desmarcar' : 'Completar'}
                </button>
                <button onclick="eliminarTarea(${index})">Eliminar</button>
            </div>
        `;
        listaTareas.appendChild(li);
    });
}

// Eventos
agregarTareaBtn.addEventListener('click', agregarTarea);

// Inicialización
cargarDatos();