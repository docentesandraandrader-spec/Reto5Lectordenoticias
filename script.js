const contenedor = document.getElementById('contenedor-noticias');
const cargando = document.getElementById('cargando');
const errorDiv = document.getElementById('error');
const btnRefrescar = document.getElementById('btnRefrescar');

// Datos de ejemplo (Mock Data) - Funciona sin problemas
const noticiasMock = [
    {
        title: "México avanza en tecnología e inteligencia artificial",
        description: "El país se posiciona como uno de los líderes en adopción de nuevas tecnologías en América Latina.",
        link: "#",
        image: "https://picsum.photos/600/300?random=1"
    },
    {
        title: "Nuevo récord de exportaciones mexicanas en 2026",
        description: "Las exportaciones del país alcanzaron cifras históricas durante el primer trimestre del año.",
        link: "#",
        image: "https://picsum.photos/600/300?random=2"
    },
    {
        title: "Innovación educativa: UVEG implementa nuevas herramientas digitales",
        description: "La universidad virtual fortalece su plataforma con nuevas funcionalidades para sus estudiantes.",
        link: "#",
        image: "https://picsum.photos/600/300?random=3"
    }
];

function mostrarNoticias(noticias) {
    contenedor.innerHTML = '';
    
    noticias.forEach(noticia => {
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

    // Simulamos una pequeña espera
    setTimeout(() => {
        mostrarNoticias(noticiasMock);
        cargando.style.display = 'none';
    }, 800);
}

// Botón de actualizar
btnRefrescar.addEventListener('click', cargarNoticias);

// Cargar al iniciar la página
cargarNoticias();
