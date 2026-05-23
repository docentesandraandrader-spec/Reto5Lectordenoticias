const contenedor = document.getElementById('contenedor-noticias');
const cargando = document.getElementById('cargando');
const errorDiv = document.getElementById('error');
const btnRefrescar = document.getElementById('btnRefrescar');

// === TU API KEY ===
const API_KEY = '1f5f9f8c7e5d4c3b2a1f9e8d7c6b5a4f';

const URL = `https://newsapi.org/v2/top-headlines?country=mx&apiKey=${API_KEY}`;

async function cargarNoticias() {
    contenedor.innerHTML = '';
    cargando.style.display = 'block';
    errorDiv.style.display = 'none';

    try {
        const respuesta = await fetch(URL);
        
        if (!respuesta.ok) throw new Error('Error al cargar las noticias');

        const datos = await respuesta.json();

        if (datos.articles && datos.articles.length > 0) {
            mostrarNoticias(datos.articles);
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
            ${noticia.urlToImage ? `<img src="${noticia.urlToImage}" alt="${noticia.title}">` : ''}
            <div class="info-noticia">
                <h3>${noticia.title}</h3>
                <p>${noticia.description ? noticia.description.substring(0, 160) + '...' : 'Sin descripción disponible.'}</p>
                <a href="${noticia.url}" target="_blank">Leer noticia completa →</a>
            </div>
        `;

        contenedor.appendChild(articulo);
    });
}

// Evento del botón
btnRefrescar.addEventListener('click', cargarNoticias);

// Cargar noticias automáticamente al abrir la página
cargarNoticias();
