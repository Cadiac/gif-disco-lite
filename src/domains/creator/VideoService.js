// import GIF from 'gif.js';

/* import Seriously from 'seriously';
// import 'seriously/effects/seriously.vignette';
import 'seriously/effects/seriously.split';
import 'seriously/effects/seriously.chroma';
import 'seriously/effects/seriously.pixelate';*/

import loadWASM from '../../wasm/loadWASM';

export default class VideoService {
  constructor() {
    // eslint-disable-next-line
    loadWASM().then((wasm) => {
      this.wasm = wasm;
    }).catch((err) => {
      console.log('Error in fetching module: ', err);
    });

    this.drawFrameOnCanvas = this.drawFrameOnCanvas.bind(this);

    /* this.composition = new Seriously();

    // Define effects
    // this.vignette = this.composition.effect('vignette');
    // this.vignette.amount = 1;

    this.split = this.composition.effect('split');
    this.split.split = 0.0;

    this.chroma = this.composition.effect('chroma');
    this.chroma.weight = 1.32;
    this.chroma.balance = 0;
    this.chroma.screen = '#4def29';
    // this.chroma.clipWhite = 0.85;
    // this.chroma.clipBlack = 0.5125;

    this.pixelate = this.composition.effect('pixelate');
    this.pixelate.pixelSize = [8, 8];

    // Resize video
    this.reformat = this.composition.transform('reformat');
    this.reformat.mode = 'cover';
    this.reformat.width = 480;
    this.reformat.height = 480;
    */
  }

  setActiveCanvas(canvas) {
    // Composition target
    // this.target = this.composition.target(canvas);
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
  }

  setActiveWebcam(webcam) {
    // Grab video from webcam
    this.video = webcam;
    // this.video = this.composition.source(webcam);
  }

  startWebcam() {
    if (!this.canvas || !this.video) {
      throw new Error('Target canvas or video source is missing!');
    }

    this.video.addEventListener('loadeddata', () => {
      this.canvas.setAttribute('height', this.video.videoHeight);
      this.canvas.setAttribute('width', this.video.videoWidth);
      // cw = canvas.clientWidth; //usually same as canvas.height
      // ch = canvas.clientHeight;
      setTimeout(() => this.drawFrameOnCanvas(), 3000);
    });

    /* // Connect composition sources
    this.reformat.source = this.video;

    this.chroma.source = this.reformat;
    // this.pixelate.source = this.chroma;

    this.split.sourceA = this.chroma;
    this.split.sourceB = this.reformat;

    this.target.source = this.split;

    console.log('Starting video composition!');
    // Start the composition
    this.composition.go();*/
  }

  drawFrameOnCanvas() {
    this.context.drawImage(this.video, 0, 0);
    // console.log('check', vid, context);
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
    console.log(this.canvas);
    console.log(this.video);

    /* this.gif = new GIF({
      workers: 2,
      quality: 10,
      transparent: 'rgba(0, 0, 0, 0)',
    });

    this.interval = setInterval(() => {
      this.gif.addFrame(this.canvas, { delay: 100, copy: true });
    }, 100);*/
  }

  stopRecording() {
    // clearInterval(this.interval);

    console.log('Gif generation finished!');
    console.log(this.canvas);
    console.log(this.video);

    /* this.gif.on('finished', (blob) => {
      console.log('Gif generation finished!');
      onCreate(blob);
    });

    this.gif.render();*/
  }

  changeSettings(settings) {
    this.vignette.amount = settings.vignette;
    this.split.split = settings.split;
    this.chroma.screen = settings.chroma;
  }
}
