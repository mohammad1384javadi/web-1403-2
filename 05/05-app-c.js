import {use, start} from './05-httpFramework-e.js';
import {readFile, existsSync} from 'fs';

use('GET', 'sum', function (request, response) {
    let url = request.url.split('/');
    let inputs = url.slice(2);
    response.write((parseInt(inputs[0]) + parseInt(inputs[1])).toString());
    response.end();
});
use('POST', 'sum', function(request, response){
    response.write((parseInt(request.data.input1) + parseInt(request.data.input2)).toString())
    response.end();
});
use('GET', 'log', function (request, response) {
    console.log('post data is:', request.data);
    response.end();
});
use('GET', 'file', function(request, response){
    let url = request.url.split('/');
    let input_file = './' + url[2];
    if (existsSync(input_file)){
        readFile(input_file, "utf8", function(error, data){
            if (error){
                console.log('Error: ', error);
                response.write('Error: ', error);
                response.end();
            }
            else{
                console.log('Data: ', data);
                response.write("Data: ", data);
                response.end();
            }
        })
        response.end();
    }
    else{
        console.log('File not Found...');
    }
});

start();