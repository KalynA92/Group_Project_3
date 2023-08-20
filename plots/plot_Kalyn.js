/******************************************
 ********* Kalyn's Plot ******************
 *****************************************/
 const kurl = "https://raw.githubusercontent.com/KalynA92/Group_Project_3/main/Resources/cityshape.js";

// Promise Pending
const dataPromise = d3.json(kurl);
console.log("Data: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(kurl).then(function(data) {
  console.log(data);
});
