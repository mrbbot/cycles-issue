import wasm from "./export_wasm.mjs";

export function fetch() {
  return `Response(${wasm.add(1, 2).toString()})`;
}
