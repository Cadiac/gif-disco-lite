/* Modified from Kimmo Brunfeldt's for original Gif Disco chroma keying
 * https://github.com/kimmobrunfeldt/howto-everything/blob/master/remove-green.md */

#include <vector>
#include <math.h>

const double GREEN_RANGE_MIN_H = 100;
const double GREEN_RANGE_MIN_S = 80;
const double GREEN_RANGE_MIN_V = 70;
const double GREEN_RANGE_MAX_H = 185;
const double GREEN_RANGE_MAX_S = 255;
const double GREEN_RANGE_MAX_V = 255;

std::vector<double> rgbToHsv(double r, double g, double b) {
    std::vector<double> colors = {r, g, b};

    double maxc = *max_element(colors.begin(), colors.end());
    double minc = *min_element(colors.begin(), colors.end());
    double v = maxc;

    if (minc == maxc) {
        std::vector<double> hsv = {0.0, 0.0, v};
        return hsv;
    }

    double s = (maxc-minc) / maxc;
    double rc = (maxc-r) / (maxc-minc);
    double gc = (maxc-g) / (maxc-minc);
    double bc = (maxc-b) / (maxc-minc);
    double h = 0.0;

    if (r == maxc)
        h = bc-gc;
    else if (g == maxc)
        h = 2.0+rc-bc;
    else
        h = 4.0+gc-rc;
    h = fmod(h/6.0, 1.0);

    std::vector<double> hsv = {h, s, v};
    return hsv;
}

extern "C" {
  void removeGreen (unsigned char* data, int len) {
    for (int i = 0; i < len; i += 4) {
      double r = ((double) data[i]) / 255.0;
      double g = ((double) data[i+1]) / 255.0;
      double b = ((double) data[i+2]) / 255.0;

      std::vector<double> hsv = rgbToHsv(r, g, b);
      double h = hsv[0] * 360;
      double s = hsv[1] * 255;
      double v = hsv[2] * 255;

      if ((GREEN_RANGE_MIN_H <= h && h <= GREEN_RANGE_MAX_H) &&
          (GREEN_RANGE_MIN_S <= s && s <= GREEN_RANGE_MAX_S) &&
          (GREEN_RANGE_MIN_V <= v && v <= GREEN_RANGE_MAX_V)) {

          data[i] = 0;
          data[i+1] = 0;
          data[i+2] = 0;
          data[i+3] = 0;
      }
    }
  }
}
