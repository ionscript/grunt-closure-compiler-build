# grunt-closure-compiler-build

A Grunt task for [Closure Compiler](https://developers.google.com/closure/compiler/).

## Getting Started

Install this module on your project's [grunt.js](https://github.com/cowboy/grunt/blob/master/docs/getting_started.md) gruntfile:
```bash
$ npm install grunt-closure-compiler-build
```

Adding load task line to your `grunt.js` gruntfile:
```javascript
grunt.loadNpmTasks('grunt-closure-compiler-build');
```

Task Config:
```javascript
grunt.initConfig({
  'closure-compiler-build': {
    build: {
      url: 'http://dl.google.com/closure-compiler/compiler-latest.zip',
      dir: 'node_modules/grunt-closure-compiler-build/build/',
      filename: 'compiler.jar'
    }
  }
});
```

## All properties is always required.

`url` URL GOOGLE Closure Compiler Build [Latest Version](http://dl.google.com/closure-compiler/compiler-latest.zip).

`dir` Compiler path.

`filename` Compiler filename.

## Note

grunt-closure-compiler-build initial for grunt-closure-compiler plugin.

## License

MIT (c) 2015 Sergey Shportko
