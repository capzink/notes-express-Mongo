const router =require('express').Router();

//ruta de autenticacion

//notes
router.get('/notes/add',(req,res)=>{
    res.render('notes/newnote')
})

router.get('/notes',(req,res)=>{
    res.send('signin')
})

router.post('/notes/newnote',(req,res)=>{
    console.log(req.body)
    const {title, description}=req.body;
    const errors=[];
    if(!title){
       errors.push({text: 'please write a title'});
    }
    if(!description){
       errors.push({text:'please write a description'});
    }
    if(errors.length>0){
        res.render('notes/newnote', {errors,title,description});
    }
    else{
    res.send('ok');
    }
})

module.exports =router;