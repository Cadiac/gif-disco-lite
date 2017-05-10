import GifEncoder from 'gif-encoder';
import blobStream from 'blob-stream';

import loadWASM from '../../wasm/loadWASM';

export default class VideoService {
  constructor() {
    loadWASM().then((wasm) => {
      this.wasm = wasm;
    }).catch((err) => {
      console.log('Error in fetching module: ', err);
    });

    this.recording = false;
    this.frames = [];

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

    if (this.recording) {
      this.frames.push(this.pixels.data);
    }

    requestAnimationFrame(this.drawFrameOnCanvas);

    // console.log(`Frame took ${t1 - t0} ms`);
  }


  startRecording() {
    console.log('Started gif generation.');
    this.recording = true;
  }

  stopRecording(onCreate) {
    console.log('Gif generation finished!');
    console.log('Got', this.frames.length, 'frames');

    const output = blobStream();

    const gif = new GifEncoder(this.video.videoWidth, this.video.videoHeight, {
      highWaterMark: 5 * 1024 * 1024, // 5MB
    });

    gif.on('data', (data) => {
      // eslint-disable-next-line
      output._write(data, null, () => {})
    });
    // Repeat forever
    gif.setRepeat(0);

    gif.on('end', () => {
      onCreate(output.toBlob());
    });

    gif.writeHeader();

    this.frames.forEach((frame) => {
      gif.addFrame(frame);
    });

    gif.finish();
  }

  // eslint-disable-next-line
  changeSettings(settings) {
    // Not supported in WASM version (yet)
  }
}
