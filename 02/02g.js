let fs = require('fs');
let input = process.argv.slice(3);
let command = process.argv[2];
if (command === "sum"){
    console.log(Number(input[0]) + Number(input[1]));
}
else if (command === "minus"){
    console.log(Number(input[0]) - Number(input[1]))
}
else if (command === "print"){
    let obj = {
        name: input[0],
        family: input[1],
        email: input[2]
    }
    for (let x in obj){
        console.log('Salam ' + obj[x]);
    }
}
else if (command === "write"){
    let obj = {
        name: input[0],
        family: input[1],
        email: input[2]
    }
    fs.writeFile('./data.txt', JSON.stringify(obj), function(error, data){
        if (error){
            console.log('ERROR: ', error);
        }
        else {
            console.log('Success: ', data);
        }
    })
}
else{
    console.log("Command not found.")
}
