const express=require('express');
const app=express();
const path=require('path');
app.use(express.urlencoded({ extended: true }));
const mongoose=require('mongoose');
app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname, 'api.html'));
});
app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname, 'api.html'));
});
mongoose.connect('mongodb://localhost:27017/ndata').then(()=>{
    console.log("mongoDB connected...")
})
const schema=new mongoose.Schema({
    name:String
})
const User=mongoose.model('User',schema)
app.post('/register', async (req, res) => {
    const { name } = req.body;
    
    if (name) {
        try {
            const data = new User({ name });
            await data.save(); // Save the user to the database
            res.status(201).send(`${name} is saved`);
        } catch (error) {
            res.status(500).send('Error saving the user');
        }
    } else {
        res.status(400).send('Name is required');
    }
});
app.post('/login',(req,res)=>{
    const {name}=req.body;
    const user=User.findOne({name});
    if(user.name==name){
        res.send(`${name} is Loggedin and ${name}  ic chnaged to jui`);
    }
    else{
        res.send('try again')
    }
})
app.listen(3000,(req,res)=>{
    console.log("server listen on 3000")
});
