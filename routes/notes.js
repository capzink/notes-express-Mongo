const router =require('express').Router();

const Note = require('../models/mdnote')

//pagina de formulario para nueva nota
router.get('/notes/add',(req,res)=>{
    res.render('notes/newnote')
})


//tomo los datos del formualrio
router.post('/notes/newnote',async (req,res)=>{
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
    // model de creacion para mongoDb
    else{
    const newNo= new Note({title, description})
    await newNo.save();

    res.redirect('/notes')
    }
})

//entrega o puedo consultar lo de la base de datos luego de almacenarlo
router.get('/notes',async (req,res)=>{
    // puedo usar los parametros de buscar aprendidos en mongo
    const notes= await Note.find().sort({date:'desc'}).lean()
    res.render('notes/allnotes', {notes})
    
})

module.exports =router;