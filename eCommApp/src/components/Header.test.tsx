import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

afterEach(() => {
    cleanup();
});

describe('Header', () => {
    it('opens the Contact Us modal from the header menu', async () => {
        const user = userEvent.setup();
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        expect(screen.queryByRole('heading', { name: 'Contact Us' })).not.toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: 'Contact Us' }));
        expect(screen.getByRole('heading', { name: 'Contact Us' })).toBeInTheDocument();
    });
});
