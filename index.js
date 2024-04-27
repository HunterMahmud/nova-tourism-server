const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config()

const port = process.env.PORT || 5000;

const app = express();

//middle ware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9wkdqn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
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
      const spotCollection = client.db("spotDB").collection("spots");
      const userCollection = client.db("usersDB").collection("users");

      //user related apis
      app.post('/users', async(req, res)=>{
        const info = req.body;
        const result = await userCollection.insertOne(info)
        res.send(result)
      })

      // spotDB realted apis
      app.post('/addSpot',async(req, res)=> {
        const spotInfo = req.body;
        const result = await spotCollection.insertOne(spotInfo);
        res.send(result);
      })
      app.get('/allSpot', async(req, res)=>{
        const cursor = spotCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      })
      app.get('/allSpot/:id', async(req, res)=>{
        const id = req.params.id;
        // console.log(id);
        const query = {_id: new ObjectId(id)};
        const result = await spotCollection.findOne(query);

        res.send(result);
      })
      app.get('/mylist/:email', async(req, res)=>{
        const email = req.params.email;
        // console.log(email);
        const query = {email:email};
        const cursor =  spotCollection.find(query);
        const result = await cursor.toArray();

        res.send(result);
        
      })
      app.get('/countrySpot', async(req, res)=> {
        const pipeline = [
          {
            $group: {
              _id: "$countryName",
              spot: { $first: "$$ROOT" }
            }
          },
          {
            $replaceRoot: { newRoot: "$spot" }
          }
        ];
        const cursor = spotCollection.aggregate(pipeline);
        const result = await cursor.toArray();
        res.send(result);
      })
      app.patch('/update/:id', async(req, res)=>{
        const id = req.params.id;
        const info = req.body;
        const query = {_id:new ObjectId(id)};
        const updateInfo = {
          $set:{
            ...info
          }
        }
        const result = await spotCollection.updateOne(query, updateInfo);
        res.send(result);
      })
     
      app.delete('/deleteSpot/:id', async(req, res)=> {
        const id = req.params.id;
        // console.log(id);
        const query = {_id: new ObjectId(id)};
        const result = await spotCollection.deleteOne(query);
        res.send(result);
      })
      
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);
app.get('/', (req, res)=>{
    res.send("nova tourism server is running");
})


app.listen(port, ()=>{
    console.log(`server is running on port:${port}`);
})