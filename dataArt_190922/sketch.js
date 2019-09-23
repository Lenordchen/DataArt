let miss;
let margin = 40;
let avg;

function preload() {
  miss = loadTable("rawData.csv", "csv", "header");
}

function setup() {
   createCanvas(1200,800);
   background(0)
   noStroke()
   fill(255, 180)

   console.log(miss.getRowCount() + " total rows in table");
   console.log(miss.getColumnCount() + " total columns in table");

   // how do we want to work with our Table Data?
   console.log(miss.getObject());

   console.log(miss.getArray());

   console.log(miss.getRows());

   console.log(miss.getColumn('Day '));

   console.log(miss.getArray()[0]);

   const firstDay = d3.min(miss.getColumn('Day '), d => +d);
   const lastDay = d3.max(miss.getColumn('Day '), d => +d);

   console.log(firstDay);
   console.log(lastDay);

   const bins = [];
   let binCount = 0;
   const interval = 1;
   // let avg = [];


   for (let i = 0; i < miss.getArray().length; i++) {

     //console.log(miss.getArray()[i]);
     const firstE = miss.getArray()[i].shift();
     const arr = miss.getArray()[i]
     const result = d3.sum(arr);
     // avg.push(result / arr.length);
     // console.log(avg);
     const avg = result / arr.length;

     bins.push({
       binNum : binCount,
       minDay : i,
       maxDay : i + interval,
       intensity: avg
     })
      binCount++;
      console.log(bins[i].maxDay);
   }

   let intensities = [];

   bins.forEach(function(bin){
     intensities.push(bin.intensity);
   });

  let rmin = Math.min(...intensities);
  let rmax = Math.max(...intensities);

   console.log(rmin);
   console.log(intensities);


   //let rmin = Math.min(bins.intensity);
   //console.log(rmin);

   for (let i = 0; i < bins.length; i++) {
     const timescale = map(+bins[i].maxDay, 1, 14, margin, width - margin)
     console.log(timescale);
     const growthscale = 100;
     console.log(growthscale);
     let bin = bins[i];
     // let rmin = Math.min(bin.intensity);
     // console.log(rmin);
     let r = map(bin.intensity, rmin, rmax, rmin*10, rmax*10);
     console.log(r);
     fill(255,204,0);
     ellipse(timescale, growthscale, r, r)
     console.log(ellipse);
   }

     console.log(bins);


}
