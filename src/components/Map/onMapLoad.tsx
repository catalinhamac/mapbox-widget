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
          '#51bbd6',
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
          ]
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
      'circle-color': '#11b4da',
      'circle-radius': 4,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff'
      }
      });
  });
}
