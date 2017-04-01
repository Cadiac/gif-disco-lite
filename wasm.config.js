// wasm.config.js
module.exports = {
  emscripten_path: './../emsdk',
  inputfiles: [
    './src/cpp/lib.cpp',
  ],
  outputfile: './public/wasm.js',
  exported_functions: [
    '_myFunc',
  ],
  flags: [
    '-s WASM=1',
    '-s ASSERTIONS=1',
    '-O3',
  ],
};
