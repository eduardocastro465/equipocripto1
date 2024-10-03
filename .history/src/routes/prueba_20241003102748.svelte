<script>
    import whirlpool from "whirlpool-hash";
  
    let inputText = ""; // Texto que deseas hashear
    let hashValue = ""; // Valor del hash generado
  
    const generateHash = () => {
      // Genera el hash utilizando el algoritmo Whirlpool
      hashValue = whirlpool(inputText);
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
  