const router =require('express').Router();

//ruta de autenticacion

//notes
router.get('/notes/add',(req,res)=>{
    res.render('notes/newnote')
})




module.exports =router