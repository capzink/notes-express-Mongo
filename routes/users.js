const router =require('express').Router();

//para usar base de datos este es el modulo de usuario instancia
const user =require('../models/user')

//ruta de autenticacion
//sign in process

router.get('/users/signup',(req,res)=>{
    res.render('./users/signup')
})

router.get('/users/signin',(req,res)=>{
    res.render('users/signin')
})

//ruta para recibir datos

router.post('/users/signup', async (req,res)=>{
   const {name, password, email, confirm_password}=req.body
   const errors=[];
    if(name.length===0 || email.length===0){
        errors.push({text:' please type in Name'})
    }

   if(password!==confirm_password){
       errors.push({text: 'password does not match'})
   }
   if(password.length<4){
       errors.push({text:"Password must be at least 4 characters"})
   }
   if(errors.length>0){
       res.render('users/signup',{errors,name,password,confirm_password})

   }else{
    //verificacion que correo no exsita ya
    const emailUser= await user.findOne({email:'email'})
    if(emailUser){
        req.flash('error_msg', 'email already exists')
        res.redirect('/users/signup')
    }
    //creacion de nuevo usuario
    const newUser= new user({name,email,password})
    //guardar contrasena cifrada
    newUser.password= await newUser.encryptPassword(password)
    //guardar usuario
    await newUser.save()
    req.flash('succes_msg', 'You Are Registered')
    res.redirect('/users/signin')
   }
})



module.exports =router