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
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const db = client.db("sportNest");

    const allFacilitiesCollection = db.collection("allFacilities");
    const bookingCollection = db.collection("booking");

    app.get("/all-facilities", async (req, res) => {
      const result = await allFacilitiesCollection.find().toArray();
      res.json(result);
    });

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

    app.get("/booking", async (req, res) => {
      const result = await bookingCollection.find().toArray();
      res.json(result);
    });

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
