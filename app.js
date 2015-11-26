var m = require('./FileManager');
var analyser = require('./analyser.js')

function analyseTrace(tracePath, srcPath,configPath,fileName) {
    //import and print the vulnerabilities objects
    var vulnerabilities, semanticsTraces, src_code_instructions;
    m.importVulnsFromConfig(configPath,function (a) {
        vulnerabilities = a;
        //vulnerabilities.forEach(function (o) { m.printVulnObj(o) });  
        //import and print trace instructions
        m.importInstructions(tracePath, function (traceLines) {
            m.importInstructions(srcPath, function (codeLines) {
                //m.printInstructions(codeLines);
                console.log("========================================");
                console.log("FILE: " + fileName);
                var i = 1;
                vulnerabilities.forEach(function (v) {
                    console.log("----------------------------------------");
                    console.log('[VULNERABILITY'+i+ ']');
                    i++;
                    m.printVulnObj(v);
                    
                    var obj = analyser.analyseProgram(traceLines, codeLines, v);
                    console.log("--------------------");
                    console.log("RESULTS" + v.vuln + "\n");
                    var variables = Object.keys(obj.variables);
                    variables.forEach(function (v) {
                        console.log(v, obj.variables[v])
                    });
                    if (obj.errorLog.length > 0) {
                        obj.errorLog.forEach(function (m) { console.log(m) })
                    }
                    else console.log("SUCCESS","No tainted input reached sink");
                    console.log("--------------------");
                })
            })
        });
    })
}

analyseTrace("traces/trace_teste_errado.txt","src_code/teste_errado.php",'samples/configs/config.in',"TESTE_ERRADO");
analyseTrace("traces/trace_teste_certo.txt","src_code/teste_certo.php",'samples/configs/config.in',"TESTE_CERTO");



