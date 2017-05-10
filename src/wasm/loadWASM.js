/* eslint-disable */

var Module = {};

const loadWASM = () => {
  return new Promise((resolve, reject) => {
    if (!('WebAssembly' in window)) {
      console.log('Could not load WASM');
      return reject(Module);
    }
    fetch('/wasm.wasm')
      .then(response => response.arrayBuffer())
      .then((buffer) => {
        Module.wasmBinary = buffer;

        const wasmLoaded = () => {
          console.log('Emscripten boilerplate loaded.');

          const wasm = {};

          wasm.removeGreen = function (pixelData) {
            const len = pixelData.length
            const mem = _malloc(len);
            HEAPU8.set(pixelData, mem);
            _removeGreen(mem, len);
            const filtered = HEAPU8.subarray(mem, mem + len);
            _free(mem);
            return filtered;
          };

          resolve(wasm);
        }

        // GLOBAL -- create custom event for complete glue script execution
        window.doneEvent = new Event('done');
        window.script = document.createElement('script');
        window.script.addEventListener('done', wasmLoaded);
        // END GLOBAL

        // TODO: IN EMSCRIPTEN GLUE INSERT
        // else{doRun()} ...
        // script.dispatchEvent(doneEvent);
        // ... }Module["run"]

        window.script.src = '/wasm.js';
        document.body.appendChild(window.script);
      });
  });
};

export default loadWASM;
