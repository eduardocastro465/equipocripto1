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

    encryptedName = nameBlocks
      .map((block) => bufferToHex(teaEncrypt(block, key)))
      .join(",");
    encryptedCard = cardBlocks
      .map((block) => bufferToHex(teaEncrypt(block, key)))
      .join(",");
    encryptedCVV = cvvBlocks
      .map((block) => bufferToHex(teaEncrypt(block, key)))
      .join(",");
  }

  function decryptCustomData(input) {
    const key = globalKey;
    const inputBlocks = input.split(",").map(hexToBuffer);

    const decryptedBlocks = inputBlocks.map((block) => teaDecrypt(block, key));
    decryptedText = decryptedBlocks
      .map((decryptedArray) =>
        String.fromCharCode(
          decryptedArray[0] & 0xffff,
          (decryptedArray[0] >> 16) & 0xffff,
          decryptedArray[1] & 0xffff,
          (decryptedArray[1] >> 16) & 0xffff
        ).trim()
      )
      .join("");
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

  async function sendData() {
    const data = {
      nombreCompleto: encryptedName,
      NumeroDeTarjeta: encryptedCard,
      CVV: encryptedCVV,
    };

    try {
      const response = await fetch("http://localhost:3000/cifradoSimetrico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Datos enviados:", result);
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  }
</script>

<main>
  <div class="container">
    <h2>Formulario de Pago</h2>
    <form id="paymentForm">
      <div class="form-group">
        <label for="name">Nombre Completo:</label>
        <input type="text" id="name" name="name" required bind:value={name} />
      </div>

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

      <div class="button-group">
        <button type="button" on:click={encryptData}> Cifrar Datos </button>
        <button type="button" on:click={() => decryptCustomData(decryptedText)}>
          Desencriptar Datos
        </button>
        <button
          type="button"
          on:click={sendData}
          disabled={!encryptedName || !encryptedCard || !encryptedCVV}
        >
          Enviar Datos
        </button>
      </div>

      {#if encryptedName && encryptedCard && encryptedCVV}
        <div class="output" style="margin-top: 20px; font-weight: bold;">
          Nombre cifrado: {encryptedName}<br />
          Número de tarjeta cifrado: {encryptedCard}<br />
          CVV cifrado: {encryptedCVV}
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
    margin: 0;
  }

  .container {
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);

    max-width: 100%;
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.3s;
  }

  input:focus {
    border-color: #28a745;
    outline: none;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  button {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #28a745;
    color: white;
    font-size: 16px;
    margin: 0 5px;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #218838;
  }

  .output {
    margin-top: 20px;
  }
</style>
