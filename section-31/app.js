import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import path from 'path';
const __dirname = path.resolve();
import bodyParser from 'body-parser'
import mongoose from 'mongoose';


const app = express();
app.listen(3002 , () => console.log('listenig on 3002'));
app.use(bodyParser.urlencoded({extended: true}));
await mongoose.connect(`mongodb+srv://yashgarg:${process.env.PASSWORD}@cluster0.fhdwxom.mongodb.net/wikiDB?retryWrites=true&w=majority`, () =>{
    console.log('db connected')
});

//article schema for database
const articleSchema = {
    title : String,
    content: String
}
const Article = new mongoose.model("Article", articleSchema);


app.get('/', (req, res) =>{
 res.send('hi');
});








