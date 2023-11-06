import { Router } from 'express'
import { HorarioController } from '../controllers/horario.js'

export const horarioRouter = Router()

horarioRouter.post('/', HorarioController.getHorario)
horarioRouter.post('/codreporte', HorarioController.getCodReporte)
