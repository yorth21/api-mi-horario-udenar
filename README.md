# api-mi-horario-udenar

Esta API ha sido desarrollada con el propósito de realizar web scraping en la aplicación web de matrículas de la Universidad de Nariño. Su principal función es extraer información detallada sobre el horario de clases de los estudiantes y presentarla de manera accesible y directa a los usuarios finales.

## Contenido

1. [Requisitos](#requisitos)
2. [Instalación y ejecución](#instalación)
3. [Endpoints](#endpoints)


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

Url API para que pruebes los enpoints: ``` https://api-mi-horario-udenar.up.railway.app/api/v1 ```

### Horario por asignaturas
```
POST	/api/v1/horario/asignaturas

{
	"codAlumno": 123456789
}
```
#### Success:
```
{
    "nombreAlumno": "NOMBRES APELLIDOS",
    "asignaturas": [
        {
            "nombre": "SISTEMAS BASADOS EN EL CONOCIMIENTO",
            "categoria": "Pensum",
            "tipo": "Teórica",
            "horario": [
                {
                    "dia": "martes",
                    "codDia": "MAR",
                    "horaInicio": 7,
                    "horaFin": 9,
                    "ubicacion": "A101-BLOQUE 6 INGENIERIA"
                }
            ]
        },
	...
    ],
    "codAlumno": 123456789
}
```
#### Error:
```
{
    "message": "Estudiante no encontrado",
    "details": null
}
```

### Horario por dias
```
POST	/api/v1/horario/dias

{
	"codAlumno": 123456789
}
```
#### Success:
```
{
    "nombreAlumno": "NOMBRES APELLIDOS",
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
        },
        ...
    ],
    "codAlumno": 123456789
}
```
#### Error:
```
{
    "message": "Estudiante no encontrado",
    "details": null
}
```
