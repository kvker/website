import { MongoClient, ServerApiVersion } from 'mongodb'

export class MongoDB {
  constructor(url = "mongodb://root:bcfn98pk@website-mongodb.ns-gtjec9cb.svc:27017", options = {}) {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    this.client = new MongoClient(url, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      ...options
    })
    this.run()
  }

  async run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect()
      // Send a ping to confirm a successful connection
      await this.client.db("admin").command({ ping: 1 })
      console.log("Pinged your deployment. You successfully connected to MongoDB!")
    } finally {
      // Ensures that the client will close when you finish/error
      // await this.client.close()
    }
  }
}

export const defaultMongoDB = new MongoDB()