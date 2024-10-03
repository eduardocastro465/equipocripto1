<script>
    // Variables para manejar el estado de la aplicación
    let mensajeCifrado = '';
    let claveCifrado = '';
    let resultadoCifrado = '';
    let mensajeDescifrado = '';
    let claveDescifrada = '';
    let resultadoDescifrado = '';
    let mensajeCopiadoCifrado = '';
    let mensajeCopiadoDescifrado = '';

    // Función para cifrar el mensaje utilizando la técnica Escítala
    const cifrarEscitala = (texto, clave) => {
        const longitudClave = parseInt(clave);
        if (isNaN(longitudClave) || longitudClave <= 0) return texto;

        const textoLimpio = texto.replace(/[^a-zA-Z0-9]/g, ''); // Limpia el texto de caracteres no alfanuméricos
        let resultado = '';

        if (longitudClave >= textoLimpio.length) {
            return textoLimpio; // No se requiere cifrado si la clave es mayor o igual que la longitud del texto
        }

        const filas = Math.ceil(textoLimpio.length / longitudClave);
        const textoRellenado = textoLimpio.padEnd(filas * longitudClave, ' '); // Rellena el texto si es necesario

        for (let col = 0; col < longitudClave; col++) {
            for (let fila = 0; fila < filas; fila++) {
                resultado += textoRellenado[fila * longitudClave + col];
            }
        }
        return resultado.trim(); // Elimina espacios en blanco
    };

    // Función para descifrar el mensaje utilizando la técnica Escítala
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
        return resultado.trim(); // Elimina espacios en blanco
    };

    // Función para manejar el cifrado del mensaje
    const manejarCifrado = () => {
        resultadoCifrado = cifrarEscitala(mensajeCifrado, claveCifrado);
        if (resultadoCifrado !== mensajeCifrado) {
            mensajeCopiadoCifrado = 'Texto cifrado copiado al portapapeles';
            setTimeout(() => mensajeCopiadoCifrado = '', 3000);
        } else {
            mensajeCopiadoCifrado = 'Error en el cifrado. Asegúrate de que la clave sea válida.';
            setTimeout(() => mensajeCopiadoCifrado = '', 3000);
        }
    };

    // Función para manejar el descifrado del mensaje
    const manejarDescifrado = () => {
        resultadoDescifrado = descifrarEscitala(mensajeDescifrado, claveDescifrada);
        if (resultadoDescifrado !== mensajeDescifrado) {
            mensajeCopiadoDescifrado = 'Texto descifrado copiado al portapapeles';
            setTimeout(() => mensajeCopiadoDescifrado = '', 3000);
        } else {
            mensajeCopiadoDescifrado = 'Error en el descifrado. Asegúrate de que la clave sea válida.';
            setTimeout(() => mensajeCopiadoDescifrado = '', 3000);
        }
    };

    // Función para copiar el texto al portapapeles
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
    <h2>Cifrado y Descifrado Escítala</h2>
    <div class="form-container">
        <div class="columns-container">
            <div class="form-column">
                <h3>Cifrado</h3>
                <div class="input-group">
                    <label for="mensaje-cifrado">Mensaje a cifrar</label>
                    <input
                        id="mensaje-cifrado"
                        bind:value={mensajeCifrado}
                        type="text"
                        placeholder="Introduce el mensaje a cifrar"
                    />
                </div>
                <div class="input-group">
                    <label for="clave-cifrado">Clave (número de columnas)</label>
                    <input
                        id="clave-cifrado"
                        bind:value={claveCifrado}
                        type="text"
                        placeholder="Introduce la clave"
                    />
                </div>
                <button class="btn-cifrar" on:click={manejarCifrado}>Cifrar</button>

                {#if resultadoCifrado}
                    <div class="result-container">
                        <h4>Resultado del Cifrado:</h4>
                        <span class="resultado">{resultadoCifrado}</span>
                        <button class="btn-copiar" on:click={() => copiarAlPortapapeles(resultadoCifrado, true)}>Copiar</button>
                    </div>
                {/if}
                {#if mensajeCopiadoCifrado}
                    <p class="mensaje-copiado">{mensajeCopiadoCifrado}</p>
                {/if}
            </div>

            <div class="form-column">
                <h3>Descifrado</h3>
                <div class="input-group">
                    <label for="mensaje-descifrado">Mensaje a descifrar</label>
                    <input
                        id="mensaje-descifrado"
                        bind:value={mensajeDescifrado}
                        type="text"
                        placeholder="Introduce el mensaje a descifrar"
                    />
                </div>
                <div class="input-group">
                    <label for="clave-descifrado">Clave (número de columnas)</label>
                    <input
                        id="clave-descifrado"
                        bind:value={claveDescifrada}
                        type="text"
                        placeholder="Introduce la clave"
                    />
                </div>
                <button class="btn-cifrar" on:click={manejarDescifrado}>Descifrar</button>

                {#if resultadoDescifrado}
                    <div class="result-container">
                        <h4>Resultado del Descifrado:</h4>
                        <span class="resultado">{resultadoDescifrado}</span>
                        <button class="btn-copiar" on:click={() => copiarAlPortapapeles(resultadoDescifrado, false)}>Copiar</button>
                    </div>
                {/if}
                {#if mensajeCopiadoDescifrado}
                    <p class="mensaje-copiado">{mensajeCopiadoDescifrado}</p>
                {/if}
            </div>
        </div>
        <h4 class="footer">Eduardo Castro Hernandez 7:A</h4>
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

    .columns-container {
        display: flex;
        justify-content: space-between;
    }

    .form-column {
        flex: 1;
        margin: 0 10px;
    }

    .input-group {
        margin-bottom: 15px;
    }

    .input-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    .input-group input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
    }

    .btn-cifrar {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        margin-top: 10px;
        width: 90%;
    }

    .btn-cifrar:hover {
        background-color: #0056b3;
    }

    .result-container {
        margin-top: 15px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: #f9f9f9;
    }

    .resultado {
        display: block;
        margin: 10px 0;
        font-weight: bold;
    }

    .btn-copiar {
        background-color: #28a745;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
    }

    .btn-copiar:hover {
        background-color: #218838;
    }

    .mensaje-copiado {
        margin-top: 10px;
        color: #28a745;
        font-weight: bold;
    }

    .footer {
        text-align: center;
        font-size: 12px;
        color: #666;
        margin-top: 20px;
    }
</style>
