var express = require('express');
var app = express();

app.get('/', (request, response)=>{
    console.log('user trying to connect')
    response.send('<h3>Server got your response</h3>')
})

app.all('*', (request, response) =>{
    response.status(404).send('<h3>Page Not Found 404</h3>')
})

app.listen(5001, ()=>{
    console.log('listening on ', 5001)
});