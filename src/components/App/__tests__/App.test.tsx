import {render, screen} from '@testing-library/react';

import {App, testId} from "../App"

describe('App component', () => {
    it('should render without errors', () => {
        render(<App />);

        const component = screen.getByTestId(testId);

        expect(component).toBeDefined();
    })
})