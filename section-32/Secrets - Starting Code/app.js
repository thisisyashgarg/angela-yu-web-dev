import express from "express";
import dotenv from 'dotenv'
dotenv.config();
import bodyParser from "body-parser";
import mongoose from "mongoose";
// import encrypt from "mongoose-encryption";  //level 2 encryption
// import md5 from 'md5'
import bcrypt from 'bcrypt'
import session from 'express-session'
import passport from 'passport'
import passportLocalMongoose from 'passport-local-mongoose'
const saltRounds = 10;
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: false
})); //session started
app.use(passport.initialize()); //starting passport
app.use(passport.session()); //starting session with passport

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

//for passport local mongoose
userSchema.plugin(passportLocalMongoose);

//encryption - level 2
// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });
//encryption - level 2

const User = mongoose.model('Users', userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser()); // turn data into cookie
passport.deserializeUser(User.deserializeUser()); // turn cookie into data

////////////////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
    res.render('home.ejs');
});
///////////////////////////////////////////////////////////////////////////

app.route('/login')
.get((req, res) => {
    res.render('login.ejs')
})
.post((req, res) =>{
   //level 3 - hashing
//    User.findOne({email: req.body.username }, (err, foundUser) =>{
//       if(err){
//         res.send(err);
//       } else{
//         if(foundUser){
//             bcrypt.compare(req.body.password, foundUser.password,(err, result) => {
//                 if(result === true){
//                     res.render('secrets.ejs')
//                 }
//                 res.send(`Something went wrong: ${err}`)
//             });
//         } 
//       }
//    })

    const user = new User({
        username : req.body.username,
        password: req.body.password
    }) 
    req.login(user, function(err) {
        if (err) {
            console.log(err);
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/secrets');
         })
      })
});

 ///////////////////////////////////////////////////////////////////////////
app.route('/register')
.get((req, res) => {
    res.render('register.ejs');
})
.post((req, res) => {
//  bcrypt.hash(req.body.password, saltRounds)
//  .then(function(hash) {
//     const newUser = new User({
//         email: req.body.username,
//         password: hash 
//     });
//     newUser.save(() =>{
//         res.render('secrets.ejs');
//     })
//  })
//  .catch((err) => res.send(`Something went wrong: ${err}`))

   User.register({username: req.body.username}, req.body.password, (err, userData) =>{
     if(err){
        console.log(err);
     }
     passport.authenticate('local')(req, res, () => {
        res.redirect('/secrets')
     })
   } )
});
///////////////////////////////////////////////////////////////////////////

app.get('/secrets', (req, res) =>{
   if(req.isAuthenticated){
    return res.render('secrets.ejs')
   }
   res.redirect('/login')
});

///////////////////////////////////////////////////////////////////////////

app.get('/logout', (req, res) => {
    req.logout((err) =>{
        if(err){
            console.log(err)
        }
        res.redirect('/')
    });
});




app.listen(4000, () =>{
    console.log('listening on 4000')
});


