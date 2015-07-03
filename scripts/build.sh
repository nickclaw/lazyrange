./node_modules/.bin/babel src/index.js --out-file build/index.js
./node_modules/.bin/browserify src/index.js --transform babelify --standalone range --outfile build/lazyrange.js
./node_modules/.bin/uglify -s build/lazyrange.js -o build/lazyrange.min.js
