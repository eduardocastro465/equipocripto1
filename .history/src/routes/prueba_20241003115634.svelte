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
                    <pre>{publicKey || "No disponible"}</pre>
                </div>
                <div>
                    <h3>Clave Privada:</h3>
                    <pre>{privateKey || "No disponible"}</pre>
                </div>
            </div>
        </div>

        <div class="text-section">
            <h2>Texto Plano:</h2>
            <textarea bind:value={plainText} placeholder="Ingresa el texto aquí..."></textarea>

            <button class="action-button" on:click={encrypt}>Cifrar</button>
            <h2>Cifrado:</h2>
            <p class="cipher-text">{cipherText || "No cifrado aún."}</p>

            <button class="action-button" on:click={decrypt}>Descifrar</button>
            <h2>Texto Descifrado:</h2>
            <p class="decrypted-text">{decryptedText || "No descifrado aún."}</p>
        </div>
    </div>
</main>

<style>
    body {
        font-family: 'Helvetica Neue', Arial, sans-serif;
        background-color: #f0f4f8;
        color: #333;
        margin: 0;
        padding: 20px;
    }

    h1 {
        text-align: center;
        color: #007bff;
        margin-bottom: 20px;
    }

    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .generate-button, .action-button {
        background-color: #007bff; /* Color azul */
        color: white;
        border: none;
        padding: 10px 15px; /* Tamaño de botón */
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
        font-size: 16px; /* Tamaño de fuente aumentado */
        width: 100%; /* Ajustar a 100% */
        margin: 10px 0; /* Margen vertical */
        display: block; /* Centrar botón */
    }

    .generate-button:hover, .action-button:hover {
        background-color: #0056b3; /* Azul más oscuro en hover */
    }

    .keys-section {
        margin-top: 20px;
        padding: 15px;
        border: 1px solid #007bff;
        border-radius: 8px;
        background-color: #e7f1ff;
    }

    .key-container {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }

    pre {
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        white-space: pre-wrap;
        word-wrap: break-word;
        max-height: 150px;
        overflow-y: auto;
        margin-top: 5px; /* Margen superior */
    }

    .text-section {
        margin-top: 20px;
    }

    textarea {
        width: 100%;
        height: 80px; /* Aumento de altura */
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #007bff;
        border-radius: 5px;
        resize: none;
        font-size: 14px; /* Tamaño de fuente */
    }

    .cipher-text, .decrypted-text {
        background-color: #e7f1ff;
        padding: 10px;
        border: 1px solid #007bff;
        border-radius: 5px;
        word-wrap: break-word;
        margin-top: 5px; /* Margen superior */
    }
</style>
