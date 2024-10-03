<script>
    let mensajeCifrado = '';
    let claveCifrado = '';
    let resultadoCifrado = '';
    let mensajeDescifrado = '';
    let claveDescifrado = '';
    let resultadoDescifrado = '';
    let mensajeCopiadoCifrado = '';
    let mensajeCopiadoDescifrado = '';
    let visible = false;

    // Función para cifrar el mensaje utilizando el cifrado de Escítala
    const cifrarEscitala = (texto, clave) => {
        const longitudClave = parseInt(clave);
        if (isNaN(longitudClave) || longitudClave <= 0) return texto;

        const textoLimpio = texto.replace(/[^a-zA-Z0-9]/g, '');
        let resultado = '';

        if (longitudClave >= textoLimpio.length) {
            return textoLimpio; // No se requiere cifrado
        }

        const filas = Math.ceil(textoLimpio.length / longitudClave);
        const textoRellenado = textoLimpio.padEnd(filas * longitudClave, ' ');

        for (let col = 0; col < longitudClave; col++) {
            for (let fila = 0; fila < filas; fila++) {
                resultado += textoRellenado[fila * longitudClave + col];
            }
        }
        return resultado.trim(); // Retorna sin espacios en blanco al final
    };

    // Función para descifrar el mensaje utilizando el cifrado de Escítala
    const descifrarEscitala = (texto, clave) => {
        const longitudClave = parseInt(clave);
        if (isNaN(longitudClave) || longitudClave <= 0) return texto;

        const filas = Math.ceil(texto.length / longitudClave);
        let resultado = '';

        for (let fila = 0; fila < filas; fila++) {
            for (let col = 0; col < longitudClave; col++) {
                const index = fila + col * filas;
                if (index < texto.length) {
                    resultado += texto[index];
                }
            }
        }
        return resultado.trim(); // Retorna sin espacios en blanco al final
    };

    // Función para manejar el clic en el botón "Cifrar"
    const manejarCifrado = () => {
        const textoCifrado = cifrarEscitala(mensajeCifrado, claveCifrado);
        if (textoCifrado !== mensajeCifrado) {
            resultadoCifrado = textoCifrado;
            mensajeCopiadoCifrado = 'Texto cifrado copiado al portapapeles';
            setTimeout(() => mensajeCopiadoCifrado = '', 3000);
        } else {
            mensajeCopiadoCifrado = 'Error en el cifrado. Asegúrate de que la clave sea válida.';
            setTimeout(() => mensajeCopiadoCifrado = '', 3000);
        }
    };

    // Función para manejar el clic en el botón "Descifrar"
    const manejarDescifrado = () => {
        const textoDescifrado = descifrarEscitala(mensajeDescifrado, claveDescifrada);
        if (textoDescifrado !== mensajeDescifrado) {
            resultadoDescifrado = textoDescifrado;
            mensajeCopiadoDescifrado = 'Texto descifrado copiado al portapapeles';
            setTimeout(() => mensajeCopiadoDescifrado = '', 3000);
        } else {
            mensajeCopiadoDescifrado = 'Error en el descifrado. Asegúrate de que la clave sea válida.';
            setTimeout(() => mensajeCopiadoDescifrado = '', 3000);
        }
    };

    // Función para copiar al portapapeles
    const copiarAlPortapapeles = (texto, esCifrado) => {
        navigator.clipboard.writeText(texto).then(() => {
            if (esCifrado) {
                mensajeCopiadoCifrado = 'Texto cifrado copiado al portapapeles';
                setTimeout(() => mensajeCopiadoCifrado = '', 3000);
            } else {
                mensajeCopiadoDescifrado = 'Texto descifrado copiado al portapapeles';
                setTimeout(() => mensajeCopiadoDescifrado = '', 3000);
            }
        });
    };
</script>

<div class="app-container">
    <div class="form-container">
        <div class="form-container" style="display: flex; align-items: flex-start;">
            <div style="flex: 1; display: flex; justify-content: center; margin-left: 20px;">
                <h2 style="margin: 0;">Cifrado y Descifrado Escítala</h2>
            </div>
        </div>

        <div class="columns-container">
            <div class="cifrado-container">
                <h3>Cifrado</h3>
                <div class="input-group">
                    <label for="mensaje-cifrado">Mensaje a cifrar</label>
                    <input
                        id="mensaje-cifrado"
                        bind:value={mensajeCifrado}
                        type="text"
                    />
                </div>
                <div class="input-group">
                    <label for="clave-cifrado">Clave (número de columnas)</label>
                    <input
                        id="clave-cifrado"
                        bind:value={claveCifrado}
                        type="text"
                    />
                </div>
                <button class="btn-cifrar" on:click={manejarCifrado}>Cifrar</button>

                <div class="result-container">
                    <h4>Resultado del Cifrado:</h4>
                    <div class="resultado-container">
                        <span class="resultado">{resultadoCifrado}</span>
                        <button
                            class="btn-copiar"
                            on:click={() => copiarAlPortapapeles(resultadoCifrado, true)}
                        >
                            Copiar
                        </button>
                    </div>
                    {#if mensajeCopiadoCifrado}
                        <p>{mensajeCopiadoCifrado}</p>
                    {/if}
                </div>
            </div>

            <div class="descifrado-container">
                <h3>Descifrado</h3>
                <div class="input-group">
                    <label for="mensaje-descifrado">Mensaje a descifrar</label>
                    <input
                        id="mensaje-descifrado"
                        bind:value={mensajeDescifrado}
                        type="text"
                    />
                </div>
                <div class="input-group">
                    <label for="clave-descifrado">Clave (número de columnas)</label>
                    <input
                        id="clave-descifrado"
                        bind:value={}
                        type="text"
                    />
                </div>
                <button class="btn-cifrar" on:click={manejarDescifrado}>Descifrar</button>

                <div class="result-container">
                    <h4>Resultado del Descifrado:</h4>
                    <div class="resultado-container">
                        <span class="resultado">{resultadoDescifrado}</span>
                        <button
                            class="btn-copiar"
                            on:click={() => copiarAlPortapapeles(resultadoDescifrado, false)}
                        >
                            Copiar
                        </button>
                    </div>
                    {#if mensajeCopiadoDescifrado}
                        <p>{mensajeCopiadoDescifrado}</p>
                    {/if}
                </div>
            </div>
        </div>
        <h4 style="color: #000;">Eduardo Castro Hernandez 7:A</h4>
    </div>
</div>

<style>
    /* Aquí puedes incluir el CSS correspondiente si es necesario */
</style>
