<!-- JavaScript -->
<script>
  import Routes from "svelte-spa-router";
  import routes from "./routes.js";
  import { link } from "svelte-spa-router";
  import './bundle.css'
</script>

<nav>
  <ul>
    <li><a href="/" use:link>Cifrado simétrico</a></li>
    <li><a href="/cifradoAsimetrico" use:link>Cifrado Asimétrico</a></li>
    <li><a href="/hash" use:link>HASH</a></li>
    <li><a href="/cifladoCesar" use:link>cifladoCesarPages</a></li>
    <li><a href="/cifladoEscitala" use:link>cifladoEscitala</a></li>
  </ul>
</nav>
<Routes {routes} />

<style>
</style>
