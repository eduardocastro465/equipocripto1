<script>
  let mensaje = '';
  let desplazamiento = '';
  let resultadoCifrado = '';
  let mensajeCifrado = '';
  let desplazamientoDelCifrado = '';
  let resultadoDescifrado = '';

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

    <div class="cifrado-container">
      <h3>Cifrado</h3>
      <div class="input-group">
        <input
          type="text"
          placeholder="Mensaje a cifrar"
          bind:value={mensaje}
          class="input-field"
        />
        <input
          type="number"
          placeholder="Desplazamiento"
          bind:value={desplazamiento}
          class="input-field"
        />
        <button on:click={manejarCifrado} class="button">Cifrar</button>
      </div>
      <div class="resultado-container">
        <h4>Resultado del Cifrado:</h4>
        <span>{resultadoCifrado}</span>
        <button on:click={() => copiarAlPortapapeles(resultadoCifrado)} class="button copiar-button">Copiar</button>
      </div>
    </div>

    <div class="descifrado-container">
      <h3>Descifrado</h3>
      <div class="input-group">
        <input
          type="text"
          placeholder="Mensaje a descifrar"
          bind:value={mensajeCifrado}
          class="input-field"
        />
        <input
          type="number"
          placeholder="Desplazamiento"
          bind:value={desplazamientoDelCifrado}
          class="input-field"
        />
        <button on:click={manejarDescifrado} class="button">Descifrar</button>
      </div>
      <div class="resultado-container">
        <h4>Resultado del Descifrado:</h4>
        <span>{resultadoDescifrado}</span>
        <button on:click={() => copiarAlPortapapeles(resultadoDescifrado)} class="button copiar-button">Copiar</button>
      </div>
    </div>
    <h4 class="footer">Eduardo Castro Hernandez 7:A</h4>
  </div>
</div>

<style>
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f7f9fc;
    margin: 0;
    padding: 20px;
    color: #333;
  }
  
  .app-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }

  .form-container {
    display: flex;
    flex-direction: column;
  }

  h2 {
    text-align: center;
    color: #007bff;
  }

  .cifrado-container, .descifrado-container {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  h3 {
    color: #007bff;
    margin-bottom: 10px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  .input-field {
    padding: 10px;
    border: 1px solid #007bff;
    border-radius: 4px;
    margin-bottom: 10px;
    transition: border-color 0.3s;
  }

  .input-field:focus {
    border-color: #0056b3;
    outline: none;
  }

  .button {
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
  }

  .button:hover {
    background-color: #218838;
    transform: translateY(-2px);
  }

  .resultado-container {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #28a745;
    border-radius: 5px;
    background-color: #d4edda;
  }

  .copiar-button {
    background-color: #007bff;
  }

  .copiar-button:hover {
    background-color: #0056b3;
  }

  .footer {
    text-align: center;
    color: #777;
    margin-top: 20px;
  }
</style>
