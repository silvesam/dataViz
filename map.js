
queue()
        .defer(d3.json, '/d3-geomap/topojson/world/countries.json')
        .await(ready);

function ready(error, countries){
	var format = function(d){
		return Math.round(d) + ' yrs';
	}

	var map = d3.geomap.choropleth()
	    .geofile('/d3-geomap/topojson/world/countries.json')
	    .colors(colorbrewer.YlGnBu[9])
	    .column('Value')
	    .domain([40, 100])
	    .legend(true)
	    .format(format)
	    .unitId('CountryCode');

	d3.csv('/data/life_expectancy_countries.csv', function(error, data) {
	    d3.select('#map')
	        .datum(data)
	        .call(map.draw, map);
	});
}


//using map library
//https://d3-geomap.github.io/map/choropleth/world/

//timeslider tutorial
//http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/