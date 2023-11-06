const pdf = require('pdf-parse')

async function pdfParse (data) {
  try {
    const dataBuffer = Buffer.from(data, 'binary')
    const result = await pdf(dataBuffer)
    return result
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

module.exports = {
  pdfParse
}
