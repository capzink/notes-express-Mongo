const router =require('express').Router();

//ruta de autenticacion

//notes
router.get('/notes/add',(req,res)=>{
    res.render('notes/newnote')
})

router.get('/notes',(req,res)=>{
    res.send('sgnin')
})

router.post('/notes/newnote',(req,res)=>{
    console.log(req.body)
    res.send('ok')

})




module.exports =router