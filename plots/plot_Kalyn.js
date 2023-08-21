/******************************************
 ********* Kalyn's Plot ******************
 *****************************************/
 const kurl = "https://raw.githubusercontent.com/KalynA92/Group_Project_3/main/Resources/cityshape.js";
 
// Fetch the JSON data and console log it
d3.json(kurl).then(function(data) {
  console.log(data);

  console.log("shape", data[0].Shape); 

  let xValue = [data[0].Shape, data[1].Shape, data[2].Shape, data[3].Shape, data[4].Shape, data[5].Shape, data[6].Shape];

  let yValue = [data[0].Totals, data[1].Totals, data[2].Totals, data[3].Totals, data[4].Totals, data[5].Totals, data[6].Totals];
  
  let trace1 = {
    x: xValue,
    y: yValue,
    type: 'bar',
    text: yValue.map(String),
    textposition: 'auto',
    hoverinfo: 'none',
    marker: {
      color: 'rgb(158,202,225)',
      opacity: 0.6,
      line: {
        color: 'rgb(8,48,107)',
        width: 1.5
      }
    }
  };
  
  let plotData = [trace1];
  
  let layout = {
    title: 'Reported Shapes for Most Active Date',
    barmode: 'stack'
  };
  
  Plotly.newPlot('plot', plotData, layout);

});

const kurl2 = "https://raw.githubusercontent.com/KalynA92/Group_Project_3/main/Resources/yearlysightings.js";

d3.json(kurl2).then(function(data2) {
  console.log(data2);

  console.log("Year", data2[0].Year)

  let xValue2 = [data2[0].Year, data2[1].Year, data2[2].Year, data2[3].Year, data2[4].Year, data2[5].Year, data2[6].Year, data2[7].Year, data2[8].Year, data2[9].Year, data2[10].Year, data2[11].Year, data2[12].Year, data2[13].Year, data2[14].Year, data2[15].Year, data2[16].Year, data2[17].Year, data2[18].Year, data2[19].Year, data2[20].Year, data2[21].Year, data2[22].Year, data2[23].Year, data2[24].Year, data2[25].Year, data2[26].Year, data2[27].Year, data2[28].Year, data2[29].Year, data2[30].Year, data2[31].Year, data2[32].Year, data2[33].Year, data2[34].Year, data2[35].Year, data2[36].Year, data2[37].Year, data2[38].Year, data2[39].Year,  data2[40].Year, data2[41].Year, data2[42].Year, data2[43].Year, data2[44].Year, data2[45].Year, data2[46].Year, data2[47].Year, data2[48].Year, data2[49].Year, data2[50].Year, data2[51].Year, data2[52].Year, data2[53].Year, data2[54].Year, data2[55].Year, data2[56].Year, data2[57].Year, data2[58].Year, data2[59].Year, data2[60].Year, data2[61].Year, data2[62].Year, data2[63].Year, data2[64].Year, data2[65].Year, data2[66].Year, data2[67].Year, data2[68].Year, data2[69].Year, data2[70].Year, data2[71].Year, data2[72].Year, data2[73].Year, data2[74].Year, data2[75].Year, data2[76].Year, data2[77].Year, data2[78].Year, data2[79].Year, data2[80].Year, data2[81].Year, data2[82].Year] 

  let yValue2 = [2, 1, 1, 1, 2, 1, 2, 2, 3, 1, 2, 1, 3, 7, 9, 31, 7, 15, 21, 14, 38, 26, 39, 24, 38, 60, 43, 55, 42, 57, 71, 76, 163, 166, 147, 177, 127, 115, 100, 125, 190, 222, 255, 221, 216, 266, 193, 200, 136, 139, 125, 148, 178, 152, 182, 193, 202, 203, 185, 191, 236, 332, 431, 459, 1013,1455, 2288, 2249, 2548, 2564, 3209, 3466, 3374, 3001, 3604, 4089, 3743, 3645, 4456, 6489, 6237, 1973]
    
  let trace1 = {
    x: xValue2,
    y: yValue2,
    mode: 'lines+markers'
  };
  let frequency = [trace1];

  let layout = {
    title: "UFO Sightings per Year 1910 to 2004",
    
    xaxis: {
      title: 'Years'
    },
    yaxis: {
      title: 'UFO Sightings'
    },

  };

  
  Plotly.newPlot('plot', frequency);


  let tv = {
    x: ['disk', 'light', 'cigar', 'circle', 'fireball', 'egg', 'oval'],
    y: [7, 5, 3, 3, 3, 3, 2, 1],
    name: 'Tv Data',
    type: 'bar'
  };
  
  let apollo = {
    x: ['disk', 'circle', 'light', 'oval', 'other', 'cigar', 'sphere', 'unknown', 'cylinder', 'formation, changing', 'egg'],
    y: [31, 14, 13, 13, 10, 9, 8, 6, 5, 4, 2, 2],
    name: 'Moon landing data',
    type: 'bar'
  };

  let starwars = {
    x: ['disk', 'triangle', 'light', 'circle', 'cigar', 'oval', 'Sphere', 'other', 'unknown', 'chevron', 'changes', 'diamond', 'rectangle', 'cylinder', 'fireball', 'formation', 'flash', 'egg', 'cone'],
    y: [46, 34, 21, 19, 15, 15, 14, 14, 10, 6, 4, 3, 3, 3, 3, 2, 2, 2, 2, 1],
    name: 'A  New Hope data',    
    type: 'bar'
  };
  
  let analysis = [tv, apollo, starwars];
  
  let design = {barmode: 'group'};
    
  
  Plotly.newPlot('plot', analysis, design);


}
);

