import { Router } from 'express'
import { HorarioController } from '../controllers/horario.js'

export const horarioRouter = Router()

horarioRouter.get('/', HorarioController.getHorario)
horarioRouter.post('/', HorarioController.getCodReporte)
