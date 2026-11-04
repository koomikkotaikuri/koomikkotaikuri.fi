/* Node ajaa .ts-tiedostot suoraan (type stripping), mutta ei tunne
   tsconfigin "@/"-aliasta eikä päätteettömiä importteja. Tämä hook
   lisää molemmat, jotta testit voivat tuoda lib/-moduulit sellaisenaan. */
import { registerHooks } from "node:module";
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const juuri = fileURLToPath(new URL("..", import.meta.url));

/* Projektin .ts-moduulit ovat ESM:ää; kerrotaan se Nodelle suoraan, ettei
   se arvaa muotoa jokaisen tiedoston kohdalla (MODULE_TYPELESS_PACKAGE_JSON). */
function esm(tulos) {
  return tulos.url.endsWith(".ts") ? { ...tulos, format: "module-typescript" } : tulos;
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    return esm(ratkaise(specifier, context, nextResolve));
  },
});

function ratkaise(specifier, context, nextResolve) {
  let polku = null;
  if (specifier.startsWith("@/")) {
    polku = juuri + specifier.slice(2);
  } else if (specifier.startsWith(".") && context.parentURL?.startsWith("file:")) {
    polku = fileURLToPath(new URL(specifier, context.parentURL));
  }
  if (polku && !existsSync(polku) && existsSync(polku + ".ts")) {
    return nextResolve(pathToFileURL(polku + ".ts").href, context);
  }
  if (polku && specifier.startsWith("@/")) {
    return nextResolve(pathToFileURL(polku).href, context);
  }
  return nextResolve(specifier, context);
}
