var m = require('./FileManager');

//import and print the vulnerabilities objects
var objArray,instructions;
m.importVulnsFromConfig(function(a){
    objArray = a;
    objArray.forEach(function(o){m.printVulnObj(o)})  
    
    //import and print trace instructions
    instructions = m.importTrace("trace.2043925204.xt")
    console.log(instructions.forEach(function (l) { console.log(l) }))  
});




