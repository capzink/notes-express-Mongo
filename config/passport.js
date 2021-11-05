const passport=require('passport')
var LocalStrategy=require('passport-local').Strategy

//consulta con la base de datos para poder comparar correos
const user =require('../models/user')

//configuracion de parametros apra verificar en servidor local si el correo exist o no
//null para el error

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email,password, done)=>{
    const userr =await user.findOne({email: email})
    if(!user){
        return done(null, false, {message: 'No User found'});
    }
    else{
        const match= await User.matchPassword(password)
        if(match){
            return done(null, userr )
        }
        else{
            return done(null, false, {message:"incorrect password"})
        }
    }


}))
passport.serializeUser((userr, done)=>{
    done(null, userr.id)
})
passport.deserializeUser((id, done)=>{
    user.findById(id, (err,userr)=>{
        done(err, user)

    })
})