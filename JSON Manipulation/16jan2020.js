var fs = require("fs");
var contents = fs.readFileSync("data.json");
var data = JSON.parse(contents);
var result = [];
var d1= new Date('January 16, 2020');

data.forEach(item => {
    var d2 = new Date(item.purchased_at);
    if(d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()){
        result.push(item);
    }

});

console.log(result);

