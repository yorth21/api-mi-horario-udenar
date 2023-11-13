import { Router } from 'express'
import { HorarioController } from '../../controllers/horarioController.js'

export const horarioRouter = Router()

horarioRouter
  .post('/asignaturas', HorarioController.horarioAsignaturas)
  .post('/asignaturasDia', HorarioController.horarioAsignaturasDia)
