const contenedor = document.getElementById('contenedor-noticias');
const cargando = document.getElementById('cargando');
const errorDiv = document.getElementById('error');
const btnRefrescar = document.getElementById('btnRefrescar');

// Usando una API pública gratuita (NewsAPI - necesitarás tu propia clave)
const API_KEY = 'TU_API_KEY_AQUI'; // ← Cambia esto por tu clave
const URL = `https://newsapi.org/v2/top-headlines?country=mx&apiKey=${API_KEY}`;

async function cargarNoticias() {
    contenedor.innerHTML = '';
    cargando.style.display = 'block';
    errorDiv.style.display = 'none';

    try {
        const respuesta = await fetch(URL);
        
        if (!respuesta.ok) throw new Error('No se pudieron cargar las noticias');

        const datos = await respuesta.json();

        if (datos.articles.length === 0) {
            throw new Error('No hay noticias disponibles');
        }

        mostrarNoticias(datos.articles);

    } catch (error) {
        errorDiv.textContent = `❌ Error: ${error.message}`;
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
                <p>${noticia.description ? noticia.description.substring(0, 150) + '...' : 'Sin descripción disponible.'}</p>
                <a href="${noticia.url}" target="_blank">Leer noticia completa →</a>
            </div>
        `;

        contenedor.appendChild(articulo);
    });
}

// Evento del botón refrescar
btnRefrescar.addEventListener('click', cargarNoticias);

// Cargar noticias al iniciar
cargarNoticias();