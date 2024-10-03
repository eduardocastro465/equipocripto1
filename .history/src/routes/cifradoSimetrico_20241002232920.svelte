<script>
    const DELTA = 0x9e3779b9;
    const NUM_ROUNDS = 32;
    let globalKey = null;
    let plaintext = '';
    let encryptedData = '';
    let decryptedText = '';

    function teaEncrypt(v, key) {
        let v0 = v[0], v1 = v[1];
        let sum = 0;

        for (let i = 0; i < NUM_ROUNDS; i++) {
            sum = (sum + DELTA) >>> 0;
            v0 = (v0 + (((v1 << 4) + key[0]) ^ (v1 + sum) ^ ((v1 >>> 5) + key[1]))) >>> 0;
            v1 = (v1 + (((v0 << 4) + key[2]) ^ (v0 + sum) ^ ((v0 >>> 5) + key[3]))) >>> 0;
        }

        return [v0, v1];
    }

    function teaDecrypt(v, key) {
        let v0 = v[0], v1 = v[1];
        let sum = (DELTA * NUM_ROUNDS) >>> 0;

        for (let i = 0; i < NUM_ROUNDS; i++) {
            v1 = (v1 - (((v0 << 4) + key[2]) ^ (v0 + sum) ^ ((v0 >>> 5) + key[3]))) >>> 0;
            v0 = (v0 - (((v1 << 4) + key[0]) ^ (v1 + sum) ^ ((v1 >>> 5) + key[1]))) >>> 0;
            sum = (sum - DELTA) >>> 0;
        }

        return [v0, v1];
    }

    function strToUint32Array(str) {
        const arr = new Uint32Array(2);
        arr[0] = str.charCodeAt(0) | (str.charCodeAt(1) << 16);
        arr[1] = str.charCodeAt(2) | (str.charCodeAt(3) << 16);
        return arr;
    }

    function uint32ArrayToStr(arr) {
        return String.fromCharCode(arr[0] & 0xFFFF, arr[0] >>> 16, arr[1] & 0xFFFF, arr[1] >>> 16);
    }

    function generateTeaKey() {
        if (!globalKey) {
            globalKey = new Uint32Array([Math.random() * 0xFFFFFFFF >>> 0, Math.random() * 0xFFFFFFFF >>> 0, Math.random() * 0xFFFFFFFF >>> 0, Math.random() * 0xFFFFFFFF >>> 0]);
        }
        return globalKey;
    }

    function encryptData() {
        const key = generateTeaKey();
        const data = strToUint32Array(plaintext.padEnd(4, ' ')); // Ajustar a 4 caracteres
        const encrypted = teaEncrypt(data, key);
        encryptedData = bufferToHex(encrypted); // Guarda el resultado cifrado
        decryptedText = ''; // Limpiar el texto descifrado después de cifrar
    }

    function decryptData() {
        const encryptedArray = hexToBuffer(encryptedData); // Convierte los datos hex a Uint32Array
        const key = globalKey;
        if (!key) {
            alert("Primero debes cifrar los datos para generar una clave.");
            return;
        }

        const decrypted = teaDecrypt(encryptedArray, key);
        decryptedText = uint32ArrayToStr(decrypted);
    }

    function bufferToHex(buffer) {
        return buffer.map(v => v.toString(16).padStart(8, '0')).join('');
    }

    function hexToBuffer(hex) {
        const arr = new Uint32Array(2);
        arr[0] = parseInt(hex.slice(0, 8), 16);
        arr[1] = parseInt(hex.slice(8, 16), 16);
        return arr;
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Texto copiado al portapapeles!');
        }).catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
    }
</script>

<main>
    <h1>Cifrado Simétrico (TEA)</h1>

    <label for="plaintext">Texto a Cifrar:</label>
    <input type="text" id="plaintext" bind:value={plaintext} placeholder="Ingresa el texto aquí" />

    <div class="button-container">
        <button on:click={encryptData}>Cifrar Datos</button>
    </div>

    {#if encryptedData}
        <div class="resultado">
            <p>Mensaje cifrado: <span class="encrypted-text">{encryptedData}</span></p>
            <button class="copy-button" on:click={() => copyToClipboard(encryptedData)}>Copiar</button>
        </div>
    {/if}

    <label for="encryptedInput">Texto a Descifrar:</label>
    <input type="text" id="encryptedInput" placeholder="Ingresa el texto cifrado aquí" /> <!-- Eliminar bind:value aquí -->

    <div class="button-container">
        <button on:click={decryptData}>Descifrar Datos</button>
    </div>

    {#if decryptedText}
        <div class="resultado">
            <p>Texto Descifrado: <span class="decrypted-text">{decryptedText}</span></p>
            <button class="copy-button" on:click={() => copyToClipboard(decryptedText)}>Copiar</button>
        </div>
    {/if}
</main>

<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    .container {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .form-group {
        margin-bottom: 15px;
    }
    label {
        display: block;
        margin-bottom: 5px;
    }
    input[type="text"], input[type="password"], input[type="email"] {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .btn {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    .btn:hover {
        background-color: #45a049;
    }
</style>