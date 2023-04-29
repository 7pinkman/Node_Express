const fs=require('fs');
const requestHandler = (req,res) => {
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
}

//module.exports = requestHandler;
//multiple exports
/*
module.exports = {
    handler: requestHandler,
    sometext: 'Hi this is Kaustav'

}
*/
/*
module.exports.handler=requestHandler;
module.exports.someText='Hi this is Kaustav';
*/

exports.handler=requestHandler;
exports.someText='Hi this is Kaustav';
