var fs = require("fs");
var contents = fs.readFileSync("data.json");
var data = JSON.parse(contents);
var result =[];

data.forEach(item => {
    if(item.type == "furniture"){
        result.push(item);
        return;
    }
});

console.log(result);

