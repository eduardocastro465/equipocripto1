<script>
    import { onMount } from 'svelte';
    import { FloatLabel } from 'primereact/floatlabel';
    import { InputText } from 'primereact/inputtext';
    import { Button } from 'primereact/button';
    import { Toast } from 'primereact/toast';
    import MySidebar from "../components/MySidebar.svelte";

    let mensajeCifrado = '';
    let claveCifrado = '';
    let resultadoCifrado = '';
    let mensajeDescifrado = '';
    let claveDescifrado = '';
    let resultadoDescifrado = '';
    let mensajeCopiadoCifrado = '';
    let mensajeCopiadoDescifrado = '';
    let visible = false;
    let toastRef;

    // Función para cifrar el mensaje utilizando el cifrado de Escítala
    const cifrarEscitala = (texto, clave) => {
        const longitudClave = parseInt(clave);
        if (isNaN(longitudClave) || longitudClave <= 0) return texto;

        // Asegúrate de que el texto no tenga espacios ni caracteres especiales
        const textoLimpio = texto.replace(/[^a-zA-Z0-9]/g, '');
        let resultado = '';

        // Si la longitud de la clave es mayor que la longitud del texto
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
            toastRef.show({ severity: 'success', summary: 'Cifrado Exitoso', detail: 'El mensaje ha sido cifrado.', life: 3000 });
        } else {
            toastRef.show({ severity: 'error', summary: 'Error', detail: 'Error en el cifrado. Asegúrate de que la clave sea válida.', life: 3000 });
        }
    };

    // Función para manejar el clic en el botón "Descifrar"
    const manejarDescifrado = () => {
        const textoDescifrado = descifrarEscitala(mensajeDescifrado, claveDescifrada);
        if (textoDescifrado !== mensajeDescifrado) {
            resultadoDescifrado = textoDescifrado;
            mensajeCopiadoDescifrado = 'Texto descifrado copiado al portapapeles';
            setTimeout(() => mensajeCopiadoDescifrado = '', 3000);
            toastRef.show({ severity: 'success', summary: 'Descifrado Exitoso', detail: 'El mensaje ha sido descifrado.', life: 3000 });
        } else {
            toastRef.show({ severity: 'error', summary: 'Error', detail: 'Error en el descifrado. Asegúrate de que la clave sea válida.', life: 3000 });
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
    <Toast bind:this={toastRef} />

    <div class="form-container">
        <div class="form-container" style="display: flex; align-items: flex-start;">
            <MySidebar visible={visible} on:hide={() => visible = false} />
            <Button icon="pi pi-align-left" on:click={() => visible = true} />

            <div style="flex: 1; display: flex; justify-content: center; margin-left: 20px;">
                <h2 style="margin: 0;">Cifrado y Descifrado Escítala</h2>
            </div>
        </div>

        <div class="columns-container">
            <div class="cifrado-container">
                <h3>Cifrado</h3>
                <div class="input-group">
                    <FloatLabel>
                        <InputText
                            id="mensaje-cifrado"
                            bind:value={mensajeCifrado}
                        />
                        <label for="mensaje-cifrado">Mensaje a cifrar</label>
                    </FloatLabel>
                </div>
                <div class="input-group">
                    <FloatLabel>
                        <InputText
                            id="clave-cifrado"
                            bind:value={claveCifrado}
                        />
                        <label for="clave-cifrado">Clave (número de columnas)</label>
                    </FloatLabel>
                </div>
                <Button class="btn-cifrar" label="Cifrar" on:click={manejarCifrado} />

                <div class="result-container">
                    <h4>Resultado del Cifrado:</h4>
                    <div class="resultado-container">
                        <span class="resultado">{resultadoCifrado}</span>
                        <Button
                            class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700 btn-icon"
                            icon="pi pi-bookmark"
                            on:click={() => copiarAlPortapapeles(resultadoCifrado, true)}
                        />
                    </div>
                    {#if mensajeCopiadoCifrado}
                        <Toast severity="success" text={mensajeCopiadoCifrado} style="margin-top: 10px;" />
                    {/if}
                </div>
            </div>

            <div class="descifrado-container">
                <h3>Descifrado</h3>
                <div class="input-group">
                    <FloatLabel>
                        <InputText
                            id="mensaje-descifrado"
                            bind:value={mensajeDescifrado}
                        />
                        <label for="mensaje-descifrado">Mensaje a descifrar</label>
                    </FloatLabel>
                </div>
                <div class="input-group">
                    <FloatLabel>
                        <InputText
                            id="clave-descifrado"
                            bind:value={claveDescifrado}
                        />
                        <label for="clave-descifrado">Clave (número de columnas)</label>
                    </FloatLabel>
                </div>
                <Button class="btn-cifrar" label="Descifrar" on:click={manejarDescifrado} />

                <div class="result-container">
                    <h4>Resultado del Descifrado:</h4>
                    <div class="resultado-container">
                        <span class="resultado">{resultadoDescifrado}</span>
                        <Button
                            class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700 btn-icon"
                            icon="pi pi-bookmark"
                            on:click={() => copiarAlPortapapeles(resultadoDescifrado, false)}
                        />
                    </div>
                    {#if mensajeCopiadoDescifrado}
                        <Toast severity="success" text={mensajeCopiadoDescifrado} style="margin-top: 10px;" />
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
