import { Router } from 'express'
import { authRouter } from './auth.js'
import { horarioRouter } from './horario.js'

export const routes = Router()

routes.use('/auth', authRouter)

routes.use('/horario', horarioRouter)
