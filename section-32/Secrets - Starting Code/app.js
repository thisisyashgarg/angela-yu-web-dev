import express from "express";
import dotenv from 'dotenv'
dotenv.config();
import bodyParser from "body-parser";
import mongoose from "mongoose";
// import encrypt from "mongoose-encryption";  //level 2 encryption
import md5 from 'md5'

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect(`mongodb+srv://yashgarg:${process.env.PASSWORD}@cluster0.fhdwxom.mongodb.net/userDB?retryWrites=true&w=majority`, (err) =>{
    if(err){
        res.send(`Something went wrong: ${err}`);
    }
    console.log('db connected');
});

const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});

//encryption - level 2
// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });
//encryption - level 2

const User = mongoose.model('Users', userSchema);

app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.route('/login')
.get((req, res) => {
    res.render('login.ejs');
})
.post((req, res) =>{
   //level 3 - hashing
   User.findOne({email: req.body.username }, (err, foundUser) =>{
      if(err){
        res.send(err);
      } else{
        if(foundUser){
            if(foundUser.password === md5(req.body.password)){
                res.render('secrets.ejs')
            }
        } 
      }
   })
});


app.route('/register')
.get((req, res) => {
    res.render('register.ejs');
})
.post((req, res) => {
    const newUser = new User({
        email: req.body.username,
        password: md5(req.body.password)
    });
    newUser.save((err) =>{
        if(err){
            console.log(err);
            res.send(err);
        }
        res.render('secrets.ejs');
    })
});






app.listen(4000, () =>{
    console.log('listening on 4000')
})


