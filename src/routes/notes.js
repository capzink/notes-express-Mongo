const router =require('express').Router();

router.get('/notes',(req,res)=>{
    res.send('notas from database')
})


module.exports =router