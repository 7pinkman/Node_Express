//creating a server using node js
//const http = require('http');


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

server.listen(3000);

*/
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

//const fs=require('fs');//fs is a pkg to work with files

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
        //setHeader is also used for redirection purpose  
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
/*

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
*/
/*
const http = require('http');

const routes = require('./route');//. is used to specify current directory
//in above statement the file content here is cached by node,we can't edit it externally.if we somehow would define route as a object and we tried 
//to add new property to it,this is not manupulate the original file.so this is basically locked,not accessible from outside.we can only export
//staff that we can now read from outside.
//const server=http.createServer(routes);

const server=http.createServer(routes.handler);
console.log(routes.sometext);

server.listen(3000);
*/
//"start": "node app.js",start is a special keyword,in cmd if we write npm start then whole application will run
//"start-server":"node app.js",but if we wite npm start-server then it will  not do same thing like above. as it is  customization, 
//we need to write npm run start-server,
//to run 
//react or angular script we need this customization to build the workflow.

/*We install nodemon as a development depenedency locally and it added package-lock.json file in node_modules and in package.json file it add a new
dependency
"nodemon": "^2.0.22"--> this ^ symbol tell us how the package will be updated if we just run npm install ,i.e,without defining an extra package name
because this command will go to all the package mention in package.json and simply install them with updated versions.  

nodemon: It simply restarts the node application whenever it observes the changes in the file present in the working directory of your project.
to execute nodemon we need this to update - 
"start": "nodemon app.js", 


As a side note

if you were to run nodemon app.js down there in cmd , you would get an error that this command is not found

because it's only installed in this project and not globally on your machine but the terminal will try

to find this globally. Here npm start

it will work because this will look locally.

So if you now run npm start, this will simply start the node server and output some extra information

NPM script will look for the local version of the package.
to install nodemon globally - npm install nodemon -g
to install nodemon locally-npm install nodemon --save-dev




The package-lock json file by the way just stores the exact versions I installed today so that if you



Global Features vs Core Modules vs Third-Party Modules
The last lectures contained important concepts about available Node.js features and how to unlock them.

You can basically differentiate between:

Global features: Keywords like const or function but also some global objects like process

Core Node.js Modules: Examples would be the file-system module ("fs"), the path module ("path") or the Http module ("http")

Third-party Modules: Installed via npm install - you can add any kind of feature to your app via this way

Global features are always available, you don't need to import them into the files where you want to use them.

Core Node.js Modules don't need to be installed (NO npm install is required) but you need to import them when you want to use features exposed by them.

Example:

const fs = require('fs');

You can now use the fs object exported by the "fs" module.

Third-party Modules need to be installed (via npm install in the project folder) AND imported.

Example (which you don't need to understand yet - we'll cover this later in the course):

// In terminal/ command prompt
npm install --save express-session
// In code file (e.g. app.js)
const sessions = require('express-session');


As a side note

if you were to run nodemon app.js down there, you would get an error that this command is not found

because it's only installed in this project and not globally on your machine but the terminal will try

to find this globally. Here

it will work because this will look globally.

So if you now run npm start, this will simply start the node server and output some extra information



Global & Local npm Packages
In the last lecture, we added nodemon as a local dependency to our project.

The good thing about local dependencies is that you can share projects without the node_modules folder (where they are stored) and you can run npm install in a project to then re-create that node_modules folder. This allows you to share only your source code, hence reducing the size of the shared project vastly.

The attached course code snippets also are shared in that way, hence you need to run npm install in the extracted packages to be able to run my code!

I showed that nodemon app.js would not work in the terminal or command line because we don't use local dependencies there but global packages.

You could install nodemon globally if you wanted (this is NOT required though - because we can just run it locally): npm install -g nodemon would do the trick. Specifically the -g flag ensures that the package gets added as a global package which you now can use anywhere on your machine, directly from inside the terminal or command prompt.


 --save saves the name and version of the package being installed in the dependency object. --save-dev saves the name and version of the package being installed in the dev-dependency object.



 To start the debugger autometically after any change in the code, we need to use nodemon package to restart.

 Add configuration -> Node.js -> then .vscode and launch.json autometically created,there in the configurateion block we need to mention 
 "restart": true,
"runtimeExecutable": "nodemon",it tries to find nodemon globally so we need to install nodemon globally
"console": "integratedTerminal"

it will restart the debugger when a change is detected,

so that not just the server is restarted but also the debugging process. Here by the way in this configuration,

you can also define that it should always start with the app.js file

You can also change the console where things are logged to to the integrated terminal which is the normal

terminal.
------
in the terminal, you get the normal output and you have to use the terminal because if you now change something,

it restarts the debugger and node and these are two separate processes

and if you stop the debugger, nodemon has to quit separately or has to exit separately and you do

this by hitting control

c here and this couldn't be done in the debug console which is why you have to funnel this to the

terminal.

*/

