'use strict';
var path = require('path');
var fs = require('fs');

function log(opts, output) {
  if ( opts.verbose ) {
    process.stdout.write(output);
  }
}

function isCamelCase(str) {
  return !!str.match(/^[a-z]+[A-Z]/)
}

function camelToSnakeCase(str) {
  if ( isCamelCase(str) ) {
    return str.replace(/[A-Z]/g, '\_$&');
  }
  return str;
}


function build(output,obj, key, writableStream, config) {
  
  if (typeof obj == 'string') {
    var exportString = camelToSnakeCase(key).toUpperCase() + '=' + obj + '\n';
    log(config, 'Writing: ' + exportString + '\n');
    output += exportString;
  } else {
    for (var k in obj) {
      if (typeof obj[k] == 'string') {
        var prefix = key ? key.toUpperCase() + '_' : '';
        var exportString = prefix + camelToSnakeCase(k).toUpperCase() + '=' + obj[k] + '\n';
        log(config, 'Writing: ' + exportString + '\n');
        output += exportString;
        
      } else if ( typeof obj[k] == 'object' ) {
        output = build(output,obj[k], k, writableStream, config);
       
      }
    }
  }
  return(output)
}
function write(obj, key, writableStream, config) {
  let output = "";
  writableStream.write(build(output,obj,key,config));
}
function create(config) {
  var inputFile = config.input;
  var outputFile = config.output;

  var optionKey = config.key ? config.key.value : null; 

  /*
  if ( !(/\.json/).test(inputFile) ) {
    return process.stdout.write('Requires json input file\n');
  }
  */

  if ( !outputFile ) {
    return process.stdout.write('Requires output file\n');
  }

  var jsonFile = path.resolve(inputFile);
  var envFile = path.resolve(outputFile);
  log(config, 'Input file: ' + jsonFile + '\n');
  log(config, 'Output file: ' + envFile + '\n');

  // TODO: Validate json file first
  //DJE - handling cases where the file doesn't end in .json
  var json = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
       

  var inputObj = optionKey ? json[optionKey] : json;

  var stream = fs.createWriteStream(envFile);

  build(inputObj, optionKey, stream, config);

  log(config, 'Done\n');
  // TODO: Close fd
  return;
};

module.exports = {
  create,
  write,
  build
}