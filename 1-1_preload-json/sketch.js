let boliza = [];
let data;
let num;

function preload() {
  data = loadJSON('../data/fastest-marine-animals.json');
}

function setup() {
  num = data.fish.length;
  // createCanvas(600, 600);
  createCanvas(windowyWidth, windowHeight);

  // for (let i = 0; i<num; i++) {
  for (let i = 0; i<num; i++) {
    // let x = 10*i+ 10;
    let x = 0;
    // let size = map(data[i], min(data), max(data), 150, 30);
    let size = map(data.fish[i].avgKg, 55, 650, 100, 150);
    // let speed = map(data[i], min(data), max(data), 1, 3);
    let speed = map(data.fish[i].speed, 70, 130, 1, 3);
    boliza[i] = new Bola(x, height/2, size, speed);
    boliza[i].randomColor(random(200),random(100),random(200),80);
  }
}

function draw() {
  background(0,10,20);
  fill(0);

  for (let i = 0; i<num; i++) {
    boliza[i].show();
    boliza[i].moveRandom(1,random(-2,2));
    boliza[i].bounce();
    // boliza[i].showLabel("bola", 24);
    boliza[i].showLabel(data.fish[i].label, 24);
  }
  // console.log(bolas);
  //console.log(boliza[3].speed);
}


class Bola {
  constructor(x, y, size, speed) {
    this.category = "bola";
    this.col = 0;
    this.light = 200;
    this.speed = speed;
    this.speedX = speed;
    this.speedY = speed;
    this.x = x;
    this.y = y;
    this.size = size;
    this.sym = Symbol();
  };

  show() {
    noStroke();
    fill(this.col)
    ellipse(this.x, this.y, this.size, this.size);
  };
  moveRandom(randX, randY) {
    this.x = this.x + randX*this.speed;
    this.y = this.y + randY*this.speed;
  };
  move(){
    this.x+=this.speedX;
    this.y+=random(-this.speedY, this.speedY);
  };
  style() {
    // styleA {}
    // styleB {}
  };
  bounce() {
    if (this.x >= width || this.x<=0) {
      this.speed = this.speed* -1;
    }

    if (this.y > height || this.y<=0) {
      this.speed*=-1;
    }

  };
  randomColor(r,g,b,a) {
    this.col = color(random(this.light, r), random(this.light, g), random(this.light,b), a);
  };
  showLabel(label, labelSize) {
    textSize(labelSize);
    textAlign(CENTER, CENTER);
    fill(random(100,255), random(100, 200), random(100, 255), 255);
    text(label, this.x, this.y);
  }
}
