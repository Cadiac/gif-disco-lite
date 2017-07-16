import GIF from 'gif.js';

import Seriously from 'seriously';
import 'seriously/effects/seriously.vignette';
import 'seriously/effects/seriously.split';
import 'seriously/effects/seriously.chroma';
import 'seriously/sources/seriously.camera';

export default class VideoService {
  constructor() {
    this.composition = new Seriously();

    // Define effects
    this.vignette = this.composition.effect('vignette');
    this.vignette.amount = 1;

    this.split = this.composition.effect('split');
    this.split.split = 0;

    this.chroma = this.composition.effect('chroma');
    this.chroma.weight = 1.32;
    this.chroma.balance = 0;
    this.chroma.screen = '#4def29';
    this.chroma.clipWhite = 0.85;
    this.chroma.clipBlack = 0.5125;

    // Resize video
    this.reformat = this.composition.transform('reformat');
    this.reformat.mode = 'cover';
    this.reformat.width = 480;
    this.reformat.height = 480;

    this.recording = false;

    this.addCurrentFrame = this.addCurrentFrame.bind(this);
  }

  setCompositionTargets(canvas) {
    // Composition target
    this.target = this.composition.target(canvas);

    // TODO: Get rid of this
    this.canvas = canvas;
  }

  startWebcam() {
    // TODO: where to place this
    this.video = this.composition.source('camera');

    if (!this.target || !this.video) {
      throw new Error('Target canvas or video source is missing!');
    }

    // Connect composition sources
    this.reformat.source = this.video;

    this.chroma.source = this.reformat;
    this.vignette.source = this.chroma;

    this.split.sourceA = this.vignette;
    this.split.sourceB = this.reformat;

    this.target.source = this.split;

    console.log('Starting video composition!');

    // Start the composition
    this.composition.go();
  }

  addCurrentFrame() {
    this.gif.addFrame(this.canvas, { delay: 33, copy: true });
  }

  startRecording() {
    console.log('Started gif generation.');

    this.recording = true;

    this.gif = new GIF({
      workers: 2,
      quality: 10,
      transparent: 'rgba(0, 0, 0, 0)',
    });

    this.target.on('render', this.addCurrentFrame);
  }

  stopRecording(onCreate) {
    this.target.off('render', this.addCurrentFrame);

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
