
const mongoose=require('mongoose')

//conectar mongoose funcionamineto biblioteca
const connectDB = (url) => {
  return mongoose.connect(url, {
   
  });
};
module.exports = connectDB;