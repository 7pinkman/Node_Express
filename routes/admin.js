const express = require('express');
const path = require('path');
const router= express.Router();

const  rootDir = require('../util/path');

//  /admin/add-product =>GET

router.get('/add-product',(req,res,next) => {
    //res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><input type="text" name="size"><button type="submit">Add Product</button>');
    //res.sendFile(path.join(__dirname, '../' ,'views','add-product.html')); or check below code
    res.sendFile(path.join(rootDir,'views','add-product.html'));
   

})

//  /admin/add-product => POSTconst path = require('path');

router.post('/add-product',(req,res,next) => {
    console.log(req.body);
    res.redirect('/');
});



module.exports = router;