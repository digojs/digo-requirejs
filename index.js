var path = require("path");
var r = require("requirejs");

module.exports = function RequireJS(file, options, done) {

    // 设置默认值。
    options = Object.assign({
        optimize: "none",
        generateSourceMaps: file.sourceMap,
        baseUrl: file.dir
    }, options);
    if (!options.name) {
        options.name = path.relative(options.baseUrl, file.srcPath).replace(/\\/g, "/").replace(/\.\w+$/, "");
    }

    options.out = function (chunk, sourceMap) {
        file.content = chunk;
        if (sourceMap) {
            sourceMap = JSON.parse(sourceMap);
            sourceMap.sources = sourceMap.sources.map(function (p) {
                return path.resolve(options.baseUrl, p);
            });
            file.applySourceMap(sourceMap);
        }
    };

    // 生成。
    r.optimize(options, done, function (e) {
        var fileNameMatch = /for file: (.+?)\n/.exec(e.message);
        var lineMatch = /Error: Line (\d+?):/.exec(e.message);
        file.error({
			plugin: RequireJS.name,
			error: e,
			fileName: fileNameMatch && fileNameMatch[1],
			line: lineMatch && lineMatch[1]
		});
		done();
    });

};
