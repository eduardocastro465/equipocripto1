<script>
    import { JSEncrypt } from "jsencrypt";
  
    const encryptor = new JSEncrypt();
    
    let publicKey = ""; // Clave pública generada
    let privateKey = ""; // Clave privada generada
    let plainText = ""; // Texto a cifrar
    let cipherText = ""; // Texto cifrado
    let decryptedText = ""; // Texto descifrado
  
    const generateKeys = () => {
      // Generar una nueva clave RSA de 2048 bits
      publicKey = encryptor.getPublicKey();
      privateKey = encryptor.getPrivateKey();
    };
  
    const encrypt = () => {
      // Verificar que se haya ingresado la clave pública
      if (!publicKey) {
        alert("Por favor, genera las claves primero.");
        return;
      }
  
      // Establecer la clave pública
      encryptor.setPublicKey(publicKey);
  
      // Cifrado usando la clave pública
      cipherText = encryptor.encrypt(plainText);
      decryptedText = ""; // Limpiar el texto descifrado al cifrar
    };
  
    const decrypt = () => {
      // Verificar que se haya ingresado la clave privada
      if (!privateKey) {
        alert("Por favor, genera las claves primero.");
        return;
      }
  
      // Establecer la clave privada
      encryptor.setPrivateKey(privateKey);
  
      // Descifrado usando la clave privada
      decryptedText = encryptor.decrypt(cipherText);
    };
  </script>
  
  <main>
    <h1>Cifrado/Descifrado RSA (Rivest-Shamir-Adleman)</h1>
    <div>
      <button on:click={generateKeys}>Generar Claves RSA</button>
      
      <h2>Clave Pública:</h2>
      <pre>{publicKey}</pre>
      
      <h2>Clave Privada:</h2>
      <pre>{privateKey}</pre>
  
      <h2>Texto Plano:</h2>
      <textarea bind:value={plainText} placeholder="Ingresa el texto aquí..."></textarea>
  
      <button on:click={encrypt}>Cifrar</button>
      <h2>Cifrado:</h2>
      <p>{cipherText}</p>
  
      <button on:click={decrypt}>Descifrar</button>
      <h2>Texto Descifrado:</h2>
      <p>{decryptedText}</p>
    </div>
  </main>
  
  <style>
    /* Agrega estilos según sea necesario */
    textarea {
      width: 100%;
      height: 100px;
      margin-bottom: 10px;
    }
  
    button {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  
    pre {
      white-space: pre-wrap; /* Permite el salto de línea en las claves */
      word-wrap: break-word; /* Permite que el texto se ajuste */
      max-height: 200px; /* Limita la altura del contenedor */
      overflow-y: auto; /* Agrega barra de desplazamiento si es necesario */
      border: 1px solid #ccc;
      padding: 10px;
      background-color: #f9f9f9;
    }
  </style>
  