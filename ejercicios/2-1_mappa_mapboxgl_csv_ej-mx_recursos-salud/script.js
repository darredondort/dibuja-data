const key = '';

const options = {
  lat: 24,
  lng: -100,
  zoom: 4.5,
  // style: 'mapbox://styles/mapbox/traffic-night-v2',
  style: 'mapbox://styles/mapbox/light-v9',
  pitch: 0,
  maxBounds: [[-130, 10], [ -65, 40]]
};

const mappa = new Mappa('MapboxGL', key);

let myMap;
let canvas;
let data;
let num;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight).parent('canvasContainer');
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  data = loadTable('../../data/geo/mx_recursos_salud.csv', 'csv', 'header', drawData);
  myMap.onChange(drawData);

}

function draw() {

}

function drawData() {
  clear();
  // console.log(data);
  num = data.getRowCount();

  noFill();
  stroke(0,200,220,100);
  strokeWeight(2);

  for (let i = 0; i < num; i++) {
    const latitude = Number(data.getString(i, 'LATITUDE'));
    const longitude = Number(data.getString(i, 'LONGITUDE'));

    // si las coordenadas son válidas, calcula proyección a x,y para cada punto
    if (latitude <= 90 && latitude >= -90) {
      const pos = myMap.latLngToPixel(latitude, longitude);
      point(pos.x, pos.y);
    }
  }
}