//--------------------------EXPRESS JS---------------------
/*
const http = require('http');

const express=require('express');

const app=express();//the express package seems to export a function express at the end,we can check it in express package

/*express js is all about middleware,Middleware means an incoming request is autometically funeled through a bunch of functions by expressjs,

so instead of just having one request handler, you will actually have a possibility of hooking in multiple

functions which the request will go through until you send a response

*//*
app.use((req,res,next) => {
    console.log('in the middleware');
    next();
});//use help us to add new middleware function,it accepts an array of so-called request handlers here and it has some other use cases too.

/*Now one easy way of using it is that you simply pass a function to it and this function here, this function

you pass to app use will be executed for every incoming request and this function will receive three arguments,

the request and the response object

as you already know it basically with some extra tricks learned though and a third argument which is

the next argument.

Next is actually a function, a function that will be passed to this function by expressjs

this next argument, basically this function you're receiving here has to be executed to allow the

request to travel on to the next middleware.

///we have to call next here to allow the request to travel on to the next

   // middleware in line.

if we don't call

next it just dies,

so if we don't call next, we should actually send back a response because otherwise the request can't

continue its journey,
*/
/*
app.use((req,res,next) => {
    console.log('in another middleware');
    res.send('<h1>Hello from Expressjs</h1>');
});
/*
Expressjs

doesn't send a default response or anything like that,

Send allows us to send well

a response

and actually this allows us to attach a body which is of type any,We could send good old html code here,

you'll notice is that if you open your network tab here and you inspect that request

you got,

you will see that under headers, the content type is automatically set to text html here.
The send method by default here

since we send some text here simply sets an html content type,

you can still set one manually with set header of course, so you can always override this expressjs

default but you can also rely on the default where the default response header is text html.


*/

/*
const server=http.createServer(app);//the app here happens to be a valid request handler,it sets up a certain way of handling incoming requests 

server.listen(3000);
*/
//above both thye statement can be marged as below
/*
app.listen(3000);//as in listen function createServer() method is called,so we don't required http package as well.

*/
/////////////////////////////////ROUTING/////////////////////////////////////////////////////////////////////////////////
/*
const express=require('express');

const app=express();

//we can check use() in expressjs page
/*
app.use('/',(req,res,next) => {
    console.log('in the middleware');
    res.send('<h1>Hello from Expressjs</h1>');
});
/*
in use as a path '/' is by default here.
for example enter /add-product after the domain name in browser.

We still see hello from express but I'm in another middleware, so this middleware gets

executed for both slash and add product because this does not mean that the full path,

so the part after the domain has to be a slash but that it has to start with that.

Now of course every route starts with just a slash
 
and then we have different other criteria.

So what we can do is we can simply duplicate this and add it before this middleware and add

/add-product.
*/
/*
app.use('/add-product',(req,res,next) => {
    console.log('in the middleware');
    res.send('<h1>The "add-product" page</h1>');
});

app.use('/',(req,res,next) => {
    console.log('in the middleware');
    res.send('<h1>Hello from Expressjs</h1>');
});


/*

Now why before this middleware and not after it?

Because remember, the request goes through the file

from top to bottom and if we don't call next, it's not going to the next middleware.

Well I am not calling next here,

so in the end if we have /add-product, this middleware will be reached first

because top to bottom, add product will match this middleware

and since I don't call next, this middleware will never get a chance of handling that request even though

the filter here would have well, matched that request too.


if you are sending a response, this is a good indication that you never want to call next too because

you don't want to execute any other response related code just as before with vanilla nodejs,


you don't want to send more than one response, this won't work and will result in an error.
 if we have a middleware that should be applied to all requests, we would simply add it on top of

all the other middlewares
*/
/*

app.listen(3000);

*/

///////////////////////PARSING INCOMING REQUESTS
/*
const express=require('express');

const app=express();

const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));/*you should pass the config options here and set

extended to false,

this is if it should be able to parse non-default features you could say
/*
it registers a middleware,

so this function in the end just yields us such a middleware function,(like below functions which passed as argument in use())

so this passes such a function here in the end even though we can't see it and this package will in the

end, in this middleware function call next in the end, so that the request also reaches our middleware

but before it does that, it will do that whole request body parsing we had to do manually in the previous

core sections.

Now this will not parse all kinds of possible bodies, files, json and so on but this will parse bodies

like the one we're getting here, sent through a form. 
*/
/*
app.use('/add-product',(req,res,next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><input type="text" name="size"><button type="submit">Add Product</button>');
})

app.use('/product',(req,res,next) => {
    console.log(req.body);
/* before using body parser above statemnet return  undefined 

request gives us this body convenience property here but by default, request doesn't try to parse the

incoming request body. To do that,

we need to register a parser and we do that by adding another middleware.

and you typically do that before your route handling middlewares because the parsing of the body should

be done no matter where your request ends up

and there, I want to parse the incoming request body. Now for that we can install a third party package

and we do that by running npm install --save body-parser

After using body parser
we get, a javascript object like title: 'book' with a key value pair which also makes extracting easy

*/
//    res.redirect('/');
/*I can use response redirect which certainly is easier than manually setting the status code and setting

the location header. So redirect is another convenience function added by express

and here I can redirect to let's say just slash,

so it will automatically redirect me to the slash route.
*/
//})


/*
app.use('/',(req,res,next) => {
    console.log('in the middleware');
    res.send('<h1>Hello from Expressjs</h1>');
});
//similar to use we can use get,post and put method.
app.listen(3000);
//

////////////////////////////////////*limiting middileware execution for post content

*/
/*
const express=require('express');

const app=express();

const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

app.use('/add-product',(req,res,next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><input type="text" name="size"><button type="submit">Add Product</button>');
})

app.post('/product',(req,res,next) => {
    console.log(req.body);
    res.redirect('/');
})

app.use('/',(req,res,next) => {
    console.log('in the middleware');
    res.send('<h1>Hello from Expressjs</h1>');
});

app.listen(3000);
*/

///////////////////////////////Using expression router

const express=require('express');

const app=express();

const bodyParser=require('body-parser');

const path = require('path');

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));//to serve folder staticly,i.e,to give read access to a folder,here we are giving access to public folder

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');


//app.use(adminRoutes);
//app.use(shopRoutes);//order matter here of using objects
//get ,post will do exact match not use



///////////filter path will use common starting segment for our path which all routes in a given file use to outsource that in app.js file
app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    //res.status(404).send('<h1>Page not working </h1>');
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

app.listen(3000);

