import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import { NotSupported, testId, defaultMessage } from "../NotSupported";
import { store } from "../../../redux/store";

describe("<NotSupported />", () => {
  it("should render without errors", () => {
    render(
      <Provider store={store}>
        <NotSupported />
      </Provider>
    );

    const component = screen.getByTestId(testId);
    const heading = screen.getByRole("heading");

    expect(component).toBeDefined();
    expect(heading.innerHTML).toBe(defaultMessage);
  });
});
