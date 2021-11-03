const router =require('express').Router();

//ruta de autenticacion
//sign in process

router.get('/users/signup',(req,res)=>{
    res.render('./users/signup')
})

router.get('/users',(req,res)=>{
    res.render('users/signin')
})





module.exports =router