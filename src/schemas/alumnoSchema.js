import { z } from 'zod'

const codAlumnoSchema = z.number().int().positive()

export function validateCodAlumno (codAlumno) {
  return codAlumnoSchema.safeParse(codAlumno)
}
