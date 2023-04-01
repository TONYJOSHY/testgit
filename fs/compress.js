var zlib = require('zlib');
var fs = require('fs');

var gzip = zlib.createGzip();
var r = fs.createReadStream('./sample/nifty.csv');
var w = fs.createWriteStream('./sample/image.jpeg.gz');
r.pipe(gzip).pipe(w);