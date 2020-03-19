const key = '';

const options = {
  lat: 19.4326077,
  lng: -99.133208,
  zoom: 10,
  style: 'mapbox://styles/mapbox/dark-v9',
  pitch: 50,
};

const mappa = new Mappa('MapboxGL', key);
let myMap;

let canvas;
let data;
// asignar año a filtrar a variable año
let año = 2019;

// declara setup como función asincrónica
async function setup() {
  canvas = createCanvas(windowWidth, windowHeight).parent('canvasContainer');
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // espera (await) a que carguen los resultados, después corre la función drawData
  data = await loadTable('../../data/geo/cdmx_carpetas-de-investigacion-pgj-cdmx_03-transeunte-violencia.csv', 'csv', 'header', drawData);

  myMap.onChange(drawData);

  noFill();
  stroke(255, 100, 100, 150);
  strokeWeight(2);
}

function draw() {

}

async function drawData() {
  clear();

  for (let i = 0; i < data.getRowCount(); i += 1) {
    if (año == data.getString(i, 'año_hechos')) {
      // Get the lat/lng of each meteorite
      const latitude = Number(data.getString(i, 'latitud'));
      const longitude = Number(data.getString(i, 'longitud'));

      // si las coordenadas son válidas, calcula proyección a x,y para cada punto
      if (latitude <= 90 && latitude >= -90) {
        const pos = await myMap.latLngToPixel(latitude, longitude);
        point(pos.x, pos.y);
      }
    }
  }
}
