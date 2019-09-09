let rings;
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

  setInterval(incrementIndex,3000);

}

ranges = {
  "range1" : {"minimum":1500, "maximum":1600},
  "range2" : {"minimum":1600, "maximum":1700},
  "range3" : {"minimum":1700, "maximum":1800},
  "range4" : {"minimum":1800, "maximum":1900},
  "range5" : {"minimum":1900, "maximum":2000}
}

// The Key Values for the Object Ranges, these refer to which range we want to limit
rangeNames = ["range1","range2","range3","range4","range5"]

currentRangeIndex = 1
//Callback function for settimeout
function incrementIndex() {
  if (currentRangeIndex == rangeNames.length - 1) {
      currentRangeIndex = 0;
  } else {
      currentRangeIndex++;
  }

}

function classifyData(){
  console.log("Classifying data")
  for (let i = 0; i < rings.getRowCount(); i++) {
    let rowYear = parseInt(rings.getRow(i).get('year'));
    // Current Range that we want to limit
    let currentRange = rangeNames[currentRangeIndex]
    let minimum = ranges[currentRange].minimum
    let maximum = ranges[currentRange].maximum
    // console.log("Comparing year " + rowYear + " with maximum : "+ maximum)
    if ( rowYear < maximum) {
      const timescale = map(+rings.getRow(i).get('year'), 1579, 2000, margin, width - margin)
      const growthscale = map(+rings.getRow(i).get('RawRingWidth_mm'), 0, 2.13, height - margin, margin)
      ellipse(timescale, growthscale, 10, 10);
    }
  }
}


function draw() {
  background(0)
  noStroke()
  classifyData();

}
