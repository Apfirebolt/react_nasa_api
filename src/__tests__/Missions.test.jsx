import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Missions from '../screens/Missions';

vi.mock('../components/Loader', () => ({
    default: () => <div>Loading...</div>
}));

const mockMissions = [
    {
        mission_id: '1',
        mission_name: 'Apollo 11',
        details: 'First moon landing',
        mission_type: 'Lunar',
        orbit: 'Low Earth Orbit',
        nationality: 'USA',
        manufacturer: 'NASA'
    },
    {
        mission_id: '2',
        mission_name: 'Voyager 1',
        details: null,
        mission_type: 'Deep Space',
        orbit: 'Heliocentric',
        nationality: 'USA',
        manufacturer: 'JPL'
    }
];

const createMockStore = (state) => {
    return configureStore({
        reducer: {
            missionData: () => state
        }
    });
};

describe('Missions Component', () => {
    it('should display loader when isLoading is true', () => {
        const store = createMockStore({ missionList: [], isLoading: true });
        render(
            <Provider store={store}>
                <Missions />
            </Provider>
        );
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render missions list when data is loaded', () => {
        const store = createMockStore({ missionList: mockMissions, isLoading: false });
        render(
            <Provider store={store}>
                <Missions />
            </Provider>
        );
        expect(screen.getByText('Missions')).toBeInTheDocument();
        expect(screen.getByText('Apollo 11')).toBeInTheDocument();
        expect(screen.getByText('Voyager 1')).toBeInTheDocument();
    });

    it('should display mission details correctly', () => {
        const store = createMockStore({ missionList: mockMissions, isLoading: false });
        render(
            <Provider store={store}>
                <Missions />
            </Provider>
        );
        expect(screen.getByText(/First moon landing/)).toBeInTheDocument();
        expect(screen.getByText(/Type: Lunar/)).toBeInTheDocument();
        expect(screen.getByText(/Orbit: Low Earth Orbit/)).toBeInTheDocument();
    });

    it('should display "No details available" when details is null', () => {
        const store = createMockStore({ missionList: mockMissions, isLoading: false });
        render(
            <Provider store={store}>
                <Missions />
            </Provider>
        );
        expect(screen.getByText(/No details available/)).toBeInTheDocument();
    });

    it('should render empty list when missionList is empty', () => {
        const store = createMockStore({ missionList: [], isLoading: false });
        render(
            <Provider store={store}>
                <Missions />
            </Provider>
        );
        expect(screen.getByText('Missions')).toBeInTheDocument();
        expect(screen.queryByRole('article')).not.toBeInTheDocument();
    });

    it('should render all mission properties', () => {
        const store = createMockStore({ missionList: [mockMissions[0]], isLoading: false });
        render(
            <Provider store={store}>
                <Missions />
            </Provider>
        );
        expect(screen.getByText(/Nationality: USA/)).toBeInTheDocument();
        expect(screen.getByText(/Manufacturer: NASA/)).toBeInTheDocument();
    });
});
