/////// HELPER FUNCTIONS  ////////////////////////////////////
//transfrom csv to list of countries
function createCountryList(data){
    var countries = [];
    for (idx in data){
        var countryName = data[idx].CountryName;
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
        var value = data[idx][string];
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

function createExampleBar(){
    var chart = c3.generate({
    bindto: '#example',
    data: {
        columns: [
            ['indicator1', 30,40,80],
            ['indicator2', 130,200,300],
            ['indicator3', 130,20,80]
        ],
        type: 'bar',
        order: 'desc'
    },
    axis: {
        x: {
            label: {
                text: 'X: countries',
                position: 'outer-right'
            },
            type: 'category',
            categories:['Country1','Country2','Country3'],
            // tick: {
            //     // fit: true,
            //     rotate: 90,
            //     multiline: false
            // },
            height: 100
        }
    },
    bar: {
            width: {
                ratio: 0.5 // this makes bar width 50% of length between ticks
            }
        }
    });
}