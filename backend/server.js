import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import characterRoutes from './routes/characters.js'
import mongoose from 'mongoose'

// initiate express
const app = express()

// Middleware
app.use(express.json())
app.use((req, res, next) => {
  // console.log(req?.path, req?.method)
  next()
})
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

// Routes
app.use('/api/characters', characterRoutes)

// Connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen on port 3000
    app.listen(process.env.PORT || 3000, () => {
      console.log('Connected to DB')
      console.log('Listening on port 3000')
    })
  })
  .catch((err) => console.log(err))
