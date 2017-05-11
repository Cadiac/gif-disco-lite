# GIF Discoᴸᴵᵀᴱ

What do John Travolta, Mick Jagger, Uuno Turhapuro and you have in common? Y'all got the moves! GIF Discoᴸᴵᵀᴱ is a virtual night club – a cool addition to any party. Take over the dance floor by recording your brilliant moves into an infinitely looping GIF animation.

![Alt text](docs/gif_disco.gif?raw=true "Party on!")

Gif Discoᴸᴵᵀᴱ is lightweight rewrite of the original [GIF Disco](https://github.com/futurice/gif-disco) that runs in Heroku, and does most of the image processing on the browser.

**This project is still WIP, and only implements gif recording.**

## Table of Contents

- [Introduction](#introduction)
- [Running locally](#running-locally)
- [Publish to Heroku](#publishing-to-heroku)
- [Webassembly](#webassembly)

## Introduction

* Development: https://gif-disco-lite-dev.herokuapp.com
* WebAssembly demo: https://gif-disco-lite-wasm.herokuapp.com

With GIF Disco people can record a short video clip of their dance moves and turn it into a GIF animation. The animation will then be placed onto a website, which acts as the dance party.

GIF background removal is based on chroma key technique and requires a solid colour backdrop for the shooting, such as a green screen. Additionally, the setup requires a web cam, tripod and some computing power. The best result will be achieved with proper lighting, a subwoofer and some of the hottest hits of the 90's.

![Alt text](docs/disco_setup.jpg?raw=true "Disco setup")

Tech stack briefly:
* Nodejs >=6.9.x
    * hapi.js web framework
* Yarn
* React + Redux
* [Seriously.js](https://github.com/namniak/Seriously.js) for real-time video processing
* AWS S3 for GIF storage
* Bulma CSS
* Webpack
* Heroku
* (WebAssembly)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), and ejected for better control over things.

## Running locally

To install dependencies run

```bash
yarn
```

Create IAM user on AWS console, and give it programmatic access but no roles. Create CloudFormation stack using `tools/cloudformation.json`, which creates bucket for gif storage.

Copy `.env.sample` into `.env`, and fill in the blanks with newly created IAM user credentials and bucket name. [Autoenv](https://github.com/kennethreitz/autoenv) is recommended.


In development mode the app is served with Webpack and HotModuleReplacementPlugin for smoother development experience, but backend is still required for AWS S3 presigned requests. The command

```bash
yarn dev
```

starts both the hot module replacement supported dev server on port 3000 and with the backend on $PORT. Backend url should be defined in $API_URL.

To run the app in production mode which servers static HTML using the backend, run

```bash
yarn start
```

This starts backend running on $PORT.

The optimized JS build can also be manually bundled with

```bash
yarn build
```

## Publish to Heroku

Create new app on Heroku, and set your local remote to it with

```bash
git remote add development ttps://git.heroku.com/your-heroku-app.git
```

Configure Heroku:

```bash
heroku config:set NODE_MODULES_CACHE=false --remote webassembly
heroku config:set NPM_CONFIG_PRODUCTION=false
```

We build the app on `yarn start`, so devDependencies are required. We also need to disable cahce on `node_modules` for now, since `node-sass` is causing issues in Heroku if the cache is used.

Set rest of the env variables accordingly.

To publish a new version, simply run

```
git push development master
```

or if not in master branch

```
git push development feature/foobar:master
```

See [Heroku documentation](https://devcenter.heroku.com/articles/nodejs-support) for more information.

## WebAssembly

This project also features WebAssembly implementation for demo purposes on the real time video processing. This implementation is based on [wasm-init](https://github.com/shamadee/wasm-init) and [web-dsp](https://github.com/shamadee/web-dsp), and the C++ code for chroma keying is based on https://github.com/kimmobrunfeldt/howto-everything/blob/master/remove-green.md#c-version

At the moment WebAssembly is only supported on newest Chrome and Firefox browsers.
