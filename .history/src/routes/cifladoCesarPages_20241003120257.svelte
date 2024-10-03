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
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background-color: #e9f9e9; /* Fondo verde claro */
    margin: 0;
    padding: 20px;
  }

  .app-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    background-color: #ffffff; /* Fondo blanco */
  }

  .form-container {
    display: flex;
    flex-direction: column;
  }

  h2 {
    text-align: center;
    color: #28a745; /* Color verde */
  }

  .cifrado-container, .descifrado-container {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #28a745; /* Borde verde */
    border-radius: 8px;
    background-color: #d4edda; /* Fondo verde claro */
  }

  h3 {
    color: #555;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  .input-field {
    padding: 10px;
    border: 1px solid #28a745; /* Borde verde */
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .button {
    padding: 8px 12px; /* Reducido el tamaño */
    background-color: #28a745; /* Color verde */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
    width: 150px; /* Ancho fijo */
    margin: 10px auto; /* Centrarlos */
    display: block; /* Para centrar el botón */
  }

  .button:hover {
    background-color: #218838; /* Verde más oscuro en hover */
  }

  .resultado-container {
    margin-top: 10px;
  }

  .copiar-button {
    background-color: #28a745;
    text-: ;
  }

  .copiar-button:hover {
    background-color: #218838;
  }

  .footer {
    text-align: center;
    color: #777;
    margin-top: 20px;
  }
</style>
