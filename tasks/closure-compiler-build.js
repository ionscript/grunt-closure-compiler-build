module.exports = function (grunt) {
	'use strict';

	var fs = require('node-fs'),
		request = require('request'),
		unzip = require('unzip');

	grunt.registerMultiTask('closure-compiler-build', 'Closure Cobpiler Build', function () {
		var build = this.data,
			path = build.dir + build.filename,
			done = this.async(),
			file;

		fs.mkdirSync(build.dir, 777, true, function (err) {
			if (err && err.code != 'EEXIST') {
				grunt.warn('ERROR[' + err.errno + ']: ' + err.message);
				return false;
			} else {
				grunt.log.debug('Created Dir: "' + build.dir + '"');
			}
		});

		file = fs.createWriteStream(path);
		request(build.url).pipe(unzip.Parse().pipe(file));

		file.on('finish', function () {
			file.close(function () {
				if (file.bytesWritten > 0) {
					grunt.log.debug('Compiler Build Installed: "' + path + '" : ' + file.bytesWritten + ' bytes');
				} else {
					grunt.warn('ERROR: FILESIZE 0 bytes.');
					return false;
				}
			});
		});
		file.on('error', function (err) {
			fs.unlink(path, function () {
				grunt.warn('ERROR[' + err.errno + ']: ' + err.message);
				return false;
			});
		});
	});
};


