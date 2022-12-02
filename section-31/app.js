import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import ejs from 'ejs'
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

//////////////////////////////////////////////////////ARTICLES
app.route('/articles')
.get((req, res) =>{
    Article.find((err, articles) =>{
     if(err){
         res.send(err);
     }
     res.send(articles);
    })
 })
.post((req, res) =>{
    const newArticle = new Article({
        title: req.body.title,
        content : req.body.content
    });
    newArticle.save((err) => {
        if(!err){
            console.log(`DATA ADDED`);
            res.send('data added');
        }
    });
 })
.delete((req, res) =>{
    Article.deleteMany(function (err) {
        if(!err){
            res.send('Succesfully deleted all articles')
        }
        res.send(err);
    })
 });
 

//////////////////////////////////////////////////////ARTICLES/YASHGARG

app.route('/articles/:articleTitle')
.get((req, res) =>{
    Article.findOne({title: req.params.articleTitle}, (err, foundArticle) => {
        if(err){
        res.send("No articles matching the given title");
        }
        res.send(foundArticle);
    })
})
.put((req, res) => {
    Article.updateOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {override: true},
        (err) =>{
           if(!err){
            res.send("article updated successfully")
           }
           res.send(err)
        }
    )
})
.patch((req, res) => {
    Article.updateOne(
        {title: req.params.articleTitle},
        {$set: req.body},
        (err) =>{
           if(!err){
            res.send("article updated successfully")
           }
           res.send(err)
        }
    );
})
.delete((req, res) =>{
    Article.deleteOne({title: req.params.articleTitle}, function (err) {
        if(!err){
            res.send('Succesfully deleted the article')
        }
        res.send(err);
    })
});



app.listen(5002 , () => console.log('listening on 5002'));










