document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("nav button");
  const container = document.getElementById("content-container");

  // Función para cargar contenido
  async function loadContent(page) {
    try {
      const response = await fetch(page);
      const html = await response.text();
      container.innerHTML = html;
    } catch (error) {
      container.innerHTML = "<p>Error al cargar la sección.</p>";
      console.error(error);
    }
  }

  // Evento de botones
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      loadContent(btn.dataset.tab);
    });
  });

  // Cargar principal al inicio
  loadContent("principal.html");
});

