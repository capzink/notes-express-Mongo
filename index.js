const express = require('express')
const path=require('path')
const exphbs=require('express-handlebars')
const methodOverride=require('method-override')
const session=require('express-session')
const flash=require('connect-flash')



const app= express();
require('./database')

// settings

app.set('port', process.env.PORT ||  3000)
app.set('views',path.join(__dirname, 'views'))
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutDir:(app.get('views'),'views/layout'),
    partialsDir:(app.get('views'),'views/partials'),
    extname:'.hbs'
}))

app.set('view engine', '.hbs')

//midlleware

app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.use(session({
    secret:'mysecretapp',
    resave: true,
    saveUninitialized:true
}))
app.use(flash())


//global variables
//almacena mensajes flash
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg')
    res.locals.error_msg=req.flash('error_msg')

    next();
})

//routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));


//static files
app.use(express.static('public'))




//listen

app.listen(app.get('port'), function(){
    console.log('listening on', app.get('port'))
})
