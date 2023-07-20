import mongoose from "mongoose";    

mongoose.connect('mongodb://127.0.0.1:27017/guiaperguntas', {
    
}).then(() => {
    console.log('Connected to mongoDB')
}).catch((err) => {
    console.log('Error connecting to mongoDB', err)
});