import api from '../config/axiosConfig.js'
import { sendError, sendSuccess } from '../utils/response.js'
import * as cheerio from 'cheerio'

export class AuthController {
  static mapInfo (data) {
    const nombresRegex = /Nombres:(.*?)\n/
    const documentoRegex = /Documento:(.*?)\n/
    const semestreRegex = /Semestre:(.*?)\n/
    const apellidosRegex = /Apellidos:(.*?)\n/
    const tipoDocumentoRegex = /Tipo de documento:(.*?)\n/
    const programaRegex = /Programa:(.*?)\n/

    const nombres = data.match(nombresRegex)[1].trim()
    const documento = data.match(documentoRegex)[1].trim()
    const semestre = data.match(semestreRegex)[1].trim()
    const apellidos = data.match(apellidosRegex)[1].trim()
    const tipoDocumento = data.match(tipoDocumentoRegex)[1].trim()
    const programaSede = data.match(programaRegex)[1].trim().split('-')
    const programa = programaSede[0].trim()
    const sede = programaSede[1].trim()

    return {
      nombres,
      apellidos,
      tipoDocumento,
      documento,
      semestre,
      programa,
      sede
    }
  }

  static async login (req, res) {
    const { codAlumno, clave } = req.body

    const body = new FormData()
    body.append('cod_alumno', codAlumno)
    body.append('clave', clave)

    try {
      const { data } = await api.post('/Vistapanel.php', body, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const $ = cheerio.load(data)

      const $info = $('section.content > div:first > div')
      const infoText = $info.text()
      if (!infoText) return sendError(res, 404, 'Error al extraer la informacion del pdf')

      const dataMapped = AuthController.mapInfo(infoText)

      return sendSuccess(res, 200, 'Login success', dataMapped)
    } catch (error) {
      return sendError(res, 500, 'Error inesperado', error)
    }
  }
}
