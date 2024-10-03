<script>
    let plaintext = '';
    let encryptedData = '';
    let decryptedText = '';
    let resultText = '';
    let rsaKeys = null;
    let encryptionEnabled = false;
    let textToDecrypt = '';

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
            encryptedData = btoa(plaintext); // Simulación de cifrado (debes usar la clave pública real aquí)
            resultText = `Mensaje cifrado: ${encryptedData}`;
        }
    }

    function decryptData() {
        if (rsaKeys) {
            decryptedText = atob(textToDecrypt); // Simulación de descifrado (debes usar la clave privada real aquí)
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
        <!-- Sección para generar claves RSA -->
        <div class="section">
            <button on:click={generateRSAKeys}>Generar Claves RSA</button>
            <p>{resultText}</p>
        </div>

        <!-- Sección para cifrar texto (desactivado hasta generar claves) -->
        <div class="section">
            <label for="plaintext">Texto Plano:</label>
            <textarea id="plaintext" rows="4" bind:value={plaintext} disabled={!encryptionEnabled}></textarea>

            <button on:click={encryptData} disabled={!encryptionEnabled}>Cifrar Datos</button>

            {#if encryptedData}
            <div class="encrypted-section">
                <input type="text" value={encryptedData} readonly />
                <button class="copy-button" on:click={() => copyToClipboard(encryptedData)}>Copiar Cifrado</button>
            </div>
            {/if}
        </div>

        <!-- Sección para descifrar texto (independiente del cifrado) -->
        <div class="section">
            <label for="nombre">Nombre Completo:</label><br>
            <input type="text" id="nombre" name="nombre" required><br><br>
    
            <!-- Número de Seguro Social -->
            <label for="ssn">Número de Seguro Social:</label><br>
            <input type="text" id="ssn" name="ssn" required><br><br>
    
            <!-- Dirección -->
            <label for="direccion">Dirección:</label><br>
            <input type="text" id="direccion" name="direccion" required><br><br>
    
            <!-- Número de Teléfono -->
            <label for="telefono">Número de Teléfono:</label><br>
            <input type="tel" id="telefono" name="telefono" required><br><br>
    

            <button on:click={decryptData} disabled={!textToDecrypt}>Descifrar Datos</button>

            {#if decryptedText}
            <div class="decrypted-section">
                <input type="text" value={decryptedText} readonly />
                <button class="copy-button" on:click={() => copyToClipboard(decryptedText)}>Copiar Texto Descifrado</button>
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
