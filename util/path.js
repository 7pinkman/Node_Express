const path=require('path');

module.exports=path.dirname(process.mainModule.filename);//process is a global variable that exists on all the file,we don't need to import it
//mainModule signify the module that started the application .filename is app.js