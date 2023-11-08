import express, { json } from 'express'
import 'dotenv/config'
import { routes } from './src/routes/routes.js'
import { corsMiddleware } from './src/middlewares/cors.js'

const app = express()
app.disable('x-powered-by')
app.use(corsMiddleware())
app.use(json())

app.use('/api', routes)

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
  console.log(`Server escuchando en el puerto ${PORT}`)
})
