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
    let encryptionEnabled = true;
  
    function teaEncrypt(v, key) {
      let v0 = v[0],
        v1 = v[1];
      let sum = 0;
      for (let i = 0; i < NUM_ROUNDS; i++) {
        sum = (sum + DELTA) >>> 0;
        v0 =
          (v0 + (((v1 << 4) + key[0]) ^ (v1 + sum) ^ ((v1 >>> 5) + key[1]))) >>>
          0;
        v1 =
          (v1 + (((v0 << 4) + key[2]) ^ (v0 + sum) ^ ((v0 >>> 5) + key[3]))) >>>
          0;
      }
      return [v0, v1];
    }
  
    function teaDecrypt(v, key) {
      let v0 = v[0],
        v1 = v[1];
      let sum = (DELTA * NUM_ROUNDS) >>> 0;
      for (let i = 0; i < NUM_ROUNDS; i++) {
        v1 =
          (v1 - (((v0 << 4) + key[2]) ^ (v0 + sum) ^ ((v0 >>> 5) + key[3]))) >>>
          0;
        v0 =
          (v0 - (((v1 << 4) + key[0]) ^ (v1 + sum) ^ ((v1 >>> 5) + key[1]))) >>>
          0;
        sum = (sum - DELTA) >>> 0;
      }
      return [v0, v1];
    }
  
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
  
    function generateTeaKey() {
      if (!globalKey) {
        globalKey = new Uint32Array([
          (Math.random() * 0xffffffff) >>> 0,
          (Math.random() * 0xffffffff) >>> 0,
          (Math.random() * 0xffffffff) >>> 0,
          (Math.random() * 0xffffffff) >>> 0,
        ]);
      }
      return globalKey;
    }
  
    function encryptData() {
      const key = generateTeaKey();
  
      const nameBlocks = strToUint32Array(name);
      const cardBlocks = strToUint32Array(cardNumber);
      const cvvBlocks = strToUint32Array(cvv);
  
      encryptedName = nameBlocks.map(block => bufferToHex(teaEncrypt(block, key))).join(",");
      encryptedCard = cardBlocks.map(block => bufferToHex(teaEncrypt(block, key))).join(",");
      encryptedCVV = cvvBlocks.map(block => bufferToHex(teaEncrypt(block, key))).join(",");
  
      encryptionEnabled = false; // Deshabilitar el cifrado después de usarlo
    }
  
    function decryptCustomData(input) {
      const key = globalKey;
      const inputBlocks = input.split(",").map(hexToBuffer);
  
      const decryptedBlocks = inputBlocks.map(block => teaDecrypt(block, key));
      decryptedText = decryptedBlocks.map(decryptedArray => 
        String.fromCharCode(
          decryptedArray[0] & 0xffff,
          (decryptedArray[0] >> 16) & 0xffff,
          decryptedArray[1] & 0xffff,
          (decryptedArray[1] >> 16) & 0xffff
        ).trim()
      ).join(""); // Unir bloques desencriptados
    }
  
    function hexToBuffer(hex) {
      const buffer = new Uint32Array(2);
      buffer[0] = parseInt(hex.substring(0, 8), 16) || 0;
      buffer[1] = parseInt(hex.substring(8, 16), 16) || 0;
      return buffer;
    }
  
    function bufferToHex(buffer) {
      return buffer.map((v) => v.toString(16).padStart(8, "0")).join("");
    }
  </script>
  
  <main>
    <div class="container">
      <h2>Formulario de Pago</h2>
      <form id="paymentForm">
        <!-- Datos Personales -->
        <div class="form-group">
          <label for="name">Nombre Completo:</label>
          <input type="text" id="name" name="name" required bind:value={name} />
        </div>
  
        <!-- Datos Sensibles -->
        <div class="form-group">
          <label for="cardNumber">Número de Tarjeta:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            maxlength="16"
            bind:value={cardNumber}
            required
          />
        </div>
  
        <div class="form-group">
          <label for="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            maxlength="4"
            bind:value={cvv}
            required
          />
        </div>
  
        <!-- Cifrado de Datos -->
        <button type="button" on:click={encryptData} disabled={!encryptionEnabled}>
          Cifrar Datos
        </button>
  
        <!-- Mostrar el texto cifrado -->
        {#if encryptedName && encryptedCard && encryptedCVV}
          <div style="margin-top: 20px; font-weight: bold;">
            Nombre cifrado: {encryptedName}<br />
            Número de tarjeta cifrado: {encryptedCard}<br />
            CVV cifrado: {encryptedCVV}
          </div>
        {/if}
  
        <!-- Desencriptar Datos -->
        <div class="form-group" style="margin-top: 20px;">
          <label for="inputToDecrypt">Texto a desencriptar:</label>
          <input
            type="text"
            id="inputToDecrypt"
            placeholder="Ingrese texto cifrado"
            bind:value={decryptedText}
          />
          <button type="button" on:click={() => decryptCustomData(decryptedText)} disabled={encryptionEnabled}>
            Desencriptar Datos
          </button>
          {#if decryptedText}
            <div style="margin-top: 10px;">
              Texto desencriptado: {decryptedText}
            </div>
          {/if}
        </div>
      </form>
    </div>
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
    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      padding: 10px 15px;
      border: none;
      background-color: #28a745;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
    }
  </style>
  