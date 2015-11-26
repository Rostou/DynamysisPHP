var m = require('./FileManager');
var analyser = require('./analyser.js')
//import and print the vulnerabilities objects
var objArray, semanticsTraces, src_code_instructions;
m.importVulnsFromConfig(function (a) {
    objArray = a;
    objArray.forEach(function (o) { m.printVulnObj(o) })  
    
    //import and print trace instructions
    m.importInstructions("traces/trace_teste_certo.txt", function (traceLines) {
        
        
        m.importInstructions("src_code/teste_certo.php", function (codeLines) {
            
            
            var obj = analyser.extractSemantics(traceLines,codeLines)
            
            var variables = Object.keys(obj.variables);
            var functions = Object.keys(obj.functions);
            
        })
        
        
    });
})




