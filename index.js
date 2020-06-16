const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

let studentData = [];
let mentorData = [];

app.get("/",(req,res)=>{
    if(studentData.length == 0){
        res.status(404).json({
            message:"no students found"
        })
    }else{
        res.status(200).json(studentData)
    }
})

app.post('/student', (req, res) => {
    if(req.body.name){
        studentData.push({
            "id" : studentData.length+1,
            "name": req.body.name,
            "college": req.body.college,
            "email":req.body.email,
            "mentor":""
        })
        res.status(200).json({
        "message": "Student Added"
    });
    }else{
        res.status(400).json({
            "message": "Pls pass All information"
        });
    }
    
});

app.post('/mentor', (req, res) => {
    if(req.body.name){
        mentorData.push({
            "id" : mentorData.length+1,
            "name": req.body.name,
            "email":req.body.email,
            "students":[]
        })
        res.status(200).json({
        "message": "Mentor Added"
    });
    }else{
        res.status(400).json({
            "message": "Pls pass All information"
        });
    }
});
app.get('/mentorList',(req,res)=>{
    if(mentorData.length == 0){
        res.status(404).json({
            message:"no data found"
        })
    }else{
        res.status(200).json(mentorData)
    }
})

app.get("/student/:id",(req,res)=>{
    let data = studentData.filter((student)=>{
        return student.id == req.params.id
    })
    res.json(data[0]);
})

app.put("/student/:id",(req,res)=>{
    studentData.forEach((item)=>{
        if(item.id == req.params.id){
            item.mentor = req.body.mentor
        }
    })
})

app.post('/mentorUpdate', (req, res) => {
    res.json({
        "message":"update success"
    })
})


app.listen(process.env.PORT ||3000, ()=>{
    console.log("App listening in port 3000")
})