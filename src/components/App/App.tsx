import { MapContainer } from "../Map/MapContainer/MapContainer";

export const testId = "appTestId";

export const App = () => {
  return (
    <div data-testid={testId}>
      <MapContainer />
    </div>
  );
};
