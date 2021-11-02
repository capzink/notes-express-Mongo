const express = require('express')
const path=require('path')
const exphbs=require('express-handlebars')
const override=require('method-override')
const session=require('express-session')
const app= express();
// settings
app.set('port', process.env.PORT ||  3000)
app.set('views',path.join(__dirname, 'views'))
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutDIr: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs'
}))

app.set('view engine', '.hbs')
//midlleware

app.use(express.urlencoded({extended:false}))
app.use(override('_method'))
app.use(session({
    secret:'mysecretapp',
    resave: true,
    saveUninitialized:true
}))


//global variables

//routes


//static files


//listen

app.listen(app.get(3000), function(){
    console.log('listening on', app.get('port'))
})
