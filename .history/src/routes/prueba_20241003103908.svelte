<script>
    import { JSEncrypt } from "jsencrypt";
  
    const encryptor = new JSEncrypt();
    const publicKey = encryptor.getPublicKey();
    const privateKey = encryptor.getPrivateKey();
  
    let plainText = "";
    let cipherText = "";
    let decryptedText = "";
  
    const encrypt = () => {
      if (plainText) {
        cipherText = encryptor.encrypt(plainText);
      } else {
        alert("Por favor, ingresa un texto para cifrar.");
      }
    };
  
    const decrypt = () => {
      if (cipherText) {
        decryptedText = encryptor.decrypt(cipherText);
      } else {
        alert("No hay texto cifrado para descifrar.");
      }
    };
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
  
      <h2>Claves RSA:</h2>
      <p><strong>Clave Pública:</strong></p>
      <pre>{publicKey}</pre>
      <p><strong>Clave Privada:</strong></p>
      <pre>{privateKey}</pre>
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
  