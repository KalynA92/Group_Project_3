/******************************************
 ********* Mahsa's Plot ******************
 *****************************************/

/******** Data gathering **********/
const mahsaUrl = "https://raw.githubusercontent.com/KalynA92/Group_Project_3/main/Resources/dateOne.json";

d3.json(mahsaUrl).then(function (data) {  // Creat a read function and do all th plotting in it.
    console.log("data: ", data);

    // Seperate the data to the five targeted dates
    let dateOne = data.dataOne;
    console.log("dateOne: ", dateOne);

    let dateTwo = data.dateTwo;
    console.log("dateTwo: ", dateTwo);

    let dateThree = data.dateThree;
    console.log("dateThree: ", dateThree);

    let dateFour = data.dateFour;
    console.log("dateFour: ", dateFour);

    let dateFive = data.dateFive;
    console.log("dateFive: ", dateFive);

    // Add all every date's timestamp to an array
    let timeStamps = [];
    timeStamps.push(dateOne[0].timestamp);
    timeStamps.push(dateTwo[0].timestamp);
    timeStamps.push(dateThree[0].timestamp);
    timeStamps.push(dateFour[0].timestamp);
    timeStamps.push(dateFive[0].timestamp);
    console.log("timeStamps", timeStamps);

    // Define a function that converts unix timestamps to datetime
    function dater(x) {
        let dateList = x.map(unix => `${(new Date(unix)).getDate()} - ${(new Date(unix)).getMonth()} - ${(new Date(unix)).getFullYear()}`);
        return dateList;
    };

    // Make a list of dates
    let dates = dater(timeStamps);
    console.log("dates: ", dates);

    // Add every date in the dates list as an option in the dropdown button
    let dropdown = d3.select(".dateOptions");
    for (let i = 0; i < dates.length; i++) {
        let option = dropdown.append("option").text(dates[i]).attr("id", "dates").attr("value", i);
    };

    // Introduce a chosen id variable 
    let choices = d3.select(".dateOptions");
    let chosenId = choices.node().value;

    // Get the all reported data of chosen date
    function reporter(ID) {
        let report = []
        if (ID === 0) {
            report = dateOne;
        }
        else if (ID === 1) {
            report = dateTwo;
        }
        else if (ID === 2) {
            report = dateThree;
        }
        else if (ID === 3) {
            report = dateFour;
        }
        else if (ID === 4) {
            report = dateFive;
        }
        let metadata = [];
        for (let i = 0; i < report.length; i++) {
            let d = report[i]
            let datetime = new Date(d.timestamp);
            let city = d.city;
            let country = d.country;
            let shape = d.shape;
            let comment = d.comments;
            let text = `${datetime}<br/> ${city}, ${country}<br/>Reported Shape: ${shape}<br/>Comment: <br/>${comment}`;
            metadata.push(text);
        }
        return metadata;
    };

    /************ Leaflet map ************/
    // Gathering the Location data
    function getLocate(list) {
        let geodata = [];
        for (let i = 0; i < list.length; i++) {
            target = list[i];
            let cordination = [];
            cordination.push(target.latitude);
            cordination.push(target.longitude);
            geodata.push(cordination);
        };
        return geodata;
    };

    // Gather the cordinations of all five dates 
    let geoOne = getLocate(dateOne);
    console.log("geoOne", geoOne);
    let geoTwo = getLocate(dateTwo);
    console.log("geoTwo", geoTwo);
    let geoThree = getLocate(dateThree);
    console.log("geoThree", geoThree);
    let geoFour = getLocate(dateFour);
    console.log("geoFour", geoFour);
    let geoFive = getLocate(dateFive);
    console.log("geoFive", geoFive);

    // marker
    let ufoIcon = L.icon({
        iconUrl: 'UFO.png',
        iconSize: [38, 38], // size of the icon
    });

    // Make a function that create the maps
    let map;
    function mapMe(ID) {
        let reports = reporter(ID);
        let data = [];
        if (ID === 0) {
            data = geoOne;
        }
        else if (ID === 1) {
            data = geoTwo;
        }
        else if (ID === 2) {
            data = geoThree;
        }
        else if (ID === 3) {
            data = geoFour;
        }
        else if (ID === 4) {
            data = geoFive;
        };
        
        d3.select("#mapme").html("<div id='map'><div/>");
        let map = L.map('map').setView(data[0], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);
        let markers = [];
        for (let i = 0; i < data.length; i++) {
            let marker = L.marker(data[i], { icon: ufoIcon }).addTo(map);
            marker.bindPopup(reports[i]).openPopup();
            markers.push(marker);
        };

    };

    // Make the map update on change dates
    d3.selectAll(".dateOptions").on("change", function(){
        let ID = this.options[this.selectedIndex].value; // Get the choisen id
        mapMe(parseInt(ID));
    });

    mapMe(parseInt(chosenId)); // Call the mapper for the preload map

});

