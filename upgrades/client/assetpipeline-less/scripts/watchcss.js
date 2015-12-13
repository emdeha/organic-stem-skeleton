module.exports = function (angel) {
  angel.on('watchcss', function (angel) {
    var loadDNA = require('../lib/dna')
    var runPipeline = require('../lib/gulp-pipeline')
    var less = require('gulp-less')
    var lessWatcher = require('gulp-less-watcher')
    var glob = require("glob-stream")
    var path = require('path')

    var LessPluginAutoPrefix = require('less-plugin-autoprefix')
    var config = {
      verbose: true,
      plugins: [ new LessPluginAutoPrefix() ]
    }

    loadDNA(function (err, dna) {
      var options = dna.client.assetpipeline
      glob.create(options.src + '/**/*.bundle.css')
        .on('data', function(file){
          runPipeline({
            name: 'watchcss',
            src: file.path,
            pipeline: [
              lessWatcher(config),
              less(config)
            ],
            dest: options.dest
          })
        })
    })
  })
}