const express = require('express');
const cors = require('cors');
const Pets = require('./models/petModel');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:5173"
}));

// Routes/Endpoints
app.get("/pets", (req, res) => {
    Pets.getAll()
        .then((result) => {
            return res.json({pets: result.rows});
        });
});

app.get("/pet/:pet_id", (req, res) => {
    const {pet_id} = req.params;

    Pets.getOne([pet_id])
        .then((result) => {
            return res.status(200).json({pet: result.rows[0]});
        });
});

app.post("/new/pet", (req, res) => {
    const {name, species, breed, user_id} = req.body;

    if(!name || !species || !breed || !user_id){
        return res.status(400).json({message: "Please make sure to provide all fields!"});
    }

    Pets.createOne([name, species, breed, user_id])
        .then((result) => {
            return res.status(201).json({pet: result.rows[0]});
        });
});

app.delete("/delete/pet/:pet_id", (req, res) => {
    const {pet_id} = req.params;
    
    Pets.deleteOne([pet_id])
        .then((result) => {
            return res.status(204).end();
        });
});

app.put("/update/pet/:pet_id", (req, res) => {
    const {name, species, breed, user_id} = req.body;
    const {pet_id} = req.params;

    if(!name || !species || !breed || !user_id){
        return res.status(400).json({message: "Please make sure to provide all fields!"});
    }

    Pets.updateOne([pet_id, name, species, breed, user_id])
        .then((result) => {
            return res.status(200).json({pet: result.rows[0]});
        });
});


app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});