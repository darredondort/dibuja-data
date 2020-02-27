
// array vacío para llenar de objetos a partir de la case "Bola"
let boliza = [];

// declara variables que se van a necesitar para los datos
let data; // variable que almacenará los datos
let num; // variable para monitorear la cantidad de objetos, por ahora vacío

let sizes = [];
let speeds = [];
let minSize;
let maxSize;
let minSpeed;
let maxSpeed;

let sep;
let scale;

let colors = [];
// let colors = [[96,168,98],
//               [196,92,162],
//               [180,148,62],
//               [119,122,205],
//               [203,90,76]];



function setup() {
  // http://datamx.io/dataset/salario-minimo-historico-1877-2019
  loadTable('../../data/mx_salariominimo_1877-2019.csv', 'csv', 'header', gotData);
  createCanvas(windowWidth, windowHeight);
}

function gotData(csv) {
  data = csv;
  num = data.getRowCount();
  console.log(data);
  console.log(`found ${num} rows`);
  // console.log(data.getArray());


  for (let i = 0; i<num; i++) {
    let val = data.getString(i, 'Salario mínimo real');
    if (val) {
      sizes.push(Number(val));
      speeds.push(Number(val));
    }
    // else {
    //   sizes.push(0);
    //   speeds.push(0);
    // }
    }
    console.log(sizes);
    console.log(colors);

    maxSize = max(sizes);
    minSize = min(sizes);

    minSpeed = min(speeds);
    maxSpeed = max(speeds);
  //
  //   console.log("sizes:" + sizes);
    console.log("min/max:" + minSize + " " + maxSize);
  //   console.log("speeds:" + speeds);
  //   console.log("min/max:" + minSpeed + " " + maxSpeed);
  for (let i = 0; i<num; i++) {
    let val = data.getString(i, 'Salario mínimo real');
    let newCol = color(255,150,0, map(val, minSize, maxSize, 150, 255));
    // empujar cada nuevo color al array de colors
    colors.push(newCol);
    }


  scale = 0.5; // escala por la que se multiplicará el tamaño de los objetos
  sep = width/num;
  let x = sqrt(minSize)*scale;
  let y = height;

  for (let i = 0; i<num; i++) {
    let val = data.getString(i, 'Salario mínimo real');

    // para encontrar el diámetro, se debe encontrar el radio primero r = √ (A / PI)
    let size = sqrt(val)*scale; // multiplicarlo por 2 y por la escala
        let speed = map(val, minSpeed, maxSpeed, 1, 3);
    boliza[i] = new Bola(x, y, size, speed);
    // boliza[i].randomColor(random(200),random(100),random(200),80);
    // boliza[i].setColor(colors[i]);
    boliza[i].setColor(colors[i]);
    boliza[i].setLabelColor(220,220,220,255);
    x += sep;
  }
}


function draw() {
  background(0,10,20);

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
    boliza[i].show();
    if (boliza[i].y >= height-boliza[i].size*50) {
      boliza[i].move(0,-5);
    } else {
      boliza[i].move(0,0);
    }
  }
  let x = sqrt(minSize)*scale;

  for (let i = 0; i<num; i++) {
    let val = data.getString(i, 'Salario mínimo real');
    let año = data.getString(i, 'Año');
    boliza[i].highlight(mouseX, mouseY, 220, colors[i]);
    boliza[i].showTooltip(mouseX, mouseY, 200, 150, colors[i], año,
      `salario mínimo real: \n $${val}`);

    if (val>0) {
      if (val == maxSize || val == minSize) {
        let labelSize = map(val, minSize, maxSize, 24, 28);
        boliza[i].showLabel(año, labelSize, 0, -10);
      }
    }

      // "toneladas: " + data[i].kg_persona_diario + "km/h" + "\n" + "weight:" + data[i].toneladas_totales + "kg" );
//     barriza[i].showTooltip(mouseX, mouseY, 200, 100, colors[i], data.fish[i].label, `speed: ${data.fish[i].speed} km/h
// weight: ${data.fish[i].avgKg} kg`);

    push();
      rotate( PI);
      fill(220);
      textSize(18);
      // textAlign();
      text(data.getString(i, 'Año'), x, height-80);
      x += sep;
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
