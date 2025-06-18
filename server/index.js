const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const UserModel = require('./models/Users')
const PORT = process.env.PORT || 3003
const mongoURI = process.env.MONGO_URI
const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect(mongoURI)
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.log("MongoDB connection error:", err));

app.get("/", (req,res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.get('/getUser/:id', (req,res)=>{
    const id = req.params.id
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
},)

app.put('/updateUser/:id', (req,res) =>{
    const id = req.params.id
    UserModel.findByIdAndUpdate({_id : id}, {
        name : req.body.name,
        email: req.body.email,
        age: req.body.age },
            {new : true})
        .then(users => res.json(users))
        .catch(err => res.json(err))
   
})

app.delete ('/deleteUser/:id',(req,res) =>{
    const id = req.params.id
    UserModel.findByIdAndDelete({_id : id})
    .then(() => res.json({message : "user deleted successfully"}))
    .catch(err => res.json(err))
})
app.post("/createUser", (req,res) => {
    UserModel.create(req.body)
    .then(users => res.json({message : "users created successfully",
        user : users
    }))
    .catch(err => res.json(err))
})



app.listen(PORT,() =>{
    console.log("server is up n ready")
})