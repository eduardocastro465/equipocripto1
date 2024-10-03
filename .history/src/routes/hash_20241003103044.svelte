<script>
  import { Whirlpool, encoders } from "whirlpool-hash"; 
  const whirlpool = new Whirlpool(); 

  let plaintextHash = "";
  let hashedData = "";

  function hashData() {
    if (plaintextHash) {
      hashedData = whirlpool.getHash(plaintextHash); // Generar el hash
      hashResultText = `Hash generado (Whirlpool): ${encoders.toHex(hashedData)}`;
    } else {
      hashResultText = "Por favor, introduce un texto plano.";
    }
  }

  function copyHashToClipboard() {
    navigator.clipboard.writeText(encoders.toHex(hashedData)); // Copiar en formato hexadecimal
    alert("Hash copiado al portapapeles");
  }
</script>

<main>
  <h1>Generador de Hash (Whirlpool)</h1>

  <div class="container">
    <div class="section">
      <label for="plaintextHash">Texto Plano:</label>
      <textarea id="plaintextHash" rows="4" bind:value={plaintextHash}
      ></textarea>

      <button on:click={hashData}>Generar Hash</button>

      {#if hashedData}
        <div class="hashed-section">
          <input type="text" value={encoders.toHex(hashedData)} readonly />
          <button class="copy-button" on:click={copyHashToClipboard}
            >Copiar Hash</button
          >
        </div>
      {/if}
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
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    font-size: 1em;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  button:hover:not(:disabled) {
    background-color: #45a049;
  }

  .copy-button {
    background-color: #007bff;
    border: none;
  }

  .copy-button:hover {
    background-color: #0056b3;
  }

  .hashed-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .hashed-section input {
    flex-grow: 1;
    border: 1px solid #007bff;
  }

  .hashed-section input:focus {
    border-color: #0056b3;
    outline: none;
  }
</style>
