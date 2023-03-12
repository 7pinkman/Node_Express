//creating a server using node js
const http = require('http');


/*
http.createServer(function(req,res)
{
    console.log(req);
});
//after excuting this code the terminal go for next line for next command to run
//if we run the uppere code now then in console it prints nothing.
*///it takes requestlisteners as an argument,requestlistener is simply a function that will execute every incoming request.
//we can explicitly create a function as a argument put it in createServer() function or we can pass a anonymous function into it.
//it means if request come please execute the function.
//it basically createserver callback function as it's called,it's called by nodejs whenever a request reaches our server
//this upper function actually returns a server as we did not send any request to server and we also don't know where the server is.
//so let's create a server and store in a variable
/*
const server= http.createServer((req,res) => {
    console.log(req);
})
//createServer method returns a server.
server.listen(3000);//listen actaully start a process where node js will not immediately exit our script but where node js will instead keep 
//this running ,to listen,that's why the name like this for incoming requestes,3000 is a port we want to listen 
//now in local development we will pass a local host in  local machine by default,let's say we take 3000
//after exceuting this code we see that cursor goes to next line and it stops,because the process  here is still runing as we are now going to 
//ongoing looping process where this will keep on listening for requests
//we all need a web server that will keep on listening for req.

//now if we go on any web browser and check for localhost:3000.then in terminal we can see lots of o/p,as the the request being logged in the console.



//--------------------------NODE JS LIFE CYCLE----------------------------------------------------------------------------

/*

After executing the file,this essentially started the script where node js went through the entire file,parsed code,registered the variables
and so on,so it basically it reads our entire code and start executing it.we never left the previous program,as in Node there is  a important 
concept named as event loop which is a loop process which managed by node js which keeps on running as long as there is work to do.
*/


/*
const server=http.createServer((req,res) => {
    console.log(req.url,req.method,req.headers);
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello NODE server</h1></body>');
    res.write('</html>');
    res.end();
});
*/
//server.listen(3000);

//--------------------------------------------------------------------------------

//assignment 7

/*
const server=http.createServer((req,res) => {
    console.log(req.url,req.method,req.headers);
    if(req.url=='/home')
    {
        res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello home</h1></body>');
    res.write('</html>');
    res.end();
    }
    else if(req.url=='/about')
    {
        res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello us page</h1></body>');
    res.write('</html>');
    res.end();
    }
    if(req.url=='/node')
    {
        res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello node js </h1></body>');
    res.write('</html>');
    res.end();
    }    
});

server.listen(3000);


*/



//------------------ROUTING REQUESTS---------------------------

/*

const server=http.createServer((req,res) => {
    const url=req.url;
    if(url ==='/'){//when we visit '/',then it returns a response with a html code 
        res.write('<html>');
        res.write('<head><title>Enter Message </title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');//send a post req to /message
        res.write('</html>');
        return res.end();//this 'return' is not required to return a responce,but to return 
        //from this anonymous function and to not continue below code because we return prior
        //to it.If we not use return then it will give an error as after res.end we again calling res.this will quit the function execution and we must do this because after res
        //end,we must not call any other res.write or anything,but this what happens if we not return because then it would just continue execution with thses lines.
        //as we make it in if statement we sould quit here,ie,we should exit from the function.
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello NODE server</h1></body>');
    res.write('</html>');
    res.end();//after sending post requests to /message page,this remaining code(117 to 122) runs as if statement condition is not matching.
    //after closing the function (in 111 line) event loop check if any new req is present or not,then it again execute this  anonymous function. 
});

server.listen(3000);

*/

//---------------------Redirecting Requests----------------------------

//so last program we made sure that we listen to requests to just sash nothing and then we return some html code with our input field 
//on it,now when we click that send button ,we send a post request to /message but we're not doing anything with that,let do something.
//here we will redirect the user to '/' and create a new file and store the messgae the user entered in it.

const fs=require('fs');//fs is a pkg to work with files

/*
const server=http.createServer((req,res) => {
    const url=req.url;
    const method=req.method;
    if(url ==='/'){//when we visit '/',then it returns a response with a html code 
        res.write('<html>');
        res.write('<head><title>Enter Message </title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');//send a post req to /message
        res.write('</html>');
        return res.end();//this 'return' is not required to return a responce,but to return 
        //from this anonymous function and to not continue below code because we return prior
        //to it.this will quit the function execution and we must do this because after res
        //end,we must not call any other res.write or anything,but this what happens if we not return because then it would just continue execution with thses lines.
        //as we make it in if statement we sould quit here,ie,we should exit from the function.
    }
    if(url==='/message' && method==='POST') {
        fs.writeFileSync('messgae.txt','DUMMY');
        //res.writeHead(302,{});//writeHead() helps us to basically write some meta information in one go and then we give a status code of 302
        //which stands for redirection ,then we pass a javascript object with some headers we want to set
        //we can do this in two steps like
        res.statusCode=302;
        res.setHeader('Location', '/')//it redirecting to '/',this is a default header accepted by the browser,we set the location to '/' and i will 
        //autometically use the host we're already running on  
        return res.end();

    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello NODE server</h1></body>');
    res.write('</html>');
    res.end();//after sending post requests to /message page,this remaining code(117 to 122) runs as if statement condition is not matching.
    //after closing the function (in 111 line) event loop check if any new req is present or not,then it again execute this  anonymous function. 
});

server.listen(3000);

//if we run the above code then we can see we redirect to '/' ,you can see the redirect in the network tab,here 302(with message) indicates we send request
//to /message and we were redirect to localhost as with localhost 200 is written(200 means ok)

//----------------------------PARSING THE REQUEST BODY-----------------------------------------------------


/* now we need to find hiow to parse the incoming requests and get the data that is part of request beacuse that data whatever should be we entered 
in the chrome user interface.

Incoming data is basically sent as stream of data and that is special construct javascript in general knows but node js uses  alot.


NOw what is stream of data?
for that we need to know streams and buffer





*/

