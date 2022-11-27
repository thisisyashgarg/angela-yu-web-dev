import mongoose from "mongoose";
const databaseName = 'angela';

import { Car, Fruit} from './addingData.js'

await mongoose.connect(`mongodb+srv://yashkgarg:yashkgarg@cluster0.32wetmu.mongodb.net/${databaseName}?retryWrites=true&w=majority`)
.then(() => console.log('db connected'))
.catch(error => console.log(error));

//updating
// Car.updateOne({_id: '63837b9a791fd10c1ecfdd22'}, {name: "aston"}, (err) =>{
//     if(err){console.log(err)}
//     console.log("Updated Succesfully")
// })

//deleting
// Car.deleteOne({name: "aston"}, (err) =>{
//     if(err){console.log(err)}
//     console.log("Deleted Succesfully")
// })

//deleting many 
Fruit.deleteMany({name: "apple"}, (err) =>{
    if(err){
        console.log(err);
    }
    console.log("deleted succesfully")
})