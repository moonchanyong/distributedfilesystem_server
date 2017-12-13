var net = require('net');
const fs = require('fs');
const path = require('path');
//-----------------------------------------------
var port = process.env.PORT||8080;
var server = net.createServer();
const base_path = "./root";
server.listen(port,function(){
    console.log(port);
    console.log(server.address())

});

var sockets_path = [];

var cd = function (socket, direc_name, callback) {

    switch (direc_name) {

        case "..":
           if(sockets_path[socket].lastIndexOf('/')!=-1)  // 있다면 
           {
            sockets_path[socket]=sockets_path[socket].substring(0,sockets_path[socket].lastIndexOf('/'));
                //console.log(sockets_path[socket]);
           }
           else 
           {
               socket.write("no");
           }

            break;
        default:
            ls(base_path + sockets_path[socket], (d) => {
                let check = true;
                d.forEach(function (i, idx, arr) {

                    if (direc_name == i) // 같다면 
                    {
                        callback(true);
                        check = false;
                    }

                    if ((idx === arr.length - 1) && !(direc_name == i) && check) //없다면 
                    {

                        callback(false);
                    }


                });
            });
            break;
    }

}


var ls = function (path, callback) {

    fs.readdir(path, (err, files) => {
        callback(files);

    })

}


var cat_read = function (socket,file_name ) {


    let data = fs.readFileSync( base_path+sockets_path[socket] + '/'+ file_name, "utf8");
    socket.write(data);

    
}



var cat_write = function (socket,command ) {
    
    if(command.length >  2 )
    {
    let data  = "";
        for(let i = 2 ; i < command.length ; i ++)
        {
            data +=  command[i] + " ";
        }
    
        fs.appendFileSync( base_path+sockets_path[socket] + '/'+ command[1], data);
        
        
        
    }
    }

//로그인 기능 나중에 만든다 .
server.on('connection', function (socket) {
    socket.setEncoding('utf8');
    liste = [];
    liste.push(socket.remoteAddress);
    sockets_path[socket] = "";
    console.log(liste);
    // socket = new JsonSocket(socket);
    //  var n;
    // var isRunning = false;
    //var streatTimeout;

    socket.on('data', function (data) {

        let command = data.toString().split(" ");
        switch (command[0]) {
            case "ls":
                // ls 기능 
                ls(base_path + sockets_path[socket], (d) => {
                    if (d.length == 0) {
                        socket.write("no files\n");
                    }

                    d.forEach(file => {
                        //socket.write(file  + "\n");
                        let stats = fs.lstatSync(base_path + sockets_path[socket]+"/"+file);
                        11
                        if(stats.isDirectory()) {
                            socket.write("dirname : " + file   + " creation :" + stats['birthtime'] + "\n" );
                            
                        } else {

                            socket.write("filename : " + file + " size : " +stats['size']  + " creation :" + stats['birthtime'] + "\n" );
                            
                        }
                        console.log()
                    });
                });
                break;
            // cd 기능 
            case "cd":
                cd(socket, command[1], (d) => {
                    if (d) {
                        sockets_path[socket] += "/" + command[1];
                      //  socket.write("success cd");
                    } else {
                        socket.write("no directory");
                    }
                });

                break;
            case "cat_read":
                cat_read(socket,command[1]);            
                break;
            case "cat_write":
                cat_write(socket,command);            
                break;
                
            default:
                socket.write(command[0]);
                break;
        }




    });

    socket.on('error', function () {
        console.log('error');
    });


    socket.on('close', function () {
        console.log('disconnected from server');
    });

});