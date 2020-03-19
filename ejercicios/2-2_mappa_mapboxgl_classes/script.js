
const key = '';
const options = {
  lat: 30,
  lng: -98,
  zoom: 4,
  // style: 'mapbox://styles/mapbox/traffic-night-v2',
  style: 'mapbox://styles/mapbox/dark-v9',
  pitch: 50,
  // maxBounds: [[-150, 20], [ -50, 40]]
};

const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;

let data;
let num;
let boliza = [];
let colors = [];

let sizes = [];
let minSize;
let maxSize;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight).parent('canvasContainer');
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  data = loadTable('../../data/geo/eeuu_school-shootings-since-columbine.csv', 'csv', 'header', gotData);

  myMap.onChange(drawData);
}

function draw() {
  for (let i = 0; i<num; i++) {
    let lowCol = color(255, 80, 50, 255);
    let highCol = color(255, 255, 255, 255);
    boliza[i].highlightMap(mouseX, mouseY, boliza[i].x, boliza[i].y, highCol, lowCol);
    let val = data.getString(i, 'casualties');
    let label = data.getString(i, "school_name");
    boliza[i].showTooltip(boliza[i].x, boliza[i].y, 300, 200, 255, val, label);
  }
}

function gotData() {
    clear();
    num = data.getRowCount();
    console.log("found " + num + " rows");
    for (let i = 0; i<num; i++) {
      let val = data.getString(i, "casualties");
      // console.log("este smr" + val);
      if (val){
        sizes.push(val);
      }
    };
    // console.log(sizes);
    minSize = min(sizes);
    maxSize = max(sizes);
    // console.log("min/max: " + minSize + "/" + maxSize);
    drawData();

}

function drawData() {
  clear();
  for (let i = 0; i<num; i++) {
    const latitude = Number(data.getString(i, 'lat'));
    const longitude = Number(data.getString(i, 'long'));
    const pos = myMap.latLngToPixel(latitude, longitude);

    let val = data.getString(i, 'casualties');
    size = map(sqrt(val), sqrt(1), sqrt(34), 2, 60) + myMap.zoom();

    boliza[i] = new Bola(pos.x, pos.y, size, 1);
    boliza[i].setColor(55,0,255,50, 100);
    boliza[i].setStroke(55,0,255, 200, 1);
    boliza[i].show();

    let lowCol = color(255, 80, 50, 255);
    let highCol = color(255, 255, 255, 255);
    boliza[i].setLabelColor(highCol);
    let label = data.getString(i, "school_name");
    let labelSize = map(val, minSize, maxSize, 10, 20);
    boliza[i].showLabel(val, labelSize, 0, 0);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
