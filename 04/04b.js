import {createServer} from 'http';

let server = createServer(function(request, response){
    let url = request.url.split('/');
    let command = url[1];
    let input = url.slice(2);

    let data = '';
    request.on("data", function(chuck){
        data += chuck;
    })
    request.on("end", function(){
        router(request, response, data);
    })

    function router(request, response){
        if (request.method === "GET" && command === 'sum'){
            response.write((parseInt(input[0]) + parseInt(input[1])).toString());
        }
        if (request.method === "POST" && command === "sum"){
            console.log(data);
        }
        else{
            response.write('Command not found...');
        }
        response.end();
    }
})
server.listen(80);