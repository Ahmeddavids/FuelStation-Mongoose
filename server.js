const express = require("express");
const mongoose = require("mongoose");
const port = 8080;
const app = express();
app.use(express.json());

// create a schema first
const fuelSchema = new mongoose.Schema({
    name: String,
age: Number,
gender: String,
isMarried: Boolean}
)
// create a model
const user = mongoose.model("fuelstation", fuelSchema)

// Entry point
app.get("/", (req, res) => {
    res.status(200).json("welcome to my page")
})

// Creating a data in our database
app.post("/createuser", async (req, res) => {
    const newResult = await new user(req.body)
    newResult.save()
    res.status(200).json(newResult)
})

// Retrieving all data
app.get("/getall", async (req, res) => {
    const all = await user.find()
    res.status(200).json({
        message: `The available users are ${all.length}`,
        data: all
    })
})

// Retrieve a single user

app.get("/getone/:id", async (req, res) => {
    const id = req.params.id
    const oneUser = await user.findById(id)
    res.status(200).json({
        message: `Kindly find the information of the user with id: ${id}`,
        data: oneUser
    })
})

// delete a single user
app.delete("/deleteone/:id", async (req, res) => {
    const id = req.params.id
    const deletedUser = await user.findByIdAndDelete(id)
    res.status(200).json({
        message: `The information of the user with id: ${id} has been deleted`,
        data: deletedUser
    })
})

// updating a user
app.put("/updateuser/:id", async (req, res) => {
    try{
        const id = req.params.id
        const newDetails = req.body
        const updatedUser = await user.findByIdAndUpdate(id, newDetails)
        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser
        })
    } catch(e){
        res.status(500).json({
            message: e.message
        })
    }
})


mongoose.connect("mongodb+srv://ahmeddavids6:inVAYhAFF127ZCMc@cluster0.kj2eqwu.mongodb.net/").then(()=>{
    console.log(`connection to database is successful`);
})

app.listen(port, () => {
    console.log(`server is listening to ${port}`);
})