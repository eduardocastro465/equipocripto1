<script>
    let mensajeCifrado = '';
    let claveCifrado = '';
    let resultadoCifrado = '';
    let mensajeDescifrado = '';
    let claveDescifrada = ''; // Asegúrate de que esto esté declarado correctamente
    let resultadoDescifrado = '';
    let mensajeCopiadoCifrado = '';
    let mensajeCopiadoDescifrado = '';

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
        return resultado.trim();
    };

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
        return resultado.trim();
    };

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
                        bind:value={claveDescifrada} 
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
    .app-container {
        font-family: Arial, sans-serif;
        padding: 20px;
        background-color: #f5f5f5;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        max-width: 800px;
        margin: 20px auto;
    }

    .form-container {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }

    .input-group {
        margin-bottom: 15px;
    }

    .input-group label {
        display: block;
        margin-bottom: 5px;
    }

    .input-group input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .btn-cifrar {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
    }

    .btn-cifrar:hover {
        background-color: #0056b3;
    }

    .result-container {
        margin-top: 20px;
    }

    .resultado {
        font-weight: bold;
    }

    .btn-copiar {
        background-color: #28a745;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 10px;
    }

    .btn-copiar:hover {
        background-color: #218838;
    }

    h2, h3, h4 {
        color: #333;
    }
</style>
