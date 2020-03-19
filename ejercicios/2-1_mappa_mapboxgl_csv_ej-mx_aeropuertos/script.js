const key = '';

const options = {
  lat: 24,
  lng: -100,
  zoom: 4.5,
  style: 'mapbox://styles/mapbox/traffic-night-v2',
  // style: 'mapbox://styles/mapbox/light-v9',
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

  data = loadTable('../../data/geo/mx_list-of-airports-in-mexico.csv', 'csv', 'header', drawData);
  myMap.onChange(drawData);
}

function draw() {
}


function drawData() {
  clear();
  // console.log(data);
  num = data.getRowCount();

  noFill();
  // stroke(250,200,0,100);
  strokeWeight(2);

  let size;
  let heli = 3;
  let small = 5;
  let medium = 10;
  let large = 20;


  // itera sobre cada registro, revisa su tipo (type) y aplica colores y tamaños de acuerdo a cada uno
  for (let i = 0; i < num; i++) {
    let type = data.getString(i, 'type');
    // console.log(type);
    switch(type) {
      case "large_airport":
        stroke(0,250,200,150);
        // console.log("large");
        size = large;
        break;
      case "medium_airport":
        stroke(250,0,200,100);
        // console.log("medium");
        size = medium;
        break;
      case "small_airport":
        stroke(250,0,200,75);
        // console.log("small");
        size = small;
        break;
      case "heli":
        stroke(250,0,200,50);
        // console.log("small");
        size = heli;
        break;
      case "closed":
        stroke(200,200,200,50);
        // console.log("heli");
        size = heli;
        break;
      default:
        // console.log("otro");
    }

    const latitude = Number(data.getString(i, 'latitude'));
    const longitude = Number(data.getString(i, 'longitude'));

    if (latitude <= 90 && latitude >= -90) {
      const pos = myMap.latLngToPixel(latitude, longitude);
      rect(pos.x, pos.y, size, size);
    }
  }
}
