import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import { App, testId } from "../App";
import { store } from "../../../redux/store";

describe("<App />", () => {
  it("should render without errors", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const component = screen.getByTestId(testId);

    expect(component).toBeDefined();
  });
});
