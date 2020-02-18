let barriza = [];
let data;
let num;
let x;
let barWidth = 100;
let barSep = 275;

let colors = [[96,168,98],
              [196,92,162],
              [180,148,62],
              [119,122,205],
              [203,90,76]];


function setup() {
  loadJSON('../data/fastest-marine-animals.json', gotData);
  // createCanvas(600, 600);
  createCanvas(windowWidth, windowHeight);


}

function gotData(json) {
  data = json;
  num = data.fish.length;

  // createCanvas(600, 600);
  createCanvas(windowWidth, windowHeight);

  x = barSep;

  // for (let i = 0; i<num; i++) {
  for (let i = 0; i<num; i++) {
    // let x = 10*i+ 10;
    // let size = map(data[i], min(data), max(data), 150, 30);
    let size = map(data.fish[i].avgKg, 55, 650, 40, 400);


    // let speed = map(data[i], min(data), max(data), 1, 3);
    let speed = map(data.fish[i].speed, 70, 130, 40, 400);
    barriza[i] = new Barra(x, height-100-speed, barWidth, speed, speed, CORNER);
    // barriza[i].randomColor(random(200),random(100),random(200),220);
    barriza[i].setColor(colors[i]);
    // barriza[i].setLabelColor(255, 255, 255, 255);
    barriza[i].setLabelColor(220);
    // barriza[i].rotation(-10);
    x += barSep;
  }
}


function draw() {
  background(0,10,20);

  noStroke();

  let title = "Animales marinos más rápidos del planeta";
  let subtitle = "Fuente: https://data.world/jamesgray/marine-animal-speed";

  textFont("Monospace");
  fill(220);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(title, width/2, 50);

  textSize(16);
  fill(150);
  // textAlign(CENTER, CENTER);
  text(subtitle, width/2, 75);



  fill(0);

  for (let i = 0; i<num; i++) {
    barriza[i].show();
    // barriza[i].moveRandom(1,random(-2,2));
    // barriza[i].bounce(x, width, 0, height);
    // barriza[i].showLabel("bola", 24);
    // let labelSize = map(data.fish[i].avgKg, 55, 650, 10, 48);
    let labelSize = map(data.fish[i].speed, 70, 130, 10, 48);
    barriza[i].showLabel(data.fish[i].label, labelSize, 0, 0);
  }
  // console.log(bolas);
  //console.log(barriza[3].speed);
  for (let i = 0; i<num; i++) {
    barriza[i].highlight(mouseX, mouseY, 220, colors[i]);
    barriza[i].showTooltip(mouseX, mouseY, 200, 100, colors[i], data.fish[i].label, "speed: " + data.fish[i].speed + "km/h" + "\n" + "weight:" + data.fish[i].avgKg + "kg" );
//     barriza[i].showTooltip(mouseX, mouseY, 200, 100, colors[i], data.fish[i].label, `speed: ${data.fish[i].speed} km/h
// weight: ${data.fish[i].avgKg} kg`);

  }

  stroke(220);
  line(200, height-100, width-200, height-100);

}


function mousePressed() {


}
