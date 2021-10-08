import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import {
  MapContainer,
  testId,
  unsupportedMessage,
} from "../MapContainer/MapContainer";
import { store } from "../../../redux/store";
import mapboxgl from "../../Lib";

describe("<MapContainer />", () => {
  it("should render without errors", () => {
    render(
      <Provider store={store}>
        <MapContainer />
      </Provider>
    );

    const component = screen.getByTestId(testId);

    expect(component).toBeDefined();
  });

  it("should render a message when not compatible", async () => {
    mapboxgl.supported = jest.fn().mockReturnValue(false);

    render(
      <Provider store={store}>
        <MapContainer />
      </Provider>
    );

    const heading = screen.getByRole("heading");

    expect(heading.innerHTML).toBe(unsupportedMessage);
  });
});
