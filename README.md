# dibuja-data
Aprende a visualizar datos dibujando con p5.js

Ejercicios introductorios para poner en práctica conceptos y técnicas de visualización de datos con JavaScript y la librería [p5.js](https://p5js.org/) desde la programación orientada a objetos (OOP).

Inspirados en ejercicios por [@shiffman](https://github.com/CodingTrain/website) en [The Coding Train](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA).

___

## Ejercicios:

### 0. Programación Orientada a Objetos en JavaScript
Aprende a encapsular las propiedades y funcionalidades de las piezas en tu código dentro de objetos, utilizando las posibilidades de programación orientada a objetos desde JavaScript ES6. Define “plantillas” de objetos utilizando la palabra clave *class*, introducida en ES6 ([¡no existen realmente las clases en JavaScript!](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/objects-classes/ch4.md)), y delega de ellas nuevos objetos que harán referencia al prototipo creado desde su función constructora.

- **dibuja-data_0-0_objetos** [ código ]

### 1. Visualiza datos en archivos locales: JSON
Incorpora datos desde archivos JSON en tu código utilizando la función loadJSON() de p5.js. Explora, modifica y crea “clases” para dibujar distintas formas con sus propias propiedades y métodos que pueden asociarse a los datos importados.

- **dibuja-data_1-1_preload-json** [ código ]
- **dibuja-data_1-2_loadjson-callback** [ código ]
- **dibuja-data_1-3-ej-bola-peces** [ código ]
- **dibuja-data_1-4-ej-barra-peces** [ código ]
- **dibuja-data_1-5-ej-barchart-peces** [ código ]
- **dibuja-data_1-6-ej-barchart-residuos** [ código ]

### 2. Visualiza datos en archivos locales: CSV/TSV

 [PRÓXIMAMENTE]

____

## Datos:
### En el repositorio:
- [data.world: Marine Animal Speed](https://data.world/jamesgray/marine-animal-speed)
- [datos.gob.mx: Generación total y per cápita de residuos sólidos urbanos](https://datos.gob.mx/busca/dataset/indicadores-de-crecimiento-verde--produccion-y-consumo)

### Otros conjuntos de datos abiertos recomendados:
#### data.world:
- [México - Gender indicators](https://data.world/hdx/0994721a-502f-4631-b64f-3f83f9188731)
- [EEUU - Fatal Police Shootings](https://data.world/data-society/fatal-police-shootings)
- [EEUU - Lawmakers' responses to Orlando shooting by party](https://data.world/carlvlewis/lawmakers-responses-to-orlando-shooting-by-party-affiliatio)
- [EEUU - Most Admired Women in World by U.S. Citizens, '05-'15](https://data.world/carlvlewis/most-admired-women-in-world-by-u-s-citizens-05-15)
- [EEUU - U.S. Metro Areas Violent Crime Rates by Type, 1975-2015](https://data.world/carlvlewis/u-s-metro-areas-violent-crime-rates-by-type-1970-2015)
- [EEUU - Women's Marches Crowd Sizes (post Trump's inauguration)](https://data.world/carlvlewis/womens-marches-crowd-sizes)
- [EEUU - Snapchat Political Ads, 2018-2019](https://data.world/carlvlewis/snapchat-political-ads-2018-2019/workspace/project-summary?agentid=carlvlewis&datasetid=snapchat-political-ads-2018-2019) 
___ 

## Instalación:
Para correr todos los ejercicios localmente, se requiere habilitar un servidor local.

Instala la versión de [Node.js](https://nodejs.org/en/download/) para tu sistema operativo y el paquete de npm [http-server](https://www.npmjs.com/package/http-server) para correr un servidor local desde la terminal/línea de comandos.

```
npm i http-server
````
___

## Uso

Clona o descarga repositorio.
```
git clone https://github.com/tugaarredondo/dibuja-codigo.git
```

Cambia de directorio a la carpeta de *dibuja-codigo*.

```
cd dibuja-codigo
```

Corre un servidor local
```
http-server -p 8000
```

Explora los ejemplos en tu navegador: http://localhost:8000/
____

## Licencia

[MIT © Diego Arredondo](../LICENSE)
