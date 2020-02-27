
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


  for (let i = 0; i<num; i++) {
    sizes.push(data[i].avgKg);
    speeds.push(data[i].speed);
    }

    maxSize = max(sizes);
    minSize = min(sizes);

    minSpeed = min(speeds);
    maxSpeed = max(speeds);

    console.log("sizes:" + sizes);
    console.log("min/max:" + minSize + " " + maxSize);
    console.log("speeds:" + speeds);
    console.log("min/max:" + minSpeed + " " + maxSpeed);



  let scale = 2; // escala por la que se multiplicará el tamaño de los objetos

  for (let i = 0; i<num; i++) {
    let x = 0;
    // para encontrar el diámetro, se debe encontrar el radio primero r = √ (A / PI)
    let size = sqrt(data[i].avgKg/PI)*2*scale; // multiplicarlo por 2 y por la escala
    let speed = map(data[i].speed, minSpeed, maxSpeed, 1, 3);
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
    let labelSize = map(data[i].avgKg, minSize, maxSize, 12, 36);
    boliza[i].showLabel(data[i].label, labelSize, 0, 0);
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
