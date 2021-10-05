import { IPoi } from "./Poi";

export interface IGeometry {
  type: "Point" | "Poligon";
  coordinates: [number, number] | number[][];
}

export interface IFeature {
  id?: number;
  type: "Feature";
  properties: IPoi;
  geometry: IGeometry;
}

export interface ISource {
  type: "FeatureCollection";
  features: IFeature[];
}
