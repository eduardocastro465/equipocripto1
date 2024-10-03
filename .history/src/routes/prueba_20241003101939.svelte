<script>
    import CryptoJS from 'crypto-js';

    let key = "0123456789abcdef"; // Clave de 128 bits como cadena
    let plainText = "Texto claro"; // Texto que deseas cifrar
    let cipherText = "";
    let decryptedText = "";

    const encrypt = () => {
        // Cifrado usando TEA
        cipherText = CryptoJS.TEA.encrypt(plainText, key).toString();
    };

    const decrypt = () => {
        // Descifrado usando TEA
        decryptedText = CryptoJS.TEA.decrypt(cipherText, key).toString(CryptoJS.enc.Utf8);
    };
</script>

<main>
    <h1>TEA (Tiny Encryption Algorithm)</h1>
    <div>
        <h2>Texto Plano:</h2>
        <p>{plainText}</p>
        <button on:click={encrypt}>Cifrar</button>
        <p>Cifrado: {cipherText}</p>
        <button on:click={decrypt}>Descifrar</button>
        <p>Texto Descifrado: {decryptedText}</p>
    </div>
</main>

<style>
    /* Agrega estilos según sea necesario */
</style>
