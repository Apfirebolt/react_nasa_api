import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AppFooter from '../components/Footer';

describe('AppFooter', () => {
    it('should render the footer component', () => {
        render(<AppFooter />);
        const footerElement = screen.getByText(/SPACEX API ©2025 All rights reserved/i);
        expect(footerElement).toBeInTheDocument();
    });

    it('should have correct text alignment style', () => {
        const { container } = render(<AppFooter />);
        const footer = container.querySelector('footer');
        expect(footer).toHaveStyle({ textAlign: 'center' });
    });

    it('should render as an Ant Design Footer component', () => {
        const { container } = render(<AppFooter />);
        const footer = container.querySelector('footer');
        expect(footer).toBeInTheDocument();
        expect(footer).toHaveClass('ant-layout-footer');
    });

    it('should display the correct copyright year', () => {
        render(<AppFooter />);
        expect(screen.getByText(/2025/)).toBeInTheDocument();
    });

    it('should display the correct brand name', () => {
        render(<AppFooter />);
        expect(screen.getByText(/SPACEX API/i)).toBeInTheDocument();
    });
});
