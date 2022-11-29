import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import path from 'path';
const __dirname = path.resolve();
import bodyParser from 'body-parser'
import mongoose from 'mongoose';


const app = express();
app.listen(3002 , () => console.log('listenig on 3002'));
await mongoose.connect("mongodb+srv://yashgarg:yashgarg@cluster0.fhdwxom.mongodb.net/wikiDB?retryWrites=true&w=majority", () =>{
    console.log('db connected')
})

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) =>{
 res.send('hi');
});









