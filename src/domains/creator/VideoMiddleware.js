import BPromise from 'bluebird';
import { creatorTypes } from './CreatorConstants';

export default function videoMiddleware(videoService) {
  return ({ dispatch }) => next => (action) => {
    switch (action.type) {
      case creatorTypes.INITIALIZE_CREATOR:
        videoService.setActiveCanvas(action.payload.canvas);
        videoService.setActiveWebcam(action.payload.webcam);
        dispatch({ type: creatorTypes.START_WEBCAM });
        break;

      case creatorTypes.START_WEBCAM:
        videoService.startWebcam();
        break;

      case creatorTypes.START_GIF_RECORDING:
        videoService.startRecording();

        // End recording after five seconds
        BPromise.delay(5000)
          .then(() => dispatch({ type: creatorTypes.END_GIF_RECORDING }));
        break;

      case creatorTypes.END_GIF_RECORDING:
        videoService.stopRecording((blob) => {
          dispatch({
            type: creatorTypes.SET_GIF_URL,
            payload: {
              gifUrl: URL.createObjectURL(blob),
              blob,
            },
          });
        });
        break;
      default:
        break;
    }
    return next(action);
  };
}
