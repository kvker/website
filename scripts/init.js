import { defaultMongoDB } from "../services/mongodb.js"

// 创建blogs表  
defaultMongoDB.client.db("website").createCollection("blogs")