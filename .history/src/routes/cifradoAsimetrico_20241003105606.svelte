<script>
  // Variables para manejar el estado de la aplicación
  let mensajeCifrado = '';
  let claveCifrado = '';
  let resultadoCifrado = '';
  let mensajeDescifrado = '';
  let claveDescifrada = '';
  let resultadoDescifrado = '';
  let mensajeCopiadoCifrado = '';
  let mensajeCopiadoDescifrado = '';

  // Función para cifrar el mensaje utilizando la técnica Escítala
  const cifrarEscitala = (texto, clave) => {
      const longitudClave = parseInt(clave);
      if (isNaN(longitudClave) || longitudClave <= 0) return texto;

      const textoLimpio = texto.replace(/[^a-zA-Z0-9]/g, ''); // Limpia el texto de caracteres no alfanuméricos
      let resultado = '';

      if (longitudClave >= textoLimpio.length) {
          return textoLimpio; // No se requiere cifrado si la clave es mayor o igual que la longitud del texto
      }

      const filas = Math.ceil(textoLimpio.length / longitudClave);
      const textoRellenado = textoLimpio.padEnd(filas * longitudClave, ' '); // Rellena el texto si es necesario

      for (let col = 0; col < longitudClave; col++) {
          for (let fila = 0; fila < filas; fila++) {
              resultado += textoRellenado[fila * longitudClave + col];
          }
      }
      return resultado.trim(); // Elimina espacios en blanco
  };

  // Función para descifrar el mensaje utilizando la técnica Escítala
  const descifrarEscitala = (texto, clave) => {
      const longitudClave = parseInt(clave);
      if (isNaN(longitudClave) || longitudClave <= 0) return texto;

      const filas = Math.ceil(texto.length / longitudClave);
      let resultado = '';

      for (let fila = 0; fila < filas; fila++) {
          for (let col = 0; col < longitudClave; col++) {
              const index = fila + col * filas;
              if (index < texto.length) {
                  resultado += texto[index];
              }
          }
      }
      return resultado.trim(); // Elimina espacios en blanco
  };

  // Función para manejar el cifrado del mensaje
  const manejarCifrado = () => {
      resultadoCifrado = cifrarEscitala(mensajeCifrado, claveCifrado);
      if (resultadoCifrado !== mensajeCifrado) {
          mensajeCopiadoCifrado = 'Texto cifrado copiado al portapapeles';
          setTimeout(() => mensajeCopiadoCifrado = '', 3000);
      } else {
          mensajeCopiadoCifrado = 'Error en el cifrado. Asegúrate de que la clave sea válida.';
          setTimeout(() => mensajeCopiadoCifrado = '', 3000);
      }
  };

  // Función para manejar el descifrado del mensaje
  const manejarDescifrado = () => {
      resultadoDescifrado = descifrarEscitala(mensajeDescifrado, claveDescifrada);
      if (resultadoDescifrado !== mensajeDescifrado) {
          mensajeCopiadoDescifrado = 'Texto descifrado copiado al portapapeles';
          setTimeout(() => mensajeCopiadoDescifrado = '', 3000);
      } else {
          mensajeCopiadoDescifrado = 'Error en el descifrado. Asegúrate de que la clave sea válida.';
          setTimeout(() => mensajeCopiadoDescifrado = '', 3000);
      }
  };

  // Función para copiar el texto al portapapeles
  const copiarAlPortapapeles = (texto, esCifrado) => {
      navigator.clipboard.writeText(texto).then(() => {
          if (esCifrado) {
              mensajeCopiadoCifrado = 'Texto cifrado copiado al portapapeles';
              setTimeout(() => mensajeCopiadoCifrado = '', 3000);
          } else {
              mensajeCopiadoDescifrado = 'Texto descifrado copiado al portapapeles';
              setTimeout(() => mensajeCopiadoDescifrado = '', 3000);
          }
      });
  };
</script>

