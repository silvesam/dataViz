var theData;
$(document).ready(function(){
	queue()
        .defer(d3.json, '/d3-geomap/topojson/world/countries.json')
        .defer(d3.csv, 'data/life_expectancy_parsed_excel.csv')
        .await(ready);

        yearSlider = 'Year:2012';
        year = '2012';

        $("#timeslide").on("input", function() {

    		$('#range').html('Year: '+$(this).val());
		});
		$("#timeslide").on("mouseup", function() {
			yearSlider = 'Year:'+$(this).val();
			year = ($(this).val()).toString();
			console.log('yearslider val: ', yearSlider)
			d3.select('#map').html(null);
			var mapUpdate = return_map(yearSlider);
			draw_map(mapUpdate);

			d3.select('#chart').html(null);
			sorted_data = sort_desc(theData, yearSlider);
			var countries = createCountryList(sorted_data);
			var newlifeExp = createLifeExpList(sorted_data, year);
			createAllBars (countries, newlifeExp);
    		
		});

		$('#countrySelect').on('change', function(event){countryLine(theData)});
})


function ready(error, countries, data){

	var map = return_map(yearSlider);
	draw_map(map);

	//barchart
	sorted_data = sort_desc(data, yearSlider);
	var countries = createCountryList(sorted_data);
	var lifeExp = createLifeExpList(sorted_data, "2012");
	createAllBars (countries,lifeExp);

	theData = data;
	//theCountries = countries;
	//return data;

	//create dropdown options
	var options = []
	for(var i=0; i<data.length; i++){
		if(data[i][yearSlider] !=0){
			var opt = document.createElement('option');
		    opt.innerHTML = data[i].CountryName;
		    opt.value = i;
			options.push(opt);
		}
	}
	$('#countrySelect').append(options);

}

function return_map(column_name){
	var format = function(d){
		return Math.round(d) + ' yrs';
	}
	var map = d3.geomap.choropleth()
	    .geofile('/d3-geomap/topojson/world/countries.json')
	    .colors(colorbrewer.YlGnBu[7])
	    .column(column_name)
	    .domain([30, 40, 50, 60, 70, 80])
	    .legend(true)
	    .format(format)
	    .valueScale(d3.scale.threshold)
	    .unitId('CountryCode');

	//console.log('MAP mi max: ', map)
	return map;
}

function draw_map(map){
	d3.csv('/data/life_expectancy_parsed_excel.csv', function(error, data) {
		//map = return_map(yearSlider);
	    d3.select('#map')
	        .datum(data)
	        .call(map.draw, map);
	});
}

function sort_desc(data, yearSlider){
	var json = {};
	for(var i=0; i<data.length; i++){
		if(data[i][yearSlider] !=0){
			json[[data[i].CountryName]] = data[i][yearSlider];
		}
		
	}

	keysSorted = Object.keys(json).sort(function(a,b){
		//console.log('a and b are: ', a, b)
		// console.log('jason[a]: ', json[a])
		// console.log('jason[b]: ', json[b])
		// console.log('sub: ' , parseInt(json[a])-parseInt(json[b]))

		return parseFloat(json[a])-parseFloat(json[b])
		
	})

	sortedlife = []
	for(var i=0; i< keysSorted.length; i++){
		sortedlife.push([keysSorted[i], json[keysSorted[i]]])

	}
	//console.log('final json: ', json);
	//console.log('SORTED: ', sortedlife)

	return sortedlife;
}

function countryLine(data){
	$('#chartContainer').html(null);
	var selected = parseInt($('#countrySelect').val());
	console.log('Selected Country: ', selected, $('#countrySelect :selected').text())
	//console.log('data: ', data)
	console.log('selected data: ', data[selected])
	var lst = [];
	for (i in data[selected]){
		if(i === 'CountryCode' || i === 'CountryName'){
			console.log('Country is: ', data[selected]['CountryName'])
			continue;
			//because its the countryCode and CountryName column
		}
    	var dict ={};
    	//console.log('Data at [0]', data[0]);
    	//console.log(i);
        dict["x"] = Number (i.slice(5));
        // dict["x"] = Number (data[0]["1960"]);
       	dict["y"] = Number (Number (data[selected][i]).toFixed(2));
       	// dict["y"] = Number (data[0]["Year:1960"]);
       	// console.log(dict);
       	lst.push(dict);
    }
    console.log('LIST is: ' , lst);
    create(lst, data[selected]['CountryName']);

}


//using map library
//https://d3-geomap.github.io/map/choropleth/world/

//timeslider tutorial
//http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/

//<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>