var m = require('./FileManager');
var analyser = require('./analyser.js')
//import and print the vulnerabilities objects
var objArray, semanticsTraces, src_code_instructions;
m.importVulnsFromConfig(function (a) {
    objArray = a;
    objArray.forEach(function (o) { m.printVulnObj(o) })  
    
    //import and print trace instructions
    m.importInstructions("traces/trace.2043925204.xt", function (d) {
        semanticsTraces = analyser.extractSemantics(d)
        m.importInstructions("src_code/badjoraz.php", function (d) {
            src_code_instructions = d;
            console.log(d.forEach(function (l) {
                console.log(l)
            }))
        })
        console.log('variables')
        semanticsTraces.variables.forEach(function (d) { 
            console.log(d.linenumber, 
                        d.instName,
                        d.params,
                        d.src.file,
                        d.src.line) });
        console.log('functions');
        semanticsTraces.functions.forEach(function (d) { 
            console.log(d.linenumber, 
                        d.instName,
                        d.params,
                        d.src.file,
                        d.src.line) });
    });
})