<div class="app-container">
  <h2>Cifrado y Descifrado Escítala</h2>
  <div class="form-container">
      <div class="columns-container">
          <div class="form-column">
              <h3>Cifrado</h3>
              <div class="input-group">
                  <label for="mensaje-cifrado">Mensaje a cifrar</label>
                  <input
                      id="mensaje-cifrado"
                      bind:value={mensajeCifrado}
                      type="text"
                      placeholder="Introduce el mensaje a cifrar"
                  />
              </div>
              <div class="input-group">
                  <label for="clave-cifrado">Clave (número de columnas)</label>
                  <input
                      id="clave-cifrado"
                      bind:value={claveCifrado}
                      type="text"
                      placeholder="Introduce la clave"
                  />
              </div>
              <button class="btn-cifrar" on:click={manejarCifrado}>Cifrar</button>

              {#if resultadoCifrado}
                  <div class="result-container">
                      <h4>Resultado del Cifrado:</h4>
                      <span class="resultado">{resultadoCifrado}</span>
                      <button class="btn-copiar" on:click={() => copiarAlPortapapeles(resultadoCifrado, true)}>Copiar</button>
                  </div>
              {/if}
              {#if mensajeCopiadoCifrado}
                  <p class="mensaje-copiado">{mensajeCopiadoCifrado}</p>
              {/if}
          </div>

          <div class="form-column">
              <h3>Descifrado</h3>
              <div class="input-group">
                  <label for="mensaje-descifrado">Mensaje a descifrar</label>
                  <input
                      id="mensaje-descifrado"
                      bind:value={mensajeDescifrado}
                      type="text"
                      placeholder="Introduce el mensaje a descifrar"
                  />
              </div>
              <div class="input-group">
                  <label for="clave-descifrado">Clave (número de columnas)</label>
                  <input
                      id="clave-descifrado"
                      bind:value={claveDescifrada}
                      type="text"
                      placeholder="Introduce la clave"
                  />
              </div>
              <button class="btn-cifrar" on:click={manejarDescifrado}>Descifrar</button>

              {#if resultadoDescifrado}
                  <div class="result-container">
                      <h4>Resultado del Descifrado:</h4>
                      <span class="resultado">{resultadoDescifrado}</span>
                      <button class="btn-copiar" on:click={() => copiarAlPortapapeles(resultadoDescifrado, false)}>Copiar</button>
                  </div>
              {/if}
              {#if mensajeCopiadoDescifrado}
                  <p class="mensaje-copiado">{mensajeCopiadoDescifrado}</p>
              {/if}
          </div>
      </div>
      <h4 class="footer">Eduardo Castro Hernandez 7:A</h4>
  </div>
</div>

<style>
  body {
      background-color: #e9ecef;
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .app-container {
      padding: 30px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      max-width: 900px;
      margin: 30px auto;
      transition: all 0.3s ease;
  }

  .form-container {
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      background-color: #f9f9f9;
  }

  .columns-container {
      display: flex;
      justify-content: space-between;
      gap: 20px;
  }

  .form-column {
      flex: 1;
      min-width: 250px; /* Asegura que las columnas no sean demasiado estrechas */
  }

  .input-group {
      margin-bottom: 20px;
  }

  .input-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #333;
  }

  .input-group input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 14px;
      transition: border-color 0.3s;
  }

  .input-group input:focus {
      border-color: #28a745; /* Cambia el color del borde al enfocar */
      outline: none;
  }

  .btn-cifrar {
      padding: 10px 20px;
      background-color: #28a745; /* Color verde */
      color: #ffffff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
  }

  .btn-cifrar:hover {
      background-color: #218838; /* Color verde más oscuro al pasar el mouse */
  }

  .result-container {
      margin-top: 20px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #f0f8ff;
  }

  .resultado {
      display: block;
      font-weight: bold;
      margin-top: 10px;
      font-size: 16px;
      color: #333;
  }

  .btn-copiar {
      margin-top: 10px;
      padding: 6px 12px;
      background-color: #28a745; /* Color verde */
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;
  }

  .btn-copiar:hover {
      background-color: #218838; /* Color verde más oscuro al pasar el mouse */
  }

  .mensaje-copiado {
      margin-top: 10px;
      color: #28a745; /* Color verde para el mensaje de copia */
      font-weight: bold;
  }

  .footer {
      text-align: center;
      margin-top: 30px;
      color: #666;
  }
</style>
