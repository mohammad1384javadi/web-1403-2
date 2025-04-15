import { createServer } from 'http';

let controllers = [];

function use(method, name, func) {
    let item = {
        command: name,
        function: func,
        method: method
    }
    controllers.push(item);
}

function router(request, response) {
    let url = request.url.split('/');
    let command = url[1];
    let found = false;

    for (let item of controllers) {
        if (item.command === command && item.method === request.method) {
            item.function(request, response);
            found = true;
            break;
        }
    }
    if (!found) {
        response.write('Command not found...');
        response.end();
    }
}

function start() {
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
    myServer.listen(80);
}

function write(response, status, body){
    response.writeHead(status);
    response.write(body);
    response.end();
}
export{
    start,
    use,
    write
}