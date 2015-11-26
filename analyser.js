
function analyseTracesintructions(vulnObj, instruction) {

}

function extractSemanticsFromInstructions(instructions) {
    var variableInstructions = [];
    var functionInstructions = [];
    var line = 0;
    instructions.forEach(function (l) {
        line++;
        if (l.indexOf(" =>") > -1) {
            l = l.split('=>')[1];
            l = l.split("=")
            var varName = l[0].trim();
            l = l[1].split(" ")
            var varValue = l[1].trim();
            var varSrcLine = l[2].trim().split("/");
            varSrcLine = varSrcLine[varSrcLine.length-1].split(":");
            var file = varSrcLine[0];
            var srcline =varSrcLine[1];
            var i = { linenumber: line, instName: varName, params: varValue, src: {file:file ,line:srcline }}
            variableInstructions.push(i);
        }
        else if (l.indexOf(" ->") > -1) {
            l = l.split('->')[1];
            l = l.split("(")
            var varName = l[0].trim();
            l = l[1].split(")")
            var varValue = l[0].trim();
            var varSrcLine = l[1].trim().split("/");
            varSrcLine = varSrcLine[varSrcLine.length-1].split(":");
            var file = varSrcLine[0];
            var srcline =varSrcLine[1];
            var i = { linenumber: line, instName: varName, params: varValue, src: {file:file ,line:srcline }}
            functionInstructions.push(i);
        }
    })

    return { variables: variableInstructions, functions: functionInstructions };
}

module.exports = {
    extractSemantics: extractSemanticsFromInstructions
}