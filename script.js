// ==================== SCRIPT.JS - VERSIÓN SIMPLE Y FUNCIONAL ====================

const contenedor = document.getElementById('contenedor-noticias');
const cargando = document.getElementById('cargando');
const errorDiv = document.getElementById('error');
const btnRefrescar = document.getElementById('btnRefrescar');

const noticiasMock = [
    {
        title: "México lidera en adopción de inteligencia artificial en Latinoamérica",
        description: "Según un nuevo estudio, México se posiciona como uno de los países con mayor crecimiento en IA.",
        link: "#",
        image: "https://picsum.photos/600/300?random=1"
    },
    {
        title: "UVEG lanza nueva plataforma digital para estudiantes",
        description: "La Universidad Virtual del Estado de Guanajuato presenta mejoras significativas en su sistema educativo.",
        link: "#",
        image: "https://picsum.photos/600/300?random=2"
    },
    {
        title: "Economía mexicana muestra signos de recuperación en 2026",
        description: "Expertos destacan el crecimiento en sectores tecnológicos y de servicios.",
        link: "#",
        image: "https://picsum.photos/600/300?random=3"
    }
];

function mostrarNoticias() {
    contenedor.innerHTML = '';

    noticiasMock.forEach(noticia => {
        const articulo = document.createElement('div');
        articulo.className = 'noticia';
        
        articulo.innerHTML = `
            <img src="${noticia.image}" alt="${noticia.title}">
            <div class="info-noticia">
                <h3>${noticia.title}</h3>
                <p>${noticia.description}</p>
                <a href="${noticia.link}" target="_blank">Leer noticia completa →</a>
            </div>
        `;
        contenedor.appendChild(articulo);
    });
}

function cargarNoticias() {
    cargando.style.display = 'block';
    errorDiv.style.display = 'none';

    setTimeout(() => {
        mostrarNoticias();
        cargando.style.display = 'none';
    }, 600);
}

// Eventos
btnRefrescar.addEventListener('click', cargarNoticias);

// Cargar al iniciar
cargarNoticias();
