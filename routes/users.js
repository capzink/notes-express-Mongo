const router =require('express').Router();

//ruta de autenticacion
//sign in process

router.get('/users/signup',(req,res)=>{
    res.render('./users/signup')
})

router.get('/users/signin',(req,res)=>{
    res.render('users/signin')
})

//ruta para recibir datos

/*router.post('/users/signup', (req,res)=>{
   const {name, password, email, confirm_password}=req.body
   const errors=[];
   if(password!==confirm_password){
       errors.push({text: 'password do not match'})
   }
   if(password.length<4){
       errors.push({text:"Password must be at least 4 characters"})
   }
   if(errors.length>0){
       res.render('users/signup',{errors,name,password,confirm_password})

   }else{
    res.send('ok')
   }
})*/



module.exports =router