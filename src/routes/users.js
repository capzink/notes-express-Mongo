const router =require('express').Router();

//ruta de autenticacion
router.get('/users/signin',(req,res)=>{
    res.render('users/signin')
})

router.get('/users/signup',(req,res)=>{
    res.render('users/signup')
})




module.exports =router