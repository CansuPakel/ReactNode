const express = require('express');
const path = require('path');
const app = express();
const publicPath =path.join(__dirname,'..','public')
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('*', (req, res) =>{
    res.sendFile(path.join(publicPath,'index.html'));
});  //als je dit niet doet zal het niet werken na het refreshen

app.listen(port,() => {
    console.log('Server is up');
})