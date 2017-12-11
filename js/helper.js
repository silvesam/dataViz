/////// HELPER FUNCTIONS  ////////////////////////////////////
//transfrom csv to list of countries
function createCountryList(data){
    var countries = [];
    for (idx in data){
        var countryName = data[idx][0];
        countries.push(countryName);      
    }
    return countries;
}

function lifeExp(data){
    var lifeExp = ['Life expectancy at birth, total (years)'];
    for (idx in data){
        var value = data[idx].Value;
        lifeExp.push(value);      
    }
    return lifeExp;
}

function createLifeExpList(data, year){
    var lifeExp = ['Life expectancy at birth in ' + year];
    var string = "Year:"+year; 
    for (idx in data){
        //var value = data[idx][string];
        var value = data[idx][1];
        lifeExp.push(value);      
    }
    return lifeExp;
}

function createAllBars(key, value){
    var chart = c3.generate({
    bindto: '#chart',
    size: {
        height: 400
    },
    data: {
        columns: [
            value
        ],
        type: 'bar'
    },
    axis: {
        x: {
            label: {
                text: 'X: countries',
                position: 'outer-right'
            },
            type: 'category',
            categories: key,
            tick: {
                // fit: true,
                rotate: 90,
                multiline: false
            },
            height: 100
        }
    },
    bar: {
            width: {
                ratio: 0.2 // this makes bar width 50% of length between ticks
            }
        }
    });

}

// function createExampleBar(){
//     var chart = c3.generate({
//     bindto: '#example',
//     data: {
//         columns: [
//             ['indicator1', 30,40,80],
//             ['indicator2', 130,200,300],
//             ['indicator3', 130,20,80]
//         ],
//         type: 'bar',
//         order: 'desc'
//     },
//     axis: {
//         x: {
//             label: {
//                 text: 'X: countries',
//                 position: 'outer-right'
//             },
//             type: 'category',
//             categories:['Country1','Country2','Country3'],
//             // tick: {
//             //     // fit: true,
//             //     rotate: 90,
//             //     multiline: false
//             // },
//             height: 100
//         }
//     },
//     bar: {
//             width: {
//                 ratio: 0.5 // this makes bar width 50% of length between ticks
//             }
//         }
//     });
// }


//Janet's helper.js
function create(lst, countryName){
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Life Expectancy Time Chart: "+countryName
        },
        axisY:{
            includeZero: false,
            title: 'life expectancy in years'
        },
        axisX:{
            valueFormatString: "#0",
            title: 'Year'
        },
        toolTip:{
            content: "{x}: {y}"
        },

        data: [{        
            type: "line",      
            dataPoints: lst,
            xValueFormatString: '####'

            //lst.slice(2,240)
             // [{x:12, y:312},{x:23, y:124},{x:43,y:231}]
            // [
            //  { x: 1960, y: 34},
            //  { x: 1970, y: 56},
            //  { x: 1980, y: 87, indexLabel: "highest",markerColor: "red", markerType: "triangle" },
                // { y: 410 , indexLabel: "lowest",markerColor: "DarkSlateGrey", markerType: "cross" },
                // { y: 510 }
            // ]
        }]
    });
    chart.render();
}