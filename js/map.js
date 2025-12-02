require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/GraphicsLayer",
  "esri/Graphic"
], function(Map, MapView, GraphicsLayer, Graphic) {

  const map = new Map({
    basemap: "streets-navigation-vector"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-84.37488, 33.766745],
    zoom:10
  });

  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  const points = [
    { longitude: -84.267398, latitude: 33.777100,
      name:"Arepa Mia",
      description:"Quaint, bright cafe serving Venezuelan arepas packed with savory fillings, plus other Latin snacks.",
      favorite: "Pabellon cachapas",
      website: "http://www.arepamiaatlanta.com/"
    },
    { longitude: -84.30958, latitude: 33.75091,
      name: "Gene's",
      description: "Funky spot for great cajun-fusion style food and booze. Best frozen drinks in town!",
      favorite: "Waffle fries",
      website: "https://www.genesgenesgenes.com/"
    },
    { longitude: -84.38536, latitude: 33.78921,
      name: "Alliance Theatre",
      description: "Atlanta’s national theater, expanding hearts and minds on stage and off",
      favorite: "Covenant by York Walker",
      website: "http://alliancetheatre.org/"
    }
  ];

points.forEach(pt => {
  const pointGraphic = new Graphic({
    geometry: {
      type: "point",
      longitude: pt.longitude,
      latitude: pt.latitude
    },
    symbol: {
      type: "simple-marker",
      color: "red",
      size: 8
    },
    attributes: {
      name: pt.name || "Unknown Point",  // optional info
      description: pt.description || "No description",
      favorite: pt.favorite || "None",
      website: pt.website || "None"
    },
    popupTemplate: {
      title: "{name}",
      content:`
        <p><b>Description:</b> {description}</p>
        <p><b>Favorite:</b> {favorite}</p>
        <p><b>Website:</b> <a href={website}>{website}<a/></p>
      `
    }
  });

  graphicsLayer.add(pointGraphic);
});


});
