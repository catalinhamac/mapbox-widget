import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import { Map, testId } from "../Map";
import { store } from "../../../redux/store";

describe("<Map />", () => {
  it("should render without errors", () => {
    render(
      <Provider store={store}>
        <Map container="" />
      </Provider>
    );

    const component = screen.getByTestId(testId);

    expect(component).toBeDefined();
  });
});
