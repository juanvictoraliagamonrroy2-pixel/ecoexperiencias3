document.addEventListener("DOMContentLoaded", () => {
  // --- 1. MENÚ DE NAVEGACIÓN ---
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("activo");
      toggle.classList.toggle("abierto");
    });
  }

  // --- 2. ANIMACIONES DE REVEAL (Intersection Observer) ---
  const elementos = document.querySelectorAll(
    ".hero, .seccion, .tarjeta, .galeria-imagenes img, .info-imagen img, .hero-imagen img"
  );

  elementos.forEach((el, index) => {
    el.classList.add("reveal");
    el.style.setProperty("--delay", index % 6);
  });

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("show");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observador.observe(el));

  // --- 3. LÓGICA DE LA ENCUESTA ---
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbx4jsgJroG3PmqRDK5uQobaJ6k_qZjWrY2UURwP6fqH_qJZNBKYAwwKrl3E8M4vm373/exec";
  const form = document.getElementById("encuestaForm");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btn = document.getElementById("btnEnviar");
      const textoOriginal = btn.innerText;

      btn.innerText = "Enviando...";
      btn.disabled = true;

      try {
        await fetch(scriptURL, {
          method: "POST",
          mode: "no-cors",
          body: new FormData(form),
        });

        // Feedback visual más elegante
        btn.innerText = "✔ Enviado";
        btn.style.background = "linear-gradient(135deg, #7cc488, #6b7a3d)";
        alert("¡Gracias por tu opinión! La encuesta fue registrada correctamente.");

        form.reset();

        setTimeout(() => {
          btn.innerText = textoOriginal;
          btn.style.background = "";
          btn.disabled = false;
        }, 2000);
      } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al enviar la encuesta. Intenta nuevamente.");
        btn.innerText = "Reintentar";
        btn.disabled = false;
      }
    });
  }

  // --- 4. SCROLL SUAVE PARA ANCLAS ---
  document.querySelectorAll('a[href^="#"]').forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();
      const destino = document.querySelector(enlace.getAttribute("href"));
      if (destino) {
        destino.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // --- 5. EFECTO HEADER AL HACER SCROLL ---
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scroll-activo");
    } else {
      header.classList.remove("scroll-activo");
    }
  });
});

