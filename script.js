const contenedor = document.getElementById('contenedor-noticias');
const cargando = document.getElementById('cargando');
const errorDiv = document.getElementById('error');
const btnRefrescar = document.getElementById('btnRefrescar');

// API que funciona mejor en GitHub Pages
const URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/mundo/rss.xml';

async function cargarNoticias() {
    contenedor.innerHTML = '';
    cargando.style.display = 'block';
    errorDiv.style.display = 'none';

    try {
        const respuesta = await fetch(URL);
        
        if (!respuesta.ok) throw new Error('Error al cargar las noticias');

        const datos = await respuesta.json();
        
        if (datos.items && datos.items.length > 0) {
            mostrarNoticias(datos.items);
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
            <div class="info-noticia">
                <h3>${noticia.title}</h3>
                <p>${noticia.description ? noticia.description.substring(0, 160) + '...' : 'Sin descripción disponible.'}</p>
                <a href="${noticia.link}" target="_blank">Leer noticia completa →</a>
            </div>
        `;

        contenedor.appendChild(articulo);
    });
}

// Botón de actualizar
btnRefrescar.addEventListener('click', cargarNoticias);

// Cargar automáticamente
cargarNoticias();
