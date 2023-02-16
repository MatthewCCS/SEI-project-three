import express from 'express'
import mongoose from 'mongoose'
import router from './config/router.js'
import 'dotenv/config'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const logger = (req, res, next) => { 
  console.log(`Incoming request on ${req.method} - ${req.url} `)
  next()
}

const startServer = async () => { 
  const app = express()


  app.use(logger)
  app.use(express.json())
  //router
  app.use('/api', router)

  app.use(express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

  await mongoose.connect(process.env.DB_URI)
  app.listen(process.env.PORT, () => console.log(`connected to MongoDB
  PORT listening on Port ${process.env.PORT}`))
}

startServer()