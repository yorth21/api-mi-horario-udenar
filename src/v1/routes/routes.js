import { Router } from 'express'
import { horarioRouter } from './horarioRoutes.js'

export const v1Router = Router()

v1Router
  .use('/horario', horarioRouter)
