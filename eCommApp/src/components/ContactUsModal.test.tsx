import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ContactUsModal from './ContactUsModal';

afterEach(() => {
    cleanup();
});

describe('ContactUsModal', () => {
    it('renders nothing when closed', () => {
        const { container } = render(<ContactUsModal isOpen={false} onClose={vi.fn()} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('submits contact form, shows confirmation popup, and clears fields', async () => {
        const user = userEvent.setup();
        render(<ContactUsModal isOpen={true} onClose={vi.fn()} />);

        await user.type(screen.getByLabelText('Name'), 'Alex');
        await user.type(screen.getByLabelText('Email'), 'alex@example.com');
        await user.type(screen.getByLabelText('Message'), 'Need help with my order');
        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(screen.getByText('Thank you for your message')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
        expect(screen.getByLabelText('Name')).toHaveValue('');
        expect(screen.getByLabelText('Email')).toHaveValue('');
        expect(screen.getByLabelText('Message')).toHaveValue('');

        await user.click(screen.getByRole('button', { name: 'Continue' }));
        expect(screen.queryByText('Thank you for your message')).not.toBeInTheDocument();
    });

    it('closes on close button and backdrop clicks', async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();
        const { container } = render(<ContactUsModal isOpen={true} onClose={onClose} />);

        await user.click(screen.getByRole('button', { name: 'Close' }));
        expect(onClose).toHaveBeenCalledTimes(1);

        fireEvent.click(container.firstElementChild as HTMLElement);
        expect(onClose).toHaveBeenCalledTimes(2);
    });
});
