// in my-app/server.js
const express = require('express')
let app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs');




app.get('/home', function(request, response) {
    console.log('Home page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html')

    fs.readFile(filePath, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        result = data;
        response.send(result);
    });


});

app.use(express.static(path.resolve(__dirname, './build')));


app.get('*', function(request, response) {
    console.log('this is a cat and dog')
    const filePath = path.resolve(__dirname, './build', 'index.html');
    response.sendFile(filePath);
});




app.listen(port, () => console.log(`Listening on port ${port}`));
