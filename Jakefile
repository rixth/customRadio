//
// Jakefile for customRadio
//

var sys = require('sys'),
    exec  = require('child_process').exec;

desc("This builds the uglified version of customRadio JS");
task('default', [], function () {
  exec('/usr/local/bin/uglifyjs -nc -o src/jquery.customRadio.min.js src/jquery.customRadio.js', function (error, stdout, stderr) {
    if (error !== null) {
      console.log('Uglify error: ' + error);
    }
  });
});