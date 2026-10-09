
// ==========================================
// PARA DAMARIS ❤️
// MI BELLO CIELO ESTRELLADO
// ==========================================

// ELEMENTOS PRINCIPALES
const musica = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");
const contenedorEstrellas = document.getElementById("estrellas");
const contenedorCorazones = document.getElementById("corazones");

// CONFIGURACIÓN DE LA MÚSICA
const VOLUMEN_MAXIMO = 0.35;
let intervaloVolumen = null;

musica.volume = VOLUMEN_MAXIMO;

// ==========================================
// REPRODUCCIÓN SUAVE DE LA MÚSICA
// ==========================================

async function iniciarMusica() {

  // Evitar iniciar dos veces
  if (!musica.paused) return;

  // Comenzar con volumen bajo
  musica.volume = 0;

  try {
    await musica.play();

    btnMusica.classList.add("reproduciendo");
    btnMusica.textContent = "♫";
    btnMusica.setAttribute("aria-label", "Pausar música");

    // Cancelar fundidos anteriores
    clearInterval(intervaloVolumen);

    let volumenActual = 0;

    // Subir gradualmente el volumen
    intervaloVolumen = setInterval(() => {

      volumenActual += 0.01;

      if (volumenActual >= VOLUMEN_MAXIMO) {
        volumenActual = VOLUMEN_MAXIMO;
        clearInterval(intervaloVolumen);
      }

      musica.volume = volumenActual;

    }, 100);

  } catch (error) {
    console.log("No se pudo reproducir la canción:", error);
    musica.volume = VOLUMEN_MAXIMO;
  }
}

// ==========================================
// BOTÓN DE MÚSICA
// ==========================================

btnMusica.addEventListener("click", () => {

  if (musica.paused) {

    iniciarMusica();

  } else {

    clearInterval(intervaloVolumen);

    musica.pause();

    btnMusica.classList.remove("reproduciendo");
    btnMusica.textContent = "♫";
    btnMusica.setAttribute("aria-label", "Reproducir música");

  }

});

// ==========================================
// CAMBIAR ENTRE PANTALLAS
// ==========================================

function irA(id) {

  const destino = document.getElementById(id);

  if (!destino) return;

  // Ocultar las demás pantallas
  document.querySelectorAll(".pantalla").forEach(pantalla => {
    pantalla.classList.remove("activa");
  });

  // Mostrar pantalla seleccionada
  destino.classList.add("activa");

  // Regresar al inicio de la pantalla
  window.scrollTo(0, 0);

  // Iniciar YOKO al comenzar la historia
  if (id === "intro" && musica.paused) {
    iniciarMusica();
  }

  // Efecto especial al llegar al final
  if (id === "final") {
    lluviaDeCorazones();
  }

}

// ==========================================
// GENERAR ESTRELLAS
// ==========================================

for (let i = 0; i < 110; i++) {

  const estrella = document.createElement("span");

  estrella.classList.add("estrella");

  estrella.style.left = Math.random() * 100 + "%";
  estrella.style.top = Math.random() * 100 + "%";

  const tamaño = 1 + Math.random() * 3;

  estrella.style.width = tamaño + "px";
  estrella.style.height = tamaño + "px";

  estrella.style.animationDelay =
    Math.random() * 4 + "s";

  estrella.style.animationDuration =
    2 + Math.random() * 4 + "s";

  contenedorEstrellas.appendChild(estrella);

}

// ==========================================
// GENERAR CORAZONES FLOTANTES
// ==========================================

function crearCorazon() {

  const corazon = document.createElement("span");

  corazon.classList.add("corazon-flotante");

  const simbolos = [
    "❤️",
    "💕",
    "💗",
    "✨",
    "💖"
  ];

  corazon.textContent =
    simbolos[Math.floor(Math.random() * simbolos.length)];

  corazon.style.left =
    Math.random() * 100 + "%";

  corazon.style.fontSize =
    12 + Math.random() * 18 + "px";

  const duracion = 4 + Math.random() * 4;

  corazon.style.animationDuration =
    duracion + "s";

  contenedorCorazones.appendChild(corazon);

  // Eliminar el corazón al terminar
  setTimeout(() => {
    corazon.remove();
  }, duracion * 1000);

}

// Crear corazones durante la historia
setInterval(crearCorazon, 1200);

// ==========================================
// LLUVIA DE CORAZONES FINAL
// ==========================================

function lluviaDeCorazones() {

  for (let i = 0; i < 35; i++) {

    setTimeout(() => {
      crearCorazon();
    }, i * 130);

  }

}

// ==========================================
// MANEJO DE ERRORES DE AUDIO
// ==========================================

musica.addEventListener("error", () => {

  console.log("No se encontró el archivo de música.");

  btnMusica.style.display = "none";

});

// ==========================================
// INICIO
// ==========================================

console.log("Para Damaris, mi bello cielo estrellado ❤️");
