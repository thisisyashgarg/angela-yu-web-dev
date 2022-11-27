import express from 'express';
import fetch from 'node-fetch'
const app = express();
app.listen(3000);
await fetch('https://v2.jokeapi.dev/joke/Programming')
.then((res) => res.json())
.then((json) => console.log(json.joke))
.catch((err) => console.log(err.message))




