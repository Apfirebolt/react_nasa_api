import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from '../components/Loader';

describe('Loader', () => {
    it('should render the Loader component', () => {
        const { container } = render(<Loader />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it('should render a Spin component with large size', () => {
        const { container } = render(<Loader />);
        const spinElement = container.querySelector('.ant-spin-lg');
        expect(spinElement).toBeInTheDocument();
    });

    it('should apply correct wrapper styles', () => {
        const { container } = render(<Loader />);
        const wrapper = container.firstChild;
        expect(wrapper).toHaveStyle({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        });
    });

    it('should center the loader on the page', () => {
        const { container } = render(<Loader />);
        const wrapper = container.firstChild;
        const styles = window.getComputedStyle(wrapper);
        expect(styles.display).toBe('flex');
        expect(styles.justifyContent).toBe('center');
        expect(styles.alignItems).toBe('center');
    });
});
