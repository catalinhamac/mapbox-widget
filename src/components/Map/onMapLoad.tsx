import mapboxgl from 'mapbox-gl';

import { clusterCountLayerId, clustersLayerId, storesSourceId, unclusteredPointLayerId } from './Map';
import { ISource } from './models/Source';

export const onMapLoad = (map: mapboxgl.Map, source: ISource) => {
  map.on("load", () => {
    map.addSource(storesSourceId, {
      type: "geojson",
      data: source as any,
      cluster: true,
      clusterMaxZoom: 14, 
      clusterRadius: 50
    });

      map.addLayer({
        id: clustersLayerId,
        type: 'circle',
        source: storesSourceId,
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
          'step',
          ['get', 'point_count'],
          'white',
          100,
          '#f1f075',
          750,
          '#f28cb1'
          ],
          'circle-radius': [
          'step',
          ['get', 'point_count'],
          20,
          100,
          30,
          750,
          40
          ],
          'circle-stroke-width': 3,
      'circle-stroke-color': '#00b4d3'
        }
      });

      map.addLayer({
      id: clusterCountLayerId,
      type: 'symbol',
      source: storesSourceId,
      filter: ['has', 'point_count'],
      layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12
      }
      });
       
      map.addLayer({
      id: unclusteredPointLayerId,
      type: 'circle',
      source: storesSourceId,
      filter: ['!', ['has', 'point_count']],
      paint: {
      'circle-color': 'white',
      'circle-radius': 6,
      'circle-stroke-width': 3,
      'circle-stroke-color': '#00b4d3'
      }
      });
  });
}
