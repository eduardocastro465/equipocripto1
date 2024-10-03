import cifradoAsimetrico from "./routes/cifradoAsimetrico.svelte";
import cifradoSimetrico from "./routes/cifradoSimetrico.svelte";
import hash from "./routes/hash.svelte";
import cifladoCesar from "./routes/cifladoCesarPages.svelte";
import cifladoEscitala from "./routes/cifladoEscitala.svelte";
import cifladoEscitala from "./routes/prueba.svelte";

const routes = {
  "/": cifradoSimetrico,
  "/cifradoAsimetrico": cifradoAsimetrico,
  "/hash": hash,
  "/cifladoCesar": cifladoCesar,
  "/cifladoEscitala": cifladoEscitala,
  "/cifladoEscitala": cifladoEscitala,
};

export default routes;
