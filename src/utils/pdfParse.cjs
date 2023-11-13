const pdf = require('pdf-parse')

async function pdfParse (data) {
  try {
    const dataBuffer = Buffer.from(data, 'binary')
    const result = await pdf(dataBuffer)
    return result
  } catch (err) {
    return null
  }
}

module.exports = {
  pdfParse
}
