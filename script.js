const glosario = [
    { termino: "Dato", definicion: "Un hecho bruto o valor elemental que por sí solo no tiene significado completo, como números, palabras o fechas." },
    { termino: "Información", definicion: "Conjunto de datos procesados y organizados que tienen significado y utilidad para la toma de decisiones." },
    { termino: "Sistema", definicion: "Conjunto de elementos interrelacionados que trabajan juntos para alcanzar un objetivo común, con entradas, procesos y salidas." },
    { termino: "Procesamiento de Datos", definicion: "Transformación de datos en información mediante recopilación, clasificación, almacenamiento, cálculo o análisis." },
    { termino: "Sistema de Información", definicion: "Conjunto organizado de personas, hardware, software, datos y procedimientos que recolecta, procesa y distribuye información para apoyar la toma de decisiones." }
];

const contenedor = document.getElementById("glosario");

glosario.forEach(item => {
    const div = document.createElement("div");
    div.className = "glosario-item";
    div.innerHTML = `<strong>${item.termino}</strong>
                     <div class="glosario-def">${item.definicion}</div>`;
    div.addEventListener("click", () => {
        const def = div.querySelector(".glosario-def");
        def.style.display = def.style.display === "block" ? "none" : "block";
    });
    contenedor.appendChild(div);
});
