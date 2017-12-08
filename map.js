
$(document).ready(function(){
	queue()
        .defer(d3.json, '/d3-geomap/topojson/world/countries.json')
        .await(ready);

        yearSlider = 'Year:2012';

        $("#timeslide").on("input", function() {

    		$('#range').html('Year: '+$(this).val());
		});
		$("#timeslide").on("mouseup", function() {
			yearSlider = 'Year:'+$(this).val();
			console.log('yearslider val: ', yearSlider)
			d3.select('#map').html(null);
			var mapUpdate = return_map(yearSlider);
			draw_map(mapUpdate);
    		
		});
})


function ready(error, countries){

	var map = return_map(yearSlider);
	draw_map(map);

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

	console.log('MAP mi max: ', map)
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


//using map library
//https://d3-geomap.github.io/map/choropleth/world/

//timeslider tutorial
//http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/