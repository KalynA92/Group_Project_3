
  let apiCountry;
  let apiStates;
  let barData = {};
  
const getData = async () => {
    apiCountry =  await (await fetch('/api/ufo_data')).json();
    apiStates =  await (await fetch('/api/states')).json();

    Object.values(apiCountry).forEach(val => {
        if(!Object.keys(barData).includes(val)) {
            barData[val] = 0;
        };
        
        barData[val] += 1
    })

    console.log(apiCountry);

    var data = [
        {
          x: Object.keys(barData),
          y: Object.values(barData),
          type: 'bar'
        }
      ];
      
      Plotly.newPlot('countriesChart', data);

    var data2 = [
        {
          x: Object.keys(apiStates),
          y: Object.values(apiStates),
        }
      ];
      
      Plotly.newPlot('statesChart', data2);
};

getData();

  