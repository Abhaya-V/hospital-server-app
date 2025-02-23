const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());
const PORT = 4000;
const DATA_FILE = "./data/hospital.json";
let hospitals = [];

fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) throw err;
    hospitals = JSON.parse(data);
});

const writeData = () => {
    fs.writeFile(DATA_FILE, JSON.stringify(hospitals), "utf8", (err) => {
        if (err) throw err;
    });
};

//route starts
app.get("/", (req, res) => {
    res.json(hospitals);
});


app.post("/add", (req, res) => {
    const newHospital = req.body;
    hospitals.push(newHospital);
    writeData(); 
    res.json(hospitals);
});

app.put('/update/:index',(req,res) =>{
    const id = parseInt(req.params.index);
    if (id < 1 || id > hospitals.length ) {
        return res.json({ error: "Invalid index" });
    }
    hospitals.splice(id-1,1,req.body);  //splice(startIndex, deleteCount, itemToAdd)
    writeData();
    res.json(hospitals);
})

app.delete('/delete/:index', (req, res) => {
    const id = parseInt(req.params.index);
    if (id < 1 || id > hospitals.length) {
        return res.json({ error: "Invalid index" });
    }
    hospitals.splice(id - 1, 1);
    writeData();
    res.json(hospitals);
});


app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})