

function analyseProgram(tracerLines, codeLines,vulnerabilities) {
    var variableInstructions = [];
    var functionInstructions = [];

    tracerLines.forEach(function (l) {
        if(l.indexOf("=>") < -1 && l.indexOf("->") < -1){
            return;
        }
        if (l.indexOf("=>") > -1) {
            l = l.split(' ');
            l = l[2].split(':');

            var codeName = l[0];
            var codeLine = l[1];

            if (codeLine < 1) {
                return;
            }

            var code = codeLines[codeLine - 1].split(" ")[1].split("=");
            var variable = code[0];
            var value = code[1];

            variableInstructions[variable] = value;
        }
        else if (l.indexOf("->") > -1) {
            l = l.split(' ');
            l = l[2].split(':');

            var codeName = l[0];
            var codeLine = l[1];

            if (codeLine < 1) {
                return;
            }

            var code = codeLines[codeLine - 1].split(" ")[1].split("(");
            var variable = code[0];
            var value = code[1].split(")")[0];

            functionInstructions[variable] = value;
            
            var vulnerability = hasVulnerability(variable,vulnerabilities);
            if(!vulnerability){
                return;
            }
            
            //backtrace
            
        }
    })

    return { variables: variableInstructions, functions: functionInstructions };
}

function hasVulnerability(){
    
}


module.exports = {
    analyseProgram: analyseProgram
}