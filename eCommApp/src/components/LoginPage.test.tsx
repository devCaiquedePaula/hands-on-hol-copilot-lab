import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';

vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

const renderLoginPage = () => render(
    <MemoryRouter initialEntries={['/login']}>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<div>Admin page</div>} />
        </Routes>
    </MemoryRouter>
);

describe('LoginPage', () => {
    it('renders the admin login form', () => {
        renderLoginPage();

        expect(screen.getByRole('heading', { name: 'Admin Login' })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toHaveValue('');
        expect(screen.getByPlaceholderText('Password')).toHaveValue('');
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('shows an error for invalid credentials', async () => {
        const user = userEvent.setup();
        renderLoginPage();

        await user.type(screen.getByPlaceholderText('Username'), 'wrong-user');
        await user.type(screen.getByPlaceholderText('Password'), 'wrong-password');
        await user.click(screen.getByRole('button', { name: 'Login' }));

        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Admin Login' })).toBeInTheDocument();
    });

    it('navigates to the admin page with valid credentials', async () => {
        const user = userEvent.setup();
        renderLoginPage();

        await user.type(screen.getByPlaceholderText('Username'), 'admin');
        await user.type(screen.getByPlaceholderText('Password'), 'admin');
        await user.click(screen.getByRole('button', { name: 'Login' }));

        expect(screen.getByText('Admin page')).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'Admin Login' })).not.toBeInTheDocument();
    });
});
