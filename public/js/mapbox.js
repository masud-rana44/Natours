/* eslint-disable */
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibWFzdWRyYW5hNDQiLCJhIjoiY2xneGVtbGZ1MDE3eTNqbXZjdGt4cnJlZSJ9.MmD4NvRmYteFX98k1xwMgg';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/masudrana44/clgxgydzc00bq01pg0eoi72vj',
    center: [90.4219536, 23.7983961],
    scrollZoom: false,
  });

  map.on('load', function () {
    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach((loc, index) => {
      // Create marker
      const el = document.createElement('div');
      el.className = 'marker';

      // Add marker
      new mapboxgl.Marker({
        element: el,
        anchor: 'bottom',
      })
        .setLngLat(loc.coordinates)
        .addTo(map);

      // Add popup
      new mapboxgl.Popup({ offset: 30 })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map);

      // Extend map bound to include current location
      bounds.extend(loc.coordinates);

      if (index !== locations.length - 1) {
        // Create a geojson object for the line
        const geojson = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: [
                  loc.coordinates, // starting point
                  locations[index + 1].coordinates, // ending point
                ],
              },
              properties: {},
            },
          ],
        };

        // Add the geojson as a source
        map.addSource(`line-${index}`, {
          type: 'geojson',
          data: geojson,
        });

        // Add a layer for the line
        map.addLayer({
          id: `line-${index}`,
          type: 'line',
          source: `line-${index}`,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#55c57a',
            'line-width': 1,
            'line-dasharray': [2, 2],
          },
        });
      }
    });

    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 150,
        right: 150,
      },
    });
  });
};
