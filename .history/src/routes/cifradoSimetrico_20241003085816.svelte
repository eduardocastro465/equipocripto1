<script>
  const DELTA = 0x9e3779b9;
  const NUM_ROUNDS = 32;
  let globalKey = null;
  let name = "";
  let cardNumber = "";
  let cvv = "";
  let encryptedName = "";
  let encryptedCard = "";
  let encryptedCVV = "";
  let decryptedText = "";

  // Cifrado TEA
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

  // Descifrado TEA
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

  // Convertir cadena a bloque de Uint32Array
  function strToUint32Array(str) {
    const blocks = [];
    for (let i = 0; i < str.length; i += 4) {
      let block = str.substr(i, 4).padEnd(4, " ");
      const v0 = block.charCodeAt(0) | (block.charCodeAt(1) << 16);
      const v1 = block.charCodeAt(2) | (block.charCodeAt(3) << 16);
      blocks.push([v0, v1]);
    }
    return blocks;
  }

  // Generar clave TEA
  function generateTeaKey() {
    if (!globalKey) {
      globalKey = new Uint32Array(Array.from({ length: 4 }, () => (Math.random() * 0xffffffff) >>> 0));
    }
    return globalKey;
  }

  // Cifrar datos
  function encryptData() {
    const key = generateTeaKey();
    encryptedName = encryptString(name, key);
    encryptedCard = encryptString(cardNumber, key);
    encryptedCVV = encryptString(cvv, key);
  }

  // Función auxiliar para cifrar una cadena
  function encryptString(input, key) {
    const blocks = strToUint32Array(input);
    return blocks.map(block => bufferToHex(teaEncrypt(block, key))).join(",");
  }

  // Descifrar datos
  function decryptCustomData(input) {
    const key = globalKey;
    const inputBlocks = input.split(",").map(hexToBuffer);
    decryptedText = inputBlocks.map(block => decryptBlock(block)).join("");
  }

  // Función auxiliar para descifrar un bloque
  function decryptBlock(block) {
    const decryptedArray = teaDecrypt(block, globalKey);
    return String.fromCharCode(
      decryptedArray[0] & 0xffff,
      (decryptedArray[0] >> 16) & 0xffff,
      decryptedArray[1] & 0xffff,
      (decryptedArray[1] >> 16) & 0xffff
    ).trim();
  }

  // Convertir hex a buffer
  function hexToBuffer(hex) {
    const buffer = new Uint32Array(2);
    buffer[0] = parseInt(hex.substring(0, 8), 16) || 0;
    buffer[1] = parseInt(hex.substring(8, 16), 16) || 0;
    return buffer;
  }

  // Convertir buffer a hex
  function bufferToHex(buffer) {
    return buffer.map(v => v.toString(16).padStart(8, "0")).join("");
  }

  // Enviar datos cifrados
  async function sendData() {
    const data = {
      nombreCompleto: encryptedName,
      NumeroDeTarjeta: encryptedCard,
      CVV: encryptedCVV,
    };

    try {
      const response = await fetch("http://localhost:3000/cifradoSimetrico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Datos enviados:", result);
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  }

  // Copiar al portapapeles
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert("Texto copiado al portapapeles");
  }
</script>

<main>
  <div class="container">
    <h2>Formulario de Pago Seguro</h2>
    <form id="paymentForm" on:submit|preventDefault>
      <div class="form-group">
        <label for="name">Nombre Completo:</label>
        <input type="text" id="name" name="name" required bind:value={name} />
      </div>

      <div class="form-group">
        <label for="cardNumber">Número de Tarjeta:</label>
        <input type="text" id="cardNumber" name="cardNumber" maxlength="16" bind:value={cardNumber} required />
      </div>

      <div class="form-group">
        <label for="cvv">CVV:</label>
        <input type="text" id="cvv" name="cvv" maxlength="4" bind:value={cvv} required />
      </div>

      <div class="button-group">
        <button type="button" class="green-button" on:click={encryptData}>Cifrar Datos</button>
        <button type="button" class="green-button" on:click={() => decryptCustomData(decryptedText)}>
          Desencriptar Datos
        </button>
        <button
          type="button"
          class="green-button"
          on:click={sendData}
          disabled={!encryptedName || !encryptedCard || !encryptedCVV}
        >
          Enviar Datos
        </button>
      </div>

      {#if encryptedName}
        <div class="encrypted-section">
          <label>Nombre Cifrado:</label>
          <input type="text" value={encryptedName} readonly />
          <button class="copy-button" on:click={() => copyToClipboard(encryptedName)}>Copiar</button>
        </div>
      {/if}

      {#if encryptedCard}
        <div class="encrypted-section">
          <label>Número de Tarjeta Cifrado:</label>
          <input type="text" value={encryptedCard} readonly />
          <button class="copy-button" on:click={() => copyToClipboard(encryptedCard)}>Copiar</button>
        </div>
      {/if}

      {#if encryptedCVV}
        <div class="encrypted-section">
          <label>CVV Cifrado:</label>
          <input type="text" value={encryptedCVV} readonly />
          <button class="copy-button" on:click={() => copyToClipboard(encryptedCVV)}>Copiar</button>
        </div>
      {/if}

      <div class="form-group" style="margin-top: 20px;">
        <label for="inputToDecrypt">Texto a desencriptar:</label>
        <input
          type="text"
          id="inputToDecrypt"
          placeholder="Ingrese texto cifrado"
          bind:value={decryptedText}
        />
        {#if decryptedText}
          <div style="margin-top: 10px;">Texto desencriptado: {decryptedText}</div>
        {/if}
      </div>
    </form>
  </div>
</main>

<style>
  body {
    font-family: 'Arial', sans-serif;
    background-color: #e9ecef;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }

  .container {
    background: #ffffff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px; /* Ancho reducido */
  }

  h2 {
    margin-bottom: 20px;
    text-align: center;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input[type="text"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
  }

  .green-button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .green-button:hover {
    background-color: #218838;
  }

  .encrypted-section {
    margin-top: 15px;
    border: 1px solid #ced4da;
    padding: 10px;
    border-radius: 4px;
  }

  .copy-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    margin-top: 5px;
    border-radius: 4px;
    cursor: pointer;
  }

  .copy-button:hover {
    background-color: #0069d9;
  }
</style>
