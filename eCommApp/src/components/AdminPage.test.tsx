import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import AdminPage from './AdminPage';

vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

const renderAdminPage = () => render(
    <BrowserRouter>
        <AdminPage />
    </BrowserRouter>
);

describe('AdminPage', () => {
    it('renders with no active sale by default', () => {
        renderAdminPage();

        expect(screen.getByRole('heading', { name: 'Welcome to the admin portal.' })).toBeInTheDocument();
        expect(screen.getByLabelText('Set Sale Percent (% off for all items):')).toHaveValue('0');
        expect(screen.getByText('No sale active.')).toBeInTheDocument();
    });

    it('activates a sale when a valid percentage is submitted', async () => {
        const user = userEvent.setup();
        renderAdminPage();

        const saleInput = screen.getByLabelText('Set Sale Percent (% off for all items):');
        await user.clear(saleInput);
        await user.type(saleInput, '25');
        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(screen.getByText('All products are 25% off!')).toBeInTheDocument();
        expect(screen.queryByText('No sale active.')).not.toBeInTheDocument();
    });

    it('shows an error when the sale percentage is invalid', async () => {
        const user = userEvent.setup();
        renderAdminPage();

        const saleInput = screen.getByLabelText('Set Sale Percent (% off for all items):');
        await user.clear(saleInput);
        await user.type(saleInput, 'not-a-number');
        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(screen.getByText(/Invalid input\s+"not-a-number"\s+Please enter a valid number\./)).toBeInTheDocument();
        expect(screen.getByText('No sale active.')).toBeInTheDocument();
    });

    it('ends an active sale and resets the input', async () => {
        const user = userEvent.setup();
        renderAdminPage();

        const saleInput = screen.getByLabelText('Set Sale Percent (% off for all items):');
        await user.clear(saleInput);
        await user.type(saleInput, '15');
        await user.click(screen.getByRole('button', { name: 'Submit' }));
        await user.click(screen.getByRole('button', { name: 'End Sale' }));

        expect(saleInput).toHaveValue('0');
        expect(screen.getByText('No sale active.')).toBeInTheDocument();
        expect(screen.queryByText('All products are 15% off!')).not.toBeInTheDocument();
    });
});
