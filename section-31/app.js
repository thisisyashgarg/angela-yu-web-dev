import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import path from 'path';
const __dirname = path.resolve();
import bodyParser from 'body-parser'
import mongoose from 'mongoose';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect(`mongodb+srv://yashgarg:${process.env.PASSWORD}@cluster0.fhdwxom.mongodb.net/wikiDB?retryWrites=true&w=majority`, (err) =>{
    console.log('db connected');
});

//article schema for database
const articleSchema = {
    title : String,
    content: String
}
const Article = new mongoose.model("Article", articleSchema);


//routing
app.get('/articles', (req, res) =>{
   Article.find((err, articles) =>{
    if(err){
        res.send(err);
    }
    res.send(articles);
   })
});

app.post('/articles', (req, res) =>{
    console.log(req.body.title);
    console.log(req.body.content);

    const newArticle = new Article({
        title: req.body.title,
        content : req.body.content
    });
    newArticle.save((data) => console.log(`${data} ADDED`));
    res.send('data added')

 });

app.listen(5002 , () => console.log('listening on 5002'));










