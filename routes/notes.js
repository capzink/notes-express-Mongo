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

//ruta para editar nota

router.get('/notes/edit/:id', async (req,res)=>{
   const enote= await Note.findById(req.params.id).lean()
    res.render('notes/edited-notes', {enote})
})
//edited notes route

router.put('/notes/edited-notes/:id', async (req,res)=>{
    const{title, description}=req.body;
        await Note.findByIdAndUpdate(req.params.id, {title, description}).lean()
        res.redirect('/notes')
})

router.delete('/notes/delete/:id',async (req,res)=>{
    await Note.findByIdAndDelete(req.params.id)
    res.redirect('/notes')

})

module.exports =router;