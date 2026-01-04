require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/GraphicsLayer",
  "esri/Graphic",
], function (Map, MapView, GraphicsLayer, Graphic) {

  const map = new Map({
    basemap: "streets-navigation-vector"
  });

  const view = new MapView({
    container: "viewDiv",
    map,
    center: [-84.37488, 33.766745],
    zoom: 9,
    popup: {
      dockEnabled: false,
      collapseEnabled: false,
      dockOptions: {
        buttonEnabled: false,
        breakpoint: false,
        position: "bottom-center"
      }
    }
  });


  view.when(() => {

    const updateUIForSize = (breakpoint) => {
      if (breakpoint === "xsmall" || breakpoint === "small") {
        // Move attribution out of the way
        view.ui.move("attribution", "top-left");

        // Move popup away from bottom UI stack
        view.popup.dockOptions = {
          ...view.popup.dockOptions,
          position: "top-center"
        };

      } else {
        // Desktop defaults
        view.ui.move("attribution", "bottom-right");

        view.popup.dockOptions = {
          ...view.popup.dockOptions,
          position: "bottom-center"
        };
      }
    };

    // Initial
    updateUIForSize(view.widthBreakpoint);

    // Watch for resize
    view.watch("widthBreakpoint", updateUIForSize);
  });


  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  const points = [
    {
      longitude: -84.267398,
      latitude: 33.7771,
      name: "Arepa Mia",
      description:
        "Quaint, bright cafe serving Venezuelan arepas packed with savory fillings, plus other Latin snacks.",
      favorite: "Pabellon cachapas",
      website: "http://www.arepamiaatlanta.com/",
    },
    {
      longitude: -84.30958,
      latitude: 33.75091,
      name: "Gene's",
      description:
        "Funky spot for great cajun-fusion style food and booze. Best frozen drinks in town!",
      favorite: "Waffle fries",
      website: "https://www.genesgenesgenes.com/",
    },
    {
      longitude: -84.38536,
      latitude: 33.78921,
      name: "Alliance Theatre",
      description:
        "Atlanta’s national theater, expanding hearts and minds on stage and off",
      favorite: "Covenant by York Walker",
      website: "http://alliancetheatre.org/",
    },
    {
      longitude: -84.389135,
      latitude: 33.7413013,
      name: "Blue Lot",
      description:
        "The historic Turner Field parking lot- where many beers were drank.",
      favorite: "Chipper Jones' last MLB game",
      website: "https://www.ballparksofbaseball.com/directions/turner-field/",
    },
    {
      longitude: -84.372518,
      latitude: 33.789936,
      name: "Atlanta Botaincal Gardens",
      description:
        "30-acre garden with a conservatory & fountains playing host to concerts, cocktail parties & more.",
      favorite: "Where I proposed to my wife... also the orchids",
      website: "https://atlantabg.org/",
    },
    {
      longitude: -84.35289,
      latitude: 33.77498,
      name: "Neighbor's Pub",
      description:
        "Relaxed hangout with TVs, a dog-friendly patio & a menu with classic bar bites & all-day breakfast.",
      favorite: "Making memories with friends over buckets of beer",
      website: "http://www.neighborsatlanta.com/",
    },
  ];

  points.forEach((pt) => {
    const pointGraphic = new Graphic({
      geometry: {
        type: "point",
        longitude: pt.longitude,
        latitude: pt.latitude,
      },
      symbol: {
        type: "simple-marker",
        style: "square",
        color: "#5872b4cc",
        size: 8,
      },
      attributes: {
        name: pt.name || "Unknown Point", // optional info
        description: pt.description || "No description",
        favorite: pt.favorite || "None",
        website: pt.website || "None",
      },
      popupTemplate: {
        title: "{name}",
        content: `
        <p><b>Description:</b> {description}</p>
        <p><b>Favorite:</b> {favorite}</p>
        <p><b>Website:</b> <a href={website}>website<a/></p>
      `,
      },
    });
    const labelGraphic = new Graphic({
      geometry: {
        type: "point",
        longitude: pt.longitude,
        latitude: pt.latitude,
      },
      symbol: {
        type: "text",
        color: "#3e2169ff",
        haloColor: "white",
        haloSize: "2px",
        text: pt.name,
        font: {
          size: 10,
          family: "Josefin Slab",
          weight: "bold",
        },
        yoffset: 8, // raise the label above the marker
      },
    });

    graphicsLayer.add(labelGraphic);

    graphicsLayer.add(pointGraphic);
  });
});