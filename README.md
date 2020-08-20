# pdf-renderer
An alternative way to render PDF with keeping origin PDF coordinates for text blocks

## Problem

In some cases we need to render PDF on the web page but for some reasones we also need to know origin coordinates of text blocks

It can be useful if you are planning to select some text and then send that selection with its coordinates to third-party system

## Logic

- Via package [pdf2json](https://github.com/modesty/pdf2json) we extract needed data (text blocks and lines) to JSON
- on the server we create HTML for every text block and line: `div` with absolute positioning
- on the client we just render an array of those `div`s in the specified container

## Setting up

Clone the repo:
```bash
$ git clone https://github.com/daminort/pdf-renderer.git
```

Go to the `server` folder and install dependencies:
```bash
$ cd server
$ npm install
```

Go to the `client` folder and install dependencies:
```bash
$ cd client
$ npm install
```

## Runnig

Go to the `server` folder and start it:
```bash
$ cd server
$ npm start
```

Go to the `client` folder and start it:
```bash
$ cd client
$ npm start
```

Now you can visit page [localhost:3000](http://localhost:3000) and try application

## License
<a name="license"></a>

[MIT](/LICENSE) © [Daminort](https://github.com/daminort)