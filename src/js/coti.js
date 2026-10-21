const fcPorTipo = {
    habitacional: 1.249,
    comercial: 1.649,
    servicio: 1.256,
    hospedaje: 1.47,
    recreacion: 1.1375
};

const rangosM2 = {
    "50-100": {min: 50, max: 100 },
    "100-200": {min: 101, max: 200},
    "200-300": {min: 201, max: 300}, 
    "300-400": {min: 301, max: 400},
    "400-600": {min: 401, max: 600},
    "600+": {}
};

const CBM = 8000;
const FR = 0.95;

function calcularH(s, fc) {
  const co = s * CBM * fc;
  const fs = 15 - (2.5 * Math.log10(s));
  const h = (co * fs * FR) / 100;
  return h;
}
const formatoMXN = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0
});

const selectTipo = document.getElementById("tipo");
const selectM2 = document.getElementById("m2");
const btnCalcular = document.getElementById("btn-calcular");
const bloqueResultado = document.getElementById("cotizador-resultado");
const spanMin = document.getElementById("resultado-min");
const spanMax = document.getElementById("resultado-max");
const bloqueContactoDirecto = document.getElementById("cotizador-contacto-directo");
const bloqueContactoForm = document.getElementById("cotizador-contacto-form");
const mensajeError = document.getElementById("cotizador-error");
const inputNombre = document.getElementById("nombre");
const btnEnviar = document.getElementById("btn-enviar-whatsapp");
const contactoError = document.getElementById("contacto-error");
const NUMERO_ARQTEGA = "527757511053";

function ocultarResultados () {
    bloqueResultado.classList.add("hidden");
    bloqueContactoDirecto.classList.add("hidden");
    bloqueContactoForm.classList.add("hidden");
    mensajeError.classList.add("hidden");
    contactoError.classList.add("hidden")
}

btnCalcular.addEventListener("click", function() {
    ocultarResultados();

    if (!selectTipo.value || !selectM2.value) {
        mensajeError.classList.remove("hidden");
        return;
    }

    const fc = fcPorTipo[selectTipo.value];
    const rango = rangosM2[selectM2.value];

    if (rango.min === undefined) {
       bloqueContactoDirecto.classList.remove("hidden");
    } else {
        const hMin = calcularH(rango.min, fc);
        const hMax = calcularH(rango.max, fc);
        const minRedondeado = Math.floor(hMin / 1000) * 1000;
        const maxRedondeado = Math.ceil(hMax / 1000) * 1000;
        spanMin.textContent = formatoMXN.format(minRedondeado);
        spanMax.textContent = formatoMXN.format(maxRedondeado);
        bloqueResultado.classList.remove("hidden");
        bloqueContactoForm.classList.remove("hidden");
    }
});

selectTipo.addEventListener("change", ocultarResultados);
selectM2.addEventListener("change", ocultarResultados);

btnEnviar.addEventListener("click", function() {
    const formulario = document.getElementById("cotizador-form");

    contactoError.classList.add("hidden");

    const nombre = inputNombre.value.trim();

    if (nombre === "") {
        contactoError.classList.remove("hidden");
        return;
    } 

    const tipoTexto = selectTipo.selectedOptions[0].text; 
    const rangoTexto = selectM2.selectedOptions[0].text;

    const mensaje = [
    `Hola ARQTEGA, soy ${nombre}.`,
    `Me interesa un proyecto de tipo ${tipoTexto}, de ${rangoTexto}.`,
    `Estimado del cotizador: ${spanMin.textContent} – ${spanMax.textContent} MXN.`
    ].join("\n");

    const url = `https://wa.me/${NUMERO_ARQTEGA}?text=${encodeURIComponent(mensaje)}`;
    console.log("URL de WhatsApp:", url);
    window.open(url, "_blank", "noopener");
});

const formulario = document.getElementById("cotizador-form");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
    btnEnviar.click();
});