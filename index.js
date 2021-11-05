const express = require('express')
const path=require('path')
const exphbs=require('express-handlebars')
const methodOverride=require('method-override')
const session=require('express-session')
const flash=require('connect-flash')
const passport=require('passport')



const app= express();
require('./database')
require('./config/passport')

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

//debe ir siempre despues de session este es el passport autenticator
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())



//global variables

app.use((req,res,next)=>{
    //almacena mensajes flash
    res.locals.success_msg=req.flash('success_msg')
    res.locals.error_msg=req.flash('error_msg')
    //variables globales para errores passport
    res.locals.error=req.flash('error')
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
