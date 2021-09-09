import fs from "fs/promises";
import path from "path";
import vm from "vm";

const workerPath = path.resolve("./worker.mjs");
const workerSrc = await fs.readFile(workerPath, "utf8");
const mod = new vm.SourceTextModule(workerSrc, { identifier: workerPath });

await mod.link(async (specifier, referencingModule) => {
  console.log("Linking", specifier);
  const modulePath = path.join(
    path.dirname(referencingModule.identifier),
    specifier
  );
  const moduleSrc = await fs.readFile(modulePath, "utf8");
  return new vm.SourceTextModule(moduleSrc, {
    identifier: modulePath,
    context: referencingModule.context,
  });
});
await mod.evaluate();

console.log(mod.namespace.default.fetch());
