<script>
    import { JSEncrypt } from "jsencrypt";
  
    // Crear una instancia de JSEncrypt
    const encryptor = new JSEncrypt();
  
    let publicKey = ""; // Clave pública proporcionada por tu amigo
    let privateKey = ""; // Clave privada de tu amigo (para descifrar)
    let plainText = ""; // Texto a cifrar
    let cipherText = ""; // Texto cifrado
    let decryptedText = ""; // Texto descifrado
  
    const encrypt = () => {
      // Verificar que se haya ingresado la clave pública
      if (!publicKey) {
        alert("Por favor, ingresa la clave pública.");
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
        alert("Por favor, ingresa la clave privada.");
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
      <h2>Clave Pública de tu amigo:</h2>
      <textarea bind:value={publicKey} placeholder="Ingresa la clave pública aquí..."></textarea>
  
      <h2>Texto Plano:</h2>
      <textarea bind:value={plainText} placeholder="Ingresa el texto aquí..."></textarea>
  
      <button on:click={encrypt}>Cifrar</button>
      <h2>Cifrado:</h2>
      <p>{cipherText}</p>
  
      <h2>Clave Privada de tu amigo:</h2>
      <textarea bind:value={privateKey} placeholder="Ingresa la clave privada aquí..."></textarea>
  
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
  