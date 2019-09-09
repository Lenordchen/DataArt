let rings;
let circles = [];
let margin = 40;

function preload() {
  // Use preload to have the data read in by the time you run the setup() code
  rings = loadTable("../data/HemlockData.csv", "csv", "header");
}

function setup() {
  createCanvas(1200, 800)

  console.log(rings.getRowCount() + " total rows in table");
  console.log(rings.getColumnCount() + " total columns in table");

  console.log(rings.getObject());

  console.log(rings.getArray());

  console.log(rings.getRows());

}


function classifyData(){

  for (let i = 0; i < rings.getRowCount(); i++) {

      const timescale = map(+rings.getRow(i).get('year'), 1579, 2000, margin, width - margin)
      const growthscale = map(+rings.getRow(i).get('RawRingWidth_mm'), 0, 2.13, height - margin, margin)
      const c = new Circle(timescale, growthscale, 10, 10);
      circles.push(c);
    if (rings.getRow(i).get('RawRingWidth_mm')>0 && rings.getRow(i).get('RawRingWidth_mm')<1) {
       // fill(255,204,0);
       // ellipse(timescale, growthscale, 10, 10);
       circles[i].show();
       circles[i].fade();
    }
    else {
      fill(51);
      ellipse(timescale, growthscale, 10,10);
      // circles[i].show();
      // circles[i].fade();

    }
  }
}


function draw() {
  background(0)
  noStroke()
  classifyData();

}

function Circle (x, y, r, trans, dtrans) {
   this.x = x;
   this.y = y;
   this.r = r;
   this.trans = random (0,1);
   this.dtrans = -0.01;

   this.show = function() {
     fill(220,220,220,map(this.trans, 0,1,0,255));
     noStroke();
     ellipse(this.x, this.y, this.r);
   }

   this.fade = function() {
       if (this.r == 10) {
         this.trans += this.dtrans;
       if (this.trans <= 0) {
         this.dtrans = -this.dtrans;
       } else if (this.trans >= 1) {
         this.dtrans = -this.dtrans;

       }
     }

 }
}
