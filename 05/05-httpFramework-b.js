import { createServer } from 'http';

let controllers = [];

function use(name, func) {
    let item = {
        command: name,
        function: func
    }
    controllers.push(item);
}

function router(request, response) {
    let url = request.url.split('/');
    let command = url[1];

    for (let item of controllers) {
        if (item.command === command) {
            item.function(request, response);
        }
    }
}

let myServer = createServer(function (request, response) {
    console.log(request.method, request.url);

    let data = '';
    request.on("data", function (chunk) {
        data += chunk;
    });
    request.on("end", function () {
        try {
            data = JSON.parse(data);
        }
        catch (e) {

        }
        request.data = data;
        router(request, response);
    });
});

use('sum', function (request, response) {
    let url = request.url.split('/');
    let inputs = url.slice(2);
    if (request.method === 'GET') {
        response.write((parseInt(inputs[0]) + parseInt(inputs[1])).toString());
    }
    else if (request.method === 'POST') {
        response.write((parseInt(request.data.input1) + parseInt(request.data.input2)).toString())
    }
    response.end();
});
use('log', function (request, response) {
    console.log('post data is:', request.data);
    response.end();
})
myServer.listen(80);