import { Router } from 'express'
import { authRouter } from './auth.js'

export const routes = Router()

routes.use('/auth', authRouter)
