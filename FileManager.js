var fs = require('fs');

function printVulnObj(o) {
  console.log('--------------------')
  console.log('VULN', o['vuln']);
  console.log('entry-points', o['entry-points']);
  console.log('sanitizationFuncs', o['sanitizationFuncs']);
  console.log('sinks', o['sinks']);
  console.log('--------------------')
}

function printinstructions(instructions) {
  console.log('--------------------')
  instructions.forEach(function (d) { console.log(d) })
  console.log('--------------------')
}

function importVulnsFromConfig(callbackFunc) {
  fs.readFile('samples/configs/config.in', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
    var a = data.split('\r\n')
    var i = 0
    var objArray = [];
    for (var i = 0; i < a.length; i += 4) {
      var obj = { "vuln": a[i], "entry-points": a[i + 1].split(','), "sanitizationFuncs": a[i + 2].split(','), "sinks": a[i + 3].split(',') }
      objArray.push(obj);
    }

    callbackFunc(objArray);
  });
}

function importInstructions(trace, callbackFunc) {
  fs.readFile('samples/' + trace, 'utf8', function (err, data) {
    var instructionArray = data.split('\n');
    callbackFunc(instructionArray);
  });
}
module.exports = {
  importVulnsFromConfig: importVulnsFromConfig,
  importInstructions: importInstructions,
  printVulnObj: printVulnObj
}