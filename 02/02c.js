let number = process.argv.slice(3);
let command = process.argv[2];
if (command === "sum"){
    console.log(Number(number[0]) + Number(number[1]));
}
else{
    console.log("Command not found.")
}
