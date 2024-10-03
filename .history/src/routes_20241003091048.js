import cifradoAsimetrico from "./routes/cifradoAsimetrico.svelte";
import cifradoSimetrico from "./routes/cifradoSimetrico.svelte";
import hash from "./routes/hash.svelte";
impo

const routes = {
  "/": cifradoSimetrico,
  "/cifradoAsimetrico": cifradoAsimetrico,
  "/hash": hash,
};

export default routes;
