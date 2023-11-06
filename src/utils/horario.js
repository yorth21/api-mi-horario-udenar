// Expresiones regulares
const regexFilaTabla = /(Lunes|Martes|Miercoles|Jueves|Viernes|Sabado|Domingo):[\s\S]*?(\d+:\d+)/g
const regexHorarioAsignatura = /(Lunes|Martes|Miercoles|Jueves|Viernes|Sabado|Domingo):\s*[\n]*\s*[^]*?\s*[\n]*\s*\([^]*?\)/g
const regexNombreAsignatura = /^[A-Z]{2}.*(-\s|-)[0-9]+$/

const diaACodigo = {
  lunes: 'LUN',
  martes: 'MAR',
  miercoles: 'MIE', // Sin tilde
  jueves: 'JUE',
  viernes: 'VIE',
  sabado: 'SAB', // Sin tilde
  domingo: 'DOM'
}

function mapHorarioAsignatura (horarioAsignatura) {
  // Eliminar saltos de linea
  const horarioAsignaturaSinSalto = horarioAsignatura.map(linea => {
    return linea.replace(/:\n/g, ':').replace(/\n/g, ' ')
  })

  const horariosAgrupados = {}

  horarioAsignaturaSinSalto.forEach(horario => {
    const [dia, horas] = horario.split(':')
    const [horaInicio, horaFin] = horas.match(/\d+ - \d+/)[0].split(' - ')
    const ubicacion = horas.match(/\((.*?)\)/)[1]

    let horaInicioNum = Number(horaInicio)
    let horaFinNum = Number(horaFin)

    if (horario.includes('PM')) {
      if (horaInicioNum > horaFinNum) {
        horaFinNum += 12
      } else {
        horaInicioNum += 12
        horaFinNum += 12
      }
    }

    const diaSinTildes = dia.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const codigoDeDia = diaACodigo[diaSinTildes.toLowerCase()]

    if (!horariosAgrupados[dia]) {
      horariosAgrupados[dia] = {
        dia: dia.toLowerCase(),
        codDia: codigoDeDia,
        horaInicio: horaInicioNum,
        horaFin: horaFinNum,
        ubicacion
      }
    } else {
      const existente = horariosAgrupados[dia]
      if (horaInicioNum < existente.horaInicio) {
        existente.horaInicio = horaInicioNum
      }
      if (horaFinNum > existente.horaFin) {
        existente.horaFin = horaFinNum
      }
    }
  })

  const horariosAgrupadosArray = []
  for (const key in horariosAgrupados) {
    horariosAgrupadosArray.push(horariosAgrupados[key])
  }

  return horariosAgrupadosArray
}

export function scrapingPdfText (text) {
  text = text.split('ASIGNATURAS CANCELADAS')[0]
  text = text.split('FECHA')[1]

  const filasTabla = text.match(regexFilaTabla)

  const resultadoMapeado = []
  for (const fila of filasTabla) {
    const horarioAsignatura = fila.match(regexHorarioAsignatura)
    const horarioAsignaturaMap = mapHorarioAsignatura(horarioAsignatura)

    const lineasFila = fila.split('\n').filter(line => line.trim() !== '')
    const fullNombreMateria = lineasFila.find(line => line.match(regexNombreAsignatura))
    const materia = fullNombreMateria.split('-')[0].split('(')[0].trim()

    const tipos = {
      TEORICA: 'Teórica',
      PRACTICA: 'Práctica'
    }

    let tipo = 'Otro'
    for (const key in tipos) {
      if (fila.includes(tipos[key])) {
        tipo = tipos[key]
        break
      }
    }

    const categorias = {
      PENSUM: 'Pensum',
      FLEXIBILIDAD: 'Flexibilidad',
      HUMANISTICA: 'Humanística'
    }

    let categoria = 'Electiva'
    for (const key in categorias) {
      if (fila.includes(key)) {
        categoria = categorias[key]
        break
      }
    }

    const datosAsignatura = {
      fullNombre: fullNombreMateria,
      nombre: materia,
      categoria,
      tipo,
      horario: horarioAsignaturaMap,
      horarioSinMap: horarioAsignatura
    }
    resultadoMapeado.push(datosAsignatura)
  }

  return resultadoMapeado
}
