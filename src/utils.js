/* eslint-disable no-undef */

// https://github.com/pedroha/seriously-camera/blob/master/js/camera.js
export const initCamera = (videoId) => {
  const video = document.querySelector(videoId);

  navigator.getMedia = (navigator.getUserMedia ||
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia ||
                        navigator.msGetUserMedia);
  navigator.getMedia(
    {
      video: true,
      audio: false,
    },
    (stream) => {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        const vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL ? vendorURL.createObjectURL(stream) : stream;
      }
      video.play();
    },
    (err) => {
      console.log(err);
    },
  );
  return video;
};

export default {
  initCamera,
};
