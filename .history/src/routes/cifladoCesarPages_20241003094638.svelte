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
        <button on:click={() => copiarAlPortapapeles(resultadoCifrado)} class="button">Copiar</button>
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
        <button on:click={() => copiarAlPortapapeles(resultadoDescifrado)} class="button">Copiar</button>
      </div>
    </div>
    <h4 style="color:#000;">Eduardo Castro Hernandez 7:A</h4>
  </div>
</div>

<style>
  .app-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
    font-family: Arial, sans-serif;
  }

  .form-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 600px;
  }

  h2 {
    text-align: center;
    color: #333;
  }

  .cifrado-container,
  .descifrado-container {
    margin-bottom: 20px;
  }

  h3 {
    color: #555;
  }

  .input-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .input-field {
    width: 30%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  .input-field:focus {
    border-color: #007bff;
    outline: none;
  }

  .button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }

  .button:hover {
    background-color: #0056b3;
  }

  .resultado-container {
    margin-top: 10px;
  }

  span {
    display: block;
    margin: 5px 0;
    font-weight: bold;
    color: #333;
  }

  @media (max-width: 700px) {
    .input-field {
      width: 100%;
      margin-bottom: 10px;
    }

    .input-group {
      flex-direction: column;
      align-items: flex-start;
    }

    .form-container {
      width: 90%;
    }
  }
</style>
