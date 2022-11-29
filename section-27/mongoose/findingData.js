import mongoose from "mongoose";
const databaseName = 'angela';

import { Car, Fruit} from './addingData.js'

mongoose.connect(`mongodb+srv://yashkgarg:<>@cluster0.32wetmu.mongodb.net/${databaseName}?retryWrites=true&w=majority`)
.then(() => console.log('db connected'))
.catch(error => console.log(error));

// Car.find((err, data) =>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         for(let i=0; i < data.length; i++){
//             console.log(data[i].name);
//         } 
//     }
// })

Fruit.find((err, data) =>{
    if(err){
        console.log(err);
    }
    console.log(data);
})

