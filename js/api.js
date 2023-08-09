const btnObtenerActividad = document.getElementById('btn-random-activity');
const actividadContainer = document.getElementById('activity-container');

btnObtenerActividad.addEventListener('click', () => {
    fetch('./json/tasks.json')
        .then(response => response.json())
        .then(data => {
            const actividades = data.actividades;
            const actividadAleatoria = actividades[Math.floor(Math.random() * actividades.length)];

            let colorClass = '';
            if (actividadAleatoria.dificultad === 'fácil') {
                colorClass = 'easy';
            } else if (actividadAleatoria.dificultad === 'media') {
                colorClass = 'medium';
            } else if (actividadAleatoria.dificultad === 'difícil') {
                colorClass = 'hard';
            }

            actividadContainer.innerHTML = `
            <h2>${actividadAleatoria.nombre}</h2>
            <span>Tipo:</span><p> ${actividadAleatoria.tipo}</p>
            <span>Dificultad:</span><p> ${actividadAleatoria.dificultad}</p>`;

            const dificultadElement = actividadContainer.querySelector('p:last-child');
            dificultadElement.classList.add(colorClass);
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
});


