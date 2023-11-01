const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError= require('./AppError');


app.use(morgan('tiny'))
app.use((req,res,next)=>{
    req.requestTime =Date.now();
    console.log(req.method, req.path);
    next();
})
// app.use(morgan('common'));
// app.use((req,res,next)=>{
//     console.log("This is my first middle ware");
//     next();
   
// })

// app.use((req,res,next)=>{
//     console.log("This is my second middle ware");
//     next();
    
// })

const varifypassword =((req,res,next)=>{
    const{password} = req.query;
    if(password === '999'){
        next();
    }
   
    throw new AppError('Password requied!!', 401);
    
    // res.send("Sorry You Need correct Password")
    
});

app.get('/cats',(req,res)=>{
 cats.fly()
});

app.get('/admin',(req,res)=>{
    throw new AppError('You are not Admin',403)

});


app.get('/', (req,res)=>{
    console.log(`REQUEST DATE: ${ req.requestTime}`);
    res.send("Home Page!!");
})


app.get('/dogs', (req,res)=>{
    console.log(`REQUEST DATE: ${ req.requestTime}`);
    res.send("woof!!");
})

app.get('/secretes',varifypassword,(req,res)=>{
  res.send("MY secrets: Every time i watch Movies in bathroom")
})

// app.use((err,req,res,next)=>{
//     console.log("***************************");
//     console.log("*************Error!!**************");
//     console.log("***************************");
//     console.log(err);
//     next(err)
// });

app.use((err,req,res,next)=>{
const {status = 500, message='Somethig went worng'}= err;
res.status(status).send(message);
});


app.use((req,res)=>{
    res.status(404).send("NOT FOUND ")
});

app.listen(3000,()=>{
    console.log('App running on localhost:3000');
})