// map transparent
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpeWF1dGUiLCJhIjoiY2p5ZXp1b3ZyMDBpMTNjcjdnZ3dnbzJpYyJ9.UiTAUN2b8ASlVnMr_nmn3Q';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/aliyaute/ckhp5zhh72hvs19p9di978qoj',
    zoom: 5.25,
    center: [-75.32, 42.88],
    maxZoom:12,
    minZoom:6,
    maxBounds: [[-109.048428, 31.332406], [-103.000468, 37.000482]]

});

map.on('load', function () {
    // This is the function that prints the layers' IDs to the console
    var layers = map.getStyle().layers;
    for (var i = 0; i < layers.length; i++) {
        console.log(layers[i].id);
    }    
    map.addLayer({
        'id': 'censusNM',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/new_NM_Data.geojson'
        },

        'paint': {
            'fill-color': [
                'case', 
                ['==',['get', 'Poverty_Category_Code'], 6], '#a63603',
                ['==',['get', 'Poverty_Category_Code'], 5], '#d94801',
                ['==',['get', 'Poverty_Category_Code'], 4], '#fdd0a2',
                ['==',['get', 'Poverty_Category_Code'], 3], '#fee6ce',
                ['==',['get', 'Poverty_Category_Code'], 2], '#fee6ce',
                ['==',['get', 'Poverty_Category_Code'], 1], '#fee6ce',
                ['==',['get', 'Poverty_Category_Code'], 0], '#fee6ce',
                '#d3d3d3',
            ],
            "fill-outline-color": "#ffffff"

        //     ],
        //     'fill-outline-color': '#ffffff'
   
            // 'fill-opacity': [
            //     'step', ['get', 'Percent'],
            //     0.02, 0.6,
            //     0.05, 0.8,
            //     0.09, 0.9,
            //     0.9
            // ]       
         }
    }, 'landuse'); // Here's where we tell Mapbox where to slot this new layer


    map.addLayer({
        'id': 'censusNM_outline',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': 'data/new_NM_Data.geojson'
        },
        'paint': {
            'line-color': '#ffffff',
            'line-width': 0.5
        }
    }, 'landuse'); // Here's where we tell Mapbox where to slot this new layer
});

// Create the popup
map.on('click', 'censusNM', function (e) {
    var County = e.features[0].properties.County;
    var NAMELSAD = e.features[0].properties.NAMELSAD;
    var Area = e.features[0].properties.Area;
    var Number_of_Cases = e.features[0].properties.Number_of_Cases;
    var Percent = e.features[0].properties.Percent;
    var Percentage_in_Poverty = e.features[0].properties.Percentage_in_Poverty;
    var Population_Size = e.features[0].properties.Population_Size;
    Percent = (Percent* 100).toFixed(0);
    Percentage_in_Poverty = (Percentage_in_Poverty* 100).toFixed(0);
    Number_of_Cases = Number_of_Cases.toLocaleString();
    County = County.toUpperCase().bold();
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>' + County + '</h4>'
            + '<p>' + NAMELSAD + '</p>'
            + '<p>' + 'population: ' + Population_Size + '</p>'
            + '<p>' + Percentage_in_Poverty  + '% live in poverty </p>'
            + '<h2>' + Number_of_Cases + ' cases (' + Percent + '%) </h2>')
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the countiesNY layer.
map.on('mouseenter', 'censusNM', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'censusNM', function () {
    map.getCanvas().style.cursor = '';
});
