<script>
    import CryptoJS from "crypto-js";
  
    let key = ""; // Clave de 128 bits
    let plainText = ""; // Texto que deseas cifrar
    let cipherText = "";
    let decryptedText = "";
  
    const encrypt = () => {
      if (key.length === 16) {
        // Verifica que la clave tenga 128 bits (16 caracteres)
        // Cifrado usando TEA
        cipherText = CryptoJS.TEA.encrypt(plainText, key).toString();
        decryptedText = ""; // Limpia el texto descifrado al cifrar
      } else {
        alert("La clave debe tener 16 caracteres.");
      }
    };
  
    const decrypt = () => {
      if (key.length === 16) {
        // Verifica que la clave tenga 128 bits (16 caracteres)
        // Descifrado usando TEA
        const decryptedBytes = CryptoJS.TEA.decrypt(cipherText, key);
        decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
        if (!decryptedText) {
          alert("No se pudo descifrar el texto. Verifica la clave y el cifrado.");
        }
      } else {
        alert("La clave debe tener 16 caracteres.");
      }
    };
  </script>
  
  <main>
    <h1>TEA (Tiny Encryption Algorithm)</h1>
    <div>
      <h2>Texto Plano:</h2>
      <textarea bind:value={plainText} placeholder="Ingresa el texto aquí..."></textarea>
  
      <h2>Clave (16 caracteres):</h2>
      <input
        type="text"
        bind:value={key}
        placeholder="Ingresa la clave de 16 caracteres"
        maxlength="16"
      />
  
      <button on:click={encrypt}>Cifrar</button>
      <p>Cifrado: {cipherText}</p>
  
      <button on:click={decrypt}>Descifrar</button>
      <p>Texto Descifrado: {decryptedText}</p>
    </div>
  </main>
  
  <style>
    /* Agrega estilos según sea necesario */
    textarea {
      width: 100%;
      height: 100px;
      margin-bottom: 10px;
    }
  
    input {
      width: 100%;
      margin-bottom: 10px;
    }
  
    button {
      margin-right: 10px;
    }
  </style>
  