// lib.cpp
#include <iostream>

extern "C" {

  void myFunc() {
    std::cout << "Hello WASM!" << std::endl;
  }

}