/*
const server=http.createServer((req,res) => {
    const url=req.url;
    const method=req.method;
    if(url ==='/'){ 
        res.write('<html>');
        res.write('<head><title>Enter Message </title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');//send a post req to /message
        res.write('</html>');
        return res.end();
    }
    if(url==='/message' && method==='POST') {
        //when sending a posted message and before sending the responce and writing to the file,we want to get our request data.We will 
        //do this by going to our request and registering an event listener.for createServer it implicitly create for us,now we will do this on our owm.
        //by using on method.
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
                body.push(chunk);//nodejs will execute this so often until getting all data out of request body.
        })//on allow us to listen certain event and here we want to listen data event,this event is fired whenever a new chunk
        //is ready to be read.As a second arg we pass a fun which will be executed for every data piece. 
        //if you hover on the on() fun,then we can see on data,the listener receives chunk of data,we can work on this chunk and interact with it.
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();//this will create a new buffer and add all the chunks inside the body into it,toString()
            // is a utility method offered by NODE js where we do something to our buffer chunks
            //we can work with parseBody now
            console.log(parseBody);//message=<the i/p i put in browser>
            const message=parseBody.split('=')[1];
            fs.writeFileSync('messgae.txt',message);



        })//the end eventlistener will be fired when all the request data is parsed. 
        
        res.statusCode=302;
        res.setHeader('Location', '/')
        return res.end();

    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello NODE server</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);
/*after the above code runs,it o/p as 
<Buffer 6d 65 73 73 61 67 65 3d 67 68 62 64 6e 68 64 6a 6a 64>
message==<the i/p i put in browser>

as first one we can't work with it as it is a chunk.
now in 2nd one parseBody prints as  message with something,as we named our i/p as message,as we said form will take all i/p data and put it in
a request body as key value pairs,where name assigned to the i/p are the key and the value is what user entered.
now we can store the i/p in a file
*/

/*in the next video the async way of code execution is showed*/

/*
const server=http.createServer((req,res) => {
    const url=req.url;
    const method=req.method;
    if(url ==='/'){ 
        res.write('<html>');
        res.write('<head><title>Enter Message </title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');//send a post req to /message
        res.write('</html>');
        return res.end();
    }
    if(url==='/message' && method==='POST') {
        
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
                body.push(chunk);
        })
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const message=parseBody.split('=')[1];
            //fs.writeFileSync('messgae.txt',message);//there is two way to write in a file,here we are writing in sysnchronous way,thus
            //the next line of code execution has been blocked until the file is done

            //for huge data and request from other user,in this two cases writeFileSync cause a huge delay
            fs.writeFile('message.txt', message , () => {
                res.statusCode=302;
                res.setHeader('Location', '/')
                return res.end();//this responce will be sent when we are done working with this file because that is  ultimately the 
                //action we want to do upon our request.

            })//the callback function is executed when the file is done,so just as createServer(),node js create a event listener for us.
            //IN Node,we have this event driven architecture where we tell node to do something,then it will go ahead and offload that process
            //to the OS which does use multi threading and so on,and will then continue its event loop to listen for event callbacks and alwys
            //just dispatch tiny actions like that to never block code execution and comes back once an operation is done by oS and so on.

            //thus node is high performent as it does not block the code or servers,it just tell os to do this or that  and eventually comes back and 
            //does something with the callback,like sending a response here which is not a blocking operation.

        })
        //we need to return on function otherwise from line 294 code will be executed because of async characteristic of node

    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello NODE server</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);

*/


/*Assignment-8

I want you to read all the messages from the file and show it at the top of the form.
Everytime you add a new message it should show at the top of the form.

*/

const fs1=require('fs');

const server=http.createServer((req,res) => {
    const url=req.url;
    const method=req.method;
    if(url ==='/'){ 
        fs1.readFile("message.txt", { encoding : "utf8"}, (err,data) => {
            if(err){
                console.log(err);
            }
            console.log(`data from file` + data);
            res.write('<html>');
            res.write('<head><title>Enter Message </title></head>');
            res.write(`<body>${data}</body>`);
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');//send a post req to /message
            res.write('</html>');
            return res.end();

        });


    }
    else if(url==='/message' && method==='POST') {
        
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
                body.push(chunk);
        });
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const message=parseBody.split('=')[1];
            
            fs.writeFile('message.txt', message , (err) => {
                if(err){
                    console.log(err);
                }
                res.statusCode=302;
                res.setHeader('Location', '/');
                return res.end();

            });
        });

    }
    else {
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>My first page</title></head>');
        res.write('<body><h1>Hello NODE server</h1></body>');
        res.write('</html>');
        res.end();
    }
    
});

server.listen(3000);