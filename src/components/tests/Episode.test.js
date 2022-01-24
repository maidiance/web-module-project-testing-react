import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';


test("renders without error", () => {
    render(<Episode episode={{}} />);
});

test("renders the summary test passed as prop", ()=>{
    render(<Episode episode={{
        id: 1,
        image: 'testImage',
        name: 'testName',
        season: 1,
        number: 1,
        summary: 'testSummary',
        runtime: 1
    }} />);
    const summary = screen.queryByText(/testSummary/i);
    expect(summary).toBeInTheDocument();
});

test("renders default image when image is not defined", ()=>{});
