const {MongoClient,ServerApiVersion} = require('mongodb');
const express =require('express');
const app= express();
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();
const dbUrl= process.env.DB_URL;




const client = new MongoClient(dbUrl, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


//POST booking
app.post('/api/bookings',async (req,res)=>{
    const {email,name,event,ticketType,date}=req.body;
    if(!email || !name || !event){
        return res.status(400).send('email event and name are required');
    }
    res.send('Booking received')
    const database = client.db('eventbooking');
    const bookings = database.collection('bookings');
    await bookings.insertOne({
        email,
        name,
        event,
        ticketType,
        createdAt: date? new Date(date):new Date()
    });
})
//GET all bookings
app.get('/api/bookings',async (req,res)=>{
    const database= client.db('eventbooking');
    const bookings= database.collection('bookings');
    const allBookings= await bookings.find({}).toArray();
    res.json(allBookings);
})
//getting booking by id
app.get('/api/bookings/:id',async (req,res)=>{
    const bookingId= req.params.id;
    const database = client.db('eventbooking');
    const bookings = database.collection('bookings');
    const { ObjectId } = require('mongodb');
    const booking = await bookings.findOne({ _id: new ObjectId(bookingId) });
    if(!booking){
        return res.status(404).send('Booking not found');
    }
    res.json(booking);
})
//update participant details 
app.put('/api/bookings/:id',async (req,res)=>{
    const bookingId = req.params.id;
    const {email,name,event,ticketType,date}=req.body;
    const database = client.db('eventbooking');
    const bookings = database.collection('bookings');
    const { ObjectId } = require('mongodb');
    const result = await bookings.updateOne(
        { _id:new ObjectId(bookingId) },
        { $set: { email, name, event, ticketType, bookingDate: new Date(date) } }
    );
    if(result.matchedCount===0){
        return res.status(404).send('Booking not found');
    }
    res.send('Booking updated successfully');
})
//delete booking
app.delete('/api/bookings/:id',async (req,res)=>{
    const bookingId = req.params.id;
    const database = client.db('eventbooking');
    const bookings = database.collection('bookings');
    const { ObjectId } = require('mongodb');
    const result = await bookings.deleteOne({ _id:new ObjectId(bookingId) });
    if(result.deletedCount===0){
        return res.status(404).send('Booking not found');
    }
    res.send('Booking deleted successfully');
})
//search bookings by email
app.get('/api/bookings/search/:email',async (req,res)=>{
    const email = req.params.email;
    const database = client.db('eventbooking');
    const bookings = database.collection('bookings');
    const results = await bookings.find({ email: email }).toArray();
    res.json(results);
})
//filering based on event type
app.get('/api/bookings/event/:event',async (req,res)=>{
    const event = req.params.event;
    const database = client.db('eventbooking');
    const bookings = database.collection('bookings');
    const results = await bookings.find({ event: event }).toArray();
    res.json(results);
})

app.listen(9001,()=>{
    console.log('server live')
});
/*{
    "name":"Ankitha",
    "email":"ankitha@gmail.com",
    "event":"dance",
    "date":"2025-11-05",
    "ticketType":"general"
}*/