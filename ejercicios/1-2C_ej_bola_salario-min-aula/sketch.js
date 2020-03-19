let data;
let num;

let boliza = [];
let colors = [];

let sizes = [];
let minSize;
let maxSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  loadTable("../../data/mx_salariominimo_1877-2019.csv", "csv", "header", gotData);
}


function gotData(csv) {
  data = csv;
  console.log(csv);
  num = data.getRowCount();
  console.log("found " + num + " rows")
  for (let i = 0; i<num; i++) {
    let val = data.getString(i, "Salario mínimo real");
    // console.log("este smr" + val);
    if (val){
      sizes.push(val);
    }
  }
  console.log(sizes);
  minSize = min(sizes);
  maxSize = max(sizes);
  console.log("min/max: " + minSize + "/" + maxSize);

  let x = 0;
  let speed = 5;
  let sep = width/num;
  let y = height;

  for (let i = 0; i<num; i++) {
    let val = data.getString(i, "Salario mínimo real");
    let size = sqrt(val);
    // y = map(val, minSize, maxSize, height, 300);
    boliza[i] = new Bola(x, y, size, speed);
    colors[i] = color(255,150,0, map(val, minSize, maxSize, 100, 255));
    // colors[i] = color(random(255),random(255),random(255),255);
    x+=sep;
  }
  console.log(boliza);
}

function draw() {
  background(0);
  let title = "Salario Mínimo en México de 1877-2019";
  let subtitle = "Fuente: Conasami (cálculo a precios actuales)";

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
    let val = data.getString(i, "Salario mínimo real");
    let año = data.getString(i, "Año");
    boliza[i].show();
    boliza[i].setColor(colors[i]);

    if (boliza[i].y >= height-boliza[i].size*25) {
      boliza[i].move(0,-5);
    } else {
      boliza[i].move(0,0);
    }

    let labelSize = map(val, minSize, maxSize, 18, 36);
    boliza[i].highlight(mouseX, mouseY, 255, colors[i]);

    let tw = 200;
    let th = 150;
    let ty = mouseY;
    let tx;

    if(mouseX > width-tw) {
      tx = mouseX - tw;
    } else {
      tx = mouseX;
    }

    boliza[i].showTooltip(tx,ty, tw, th, colors[i], año,
      `salario mínimo real: \n ${val}`);


    if (val>0) {
      if (val == maxSize || val == minSize) {
        let labelSize = map(val, minSize, maxSize, 24, 28);
        boliza[i].showLabel(año, labelSize, 0, -10);
      }
    }
  }
}