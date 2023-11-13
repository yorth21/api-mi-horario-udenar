import api from '../config/axiosConfig.js'
import { ConnectionError } from '../utils/errors.js'

export class periodoModel {
  static async getCodPeriodoAct ({ formData }) {
    try {
      const { data } = await api.post('/consultaMatriculasU.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return data
    } catch (err) {
      console.log(err)
      throw new ConnectionError()
    }
  }
}
