const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const Dish = require('./Dishes');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect('mongodb+srv://ayush221b:ayush221b@cluster0.llzzb.mongodb.net/dishes?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  )
.then(() => console.log('mongoDB connected...'));


app.get('/dish/find',async(req,res)=>{
  const dish = await Dish.find();
  res.json(dish);
})

app.get('/dish/:name',async(req,res)=>{
   const { name } = req.params
   const dish = await Dish.find({dishName:name})
   res.json(dish)
})
app.put('/update/:id',async(req,res)=>{
 const{id} = req.params;
 const dish = await Dish.findOne({_id:id})
 dish.dishName = req.body.dishName;
 dish.ingredients = req.body.ingredients;
 await dish.save()
 res.json(dish)
})

app.post('/createDish',async(req,res)=>{
   try{
    const { dishName, ingredients } = req.body;
   
    const newDish = await Dish.create({ dishName, ingredients });

   
    res.json(newDish)
   }catch(err){
    console.log(err)
    res.json(err)
   }

    
})








app.listen(8800,()=>{
    console.log('server started listening on 8800')
})