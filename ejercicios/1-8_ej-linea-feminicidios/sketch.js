// Data from: https://data.giss.nasa.gov/gistemp/
// Mean from: https://earthobservatory.nasa.gov/world-of-change/DecadalTemp

let data;
let values = [];
let rows = [];
let labels = [];
let minVal;
let maxVal;
let linea;

// function preload() {
//   table = loadTable('../../data/mx_salariominimo_1877-2019.csv', 'header');
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadTable("../../data/jal_feminicidios-2015-2019_01-totalnov2019.csv", "csv", "header", gotData);
  background(0);
}

function gotData(csv) {
    data = csv;
    console.log(data);
    num = data.getRowCount();

    for (let i = 0; i < data.getRowCount(); i++) {
      let row = data.getRow(i);
      let val = parseInt(row.getString('Total'));
      if (val) {
        values.push(val);
        labels.push(row.getString('Año') + "\n" + val + " feminicidios");
      } else {
        values.push(0);
        labels.push(row.getString('Año') + "\n" + "sin datos")
      }
      rows.push(row);
    }
    console.log("values" + values);
    console.log("rows:" + rows);
    console.log(labels);

    minVal = min(values);
    maxVal = max(values);

    console.log(minVal);
    console.log(maxVal);

    let strokeCol = color(250,50,100);
    let fillCol = color(0,0);

    linea = new Linea(values, rows, num, minVal, maxVal, 100, width-100, 150, height-100);
    linea.setColor(strokeCol, fillCol);
    linea.show();
    linea.showLabel(labels, 12, 20);
}


function draw() {
  // background(0);
  //
  let title = "Víctimas de feminicidio en Jalisco 2015-2019";
  let subtitle = "Fuente: SESNSP (Datos hasta noviembre 2019)";

  noStroke();
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

  linea.showLabel(labels, 28);
}
