const express = require('express');

const path = require('path');

const router= express.Router();

router.get('/',(req,res,next) => {
    //console.log('in the middleware');
    //res.send('<h1>Hello from Expressjs</h1>');
    //res.sendFile('/views/shop.html');//here '/' on column 19 represents the root folder on our OS,not to this project folder.
    //so to construct the path correctly ,we import path core module
    res.sendFile(path.join(__dirname, '../' , 'views' , 'shop.html'));//join yields a path at the end by concatenating different segment
    //__dirname is a global variable which holds absolute path on our OS to this project folder 
    //join works both on linux and windows,so join first identify the os,according to that it build the path
});

module.exports = router;