
const entradaCodigo = document.getElementById('entradaCodigo');
const lenguaje = document.getElementById('lenguaje');
const btnConvertir = document.getElementById('btnConvertir');
const btnCopiar = document.getElementById('btnCopiar');
const btnEliminar = document.getElementById('btnEliminar');
const resultado = document.getElementById('resultado');


function mostrarAlerta(mensaje, tipo) {
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} mt-3`;
    alerta.textContent = mensaje;

    document.body.prepend(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}


function convertirAPython(codigo) {
    return codigo
        .replace(/print\((.*)\)/g, 'console.log($1)') 
        .replace(/def\s+(\w+)\s*\((.*)\):/g, 'function $1($2) {') 
        .replace(/elif\s+/g, 'else if ') 
        .replace(/:/g, ' {') 
        .replace(/    /g, '\t') 
        .replace(/True/g, 'true') 
        .replace(/False/g, 'false'); 
}


function convertirAJavaScript(codigo) {
    return codigo
        .replace(/console\.log\((.*)\)/g, 'print($1)') 
        .replace(/function\s+(\w+)\s*\((.*)\)\s*{/g, 'def $1($2):') 
        .replace(/else if\s+/g, 'elif ')
        .replace(/\{/g, ':') 
        .replace(/\}/g, '') 
        .replace(/\t/g, '    ') 
        .replace(/true/g, 'True') 
        .replace(/false/g, 'False'); 
}


btnConvertir.addEventListener('click', () => {
    const codigo = entradaCodigo.value.trim();
    const lenguajeObjetivo = lenguaje.value; 

    
    if (!codigo) {
        resultado.textContent = "Por favor, ingresa un código válido.";
        mostrarAlerta("Por favor, ingresa un código válido.", "warning");
        return;
    }

    
    let codigoConvertido = '';
    if (lenguajeObjetivo === 'js') {
        codigoConvertido = convertirAPython(codigo);
    } else {
        codigoConvertido = convertirAJavaScript(codigo);
    }

    
    resultado.textContent = codigoConvertido;

    
    mostrarAlerta("¡Código convertido con éxito!", "success");
});


btnCopiar.addEventListener('click', () => {
    if (resultado.textContent) {
        navigator.clipboard.writeText(resultado.textContent)
            .then(() => mostrarAlerta("¡Código copiado al portapapeles!", "success"))
            .catch(() => mostrarAlerta("Error al copiar el código.", "danger"));
    } else {
        mostrarAlerta("No hay código para copiar.", "warning");
    }
});


btnEliminar.addEventListener('click', () => {
    entradaCodigo.value = '';
    resultado.textContent = '';
    mostrarAlerta("¡Código eliminado!", "info");
});
