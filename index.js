const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.MONGO_URI;

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
   maxPoolSize: 10,
  minPoolSize: 1,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    // creating database
    const db = client.db("sportNest");


    // creating a collection for all facilities
    const allFacilitiesCollection = db.collection("allFacilities");

    // creating a collection for booking
    const bookingCollection = db.collection("booking");

    // creating a api for get all data
    app.get("/all-facilities", async (req, res) => {
      const result = await allFacilitiesCollection.find().toArray();
      res.json(result);
    });

    // creating a api for get all data from all facility
    app.get("/all-facilities/:id", async (req, res) => {
      const { id } = req.params;
      const result = await allFacilitiesCollection.findOne({
        _id: new ObjectId(id),
      });
      res.json(result);
    });

    app.post("/booking", async (req, res) => {
      const bookingData = req.body;
      const result = await bookingCollection.insertOne(bookingData);
      res.json(result);
    });

    app.post("/all-facilities", async(req, res) => {
      const newFacilityInfo = req.body;
      const result = await allFacilitiesCollection.insertOne(newFacilityInfo);
      res.json(result);
    })

    app.get("/my-facilities/:userEmail", async(req, res) => {
      const { userEmail } = req.params;
      const result = await allFacilitiesCollection.find({ownerEmail: { $eq: userEmail}}).toArray()
      res.json(result);
    })

    app.delete("/all-facilities/:id", async (req, res) => {
      const { id } = req.params;

      const result = await allFacilitiesCollection.deleteOne({
        _id: new ObjectId(id),
      });

      res.json(result);
    });

    // app.patch("/all-facilities/:id", async(req, res) => {
    //   const {id} = req.params;
    //   const result = await allFacilitiesCollection.updateOne({ _id: id });
    //   res.json(result);
    // });



  app.patch("/all-facilities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await allFacilitiesCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: updatedData,
      }
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





















    app.get("/booking/:id", async (req, res) => {
     const { id } = req.params;
     const result = await bookingCollection.find({userId: { $eq: id}}).toArray()
     res.json(result);
   });

  // app.get("/booking", async (req, res) => {
  //   const result = await bookingCollection.find().toArray()
  //   res.json(result);
  // })
    

      


  // creating a api for delete one data
    app.delete("/booking/:id", async (req, res) => {
      const { id } = req.params;

      const result = await bookingCollection.deleteOne({
        _id: id,
      });

      res.json(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("SPORT NEST SERVER IS RUNNING");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
