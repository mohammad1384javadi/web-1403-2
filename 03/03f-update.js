import {readFile, writeFile} from 'fs';
let input = process.argv.slice(3);
let command = process.argv[2];
if (command === "sum") {
    console.log(Number(input[0]) + Number(input[1]));
}
else if (command === "minus") {
    console.log(Number(input[0]) - Number(input[1]))
}
else if (command === "print") {
    let obj = {
        name: input[0],
        family: input[1],
        email: input[2]
    }
    for (let x in obj) {
        console.log('Salam ' + obj[x]);
    }
}
else if (command === "create") {
    let obj = {
        name: input[0],
        family: input[1],
        email: input[2]
    };
    readFile('./data-json.json', function (error, data) {
        if (error) {
            console.log("Error: ", error);
        }
        else {
            let file_obj = JSON.parse(data);
            file_obj.data.push(obj);
            writeFile('./data-json.json', JSON.stringify(file_obj), function (error, data) {
                if (error) {
                    console.log('Error: ', error);
                }
                else {
                    console.log('Successfuly add data...');
                }
            })
        }
    });
}
else if (command === "read"){
    readFile('./data.json', function(error, data){
        if (error){
            console.log('Error: ', error);
        }
        else{
            if (input.length === 0){
                console.log("FILE DATA: ", JSON.parse(data))
            }
            else{
                let objectData = JSON.parse(data);
                let found = false;
                for (let i = 0; i < objectData.data.length; i++){
                    if (objectData.data[i].name === input[0]){
                        console.log("Item Found: ", objectData.data[i]);
                        found = true;
                    }
                }
                if (!found){
                    console.log("Item not found...")
                }
            }
        }
    })
}
else if (command === "update"){
    readFile('./data.json', function(error, data){
        if (error){
            console.log('Error: ', error);
        }
        else{
            let objectData = JSON.parse(data);
            let found = false;
            for (let i = 0; i < objectData.data.length; i++){
                if (objectData.data[i].name === input[0]){
                    found = true;
                    objectData.data[i].name = input[1];
                    writeFile('./data.json', JSON.stringify(objectData), function(error, data){
                        if (error){
                            console.log('Error: ', error);
                        }
                        else{
                            console.log('Successfuly Updated data...');
                        }
                    })
                }
            }
            if(!found){
                console.log('Item Not Found...');
            }
        }
    })
}
else {
    console.log("Command not found.");
}
