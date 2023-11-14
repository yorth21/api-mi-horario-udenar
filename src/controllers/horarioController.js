import { sendError, sendSuccess } from '../utils/response.js'
import { pdfParse } from '../utils/pdfParse.cjs'
import { asignaturasScraping, asignaturasDiaScraping } from '../utils/horario.js'
import * as cheerio from 'cheerio'
import { periodoModel } from '../models/periodoModel.js'
import { validateCodAlumno } from '../schemas/alumnoSchema.js'
import { reporteModel } from '../models/reporteModel.js'
import { ConnectionError } from '../utils/errors.js'

export class HorarioController {
  static async horarioAsignaturas (req, res) {
    const { codAlumno } = req.body
    const { success } = validateCodAlumno(codAlumno)
    if (!success) return sendError(res, 400, 'Formato de codigo incorrecto')

    try {
      const codPeriodo = await HorarioController.getCodPeriodoAct(codAlumno)
      if (!codPeriodo) return sendError(res, 404, 'Estudiante no encontrado')

      const formData = new FormData()
      formData.append('cod_alumno', codAlumno)
      formData.append('reporte', codPeriodo)

      const resReporte = await reporteModel.getReportePdf({ formData })
      const pdf = await pdfParse(resReporte)
      if (!pdf) return sendError(res, 500, 'Error al obtener el horario')
      if (pdf.text.trim() === '') return sendError(res, 404, 'Horario no encontrado')
      const asignaturas = asignaturasScraping(pdf.text)
      asignaturas.codAlumno = codAlumno

      return sendSuccess(res, 200, 'Horario obtenido', asignaturas)
    } catch (err) {
      if (err instanceof ConnectionError) {
        return sendError(res, 500, 'Error de conexion')
      }
      return sendError(res, 500, 'Error inesperado')
    }
  }

  static async horarioAsignaturasDia (req, res) {
    const { codAlumno } = req.body
    const { success } = validateCodAlumno(codAlumno)
    if (!success) return sendError(res, 400, 'Formato de codigo incorrecto')

    try {
      const codPeriodo = await HorarioController.getCodPeriodoAct(codAlumno)
      if (!codPeriodo) return sendError(res, 404, 'Estudiante no encontrado')

      const formData = new FormData()
      formData.append('cod_alumno', codAlumno)
      formData.append('reporte', codPeriodo)

      const resReporte = await reporteModel.getReportePdf({ formData })
      const pdf = await pdfParse(resReporte)
      if (!pdf) return sendError(res, 500, 'Error al obtener el horario')
      if (pdf.text.trim() === '') return sendError(res, 404, 'Horario no encontrado')
      const asignaturas = asignaturasDiaScraping(pdf.text)
      asignaturas.codAlumno = codAlumno

      return sendSuccess(res, 200, 'Horario obtenido', asignaturas)
    } catch (err) {
      if (err instanceof ConnectionError) {
        return sendError(res, 500, 'Error de conexion')
      }
      return sendError(res, 500, 'Error inesperado')
    }
  }

  static async getCodPeriodoAct (codAlumno) {
    const formData = new FormData()
    formData.append('theInput', codAlumno)

    try {
      const resHtml = await periodoModel.getCodPeriodoAct({ formData })

      const $ = cheerio.load(resHtml)

      const $select = $('#reporte')
      const codPeriodo = $select.find('option').eq(0).attr('value')

      const info = $('.has-feedback:first > label > b').text()
      const nombre = info.split('Semestre')[0].trim()
      if (!nombre) return null

      return codPeriodo
    } catch (err) {
      if (err instanceof ConnectionError) {
        throw new ConnectionError()
      }
      return null
    }
  }
}
