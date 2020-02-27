
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
  // https://datos.gob.mx/busca/dataset/indicadores-de-crecimiento-verde--produccion-y-consumo/resource/034560ad-61ac-43a0-81de-bf6706acc8b0
  loadJSON('../../data/mx_residuos-solidos.json', gotData);
  createCanvas(windowWidth, windowHeight);
}

function gotData(json) {
  data = json.residuos;
  num = data.length;


  for (let i = 0; i<num; i++) {
    sizes.push(data[i].toneladas_totales);
    speeds.push(data[i].kg_persona_diario);

    // generar un nuevo color aleatorio cada ciclo
    let newCol = color(random(100, 150),random(100, 200),random(100,200), 255);
    // empujar cada nuevo color al array de colors
    colors.push(newCol);
    }
    console.log(colors);

    maxSize = max(sizes);
    minSize = min(sizes);

    minSpeed = min(speeds);
    maxSpeed = max(speeds);

    console.log("sizes:" + sizes);
    console.log("min/max:" + minSize + " " + maxSize);
    console.log("speeds:" + speeds);
    console.log("min/max:" + minSpeed + " " + maxSpeed);



  scale = 0.17; // escala por la que se multiplicará el tamaño de los objetos
  sep = width/num;
  let x = sqrt(minSize)*scale;
  let y = 0;

  for (let i = 0; i<num; i++) {
    // para encontrar el diámetro, se debe encontrar el radio primero r = √ (A / PI)
    let size = sqrt(data[i].toneladas_totales)*scale; // multiplicarlo por 2 y por la escala
    let speed = map(data[i].kg_persona_diario, minSpeed, maxSpeed, 1, 3);
    boliza[i] = new Bola(x, y, size, speed);
    // boliza[i].randomColor(random(200),random(100),random(200),80);
    boliza[i].setColor(colors[i]);
    boliza[i].setLabelColor(220,220,220,255);
    x += sep;
  }
}


function draw() {
  background(0,10,20);

  let title = "Toneladas de residuos sólidos urbanos generadas 1992-2012";
  let subtitle = "Fuente: SEMARNAT";

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
    if (boliza[i].y < height - boliza[i].size*15) {
      boliza[i].move(0,5);
    } else {
      boliza[i].move(0,0);
    }
    // boliza[i].showLabel("bola", 24);
    let labelSize = map(data[i].toneladas_totales, minSize, maxSize, 8, 28);
    boliza[i].showLabel(round(data[i].toneladas_totales/1000) + "ton", labelSize, 0, 0);
  }
  // console.log(bolas);
  //console.log(boliza[3].speed);
  let x = sqrt(minSize)*scale;

  for (let i = 0; i<num; i++) {
    boliza[i].highlight(mouseX, mouseY, 220, colors[i]);
    boliza[i].showTooltip(mouseX, mouseY, 200, 150, colors[i], data[i].año,
      `${data[i].toneladas_totales} toneladas \n ${data[i].kg_persona_diario}kg al día \n por persona`);
      // "toneladas: " + data[i].kg_persona_diario + "km/h" + "\n" + "weight:" + data[i].toneladas_totales + "kg" );
//     barriza[i].showTooltip(mouseX, mouseY, 200, 100, colors[i], data.fish[i].label, `speed: ${data.fish[i].speed} km/h
// weight: ${data.fish[i].avgKg} kg`);
    fill(220);
    textSize(18);
    // textAlign();
    text(data[i].año, x, height-80);
    x += sep;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
