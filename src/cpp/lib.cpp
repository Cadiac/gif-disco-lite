// lib.cpp
#include <iostream>

extern "C" {

  void myFunc() {
    std::cout << "Hello WASM!" << std::endl;
  }

  void grayScale (unsigned char* data, int len) {
    for (int i = 0; i < len; i += 4) {
      int r = data[i];
      int g = data[i+1];
      int b = data[i+2];
      int a = data[i+3];
      // int brightness = (r*.21+g*.72+b*.07);

      data[i] = r;
      data[i+1] = r;
      data[i+2] = r;
      data[i+3] = a;
    }
  }
}
