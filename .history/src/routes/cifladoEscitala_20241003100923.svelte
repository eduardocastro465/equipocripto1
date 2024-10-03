<script>
    let mensaje = '';
    let desplazamiento = '';
    let resultadoCifrado = '';
    let mensajeCifrado = '';
    let desplazamientoDelCifrado = '';
    let resultadoDescifrado = '';
    let visible = false;
  
    // Función para cifrar el mensaje con el algoritmo de César
    const cifrarCesar = (texto, desplazamiento) => {
      let cifrado = '';
      for (let i = 0; i < texto.length; i++) {
        let charCode = texto.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
          cifrado += String.fromCharCode(((charCode - 65 + desplazamiento) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
          cifrado += String.fromCharCode(((charCode - 97 + desplazamiento) % 26) + 97);
        } else {
          cifrado += texto.charAt(i);
        }
      }
      return cifrado;
    };
  
    // Función para manejar el clic en el botón "cifrar"
    const manejarCifrado = () => {
      const despl = parseInt(desplazamiento);
      if (isNaN(despl) || mensaje.trim() === '') {
        alert('Por favor, ingrese un mensaje y un desplazamiento válido.');
        return;
      }
      resultadoCifrado = cifrarCesar(mensaje, despl);
      alert('Cifrado Exitoso: ' + resultadoCifrado);
    };
  
    // Función para manejar el clic en el botón "descifrar"
    const manejarDescifrado = () => {
      const despl = parseInt(desplazamientoDelCifrado);
      if (isNaN(despl) || mensajeCifrado.trim() === '') {
        alert('Por favor, ingrese un mensaje cifrado y un desplazamiento válido.');
        return;
      }
      resultadoDescifrado = cifrarCesar(mensajeCifrado, -despl);
      alert('Descifrado Exitoso: ' + resultadoDescifrado);
    };
  
    // Función para copiar el resultado al portapapeles
    const copiarAlPortapapeles = (texto) => {
      navigator.clipboard.writeText(texto).then(() => {
        alert('Texto copiado al portapapeles');
      });
    };
  </script>
  
  <div class="app-container">
    <div class="form-container">
      <h2>Cifrado y Descifrado César</h2>
  
      <div class="columns-container">
        <div class="form-column cifrado-container">
          <h3>Cifrado</h3>
          <div class="input-group">
            <label for="mensaje">Mensaje a cifrar</label>
            <input
              type="text"
              id="mensaje"
              placeholder="Ingrese el mensaje"
              bind:value={mensaje}
            />
          </div>
          <div class="input-group">
            <label for="desplazamiento">Desplazamiento</label>
            <input
              type="number"
              id="desplazamiento"
              placeholder="Desplazamiento"
              bind:value={desplazamiento}
            />
          </div>
          <button on:click={manejarCifrado} class="btn-cifrar">Cifrar</button>
          
          <div class="result-container">
            <h4>Resultado del Cifrado:</h4>
            <span class="resultado">{resultadoCifrado}</span>
            <button on:click={() => copiarAlPortapapeles(resultadoCifrado)} class="btn-copiar">Copiar</button>
          </div>
        </div>
  
        <div class="form-column descifrado-container">
          <h3>Descifrado</h3>
          <div class="input-group">
            <label for="mensajeCifrado">Mensaje a descifrar</label>
            <input
              type="text"
              id="mensajeCifrado"
              placeholder="Ingrese el mensaje cifrado"
              bind:value={mensajeCifrado}
            />
          </div>
          <div class="input-group">
            <label for="desplazamientoDescifrado">Desplazamiento</label>
            <input
              type="number"
              id="desplazamientoDescifrado"
              placeholder="Desplazamiento"
              bind:value={desplazamientoDelCifrado}
            />
          </div>
          <button on:click={manejarDescifrado} class="btn-cifrar">Descifrar</button>
          
          <div class="result-container">
            <h4>Resultado del Descifrado:</h4>
            <span class="resultado">{resultadoDescifrado}</span>
            <button on:click={() => copiarAlPortapapeles(resultadoDescifrado)} class="btn-copiar">Copiar</button>
          </div>
        </div>
      </div>
  
      <h4 class="footer">Eduardo Castro Hernandez 7:A</h4>
    </div>
  </div>
  
  <style>
    * {
      box-sizing: border-box;
    }
  
    body {
      margin: 0;
      font-family: Arial, sans-serif;
    }
  
    .app-container {
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      max-width: 800px;
      margin: 20px auto;
    }
  
    .form-container {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
  
    .columns-container {
      display: flex;
      justify-content: space-between;
    }
  
    .form-column {
      flex: 1;
      margin: 0 10px;
    }
  
    .input-group {
      margin-bottom: 15px;
    }
  
    .input-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
  
    .input-group input {
      width: 90%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }
  
    .btn-cifrar {
      background-color: #28a745;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 10px;
      width: 100%;
    }
  
    .btn-cifrar:hover {
      background-color: #06b300;
    }
  
    .result-container {
      margin-top: 15px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #f9f9f9;
    }
  
    .resultado {
      display: block;
      margin: 10px 0;
      font-weight: bold;
    }
  
    .btn-copiar {
      background-color: #28a745;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
    }
  
    .btn-copiar:hover {
      background-color: #218838;
    }
  
    .footer {
      text-align: center;
      font-size: 12px;
      color: #666;
      margin-top: 20px;
    }
  </style>
  