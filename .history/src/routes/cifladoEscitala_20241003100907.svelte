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
  
      <div class="columns-container">
        <div class="form-column">
          <h3>Cifrado</h3>
          <div class="input-group">
            <label for="mensaje">Mensaje a cifrar:</label>
            <input
              id="mensaje"
              type="text"
              placeholder="Ingrese el mensaje"
              bind:value={mensaje}
            />
          </div>
          <div class="input-group">
            <label for="desplazamiento">Desplazamiento:</label>
            <input
              id="desplazamiento"
              type="number"
              placeholder="Ingrese el desplazamiento"
              bind:value={desplazamiento}
            />
          </div>
          <button on:click={manejarCifrado} class="btn-cifrar">Cifrar</button>
          <div class="result-container">
            <span class="resultado">Resultado del Cifrado: {resultadoCifrado}</span>
            <button on:click={() => copiarAlPortapapeles(resultadoCifrado)} class="btn-copiar">Copiar</button>
          </div>
        </div>
  
        <div class="form-column">
          <h3>Descifrado</h3>
          <div class="input-group">
            <label for="mensajeCifrado">Mensaje a descifrar:</label>
            <input
              id="mensajeCifrado"
              type="text"
              placeholder="Ingrese el mensaje cifrado"
              bind:value={mensajeCifrado}
            />
          </div>
          <div class="input-group">
            <label for="desplazamientoDelCifrado">Desplazamiento:</label>
            <input
              id="desplazamientoDelCifrado"
              type="number"
              placeholder="Ingrese el desplazamiento"
              bind:value={desplazamientoDelCifrado}
            />
          </div>
          <button on:click={manejarDescifrado} class="btn-cifrar">Descifrar</button>
          <div class="result-container">
            <span class="resultado">Resultado del Descifrado: {resultadoDescifrado}</span>
            <button on:click={() => copiarAlPortapapeles(resultadoDescifrado)} class="btn-copiar">Copiar</button>
          </div>
        </div>
      </div>
      
      <h4 class="footer">Eduardo Castro Hernandez 7:A</h4>
    </div>
  </div>
  
 