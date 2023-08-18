/******************************************
 ********* Kalyn's Plot ******************
 *****************************************/

/******** Data gathering **********/
console.log(shapes);

let frequencyOfShape = data.sort((a, b) => b.Totals - a.Totals)

let trace1 = {
    x: shapes.map(row => row.Shape),
    y: shapes.map(row => row.Totals),
    type:"bar"
};

let traceShapes = [trace1];

let layout = {
    title: "Frequency of Shapes for Most active date"
};

Plotly.newPLot("plot", traceShapes, layout);