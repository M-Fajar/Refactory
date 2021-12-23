var fs = require("fs");
var contents = fs.readFileSync("data.json");
var data = JSON.parse(contents);
var result = [];

data.forEach(item => {
    item.tags.forEach(tag => {
        if(tag == "brown"){
            result.push(item);
            return;
        }        
    });    
});

console.log(result);

