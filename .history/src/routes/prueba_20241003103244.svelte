<script>
    import { JSEncrypt } from "jsencrypt";
  
    // Crear una instancia de JSEncrypt
    const encryptor = new JSEncrypt();
    const decryptor = new JSEncrypt();
  
    // Generar las claves
    const publicKey = encryptor.getPublicKey();
    const privateKey = encryptor.getPrivateKey();
  
    let plainText = ""; // Texto a cifrar
    let cipherText = ""; // Texto cifrado
    let decryptedText = ""; // Texto descifrado
  
    const generateKeys = () => {
      // Generar una nueva clave RSA de 2048 bits
      encryptor.setPublicKey(publicKey);
      encryptor.setPrivateKey(privateKey);
    };
  
    const encrypt = () => {
      // Cifrado usando la clave pública
      cipherText = encryptor.encrypt(plainText);
      decryptedText = ""; // Limpia el texto descifrado al cifrar
    };
  
    const decrypt = () => {
      // Descifrado usando la clave privada
      decryptedText = decryptor.decrypt(cipherText);
    };
    
    // Generar las claves cuando se carga el componente
    generateKeys();
  </script>
  
  <main>
    <h1>Cifrado RSA (Rivest-Shamir-Adleman)</h1>
    <div>
      <h2>Texto Plano:</h2>
      <textarea bind:value={plainText} placeholder="Ingresa el texto aquí..."></textarea>
  
      <button on:click={encrypt}>Cifrar</button>
      <h2>Cifrado:</h2>
      <p>{cipherText}</p>
  
      <button on:click={decrypt}>Descifrar</button>
      <h2>Texto Descifrado:</h2>
      <p>{decryptedText}</p>
    </div>
  
    <h2>Claves RSA:</h2>
    <p><strong>Clave Pública:</strong></p>
    <pre>{publicKey}</pre>
    <p><strong>Clave Privada:</strong></p>
    <pre>{privateKey}</pre>
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
  