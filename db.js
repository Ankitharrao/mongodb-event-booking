const {MongoClient,ServerApiVersion} = require('mongodb');
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
    await client.close();
  }
}
run().catch(console.dir);

async function setUpProfessorCollection(){
    const database = client.db('college');
    const professors = database.createCollection('professors')
    .then(() => {
        console.log("Professor collection created successfully");
    })
    .catch((err) => {
        console.error("Error creating professor collection:", err);
    });
}
//setUpProfessorCollection();

async function addProfessor(){
    const database = client.db('college');
    const profCollection = database.collection('professors')
    await profCollection.insertMany([{
        "name": "Ankitha R Rao",
        "email":"ankitha@gmail.com",
        "age":20,
        "salary": 900000,
        "department": "Computer Science",
        "phone":"9876543210"
    },
    {
        "name": "Anitha R",
        "email":"anitha@gmail.com",
        "age":25,
        "salary": 500000,
        "department": "Computer Science",
        "phone":"9876543222"
    },
    {
        "name": "Ankith",
        "email":"ankith@gmail.com",
        "age":22,
        "salary": 90000,
        "department": "Aiml",
        "phone":"9876543333"
    },
    {
        "name": "Anusha",
        "email":"anusha@gmail.com",
        "age":22,
        "salary": 95000,
        "department": "Computer Science",
        "phone":"9876444210"
    },
])
    .then(() => {
        console.log("Professor inserted successfully");
    })
    .catch((err) => {
        console.error("Error inserting professor :", err);
    });
}
//addProfessor();
async function professorsList(){
    const database = client.db('college');
    const profCollection = database.collection('professors')
    //const data = await profCollection.updateOne({"name":"Ankitha R Rao"},{ $set:{"salary":1000000}}) 
    const data = await profCollection.find({"department":"Computer Science"}).toArray();
    
    console.log(data);


}
professorsList();