import axios from 'axios'
import api from '../config/axiosConfig.js'
import { sendError, sendSuccess } from '../utils/response.js'
import { pdfParse } from '../utils/pdfParse.cjs'
import { scrapingPdfText } from '../utils/horario.js'
import * as cheerio from 'cheerio'

const apiHorario = axios.create({
  baseURL: 'https://apoteca.udenar.edu.co/operacionesnomina'
})
export class HorarioController {
  static async getHorario (req, res) {
    const { codAlumno, codReporte } = req.query

    const body = new FormData()
    body.append('cod_alumno', codAlumno)
    body.append('reporte', codReporte)

    try {
      const { data } = await apiHorario.post('/reporte2021prueba.php', body, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'arraybuffer'
      })

      const pdf = await pdfParse(data)
      if (!pdf.text) return sendError(res, 404, 'Error al extraer la informacion del pdf')
      const resultadoMapeado = scrapingPdfText(pdf.text)

      return sendSuccess(res, 200, 'Horario obtenido', resultadoMapeado)
    } catch (error) {
      return sendError(res, 500, 'Error inesperado', error)
    }
  }

  static async getCodReporte (req, res) {
    const { codAlumno } = req.body

    const body = new FormData()
    body.append('theInput', codAlumno)

    try {
      const { data } = await api.post('/consultaMatriculasU.php', body, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const $ = cheerio.load(data)

      const $select = $('#reporte')
      const primeraOpcion = $select.find('option').eq(0).attr('value')
      if (!primeraOpcion) return sendError(res, 404, 'No se encontró el código de reporte')

      return sendSuccess(res, 200, 'Código de reporte obtenido', primeraOpcion)
    } catch (error) {
      return sendError(res, 500, 'Error inesperado', error)
    }
  }
}
