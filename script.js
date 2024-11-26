const entradaCodigo = document.getElementById("entradaCodigo");
const lenguaje = document.getElementById("lenguaje");
const btnConvertir = document.getElementById("btnConvertir");
const btnCopiar = document.getElementById("btnCopiar");
const btnEliminar = document.getElementById("btnEliminar");
const resultado = document.getElementById("resultado");
const alertContainer = document.getElementById("alertContainer");

btnConvertir.addEventListener("click", () => {
    const codigo = entradaCodigo.value.trim();
    const lenguajeSeleccionado = lenguaje.value;

    if (!codigo) {
        mostrarAlerta("Por favor, ingresa un código válido.", "danger");
        return;
    }

    let codigoConvertido = "";

    if (lenguajeSeleccionado === "js") {
        codigoConvertido = convertirAPython(codigo);
    } else {
        codigoConvertido = convertirAJavaScript(codigo);
    }

    resultado.textContent = codigoConvertido;
    mostrarAlerta("¡Código convertido con éxito!", "success");
});

btnCopiar.addEventListener("click", () => {
    if (!resultado.textContent) {
        mostrarAlerta("Nada que copiar.", "danger");
        return;
    }
    navigator.clipboard.writeText(resultado.textContent);
    mostrarAlerta("¡Código copiado al portapapeles!", "success");
});

btnEliminar.addEventListener("click", () => {
    entradaCodigo.value = "";
    resultado.textContent = "";
    mostrarAlerta("Campos eliminados con éxito.", "success");
});

function convertirAPython(codigo) {
    return codigo
        .replace(/console\.log\((.*)\)/g, "print($1)")
        .replace(/function\s+(\w+)\s*\((.*)\)\s*{/g, "def $1($2):")
        .replace(/else if/g, "elif")
        .replace(/{/g, ":")
        .replace(/}/g, "")
        .replace(/\t/g, "    ")
        .replace(/true/g, "True")
        .replace(/false/g, "False");
}

function convertirAJavaScript(codigo) {
    return codigo
        .replace(/print\((.*)\)/g, "console.log($1)")
        .replace(/def\s+(\w+)\s*\((.*)\):/g, "function $1($2) {")
        .replace(/elif/g, "else if")
        .replace(/:/g, "{")
        .replace(/    /g, "\t")
        .replace(/True/g, "true")
        .replace(/False/g, "false");
}

function mostrarAlerta(mensaje, tipo) {
    alertContainer.innerHTML = `<div class="alert alert-${tipo}">${mensaje}</div>`;
    setTimeout(() => {
        alertContainer.innerHTML = "";
    }, 3000);
}
