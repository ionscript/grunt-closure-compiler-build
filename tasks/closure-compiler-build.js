module.exports = function (grunt) {
    'use strict';

    var http = require('http'),
        fs = require('node-fs'),
        unzip = require('unzip');

    grunt.registerMultiTask('closure-compiler-build', 'Closure Cobpiler Build', function () {
        var config = this.data,
            src = config.dir + config.filename + '.zip',
            dist = config.dir + config.filename + '.jar',
            done = this.async(),
            file;

        if (!fs.existsSync(config.dir)) {
            fs.mkdir(config.dir, function (err) {
                if (err) {
                    grunt.warn('[' + err.errno + ']: ' + err.message);
                }
            });
        }

        if (!fs.existsSync(dist) || config.update) {

            file = fs.createWriteStream(src);

            http.get(config.url, function (response) {
                response.pipe(file);
            });

            file.on('finish', function () {
                file.close(function () {
                    if (file.bytesWritten > 0) {
                        grunt.log.writeln('Download: ' + config.url + ' (' + file.bytesWritten + ' B)');
                        fs.createReadStream(src)
                            .pipe(unzip.Parse())
                            .on('entry', function (entry) {
                                if (entry.path.indexOf('.jar') > 0) {
                                    entry.pipe(fs.createWriteStream(dist)
                                        .on('error', function () {
                                            grunt.warn('Extract: ' + entry.path);
                                        })
                                        .on('finish', function () {
                                            grunt.log.writeln('Extract: ' + entry.path);
                                            grunt.log.writeln('Save: ' + dist);
                                        })
                                    );
                                }
                            });
                    } else {
                        grunt.warn('Download: ' + config.url + ' (0 B)');
                    }
                    fs.unlink(src);
                });
            });

            file.on('error', function (err) {
                fs.unlink(src, function () {
                    grunt.warn('[' + err.errno + ']: ' + err.message);
                });
            });
        }
    });
};
