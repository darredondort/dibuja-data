const key = '';

const options = {
  lat: 20.8,
  lng: -104,
  zoom: 6.8,
  // style: 'mapbox://styles/mapbox/traffic-night-v2',
  style: 'mapbox://styles/mapbox/light-v9',
  pitch: 0,
  maxBounds: [[-130, 0], [ -65, 40]]
};

const mappa = new Mappa('MapboxGL', key);

let myMap;
let canvas;
let data;
let num;
let minSize, maxSize;
let sizes = [];


function setup() {
  canvas = createCanvas(windowWidth, windowHeight).parent('canvasContainer');
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  data = loadTable('../../data/geo/jal_refugios-jalisco.csv', 'csv', 'header', drawData);
  myMap.onChange(drawData);
}


function draw() {

}


function drawData() {
  clear();
  // console.log(data);
  num = data.getRowCount();

  for (let i = 0; i < num; i++) {
    let val = Number(data.getString(i, 'capacidad'));
    if (val) {
      sizes.push(val);
    }
  }

  minSize = min(sizes);
  maxSize = max(sizes);


  fill(245,200,150,150);
  noStroke();

  for (let i = 0; i < num; i++) {
    let val = Number(data.getString(i, 'capacidad'));

    const latitude = Number(data.getString(i, 'latitud'));
    const longitude = Number(data.getString(i, 'longitud'));

    size = map(sqrt(val),sqrt(minSize),sqrt(maxSize),5,50);
    //  size = 10;

    if (latitude <= 90 && latitude >= -90) {
      const pos = myMap.latLngToPixel(latitude, longitude);
      ellipse(pos.x, pos.y, size, size);
    }
  }
}
