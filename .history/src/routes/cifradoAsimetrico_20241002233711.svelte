<script>
    import { onMount } from 'svelte';

    const DELTA = 0x9e3779b9;
    const NUM_ROUNDS = 32;
    let globalKey = null;
    let plaintext = '';
    let encryptedText = '';
    let encryptionEnabled = true;

    function teaEncrypt(v, key) {
        let v0 = v[0], v1 = v[1];
        let sum = 0;
        for (let i = 0; i < NUM_ROUNDS; i++) {
            sum = (sum + DELTA) >>> 0;
            v0 = (v0 + (((v1 << 4) + key[0]) ^ (v1 + sum) ^ ((v1 >>> 5) + key[1]))) >>> 0;
            v1 = (v1 + (((v0 << 4) + key[2]) ^ (v0 + sum) ^ ((v0 >>> 5) + key[3]))) >>> 0;
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
            globalKey = new Uint32Array([Math.random() * 0xFFFFFFFF >>> 0, Math.random() * 0xFFFFFFFF >>> 0, Math.random() * 0xFFFFFFFF >>> 0, Math.random() * 0xFFFFFFFF >>> 0]);
        }
        return globalKey;
    }

    function encryptData() {
        const key = generateTeaKey();
        const dataArray = strToUint32Array(plaintext.padEnd(4, ' ')); // Ajustar a 4 caracteres
        const encrypted = teaEncrypt(dataArray, key);
        encryptedText = bufferToHex(encrypted);
        encryptionEnabled = false; // Deshabilitar el cifrado después de usarlo
    }

    function bufferToHex(buffer) {
        return buffer.map(v => v.toString(16).padStart(8, '0')).join('');
    }
</script>

<main>
  <div class="container">
    <h2>Cifrado de Texto</h2>
    
    <textarea id="plaintext" rows="4" bind:value={plaintext} disabled={!encryptionEnabled}></textarea>
    <button on:click={encryptData} disabled={!encryptionEnabled}>Cifrar Datos</button>

    <!-- Mostrar el texto cifrado -->
    {#if encryptedText}
      <div style="margin-top: 20px; font-weight: bold;">
        Texto cifrado: {encryptedText}
      </div>
    {/if}
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
  textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .btn {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .btn:hover {
    background-color: #45a049;
  }
</style>
