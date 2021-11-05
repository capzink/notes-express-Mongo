const router =require('express').Router();

const Note = require('../models/mdnote')

//helper
const{isAuthenticated} =require('../helpers/auth')

//pagina de formulario para nueva nota
router.get('/notes/add',isAuthenticated, (req,res)=>{
    res.render('notes/newnote')
})


//tomo los datos del formualrio
router.post('/notes/newnote',isAuthenticated,async (req,res)=>{
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
        res.render('notes/newnote',isAuthenticated, {errors,title,description});
    }
    // model de creacion para mongoDb
    else{
    const newNo= new Note({title, description})
    await newNo.save();
    req.flash('success_msg', "Note added")
    res.redirect('/notes')
    }
})

//entrega o puedo consultar lo de la base de datos luego de almacenarlo
router.get('/notes',isAuthenticated,async (req,res)=>{
    // puedo usar los parametros de buscar aprendidos en mongo
    const notes= await Note.find().sort({date:'desc'}).lean()
    res.render('notes/allnotes', {notes})
    
})

//ruta para editar nota

router.get('/notes/edit/:id',isAuthenticated, async (req,res)=>{
   const enote= await Note.findById(req.params.id).lean()
    res.render('notes/edited-notes', {enote})
})
//edited notes route

router.put('/notes/edited-notes/:id', isAuthenticated,async (req,res)=>{
    const{title, description}=req.body;
        await Note.findByIdAndUpdate(req.params.id, {title, description}).lean()
        req.flash('success_msg', "Note Updated")
        res.redirect('/notes')
})

//delete a note

router.delete('/notes/delete/:id',isAuthenticated,async (req,res)=>{
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg', "Note Deleted")
    res.redirect('/notes')

})

module.exports =router;