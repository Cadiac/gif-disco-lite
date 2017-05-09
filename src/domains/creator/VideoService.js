import GIF from 'gif.js';

import loadWASM from '../../wasm/loadWASM';

export default class VideoService {
  constructor() {
    loadWASM().then((wasm) => {
      this.wasm = wasm;
    }).catch((err) => {
      console.log('Error in fetching module: ', err);
    });

    this.drawFrameOnCanvas = this.drawFrameOnCanvas.bind(this);
  }

  setActiveCanvas(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
  }

  setActiveWebcam(webcam) {
    // Grab video from webcam
    this.video = webcam;
  }

  startWebcam() {
    if (!this.canvas || !this.video) {
      throw new Error('Target canvas or video source is missing!');
    }

    this.video.addEventListener('loadeddata', () => {
      this.canvas.setAttribute('height', this.video.videoHeight);
      this.canvas.setAttribute('width', this.video.videoWidth);
      setTimeout(() => this.drawFrameOnCanvas(), 3000);
    });
  }

  drawFrameOnCanvas() {
    this.context.drawImage(this.video, 0, 0);

    this.pixels = this.context.getImageData(0, 0, this.video.videoWidth, this.video.videoHeight);

    // const t0 = performance.now();
    this.pixels.data.set(this.wasm.removeGreen(this.pixels.data));
    // const t1 = performance.now();

    this.context.putImageData(this.pixels, 0, 0);
    requestAnimationFrame(this.drawFrameOnCanvas);

    // console.log(`Frame took ${t1 - t0} ms`);
  }


  startRecording() {
    console.log('Started gif generation.');

    this.gif = new GIF({
      workers: 2,
      quality: 10,
      transparent: 'rgba(0, 0, 0, 0)',
    });

    this.interval = setInterval(() => {
      this.gif.addFrame(this.canvas, { delay: 100, copy: true });
    }, 100);
  }

  stopRecording(onCreate) {
    clearInterval(this.interval);

    console.log('Gif generation finished!');

    this.gif.on('finished', (blob) => {
      console.log('Gif generation finished!');
      onCreate(blob);
    });

    this.gif.render();
  }

  changeSettings(settings) {
    this.vignette.amount = settings.vignette;
    this.split.split = settings.split;
    this.chroma.screen = settings.chroma;
  }
}
