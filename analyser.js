function analyseProgram(tracerLines, codeLines, vulnerability) {
    var variableInstructions = [];
    var functionInstructions = [];
    var errorLog = [];

    tracerLines.forEach(function (l) {
        if (l.indexOf("=>") < -1 && l.indexOf("->") < -1) {
            return;
        }
        if (l.indexOf("=>") > -1) {
            var obj = extractVariable(l, codeLines);
            var functionName = obj.varName;
            var value = obj.varValue;

            value = extractVarRealVal(value, variableInstructions);
            value = isValueTainted(value, vulnerability);

            variableInstructions[functionName] = value;
        }
        else if (l.indexOf("->") > -1) {
            var obj = extractFunction(l, codeLines);
            if (!obj) {
                return;
            }
            var functionName = obj.functionName;
            var params = obj.value;

            if (isSanitizationFunction(functionName, vulnerability)) {
                variableInstructions[params] = "untainted";
            }

            if (isSink(functionName, vulnerability)) {
                if (variableInstructions[params] === "tainted") {
                    var m = "ERROR: Reached sink '" 
                        + functionName
                        + "' with tainted variable '"
                        + params
                        +"'";
                    errorLog.push(m)
                }
            }

            functionInstructions[functionName] = value;
            
            /*
                        var vulnerability = hasVulnerability(variable, vulnerability);
                        if (!vulnerability) {
                            return;
                        }
                        */
            //backtrace
            
        }
    })

    return { variables: variableInstructions, functions: functionInstructions, errorLog:errorLog };
}

function hasVulnerability() {

}

function extractVariable(l, codeLines) {
    l = l.split(' ');
    l = l[2].split(':');

    var codeName = l[0];
    var codeLine = l[1];

    if (codeLine < 1) {
        return;
    }

    var code = codeLines[codeLine - 1].split(" ")[1].split("=");
    return { varName: code[0], varValue: code[1] };
}

function extractVarRealVal(value, variableInstructions) {
    var defVariables = Object.keys(variableInstructions);
    if (defVariables.length > 0) {
        while (defVariables.indexOf(value) > -1) {
            value = variableInstructions[value];
        }
    }

    return value;
}

function isValueTainted(value, vuln) {
    return value === "tainted" || vuln['entry-points'].indexOf(value) > -1 ? "tainted" : "untainted";
}

function extractFunction(l, codeLines) {
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
    return { functionName: variable, value: value };
}

function isSanitizationFunction(funcName, vulnerability) {
    return vulnerability.sanitizationFuncs.indexOf(funcName) > -1;
}
function isSink(funcName, vulnerability) {
    return vulnerability.sinks.indexOf(funcName) > -1;
}

module.exports = {
    analyseProgram: analyseProgram
}