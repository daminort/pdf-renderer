# pdf-renderer
The alternative way to render PDF with keeping origin PDF coordinates for text blocks

## Problem

In some cases we need to render PDF on the web page but for some reasones we also need to know origin coordinates of text blocks

It can be useful if you are planning to select some text and then send that selection with its coordinates to third-party system

## Logic

- Via package [pdf2json](https://github.com/modesty/pdf2json) we extract needed data (text blocks and lines) to JSON
- on the server we create HTML for every text block and line: `div` with absolute positioning
- on the client we just render an array of those `div`s in the specified container