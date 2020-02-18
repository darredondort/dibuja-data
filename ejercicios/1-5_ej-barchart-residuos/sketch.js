let barriza = [];
let data;
let num;
let x;
let barWidth = 50;
let barSep = 60;

let colors = [[86,122,209],
              [90,185,75],
              [119,94,211],
              [172,181,56],
              [189,69,171],
              [129,169,87],
              [202,130,227],
              [217,155,52],
              [129,91,159],
              [60,131,76],
              [215,67,126],
              [83,192,165],
              [202,60,69],
              [110,160,215],
              [213,90,46],
              [219,132,181],
              [114,113,42],
              [157,70,99],
              [202,167,104],
              [220,123,115],
              [161,99,47]];


function setup() {
  loadJSON('../../data/mx_residuos-solidos.json', gotData);
  // createCanvas(600, 600);
  createCanvas(windowWidth, windowHeight);


}

function gotData(json) {
  data = json.residuos;
  num = data.length;

  // createCanvas(600, 600);
  createCanvas(windowWidth, windowHeight);

  x = barSep;

  // for (let i = 0; i<num; i++) {
  for (let i = 0; i<num; i++) {
    // let x = 10*i+ 10;
    // let size = map(data[i], min(data), max(data), 150, 30);
    let size = map(data[i].toneladas_totales, 20000, 40000, 25, 400);


    // let speed = map(data[i], min(data), max(data), 1, 3);
    // let speed = map(data.residuos[i].speed, 70, 130, 50, 500);
    barriza[i] = new Barra(x, height-100-size, barWidth, size, size, CORNER);
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
  let title = "Toneladas anuales de resiudos sólidos desechados en México";
  let subtitle = "Fuente: SEMARNAT";

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

  x = barSep;

  for (let i = 0; i<num; i++) {
    barriza[i].show();
    // barriza[i].moveRandom(1,random(-2,2));
    // barriza[i].bounce(x, width, 0, height);
    // barriza[i].showLabel("bola", 24);
    // let labelSize = map(data.residuos[i].avgKg, 55, 650, 10, 48);
    let labelSize = map(data[i].toneladas_totales, 20000, 42000, 8, 20);
    barriza[i].showLabel(data[i].toneladas_totales, labelSize, 0, random(-32,-30));



  }
  for (let i = 0; i<num; i++) {
    barriza[i].highlight(mouseX, mouseY, 220, colors[i]);
    barriza[i].showTooltip(mouseX, mouseY, 200, 100, colors[i], data[i].año, "toneladas totales: " + data[i].toneladas_totales + "km/h" + "\n" + "kg por persona:" + data[i].kg_persona_diario + "kg" );
//     barriza[i].showTooltip(mouseX, mouseY, 200, 100, colors[i], data.residuos[i].label, `speed: ${data.residuos[i].speed} km/h
// weight: ${data.residuos[i].avgKg} kg`);

    fill(220);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(data[i].año, x+barWidth/2, height-80);
    x += barSep;

  }

  stroke(220);
  line(barSep, height-100, width-barSep*2, height-100);



}


function mousePressed() {


}
