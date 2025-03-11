import {readFile, writeFile} from 'fs';
let input = process.argv.slice(3);
let command = process.argv[2];

let controllers = []

function use(command, func) {
    let item = {
        command: command,
        function: func
    }
    controllers.push(item);
}

function start() {
    for (let controller of controllers) {
        if (controller.command === command) {
            controller.function(input);
        }
    }
}
// cmdFramewrok
//------------------------------
// app

use('sum', function sum(input) {
    console.log(Number(input[0]) + Number(input[1]));
})
use('minus', function minus(input) {
    console.log(Number(input[0]) - Number(input[1]));
})
use('print', function print(input) {
    let obj = {
        name: input[0],
        family: input[1],
        email: input[2]
    }
    for (let x in obj) {
        console.log('Salam ' + obj[x]);
    }
})
use('create', function create(input) {
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
})
use('read', function read(input) {
    readFile('./data.json', function (error, data) {
        if (error) {
            console.log('Error: ', error);
        }
        else {
            if (input.length === 0) {
                console.log("FILE DATA: ", JSON.parse(data))
            }
            else {
                let objectData = JSON.parse(data);
                let found = false;
                for (let i = 0; i < objectData.data.length; i++) {
                    if (objectData.data[i].name === input[0]) {
                        console.log("Item Found: ", objectData.data[i]);
                        found = true;
                    }
                }
                if (!found) {
                    console.log("Item not found...")
                }
            }
        }
    })
})

start()