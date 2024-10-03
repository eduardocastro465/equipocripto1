<script>
    let rsaKeys = null;
    let encryptionEnabled = false;
    let resultText = '';
    let nombre = '';
    let ssn = '';
    let direccion = '';
    let telefono = '';

    let encryptedNombre = '';
    let encryptedSSN = '';
    let encryptedDireccion = '';
    let encryptedTelefono = '';

    let decryptedNombre = '';
    let decryptedSSN = '';
    let decryptedDireccion = '';
    let decryptedTelefono = '';

    function generateRSAKeys() {
        const { publicKey, privateKey } = generateRSAKeyPair();
        rsaKeys = { publicKey, privateKey };
        resultText = 'Claves RSA generadas correctamente.';
        encryptionEnabled = true; // Activar el botón de cifrado
    }

    function generateRSAKeyPair() {
        // Aquí deberías integrar una librería o implementar la generación de claves RSA
        const publicKey = 'clave-publica-ejemplo';
        const privateKey = 'clave-privada-ejemplo';
        return { publicKey, privateKey };
    }

    function encryptData() {
        if (rsaKeys) {
            // Cifrar cada campo por separado
            encryptedNombre = btoa(nombre); // Simulación de cifrado
            encryptedSSN = btoa(ssn);
            encryptedDireccion = btoa(direccion);
            encryptedTelefono = btoa(telefono);
            resultText = 'Datos cifrados correctamente.';
        }
    }

    function decryptData() {
        if (rsaKeys) {
            // Descifrar cada campo por separado
            decryptedNombre = atob(encryptedNombre); // Simulación de descifrado
            decryptedSSN = atob(encryptedSSN);
            decryptedDireccion = atob(encryptedDireccion);
            decryptedTelefono = atob(encryptedTelefono);
        }
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text);
        alert('Texto copiado al portapapeles');
    }
</script>

<main>
    <h1>Cifrado Asimétrico (RSA)</h1>

    <div class="container">
        <div class="section">
            <button on:click={generateRSAKeys}>Generar Claves RSA</button>
            <p>{resultText}</p>
        </div>

        <div class="section">
            <label for="nombre">Nombre Completo:</label>
            <input type="text" id="nombre" bind:value={nombre} required />

            <label for="ssn">Número de Seguro Social:</label>
            <input type="text" id="ssn" bind:value={ssn} required />

            <label for="direccion">Dirección:</label>
            <input type="text" id="direccion" bind:value={direccion} required />

            <label for="telefono">Número de Teléfono:</label>
            <input type="tel" id="telefono" bind:value={telefono} required />

            <button on:click={encryptData} disabled={!encryptionEnabled}>Cifrar Datos</button>

            {#if encryptedNombre}
            <div class="encrypted-section">
                <label>Nombre Cifrado:</label>
                <input type="text" value={encryptedNombre} readonly />
                <button class="copy-button" on:click={() => copyToClipboard(encryptedNombre)}>Copiar</button>
            </div>
            {/if}

            {#if encryptedSSN}
            <div class="encrypted-section">
                <label>SSN Cifrado:</label>
                <input type="text" value={encryptedSSN} readonly />
                <button class="copy-button" on:click={() => copyToClipboard(encryptedSSN)}>Copiar</button>
            </div>
            {/if}

            {#if encryptedDireccion}
            <div class="encrypted-section">
                <label>Dirección Cifrada:</label>
                <input type="text" value={encryptedDireccion} readonly />
                <button class="copy-button" on:click={() => copyToClipboard(encryptedDireccion)}>Copiar</button>
            </div>
            {/if}

            {#if encryptedTelefono}
            <div class="encrypted-section">
                <label>Teléfono Cifrado:</label>
                <input type="text" value={encryptedTelefono} readonly />
                <button class="copy-button" on:click={() => copyToClipboard(encryptedTelefono)}>Copiar</button>
            </div>
            {/if}
        </div>

        <div class="section">
            <button on:click={decryptData}>Descifrar Datos</button>

            {#if decryptedNombre}
            <div class="decrypted-section">
                <label>Nombre Descifrado:</label>
                <input type="text" value={decryptedNombre} readonly />
            </div>
            {/if}

            {#if decryptedSSN}
            <div class="decrypted-section">
                <label>SSN Descifrado:</label>
                <input type="text" value={decryptedSSN} readonly />
            </div>
            {/if}

            {#if decryptedDireccion}
            <div class="decrypted-section">
                <label>Dirección Descifrada:</label>
                <input type="text" value={decryptedDireccion} readonly />
            </div>
            {/if}

            {#if decryptedTelefono}
            <div class="decrypted-section">
                <label>Teléfono Descifrado:</label>
                <input type="text" value={decryptedTelefono} readonly />
            </div>
            {/if}
        </div>
    </div>
</main>


<style>
    main {
        width: 60%;
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    h1 {
        text-align: center;
        color: #333;
    }

    .container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .section {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    label {
        font-weight: bold;
        margin-bottom: 10px;
        display: block;
        color: #444;
    }

    textarea, input {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1em;
    }

    button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        background-color: #4CAF50; /* Color verde para botones principales */
        color: white;
        cursor: pointer;
        font-size: 1em;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    button:hover:not(:disabled) {
        background-color: #45A049; /* Color verde oscuro al pasar el mouse */
    }

    .copy-button {
        background-color: #007bff; /* Color azul para los botones de copiar */
        border: none;
    }

    .copy-button:hover {
        background-color: #0056b3; /* Color azul oscuro al pasar el mouse */
    }

    .encrypted-section, .decrypted-section {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .encrypted-section input, .decrypted-section input {
        flex-grow: 1;
        border: 1px solid #007bff; /* Color azul para los inputs de resultados */
    }

    .encrypted-section input:focus, .decrypted-section input:focus {
        border-color: #0056b3; /* Color azul oscuro al enfocar */
        outline: none;
    }
</style>
