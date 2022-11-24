import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import path from 'path';
const __dirname = path.resolve();
import bodyParser from 'body-parser'
import fetch from 'node-fetch'


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) =>{
 res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) =>{
const city = req.body.cityName;
const key = process.env.APIKEY;
const units = 'metric';
const uri = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + units + "&appid=" + key +"" ; 
const weatherData = fetch(uri)
.then((data) => data.json())
.then((data) => {
    console.log(data.main.temp);
    console.log(data.weather[0].description);
    const imageURL = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
    res.write(`<p>The weather condition is ${data.weather[0].description}<p/>`)
    res.write(`<h1>The temperature of ${data.name} is ${data.main.temp} degree celsius<h1/>`)
    res.write("<img src = " + imageURL+ " >")
    res.send();
});
    
});






app.listen(3000, () => console.log('listening on 3000'));