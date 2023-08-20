/******************************************
 ********* Kalyn's Plot ******************
 *****************************************/
 const kurl = "https://raw.githubusercontent.com/KalynA92/Group_Project_3/main/Resources/cityshape.js";

// Promise Pending
const dataPromise = d3.json(kurl);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});