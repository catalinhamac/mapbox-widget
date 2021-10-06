import { MapContainer } from "../Map/MapContainer/MapContainer";

export const tesId = "appTestId";

export const App = () => {
  return (
    <div data-testid={tesId}>
      <MapContainer />
    </div>
  );
};
