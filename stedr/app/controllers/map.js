// API calls to the map module need to use the Alloy.Globals.Map reference
var mountainView = Alloy.Globals.Map.createAnnotation({
    latitude:37.390749,
    longitude:-122.081651,
    title:"Appcelerator Headquarters",
    subtitle:'Mountain View, CA',
    pincolor:Alloy.Globals.Map.ANNOTATION_RED,
    myid:1 // Custom property to uniquely identify this annotation.
});

$.mapview.region = {latitude:33.74511, longitude:-84.38993,
                    latitudeDelta:0.01, longitudeDelta:0.01};
$.mapview.addAnnotation(mountainView);

$.map.open();