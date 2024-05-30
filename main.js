import 'leaflet-html';
import * as d3 from 'd3';

// Ensure the DOM is fully loaded before executing D3 code
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');

  const mapElement = document.querySelector('l-map');
  console.log('Map element:', mapElement);

  // Wait for the leaflet map to be fully initialized
  mapElement.addEventListener('leaflet-map-initialized', () => {
    console.log('Leaflet map initialized');

    const leafletMap = mapElement.leafletMap;
    console.log('Leaflet map instance:', leafletMap);

    // Create an SVG overlay on the map
    const svg = d3.select(mapElement.shadowRoot)
      .append('svg')
      .attr('class', 'leaflet-zoom-animated')
      .style('position', 'absolute')
      .style('top', '0')
      .style('left', '0')
      .style('width', '100%')
      .style('height', '100%')
      .style('pointer-events', 'none'); // Ensure it doesn't block map interaction

    const g = svg.append('g');
    console.log('SVG group element created:', g);

    // Sample data with geographical coordinates
    const data = [
      { lat: 51.505, lng: -0.09 },
      { lat: 51.515, lng: -0.1 },
      { lat: 51.525, lng: -0.12 }
    ];
    console.log('Sample data:', data);

    const update = () => {
      console.log('Updating D3 elements');

      // Clear previous elements
      g.selectAll('circle').remove();

      // Draw circles for each data point
      g.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => {
          const point = leafletMap.latLngToLayerPoint([d.lat, d.lng]).x;
          console.log('cx for', d, ':', point);
          return point;
        })
        .attr('cy', d => {
          const point = leafletMap.latLngToLayerPoint([d.lat, d.lng]).y;
          console.log('cy for', d, ':', point);
          return point;
        })
        .attr('r', 10)
        .attr('fill', 'red');
    };

    // Initial update
    update();

    // Update on map move and zoom events
    leafletMap.on('moveend', update);
    leafletMap.on('zoomend', update);
  });
});
