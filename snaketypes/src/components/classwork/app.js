var express = require('express');
const { products } = require('./data');
var app = express();

const authorize = (req,res,next)=>{
    const {user}= req.query;
    if(user=== 'someone'){
        req.user={name:'someone',id:3}
        next()
    }
    else{
        res.status(401).send('Unauthorized')
    }
}
// app.use(authorize)

const logger = (request, response, next) =>{
    const method = request.method;
    const url = request.url;
    // const time = request.;
    console.log('method: ', method, ' url: ', url);
    //next();
}

app.get('/', logger, (request, response)=>{
    console.log('running path "/"')
    response.send('<h3>Server got your response</h3><br><a href="/api/products/">products</a>')
    // response.json([{data1: 'data1'}, {data2: 'data2'}])
})

app.get('/api/products', (request, response)=>{
    console.log('running path "/api/products"')
    const newP=products.map((product) => {
        const {id, name, image} = product;
        return {id, name, image}
    })
    response.send(newP)
})

app.all('*', (request, response) =>{
    response.status(404).send('<h3>Page Not Found 404</h3>')
})

app.listen(5001, ()=>{
    console.log('listening on ', 5001)
});