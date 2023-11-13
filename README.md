# api-mi-horario-udenar

Esta API ha sido desarrollada con el propósito de realizar web scraping en la aplicación web de matrículas de la Universidad de Nariño. Su principal función es extraer información detallada sobre el horario de clases de los estudiantes y presentarla de manera accesible y directa a los usuarios finales.

## Contenido

1. [Requisitos](#requisitos)
2. [Instalación y ejecución](#instalación)
3. [Endpoints](#endpoints)
4. [Ejemplos](#ejemplos)


## Requisitos

- **minimo**: Node.js `v18.17.1`

## Instalación

Para instalar y ejecutar esta API sigue estos pasos:

1. Asegúrate de tener la version de **Node.js** correspondiente instalada en tu sistema. Si no lo tienes, puedes descargarlo desde [el sitio web de Node.js](https://nodejs.org/).

2. Clona este repositorio en tu máquina local:
	```bash
	git clone https://github.com/yorth21/api-mi-horario-udenar.git
	cd api-mi-horario-udenar
	```

3. Instalar las dependencias:
	```bash
	npm install
	```

4. Ejecutar la API sin **nodemon**:
	```bash
	npm start
	```
	Si la quieres ejecutar con **nodemon**
	```bash
	npm run dev
	```

## Endpoints
### Codigo reporte actual

```
POST	/api/v1/horario/asignaturas

{
	"codAlumno": 123456789
}

200
"success": true,
"message": "Código de reporte obtenido",
"data": {
	"codAlumno": "123456789",
	"codReporte": "123"
}

codigo ok: 200
"success": true,
"message": "Mensaje",
"data": {
	"nombreAlumno": "Nombre",
	"asignaturas": [
		{
			"nombre": "METODOS NUMERICOS",
			"categoria": "Flexibilidad",
			"tipo": "Teórica",
			"horario": [
				{
					"dia": "lunes",
					"codDia": "LUN",
					"horaInicio": 11,
					"horaFin": 13,
					"ubicacion": "A407-BLOQUE TECNOLOGICO"
				},
				{
					"dia": "miercoles",
					"codDia": "MIE",
					"horaInicio": 11,
					"horaFin": 13,
					"ubicacion": "A409-BLOQUE TECNOLOGICO"
				}
			]
		}
		// ....
	]
}

codigo error: 
"success": false,
"error": {
	"message": "Descripcion corta del error",
	"details": "Detalles del error"
}
```

### Informacion del horario
```
POST	/api/v1/horario/asignaturasDia

{
	"codAlumno": 123456789
}

codigo ok: 200
"success": true,
"message": "Mensaje",
"data": {
	"nombreAlumno": "Nombre",
	"asignaturas": [
		{
			"dia": "lunes",
			"codDia": "LUN",
			"horaInicio": 11,
			"horaFin": 13,
			"ubicacion": "A407-BLOQUE TECNOLOGICO",
			"nombre": "METODOS NUMERICOS",
			"categoria": "Flexibilidad",
			"tipo": "Teórica"
		}
		// .....
	]
}

codigo error: 
"success": false,
"error": {
	"message": "Descripcion corta del error",
	"details": "Detalles del error"
}
```
