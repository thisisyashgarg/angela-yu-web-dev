import express from 'express';
import bodyParser from 'body-parser'
import path from 'path';
const __dirname = path.resolve();
const app = express();

app.listen(3000);
app.use(bodyParser.urlencoded({extended: true}));
//url encoded turns html form into readable form

app.get('/', (req, res) => {
   res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
    console.log(req.body); // use to get input that user has entered
    res.send(`Your BMI is ${req.body.weight/(req.body.height * req.body.height)}`);
 });

