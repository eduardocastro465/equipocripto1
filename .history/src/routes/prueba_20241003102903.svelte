<script>
    import { Whirlpool } from "whirlpool-hash";
  
    let inputText = "";
    let hashValue = ""; // Valor del hash generado
    const whirlpool = new Whirlpool(); // Instancia de la clase Whirlpool
  
    const generateHash = () => {
      // Genera el hash utilizando el método getHash
      hashValue = whirlpool.getHash(inputText);
    };
  </script>
  
  <main>
    <h1>Generador de Hash (Whirlpool)</h1>
    <div>
      <h2>Texto a Hashear:</h2>
      <textarea bind:value={inputText} placeholder="Ingresa el texto aquí..."></textarea>
  
      <button on:click={generateHash}>Generar Hash</button>
      <h2>Hash Generado:</h2>
      <p>{hashValue}</p>
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
  </style>
  