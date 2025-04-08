import {createServer} from 'http';

let myServer = createServer(function(request, response){
    console.log(request.method);
    console.log(request.url);
    response.write('Salam!');
    response.end()
})
myServer.listen(80);