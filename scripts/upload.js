import { defaultMongoDB } from "../services/mongodb.js"
import matter from 'gray-matter'
import { slugify } from '../utils/string.js'

const blogs = await defaultMongoDB.client.db("website").collection("blogs").find({}).toArray()
// console.log(blogs.length)
console.log(blogs[0])
// blogs.length = 1
// let index = 1
// for(const blog of blogs) {
//   const { data, content: markdown } = matter(blog.content)
//   // console.log(data)
//   const date = data.date
//   await defaultMongoDB.client.db("website").collection("blogs").updateOne({
//     _id: blog._id
//   }, {
//     $set: {
//       date
//     }
//   })
//   console.log(`${index++} / ${blogs.length}`)
// }
// const blog = await defaultMongoDB.client.db("website").collection("blogs").findOne({
//   content: {
//     $regex: "实现CSS Scroll Snap轮播组件"
//   }
// })
// console.log(blog)
// defaultMongoDB.client.db("website").collection("blogs").deleteOne({
//   content: {
//     $regex: "Docker 环境下"
//   }
// })
// console.log(blog)
// console.log(blog.content)

// console.log(blogs)
// blogs.length = 1
// const now = new Date()
// for(const blog of blogs) {
//   try {
//     await defaultMongoDB.client.db("website").collection("blogs").insertOne({
//       content: blog,
//       createdAt: now,
//       updatedAt: now,
//     })
//     console.log(`Uploaded blog successfully`)
//   } catch(error) {
//     console.error(error)
//   }
// }