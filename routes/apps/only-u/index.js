import express from 'express'
import { defaultMongoDB } from '../../../services/mongodb.js'

const router = express.Router()

const mongodb = defaultMongoDB.client.db('website')

router.get('/engines', async (req, res, next) => {
  const data = await mongodb.collection('engines').find({}).toArray()
  res.json({
    success: true,
    data
  })
})

export default router