const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

//Connect to mongoose
mongoose.connect('mongodb+srv://PortfolioWebsite:PortfolioWebsite@cluster0.ffp6w8h.mongodb.net/', {
  UseNewUrlParser: true,
  UseUnifiedTopology: true,
})
.then(()=>console.log('Connected to MongoDB'))
.catch((err)=>console.error('MongoDB Connection error:',err))

const contactSchema = new mongoose.Schema({
   name: String,
   email: String,
   message: String,
},{timestamps:true}); //timestamps will add createdAt and updatedAt fields

const Contact = mongoose.model('Contact', contactSchema);

const app = express();
const PORT = 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Basic route to check server is running
app.get('/',(req,res)=>{
   res.send('Server is running...')
});

//Route to handle contact form data
app.post('/contact',async(req,res)=>{
   const {name,email,message} = req.body;
   try{
      const newContact = new Contact({name,email,message});
      await newContact.save(); //Save to database

   res.json({message:'Message received successfully'});
   }
   catch(error){
      console.error('Error saving contact message:',error);
      res.status(500).json({message:'Something went wrong. Please try again later'})
   }
});

//Start the server
app.listen(PORT,()=>{
   console.log(`Server is listening on http://localhost:${PORT}`);
});