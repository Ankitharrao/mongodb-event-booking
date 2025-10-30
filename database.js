const { MongoClient, ServerApiVersion } = require('mongodb');
//const dburl = "mongodb+srv://harshini:harshini@cluster0.dh5pg.mongodb.net/?appName=Cluster0"
const dbUrl = "mongodb+srv://ankitharrao5:RJP3YLRXJZelAfUk@cluster0.3hnidgx.mongodb.net/?appName=Cluster0"
const client = new MongoClient(dburl, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    await setupProfessorCollection();
    await addProfessor();
    await professorList();
  } catch (error) {
    console.log(error);
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

async function setupProfessorCollection() {
  const database = client.db('college');
  await database.createCollection('professors').catch(() => {}); // ignore if exists
}

async function addProfessor() {
  const database = client.db('college');
  const profCollection = database.collection('professors');
  await profCollection.insertMany([
    {
      "name": "alice",
      "email": "alice@gmail.com",
      "age": 20,
      "salary": 1000,
      "dept": "cse",
      "phone": "1234346789"
    },
    {
      "name": "bob",
      "email": "bob@gmail.com",
      "age": 27,
      "salary": 10000,
      "dept": "cse",
      "phone": "1234636789"
    }
  ])
  .then(() => { console.log('executed'); })
  .catch((error) => { console.log('error', error); });
}

async function professorList() {
  const database = client.db('college');
  const profCollection = database.collection('professors');
// //   const data = await profCollection.findOne({ 'name': 'harshini' });
// const data=await profCollection.find({'salary':{$lt:30000}}).toArray() //lt=lesser than or eual to, gt=greater than or euqual to
//   console.log(data);
const data = await profCollection.updateOne({"name":'hafrsh'},
    {
        $set:{salary:80000}
    });

//   $or: [
//     { 'salary': { $gt: 10000 } },
//     { 'age': { $lt: 30 } }
//   ]
// }).toArray();
console.log(data);
}

professorList();