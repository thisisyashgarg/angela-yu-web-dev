import mongoose, { mongo } from "mongoose";
const databaseName = 'angela';

mongoose.connect(`mongodb+srv://yashkgarg:<>>@cluster0.32wetmu.mongodb.net/${databaseName}?retryWrites=true&w=majority`)
.then(() => console.log('db connected'))
.catch(error => console.log(error));

const fruitSchema  = new mongoose.Schema ({
    name : String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model('Fruit', fruitSchema);
const apple = new Fruit({
    name : "apple",
    rating: 5,
    review: "sour"
})
const pineapple = new Fruit({
    name : "pineapple",
    rating: 5,
    review: "sour"
})


const carSchema  = new mongoose.Schema ({
    name : {
        type: String,
        required: [true, "add a name"]
    },
    HP:{
        type: Number,
        min: 500,
        max: 1500
    },
    color: String
});

const Car = new mongoose.model('Car', carSchema)
const car = new Car({
    name : "mycar",
    HP: 1200,
    color: "red",
    favFruitOfDriver: pineapple,
})


// await pineapple.save()
// .then(()=> console.log('data added'))
// .catch((err) => console.log(err))


await car.save()
.then((data) => console.log(`${data} ADDED`))
.catch((err) => console.log(err))

// lambo.save((err, data) =>{
//     if(err){
//         console.err('err');
//     }
//     console.log(`${data} added`);
// })



export {carSchema, Car , fruitSchema, Fruit};