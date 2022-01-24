import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

test('renders without errors', ()=>{
    render(<Show selectedSeason={0} show={{
        name: 'test',
        summary: 'testSummary',
        seasons: [{
            id: 1,
            name: 'testSeason',
            episodes: []
        }]
    }} />);
    render(<Show selectedSeason={'none'} show={{
        name: 'test',
        summary: 'testSummary',
        seasons: [{
            id: 1,
            name: 'testSeason',
            episodes: []
        }]
    }} />);
});

test('renders Loading component when prop show is null', () => {
    render(<Show selectedSeason={'none'} show={null} />);
    const loading = screen.queryByTestId("loading-container");
    expect(loading).toBeInTheDocument();
});


test('renders same number of options seasons are passed in', ()=>{
    render(<Show selectedSeason={'none'} show={{
        name: 'test',
        summary: 'testSummary',
        seasons: [{
            id: 1,
            name: 'testSeason1',
            episodes: []
        }, {
            id: 2,
            name: 'testSeason2',
            episodes: []
        }, {
            id: 3,
            name: 'testSeason3',
            episodes: []
        }]
    }} />);
    const selectOptions = screen.queryAllByTestId('season-option');
    expect(selectOptions).toHaveLength(3);
});

test('handleSelect is called when an season is selected', () => {
    const mockHandleSelect = jest.fn();
    render(<Show handleSelect={mockHandleSelect} selectedSeason={'none'} show={{
        name: 'test',
        summary: 'testSummary',
        seasons: [{
            id: 1,
            name: 'testSeason1',
            episodes: []
        }, {
            id: 2,
            name: 'testSeason2',
            episodes: []
        }, {
            id: 3,
            name: 'testSeason3',
            episodes: []
        }]
    }} />);
    const selection = screen.getByRole('combobox');
    userEvent.selectOptions(selection, ['testSeason1']);
    expect(screen.getByRole('option', {name: 'testSeason1'}).selected).toBe(true);
    expect(mockHandleSelect).toHaveBeenCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    render(<Show selectedSeason={'none'} show={{
        name: 'test',
        summary: 'testSummary',
        seasons: [{
            id: 1,
            name: 'testSeason',
            episodes: []
        }]
    }} />);
    let episodeContainer = screen.queryByTestId('episodes-container');
    expect(episodeContainer).not.toBeInTheDocument();
    // rerender
    render(<Show selectedSeason={0} show={{
        name: 'test',
        summary: 'testSummary',
        seasons: [{
            id: 1,
            name: 'testSeason',
            episodes: [{
                id: 1,
                name: 'testEpisode',
                season: 'testSeason',
                number: 1,
                summary: 'testSummary',
                runtime: 1
            }]
        }]
    }} />);
    episodeContainer = screen.queryByTestId('episodes-container');
    expect(episodeContainer).toBeInTheDocument();
});
