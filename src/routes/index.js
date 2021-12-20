const router =require('express').Router();


//home
router.get('/', (req,res)=>{
    res.render('index')
    
})
//about
router.get('/about',(req,res)=>{
    res.render('about')
})




module.exports =router