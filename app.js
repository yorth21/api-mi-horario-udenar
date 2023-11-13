import express, { json } from 'express'
import 'dotenv/config'
import { v1Router } from './src/v1/routes/routes.js'
import { corsMiddleware } from './src/middlewares/cors.js'

const app = express()
app.disable('x-powered-by')
app.use(corsMiddleware())
app.use(json())

app.use('/api/v1', v1Router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server escuchando en el puerto ${PORT}`)
})
