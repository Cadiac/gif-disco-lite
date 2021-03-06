// wasm.config.js
module.exports = {
  emscripten_path: process.env.EMSCRIPTEN_PATH,
  inputfile: './src/cpp/lib.cpp',
  outputfile: './public/wasm.js',
  exported_functions: [
    '_removeGreen',
  ],
  flags: [
    '-s WASM=1',
    '-s ASSERTIONS=1',
    '-O3',
    '-std=c++11',
  ],
};
