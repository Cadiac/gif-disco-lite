/* eslint-disable */

const loadWASM = () => {
  const Module = {};
  return new Promise((resolve, reject) => {
    if (!('WebAssembly' in window)) {
      console.log('Could not load WASM');
      return reject(Module);
    }
    // TODO: use xmlhttprequest where fetch not supported
    fetch('/wasm.wasm')
      .then(response => response.arrayBuffer())
      .then((buffer) => {
        Module.wasmBinary = buffer;

        // GLOBAL -- event that is triggered when wasm is loaded
        window.doneEvent = new Event('done');

        const wasmLoaded = () => {
          console.log('Emscripten boilerplate loaded.');
          resolve(Module);
        }

        // GLOBAL -- create custom event for complete glue script execution
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
