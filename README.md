# grunt-closure-compiler-build

A Grunt task for [Google Closure Compiler](https://developers.google.com/closure/compiler/).

## Getting Started
### Install Package

Install this module on your project's [grunt.js](https://github.com/cowboy/grunt/blob/master/docs/getting_started.md) gruntfile:
```bash
$ npm install grunt-closure-compiler-build
```

### Install Package (Alternate)
Add dependencies to [package.json](https://docs.npmjs.com/files/package.json):
```json
{
    "dependencies": {
      "grunt-closure-compiler-build": "^1.3.0"
    }
}
```
and run npm
```bash
$ npm install
```

### Add Task
Adding load task line to your `grunt.js` gruntfile:
```javascript
grunt.loadNpmTasks('grunt-closure-compiler-build');
```
### Add Config
Default Config:
```javascript
grunt.initConfig({
  'closure-compiler-build': {
    build: {
      url: 'http://dl.google.com/closure-compiler/compiler-latest.zip',
      dir: 'node_modules/grunt-closure-compiler-build/bin/',
      filename: 'closure-compiler',
      update: false
    }
  }
});
```

### Config Properties (all properties is required).

`url` = [compiler url](http://dl.google.com/closure-compiler/compiler-latest.zip).

`dir` = compiler path (directory to save).

`filename` = compiler filename (only basename, without extension).

`update` = `true|false`, compiler update (remove old & save latest version).

#### Note

grunt-closure-compiler-build initial for grunt-closure-compiler plugin.

#### License

MIT (c) 2017 Ion
