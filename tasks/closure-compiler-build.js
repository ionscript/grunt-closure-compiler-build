module.exports = function (grunt) {
	'use strict';

	var http = require('http'),
		fs = require('node-fs'),
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
			}
		});

		file = fs.createWriteStream(path);

		http.get(build.url, function(response){
			response.pipe(file);
		});

		file.on('finish', function () {
			file.close(function () {
				if (file.bytesWritten > 0) {
					grunt.log.writeln('Compiler downloaded: "' + path + '" : ' + file.bytesWritten + ' bytes');

					fs.createReadStream(path)
						.pipe(unzip.Parse())
						.on('entry', function (entry) {
							entry.pipe(fs.createWriteStream(build.dir + entry.path)
									.on('error', function () {
										grunt.warn('UNZIP ERROR: ' + build.dir + entry.path + ' ... FAIL');
										return false;
									})
									.on('finish', function () {
										grunt.log.writeln('UNZIP ENTRY: "' + build.dir + entry.path + '... OK');
									})
							);

						});
				} else {
					grunt.warn('DOWNLOAD ERROR: FILESIZE 0 bytes.');
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
