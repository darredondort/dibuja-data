// Crea una cuenta y obtén tu llave para la API de Mapbox:
// https://www.mapbox.com/studio/account/tokens/
const key = '';

// Configura las opciones de tu mapa
const options = {
  lat: 40, // -90, 90
  lng: -98, // -180, 180
  zoom: 3.8, // zoom máximo 14
  style: 'mapbox://styles/mapbox/traffic-night-v2', // tema obscuro ciudad
  // consulta otros estilos básicos de Mapbox o crea uno propio: https://docs.mapbox.com/api/maps/#styles
  // style: 'mapbox://styles/mapbox/dark-v9', // tema obscuro
  // style: 'mapbox://styles/mapbox/light-v9', // tema claro
  // style: 'mapbox://styles/mapbox/outdoors-v10', // tema terreno
  // style: 'mapbox://styles/mapbox/satellite-v9', // tema satélite
  pitch: 50, // inclinación
};

// Crea una instancia de MapboxGL delegada del objeto Mappa
const mappa = new Mappa('MapboxGL', key);

// Declara variables globales
let myMap;
let canvas;
let data;
let num;
let sizes = [];
let minSize, maxSize;

function setup() {

  // Crea un nuevo canvas, almacénalo dentro de la variable canvas y mánda su resultado dentro del div con id "canvasContainer"
  canvas = createCanvas(windowWidth, windowHeight).parent('canvasContainer');

  // Crea una capa de mapa y otra de p5.js sobrepuesta para dibujar
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // Carga los datos de un .csv local, al terminar, corre la función drawData como callback
  data = loadTable('../../data/geo/eeuu_school-shootings-since-columbine.csv', 'csv', 'header', drawData);

  // cada que el mapa cambie de posición x,y o zoom, vuelva a correr drawData para actualizar las figuras
  myMap.onChange(drawData);

}

function draw() {

}

function drawData() {
  // cada ciclo vacía los pixeles dibujados en el canvas
  clear();
  // imprime el objeto con los datos importados
  console.log(data);
  num = data.getRowCount();


  // Itera sobre cada uno de los valores a representar y, si existen, empújalos al array sizes
  for (let i = 0; i < num; i++) {
    let val = Number(data.getString(i, 'casualties'));
    if (val) {
      sizes.push(val);
    }
  }

  // calcula el máximo y mínimo valor del dataset
  minSize = min(sizes);
  maxSize = max(sizes);

  // asigna colores de relleno y contorno
  fill(255,0,255,20);
  stroke(255,0,255,100);

  // itera sobre cada una de las filas del dataset
  for (let i = 0; i < num; i++) {
    // obtén el valor de longitud y latitud de cada registro
    const latitude = Number(data.getString(i, 'lat'));
    const longitude = Number(data.getString(i, 'long'));

    // obtén el valor numérico a representar visualmente
    let val = Number(data.getString(i, 'casualties'));

    // mapea el rango del mínimo y máximo valor a un nuevo ranfo de mínimo y máximo tamaño
    let size = map(sqrt(val), minSize, sqrt(maxSize), 5, 50);

    // Transform lat/lng to pixel position
    const pos = myMap.latLngToPixel(latitude, longitude);
    ellipse(pos.x, pos.y, size, size);

  }
}
