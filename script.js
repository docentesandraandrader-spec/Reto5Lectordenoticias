const contenedor = document.getElementById('contenedor-noticias');
const cargando = document.getElementById('cargando');
const errorDiv = document.getElementById('error');
const btnRefrescar = document.getElementById('btnRefrescar');

// Usando una API pública gratuita sin clave (The Guardian)
const URL = 'https://content.guardianapis.com/search?api-key=test&show-fields=thumbnail,trailText&order-by=newest';

async function cargarNoticias() {
    contenedor.innerHTML = '';
    cargando.style.display = 'block';
    errorDiv.style.display = 'none';

    try {
        const respuesta = await fetch(URL);
        
        if (!respuesta.ok) throw new Error('Error al cargar las noticias');

        const datos = await respuesta.json();
        const noticias = datos.response.results;

        if (noticias && noticias.length > 0) {
            mostrarNoticias(noticias);
        } else {
            throw new Error('No se encontraron noticias');
        }

    } catch (error) {
        errorDiv.textContent = `❌ ${error.message}`;
        errorDiv.style.display = 'block';
    } finally {
        cargando.style.display = 'none';
    }
}

function mostrarNoticias(noticias) {
    noticias.forEach(noticia => {
        const articulo = document.createElement('div');
        articulo.className = 'noticia';

        articulo.innerHTML = `
            ${noticia.fields && noticia.fields.thumbnail ? `<img src="${noticia.fields.thumbnail}" alt="${noticia.webTitle}">` : ''}
            <div class="info-noticia">
                <h3>${noticia.webTitle}</h3>
                <p>${noticia.fields && noticia.fields.trailText ? noticia.fields.trailText : 'Sin descripción disponible.'}</p>
                <a href="${noticia.webUrl}" target="_blank">Leer noticia completa →</a>
            </div>
        `;

        contenedor.appendChild(articulo);
    });
}

// Botón actualizar
btnRefrescar.addEventListener('click', cargarNoticias);

// Cargar al iniciar
cargarNoticias();
