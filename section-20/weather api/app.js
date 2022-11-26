import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import path from 'path';
const __dirname = path.resolve();
import bodyParser from 'body-parser'
import axios from 'axios'

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) =>{
 res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) =>{
const units = 'metric';
const uri = "https://api.openweathermap.org/data/2.5/weather?q=" + req.body.cityName + "&units=" + units + "&appid=" + process.env.APIKEY +"" ;

axios(uri)
.then((response) => {
    const iconElement = response.data.weather[0].icon;
    const weatherDescription = response.data.weather[0].description;
    const cityName = response.data.name;
    const temperature = response.data.main.temp;
    const imageURL = 'http://openweathermap.org/img/wn/' + iconElement + '@2x.png';
    res.send(
        `<h1>The weather condition is ${weatherDescription}<h1/>
         <h2>The temperature of ${cityName} is ${temperature} degree celsius<h2/>
         <img src = ${imageURL} >`
    );
})
.catch((err) => res.send("<h1> 404 Error - Something went wrong - Please try again"));
    
});


app.listen(3000, () => console.log('listening on 3000'));