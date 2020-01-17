const geojson = Highcharts.maps["countries/ug/ug-all"];

fetch("/data")
  .then(response => {
    return response.json();
  })
  .then(districtData => {
    return districtData.reduce((map, item) => {
      return { ...map, [item.district]: item.number };
    }, {});
  })
  .then(districtMap => {
    return geojson.features.map(feature => {
      const amount = districtMap[feature.properties.name];
      return [feature.properties["hc-key"], amount];
    });
  })
  .then(data => {
    Highcharts.mapChart("container", {
      chart: {
        map: "countries/ug/ug-all"
      },

      title: {
        text: "Highmaps basic demo"
      },

      subtitle: {
        text:
          'Source map: <a href="http://code.highcharts.com/mapdata/countries/ug/ug-all.js">Uganda</a>'
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "bottom"
        }
      },

      colorAxis: {
        min: 0
      },

      series: [
        {
          data: data,
          name: "Random data",
          states: {
            hover: {
              color: "#BADA55"
            }
          },
          dataLabels: {
            enabled: true,
            format: "{point.name}"
          }
        }
      ]
    });
  });

// Create the chart
