import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import AppHeader from '../components/Header';

describe('AppHeader', () => {
    const renderWithRouter = (component) => {
        return render(<BrowserRouter>{component}</BrowserRouter>);
    };

    it('should render the header component', () => {
        renderWithRouter(<AppHeader />);
        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
    });

    it('should render all navigation links', () => {
        renderWithRouter(<AppHeader />);
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Spaceship')).toBeInTheDocument();
        expect(screen.getByText('Launches')).toBeInTheDocument();
        expect(screen.getByText('Capsules')).toBeInTheDocument();
        expect(screen.getByText('Cores')).toBeInTheDocument();
        expect(screen.getByText('Payloads')).toBeInTheDocument();
        expect(screen.getByText('Missions')).toBeInTheDocument();
        expect(screen.getByText('Rockets')).toBeInTheDocument();
        expect(screen.getByText('Dragons')).toBeInTheDocument();
        expect(screen.getByText('History')).toBeInTheDocument();
        expect(screen.getByText('Landing Pads')).toBeInTheDocument();
    });

    it('should have correct href attributes for links', () => {
        renderWithRouter(<AppHeader />);
        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText('Spaceship').closest('a')).toHaveAttribute('href', '/spaceship');
        expect(screen.getByText('Launches').closest('a')).toHaveAttribute('href', '/launches');
        expect(screen.getByText('Capsules').closest('a')).toHaveAttribute('href', '/capsules');
    });

    it('should render menu with dark theme', () => {
        const { container } = renderWithRouter(<AppHeader />);
        const menu = container.querySelector('.ant-menu-dark');
        expect(menu).toBeInTheDocument();
    });

    it('should render menu in horizontal mode', () => {
        const { container } = renderWithRouter(<AppHeader />);
        const menu = container.querySelector('.ant-menu-horizontal');
        expect(menu).toBeInTheDocument();
    });

    it('should render logo div', () => {
        const { container } = renderWithRouter(<AppHeader />);
        const logo = container.querySelector('.logo');
        expect(logo).toBeInTheDocument();
    });
});
