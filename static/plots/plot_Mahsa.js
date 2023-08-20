/******************************************
 ********* Mahsa's Plot ******************
 *****************************************/

/******** Data gathering **********/
const mahsaUrl = "https://raw.githubusercontent.com/KalynA92/Group_Project_3/main/Resources/dateFiveDates.json";

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
    // console.log("timeStamps", timeStamps);

    // Define a function that converts unix timestamps to datetime
    function dater(x) {
        let dateList = x.map(unix => `${(new Date(unix)).getDate()} - ${(new Date(unix)).getMonth()} - ${(new Date(unix)).getFullYear()}`);
        return dateList;
    };

    // Make a list of dates
    let dates = dater(timeStamps);
    console.log("dates: ", dates);

    // Add every date in the dates list as an option in the dropdown button
    let dropdown = d3.select(".MahsaDateOptions");
    for (let i = 0; i < dates.length; i++) {
        let option = dropdown.append("option").text(dates[i]).attr("id", "dates").attr("value", i);
    };

    // Introduce a chosen id variable 
    let choices = d3.select(".MahsaDateOptions");
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

        d3.select("#MahsaMapMe").html("<div id='MahsaMap'><div/>");
        //untroducing layers to map
        let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        });

        let streets = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        });

        let watercolor = L.tileLayer('http://stamen-tiles-d.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        });

        let terrain = L.tileLayer('http://stamen-tiles-c.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        });
        let map = L.map('MahsaMap', {
            center: data[0],
            zoom: 10,
            layers: [osm, streets, watercolor]
        });

        let baseMaps = {
            "OpenStreetMap": osm,
            "Mapbox Streets": streets,
            "Water Color": watercolor,
            "Terrain": terrain
        };

        let layerControl = L.control.layers(baseMaps).addTo(map);

        let markers = [];
        for (let i = 0; i < data.length; i++) {
            let marker = L.marker(data[i], { icon: ufoIcon }).addTo(map);
            marker.bindPopup(reports[i]).openPopup();
            markers.push(marker);
        };

    };

    /************ 3D plotly ************/
    // gathering the latitude, longitude, time and shape of reports on a date
    function getInfo(list) {
        /* A function to cateogorise the data by shape */
        let round = [];
        let pointy = [];
        let light = [];
        let others = [];
        for (let i = 0; i < list.length; i++) {
            target = list[i];
            let info = [];
            if (target.shape == "disk" || target.shape == "circle" || target.shape == "cigar" || target.shape == "sphere" || target.shape == "egg" || target.shape == "oval" || target.shape == "fireball" || target.shape == "cylinder") {
                info.push(target.latitude);
                info.push(target.longitude);
                let time = target.time;
                let splited = time.split(":");
                let hour = (parseInt(splited[0]));
                info.push(hour);
                round.push(info);
            }
            else if (target.shape == "triangle" || target.shape == "rectangle") {
                info.push(target.latitude);
                info.push(target.longitude);
                let time = target.time;
                let splited = time.split(":");
                let hour = (parseInt(splited[0]));
                info.push(hour);
                pointy.push(info);
            }
            else if (target.shape == "light" || target.shape == "flash") {
                info.push(target.latitude);
                info.push(target.longitude);
                let time = target.time;
                let splited = time.split(":");
                let hour = (parseInt(splited[0]));
                info.push(hour);
                light.push(info);
            }
            else {
                info.push(target.latitude);
                info.push(target.longitude);
                let time = target.time;
                let splited = time.split(":");
                let hour = (parseInt(splited[0]));
                info.push(hour);
                others.push(info);
            };
        };
        let shapes = [round, pointy, light, others];
        return shapes;
    };
    console.log(getInfo(dateOne));
    // function to make the plotly plot with a date
    function plotIt(ID) {
        let dateInfo = [];
        if (ID == 0) {
            dateInfo = dateOne;
        }
        else if (ID == 1) {
            dateInfo = dateTwo;
        }
        else if (ID == 2) {
            dateInfo = dateThree;
        }
        else if (ID == 3) {
            dateInfo = dateFour;
        }
        else if (ID == 4) {
            dateInfo = dateFive;
        };
        let plotInfo = getInfo(dateInfo);
        let round = plotInfo[0];
        let pointy = plotInfo[1];
        let light = plotInfo[2];
        let other = plotInfo[3];
        console.log("round", round.length)
        console.log("pointy", pointy.length)
        console.log("light", light.length)
        console.log("other", other.length)
        let x1 = round.map(sublist => sublist[0]);
        let y1 = round.map(sublist => sublist[1]);
        let z1 = round.map(sublist => sublist[2]);
        let x2 = pointy.map(sublist => sublist[0]);
        let y2 = pointy.map(sublist => sublist[1]);
        let z2 = pointy.map(sublist => sublist[2]);
        let x3 = light.map(sublist => sublist[0]);
        let y3 = light.map(sublist => sublist[1]);
        let z3 = light.map(sublist => sublist[2]);
        let x4 = other.map(sublist => sublist[0]);
        let y4 = other.map(sublist => sublist[1]);
        let z4 = other.map(sublist => sublist[2]);
        console.log("others", other);
        console.log("round", round);
        console.log("x1", x1);
        console.log(y1);
        console.log(z1);
        // ploting the plot
        let trace0 = {
            x: x1, y: y1, z: z1,
            mode: 'markers',
            marker: {
                size: 20,
                color: 'rgb(238, 5, 242)',
                line: {
                    color: 'rgba(238, 5, 242, 0.14)',
                    width: 1
                },
                opacity: 0.6
            },
            type: 'scatter3d'
        };
        let trace1 = {
            x: x2, y: y2, z: z2,
            mode: 'markers',
            marker: {
                size: 20,
                color: 'rgb(31, 8, 2)',
                line: {
                    color: 'rgba(5, 242, 219, 0.14)',
                    width: 1
                },
                opacity: 0.6
            },
            type: 'scatter3d'
        };
        let trace2 = {
            x: x3, y: y3, z: z3,
            mode: 'markers',
            marker: {
                size: 20,
                color: 'rgb(147, 204, 24)',
                line: {
                    color: 'rgba(69, 72, 140, 0.14)',
                    width: 1
                },
                opacity: 0.6
            },
            type: 'scatter3d'
        };
        let trace3 = {
            x: x4, y: y4, z: z4,
            mode: 'markers',
            marker: {
                size: 20,
                color: 'rgb(29, 130, 242)',
                line: {
                    color: 'rgba(217, 37, 37, 0.14)',
                    width: 1
                },
                opacity: 0.6
            },
            type: 'scatter3d'
        };


        let data = [trace0, trace1, trace2, trace3];
        let layout = {
            title: "Location Time vs Reported Shape",
            margin: {
                l: 10,
                r: 10,
                b: 10,
                t: 100
            },
            xaxis: { title: "Latitude" },
            yaxis: { title: "Longityde" },
            zaxis: { title: "Hour" }

        };
        Plotly.newPlot('mahsa_plotly', data, layout);
    };
    // logic plotly plots
    // rubic plot
    let intensity = [0, 0.14285714285714285, 0.2857142857142857, 0.42857142857142855, 0.5714285714285714, 0.7142857142857143, 0.8571428571428571, 1];

    let dataLogic = [{
        type: "mesh3d",
        x: [0, 0, 1, 1, 0, 0, 1, 1],
        y: [0, 1, 1, 0, 0, 1, 1, 0],
        z: [0, 0, 0, 0, 1, 1, 1, 1],
        i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
        j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
        k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
        intensity: intensity,
        colorscale: [
            [0, 'rgb(117, 117, 117)'],
            [0.5, 'rgb(175, 177, 174)'],
            [1, 'rgb(216, 216, 216)']
        ]
    }
    ];
    Plotly.newPlot('MahsaLogic1', dataLogic, {});
    // Make the map update on change dates
    d3.selectAll(".MahsaDateOptions").on("change", function () {
        let ID = this.options[this.selectedIndex].value; // Get the choisen id
        mapMe(parseInt(ID));
        plotIt(parseInt(ID));
    });

    mapMe(parseInt(chosenId)); // Call the mapper for the preload map
    plotIt(parseInt(chosenId));

});

