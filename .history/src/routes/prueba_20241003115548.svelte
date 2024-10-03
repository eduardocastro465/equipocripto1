<script>
    import { JSEncrypt } from "jsencrypt";
  
    const encryptor = new JSEncrypt();
  
    let publicKey = "";
    let privateKey = "";
    let plainText = "";
    let cipherText = "";
    let decryptedText = "";
  
    const generateKeys = () => {
      publicKey = encryptor.getPublicKey();
      privateKey = encryptor.getPrivateKey();
    };
  
    const encrypt = () => {
      if (!publicKey) {
        alert("Por favor, genera las claves primero.");
        return;
      }
  
      encryptor.setPublicKey(publicKey);
      cipherText = encryptor.encrypt(plainText);
      decryptedText = "";
    };
  
    const decrypt = () => {
      if (!privateKey) {
        alert("Por favor, genera las claves primero.");
        return;
      }
  
      encryptor.setPrivateKey(privateKey);
      decryptedText = encryptor.decrypt(cipherText);
    };
  </script>
  
  <main>
    <h1>Cifrado/Descifrado RSA</h1>
    <div class="container">
      <button class="generate-button" on:click={generateKeys}>Generar Claves RSA</button>
  
      <div class="keys-section">
        <h2>Claves RSA</h2>
        <div class="key-container">
          <div>
            <h3>Clave Pública:</h3>
            <pre>{publicKey}</pre>
          </div>
          <div>
            <h3>Clave Privada:</h3>
            <pre>{privateKey}</pre>
          </div>
        </div>
      </div>
  
      <div class="text-section">
        <h2>Texto Plano:</h2>
        <textarea bind:value={plainText} placeholder="Ingresa el texto aquí..."></textarea>
  
        <button class="action-button" on:click={encrypt}>Cifrar</button>
        <h2>Cifrado:</h2>
        <p class="cipher-text">{cipherText}</p>
  
        <button class="action-button" on:click={decrypt}>Descifrar</button>
        <h2>Texto Descifrado:</h2>
        <p class="decrypted-text">{decryptedText}</p>
      </div>
    </div>
  </main>
  
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 20px;
    }
  
    h1 {
      text-align: center;
      color: #0056b3;
    }
  
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  
    .generate-button, .action-button {
      background-color: #28a745; /* Color verde */
      color: white;
      border: none;
      padding: 8px 12px; /* Reducido el tamaño */
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s;
      font-size: 14px; /* Reducido el tamaño de fuente */
      width: auto; /* Cambiar a auto para ajustarse al contenido */
      margin: 10px auto; /* Centrarlos */
      display: block; /* Para centrar el botón */
    }
  
    .generate-button:hover, .action-button:hover {
      background-color: #218838; /* Verde más oscuro en hover */
    }
  
    .keys-section {
      margin-top: 20px;
    }
  
    .key-container {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
  
    pre {
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 5px;
      padding: 10px;
      white-space: pre-wrap; 
      word-wrap: break-word;
      max-height: 150px;
      overflow-y: auto;
    }
  
    .text-section {
      margin-top: 20px;
    }
  
    textarea {
      width: 100%;
      height: 50px;
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #ced4da;
      border-radius: 5px;
      resize: none;
    }
  
    .cipher-text, .decrypted-text {
      background-color: #e9ecef;
      padding: 10px;
      border: 1px solid #ced4da;
      border-radius: 5px;
      word-wrap: break-word;
    }
  </style>
  