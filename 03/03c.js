let fs = require('fs');
let input = process.argv.slice(3);
let command = process.argv[2];

let controllers = [
    {
        command: 'sum',
        function: function sum(input){
            console.log(Number(input[0]) + Number(input[1]));
        }
    },
    {
        command: 'minus',
        function: function minus(input){
            console.log(Number(input[0]) - Number(input[1]));
        }
    },
    {
        command: 'print',
        function: function print(input){
            let obj = {
                name: input[0],
                family: input[1],
                email: input[2]
            }
            for (let x in obj) {
                console.log('Salam ' + obj[x]);
            }
        }
    },
    {
        command: 'create',
        function: function create(input){
            let obj = {
                name: input[0],
                family: input[1],
                email: input[2]
            };
            fs.readFile('./data-json.json', function (error, data) {
                if (error) {
                    console.log("Error: ", error);
                }
                else {
                    let file_obj = JSON.parse(data);
                    file_obj.data.push(obj);
                    fs.writeFile('./data-json.json', JSON.stringify(file_obj), function (error, data) {
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
    },
    {
        command: 'read',
        function: function read(input){
            fs.readFile('./data.json', function(error, data){
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
    }
]

for (let controller of controllers){
    if (controller.command === command){
        controller.function(input);
    }
}
