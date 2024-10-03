<script>
    const DELTA = 0x9e3779b9;
    const NUM_ROUNDS = 32;
    let globalKey = null;
    let name = "";
    let email = "";
    let cardNumber = "";
    let cvv = "";
    let encryptedName = "";
    let encryptedEmail = "";
    let encryptedCard = "";
    let encryptedCVV = "";
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
  
    function strToUint32Array(str) {
      const arr = new Uint32Array(2);
      arr[0] = str.charCodeAt(0) | (str.charCodeAt(1) << 16);
      arr[1] = str.charCodeAt(2) | (str.charCodeAt(3) << 16);
      return arr;
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
      encryptedName = bufferToHex(teaEncrypt(strToUint32Array(name.padEnd(4, " ")), key));
      encryptedEmail = bufferToHex(teaEncrypt(strToUint32Array(email.padEnd(4, " ")), key));
      const cardArray = strToUint32Array(cardNumber.padEnd(4, " ")); // Ajustar a 4 caracteres
      const cvvArray = strToUint32Array(cvv.padEnd(4, " ")); // Ajustar a 4 caracteres
      encryptedCard = bufferToHex(teaEncrypt(cardArray, key));
      encryptedCVV = bufferToHex(teaEncrypt(cvvArray, key));
      encryptionEnabled = false; // Deshabilitar el cifrado después de usarlo
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
          <input type="text" id="name" bind:value={name} required />
        </div>
  
        <div class="form-group">
          <label for="email">Correo Electrónico:</label>
          <input type="email" id="email" bind:value={email} required />
        </div>
  
        <!-- Datos Sensibles -->
        <div class="form-group">
          <label for="cardNumber">Número de Tarjeta:</label>
          <input
            type="text"
            id="cardNumber"
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
        {#if encryptedName || encryptedEmail || encryptedCard || encryptedCVV}
          <div style="margin-top: 20px; font-weight: bold;">
            Nombre cifrado: {encryptedName}<br />
            Correo cifrado: {encryptedEmail}<br />
            Número de tarjeta cifrado: {encryptedCard}<br />
            CVV cifrado: {encryptedCVV}
          </div>
        {/if}
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
    input[type="text"],
    input[type="email"] {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      background-color: #4caf50;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #45a049;
    }
  </style>
  