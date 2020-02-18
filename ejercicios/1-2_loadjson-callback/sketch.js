let boliza = [];
let data;
let num;

let colors = [[96,168,98],
              [196,92,162],
              [180,148,62],
              [119,122,205],
              [203,90,76]];

function setup() {
  loadJSON('../../data/fastest-marine-animals.json', gotData);
  // createCanv.as(600, 600);
  createCanvas(windowWidth, windowHeight);
}

function gotData(json) {
  data = json.fish;
  num = data.length;

  // createCanvas(600, 600);
  createCanvas(windowWidth, windowHeight);

  // for (let i = 0; i<num; i++) {
  for (let i = 0; i<num; i++) {
    // let x = 10*i+ 10;
    let x = 0;
    // let size = map(data[i], min(data), max(data), 150, 30);
    let size = map(data[i].avgKg, 55, 650, 100, 150);
    // let speed = map(data[i], min(data), max(data), 1, 3);
    let speed = map(data[i].speed, 70, 130, 1, 3);
    boliza[i] = new Bola(x, height/2, size, speed);
    // boliza[i].randomColor(random(200),random(100),random(200),80);
    boliza[i].setColor(colors[i]);
    boliza[i].setLabelColor(220,220,220,255);
  }
}


function draw() {
  background(0,10,20);

  let title = "Animales marinos más rápidos del planeta";
  let subtitle = "Fuente: https://data.world/jamesgray/marine-animal-speed";

  textFont("Monospace");
  fill(220);
  textSize(24);
  textAlign(CENTER);
  text(title, width/2, 50);

  textSize(16);
  fill(150);
  textAlign(CENTER);
  text(subtitle, width/2, 75);

  fill(0);

  for (let i = 0; i<num; i++) {
    boliza[i].show();
    boliza[i].moveRandom(1,random(-2,2));
    boliza[i].bounce(0, width, 0, height);
    // boliza[i].showLabel("bola", 24);
    boliza[i].showLabel(data[i].label, 24, 0, 0);
  }
  // console.log(bolas);
  //console.log(boliza[3].speed);
  for (let i = 0; i<num; i++) {
    boliza[i].highlight(mouseX, mouseY, 220, colors[i]);
    boliza[i].showTooltip(mouseX, mouseY, 200, 100, colors[i], data[i].label, "speed: " + data[i].speed + "km/h" + "\n" + "weight:" + data[i].avgKg + "kg" );
//     barriza[i].showTooltip(mouseX, mouseY, 200, 100, colors[i], data.fish[i].label, `speed: ${data.fish[i].speed} km/h
// weight: ${data.fish[i].avgKg} kg`);
  }
}
