import axios from 'axios'
import { ConnectionError } from '../utils/errors.js'

const api = axios.create({
  baseURL: 'https://apoteca.udenar.edu.co/operacionesnomina',
  timeout: 5000
})

export class reporteModel {
  static async getReportePdf ({ formData }) {
    try {
      const { data } = await api.post('/reporte2024prueba.php', formData, {
        header: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'arraybuffer'
      })
      return data
    } catch (err) {
      throw new ConnectionError()
    }
  }
}
