import express from "express";
import bodyParser from "body-parser";
import ejs from 'ejs'
import mongoose from "mongoose";

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect(`mongodb+srv://yashgarg:yashgarg@cluster0.fhdwxom.mongodb.net/userDB?retryWrites=true&w=majority`, (err) =>{
    if(err){
        res.send(`Something went wrong: ${err}`);
    }
    console.log('db connected');
});

const userSchema = {
    email: String,
    passowrd: String
}
const User = mongoose.model('Users', userSchema);

app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.route('/login')
.get((req, res) => {
    res.render('login.ejs');
})
.post((req, res) =>{
   User.findOne({email: req.body.username }, (err, foundUser) =>{
      if(err){
        res.send('user not found');
      } else{
        if(foundUser){
            if(foundUser.passowrd === req.body.passowrd){
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
        passowrd: req.body.passowrd
    });
    newUser.save((err) =>{
        if(err){
            console.log(err);
            res.send(err);
        }
        res.render('secrets.ejs');
    })
})






app.listen(4000, () =>{
    console.log('listening on 4000')
})


