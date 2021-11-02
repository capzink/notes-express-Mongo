const mongoose=require('mongoose')

//conectar mongoose funcionamineto biblioteca
mongoose.connect('mongodb://localhost/notes-db-app')

.then(db=>console.log('DB is connected'))
.catch(err=>console.error(err))