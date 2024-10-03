<script>
    let rsaKeys = null;
    let encryptionEnabled = false;
    let resultText = "";
    let nombre = "";
    let ssn = "";
    let direccion = "";
    let telefono = "";
  
    let encryptedNombre = "";
    let encryptedSSN = "";
    let encryptedDireccion = "";
    let encryptedTelefono = "";
  
    let decryptedNombre = "";
    let decryptedSSN = "";
    let decryptedDireccion = "";
    let decryptedTelefono = "";
  
    let textToDecrypt = "";
    let decryptedText = "";
  
    function generateRSAKeys() {
      const { publicKey, privateKey } = generateRSAKeyPair();
      rsaKeys = { publicKey, privateKey };
      resultText = "Claves RSA generadas correctamente.";
      encryptionEnabled = true;
    }
  
    function generateRSAKeyPair() {
      const publicKey = "clave-publica-ejemplo";
      const privateKey = "clave-privada-ejemplo";
      return { publicKey, privateKey };
    }
  
    function encryptData() {
      if (rsaKeys) {
        encryptedNombre = btoa(nombre); // Simulación de cifrado
        encryptedSSN = btoa(ssn);
        encryptedDireccion = btoa(direccion);
        encryptedTelefono = btoa(telefono);
        resultText = "Datos cifrados correctamente.";
      }
    }
  
    async function sendData() {
      const data = {
        nombreCompleto: encryptedNombre,
        numeroSeguroSocial: encryptedSSN,
        direccion: encryptedDireccion,
        telefono: encryptedTelefono,
      };
  
      try {
        const response = await fetch("http://localhost:3000/cifradoASimetrico", {
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
  
    function decryptData() {
      if (rsaKeys) {
        decryptedNombre = atob(encryptedNombre);
        decryptedSSN = atob(encryptedSSN);
        decryptedDireccion = atob(encryptedDireccion);
        decryptedTelefono = atob(encryptedTelefono);
      }
    }
  
    function independentDecrypt() {
      if (rsaKeys) {
        try {
          decryptedText = atob(textToDecrypt);
        } catch (error) {
          decryptedText = "Error al descifrar el texto.";
        }
      }
    }
  
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text);
      alert("Texto copiado al portapapeles");
    }
  </script>
  
  <main>
    <h1>Cifrado Asimétrico (RSA)</h1>
  
    <div class="container">
      <div class="section">
        <button on:click={generateRSAKeys}>Generar Claves RSA</button>
        <p>{resultText}</p>
      </div>
  
      <!-- Sección de Cifrado -->
      <div class="section">
        <label for="nombre">Nombre Completo:</label>
        <input type="text" id="nombre" bind:value={nombre} required />
  
        <label for="ssn">Número de Seguro Social:</label>
        <input type="text" id="ssn" bind:value={ssn} required />
  
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" bind:value={direccion} required />
  
        <label for="telefono">Número de Teléfono:</label>
        <input type="tel" id="telefono" bind:value={telefono} required />
  
        <button on:click={encryptData} disabled={!encryptionEnabled}>
          Cifrar Datos
        </button>
  
        {#if encryptedNombre}
          <div class="encrypted-section">
            <label>Nombre Cifrado:</label>
            <input type="text" value={encryptedNombre} readonly />
            <button class="copy-button" on:click={() => copyToClipboard(encryptedNombre)}>
              Copiar
            </button>
          </div>
        {/if}
  
        {#if encryptedSSN}
          <div class="encrypted-section">
            <label>SSN Cifrado:</label>
            <input type="text" value={encryptedSSN} readonly />
            <button class="copy-button" on:click={() => copyToClipboard(encryptedSSN)}>
              Copiar
            </button>
          </div>
        {/if}
  
        {#if encryptedDireccion}
          <div class="encrypted-section">
            <label>Dirección Cifrada:</label>
            <input type="text" value={encryptedDireccion} readonly />
            <button class="copy-button" on:click={() => copyToClipboard(encryptedDireccion)}>
              Copiar
            </button>
          </div>
        {/if}
  
        {#if encryptedTelefono}
          <div class="encrypted-section">
            <label>Teléfono Cifrado:</label>
            <input type="text" value={encryptedTelefono} readonly />
            <button class="copy-button" on:click={() => copyToClipboard(encryptedTelefono)}>
              Copiar
            </button>
          </div>
        {/if}
  
        <!-- Botón de enviar datos cifrados -->
        <button on:click={sendData} disabled={!encryptedNombre || !encryptedSSN || !encryptedDireccion || !encryptedTelefono}>
          Enviar Datos Cifrados
        </button>
      </div>
  
      <!-- Sección de Descifrado Independiente -->
      <div class="section">
        <h2>Descifrado Independiente</h2>
        <label for="textToDecrypt">Texto Cifrado:</label>
        <input type="text" id="textToDecrypt" bind:value={textToDecrypt} placeholder="Texto cifrado" />
        <button on:click={independentDecrypt} disabled={!encryptionEnabled}>
          Descifrar
        </button>
        <p>Texto descifrado: {decryptedText}</p>
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

  textarea,
  input {
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
    background-color: #4caf50; /* Color verde para botones principales */
    color: white;
    cursor: pointer;
    font-size: 1em;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  button:hover:not(:disabled) {
    background-color: #45a049; /* Color verde oscuro al pasar el mouse */
  }

  .copy-button {
    background-color: #007bff; /* Color azul para los botones de copiar */
    border: none;
  }

  .copy-button:hover {
    background-color: #0056b3; /* Color azul oscuro al pasar el mouse */
  }

  .encrypted-section,
  .decrypted-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .encrypted-section input,
  .decrypted-section input {
    flex-grow: 1;
    border: 1px solid #007bff; /* Color azul para los inputs de resultados */
  }

  .encrypted-section input:focus,
  .decrypted-section input:focus {
    border-color: #0056b3; /* Color azul oscuro al enfocar */
    outline: none;
  }
</style>
