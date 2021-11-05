const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy

//consulta con la base de datos para poder comparar correos
const User =require('../models/user')

//configuracion de parametros apra verificar en servidor local si el correo exist o no estrategia de autenticacion


passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email,password, done)=>{
    const user =await User.findOne({email: email})
    if(!user){
        //null para el error callback done termina el proceso de autenticacion
        return done(null, false, {message: 'No User found'});
    }
    else{
        const match= await user.matchPassword(password)
        if(match){
            return done(null, user )
        }
        else{
            return done(null, false, {message:"incorrect password"})
        }
    }


}))
passport.serializeUser((user, done)=>{
    done(null, user.id)
})
passport.deserializeUser((id, done)=>{
    User.findById(id, (err,user)=>{
        done(err, user)

    })
})