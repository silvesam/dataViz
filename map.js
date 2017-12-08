
$(document).ready(function(){
	queue()
        .defer(d3.json, '/d3-geomap/topojson/world/countries.json')
        .await(ready);

        yearSlider = '2012';

        $("#timeslide").on("input", function() {

    		$('#range').html('Year: '+$(this).val());
		});
		$("#timeslide").on("mouseup", function() {
			yearSlider = $(this).val();
			console.log('yearslider val: ', yearSlider)
    		
		});
})


function ready(error, countries){

	var format = function(d){
		return Math.round(d) + ' yrs';
	}

	//something about Year:2013 makes it fail
	var map = d3.geomap.choropleth()
	    .geofile('/d3-geomap/topojson/world/countries.json')
	    .colors(colorbrewer.YlGnBu[9])
	    .column('Year:2012')
	    .domain([40, 100])
	    .legend(true)
	    .format(format)
	    .unitId('CountryCode');

	d3.csv('/data/life_expectancy_parsed_excel.csv', function(error, data) {
	    d3.select('#map')
	        .datum(data)
	        .call(map.draw, map);
	});
}

// function return_map(column_name){
// 	var format = function(d){
// 		return Math.round(d) + ' yrs';
// 	}
// 	var map = d3.geomap.choropleth()
// 	    .geofile('/d3-geomap/topojson/world/countries.json')
// 	    .colors(colorbrewer.YlGnBu[9])
// 	    .column(column_name)
// 	    .domain([40, 100])
// 	    .legend(true)
// 	    .format(format)
// 	    .unitId('CountryCode');

// 	return map;
// }

// function draw_map(){
// 	d3.csv('/data/life_expectancy_parsed.csv', function(error, data) {
// 		map = return_map(yearSlider);
// 	    d3.select('#map')
// 	        .datum(data)
// 	        .call(map.draw, map);
// 	});
// }


//using map library
//https://d3-geomap.github.io/map/choropleth/world/

//timeslider tutorial
//http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/