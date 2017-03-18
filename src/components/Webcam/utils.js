/* eslint-disable no-undef */

export const hasGetUserMedia = !!(navigator.getUserMedia ||
                                  navigator.webkitGetUserMedia ||
                                  navigator.mozGetUserMedia ||
                                  navigator.msGetUserMedia);

// handle user media capture
export function captureUserMedia(callback) {
  const params = { audio: false, video: true };

  navigator.getUserMedia(params, callback, (error) => {
    // eslint-disable-next-line no-alert
    alert(`getUserMedia ${JSON.stringify(error)}`);
  });
}

export default {
  hasGetUserMedia,
  captureUserMedia,
};
