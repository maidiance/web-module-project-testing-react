import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';
import fetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

test('renders without errors with no props', ()=>{
    render(<Display />);
});

test('renders Show component when the button is clicked ', async()=>{
    fetchShow.mockResolvedValueOnce({
        data: [{name: 'testData',
        image: null,
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
        }]
    });
    render(<Display displayFunc={true}/>);
    const button = screen.getByRole('button');
    userEvent.click(button);
    const selectOptions = await screen.queryAllByTestId('season-option');
    expect(selectOptions).toHaveLength(3);
});

test('renders show season options matching your data when the button is clicked', ()=>{});
