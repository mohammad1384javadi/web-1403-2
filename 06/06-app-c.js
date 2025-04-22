import { writeFile, readFile } from 'fs';
import { use, start, write } from "./05-httpFramework-f.js";

use('POST', 'sum', function (request, response) {
    response.write((parseInt(request.data.input1) + parseInt(request.data.input2)).toString());
    response.end();
});
use('GET', 'sum', function (request, response) {
    let url = request.url.split('/');
    let inputs = url.slice(2);
    response.write((parseInt(inputs[0]) + parseInt(inputs[1])).toString());
    response.end();
});
use('GET', 'log', function (request, response) {
    console.log('post data is:', request.data);
    response.end();
});
use('GET', 'file', function (request, response) {
    let url = request.url.split('/');
    let inputs = url.slice(2);

    readFile(inputs[0], function (error, fileBody) {
        if (error) {
            console.log('ERROR:', error);
            write(response, 400, 'ERROR:' + error)
        }
        else {
            response.write(fileBody);
            response.end();
        }
    });
});
use('POST', 'user', function (request, response) {
    readFile('./users.json', 'utf8', function (error, fileData) {
        if (error) {
            console.log('ERROR:', error);
            write(response, 500, 'ERROR:' + error);
        }
        else {
            let dataObject = JSON.parse(fileData);
            let userFound = false;
            for (let row of dataObject.records) {
                if (row.user === request.data.user) {
                    userFound = true;
                }
            }
            if (userFound) {
                console.log('User already exist...');
                write(response, 400, 'User already exist...');
            }
            else {
                dataObject.records.push(request.data);
                let dataString = JSON.stringify(dataObject);
                writeFile('./users.json', dataString, function (error) {
                    if (error) {
                        console.log('ERROR:', error);
                        write(response, 500, 'ERROR:' + error)
                    }
                    else {
                        console.log('User Created.');
                        write(response, 200, 'User Created.')
                    }
                });
            }

        }
    });
});

use('DELETE', 'user', function (request, response) {
    readFile('./users.json', 'utf8', function (error, data) {
        if (error) {
            console.log('Error: ', error);
            write(response, 400, 'Error: ' + error);
        }
        else {
            let objData = JSON.parse(data);
            let userFound = false;
            for (let i = 0; i < objData.records.length; i++) {
                if (objData.records[i].user === request.data.user) {
                    userFound = true;
                    objData.records.splice(i, 1)
                    break;
                }
            }
            if (!userFound) {
                console.log('User notFound...');
                write(response, 404, 'User notFound...');
            }
            else {
                let dataString = JSON.stringify(objData);
                writeFile('./users.json', dataString, function (error, data) {
                    if (error) {
                        console.log('Error: ', error);
                        write(response, 400, 'Error: ' + error);
                    }
                    else {
                        console.log('User Deleted...');
                        write(response, 200, 'User Deleted...');
                    }
                })
            }
        }
    })
})

start();
