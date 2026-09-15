import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ReviewModal from './ReviewModal';
import { Product } from '../types';

const product: Product = {
    id: '1',
    name: 'Apple',
    price: 0.5,
    image: 'apple.png',
    inStock: true,
    reviews: []
};

afterEach(() => {
    cleanup();
});

describe('ReviewModal', () => {
    it('renders nothing when no product is selected', () => {
        const { container } = render(
            <ReviewModal product={null} onClose={vi.fn()} onSubmit={vi.fn()} />
        );

        expect(container).toBeEmptyDOMElement();
    });

    it('renders an empty review state and submits a review', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();
        render(<ReviewModal product={product} onClose={vi.fn()} onSubmit={onSubmit} />);

        expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
        await user.type(screen.getByPlaceholderText('Your name'), 'Alex');
        await user.type(screen.getByPlaceholderText('Your review'), 'Great apple');
        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(onSubmit).toHaveBeenCalledWith({
            author: 'Alex',
            comment: 'Great apple',
            date: expect.any(String)
        });
        expect(screen.getByPlaceholderText('Your name')).toHaveValue('');
        expect(screen.getByPlaceholderText('Your review')).toHaveValue('');
    });

    it('renders existing reviews', () => {
        const reviewedProduct: Product = {
            ...product,
            reviews: [{
                author: 'Jamie',
                comment: 'Crisp and sweet',
                date: '2026-09-15T00:00:00.000Z'
            }]
        };

        render(<ReviewModal product={reviewedProduct} onClose={vi.fn()} onSubmit={vi.fn()} />);

        expect(screen.getByText('Jamie')).toBeInTheDocument();
        expect(screen.getByText('Crisp and sweet')).toBeInTheDocument();
    });

    it('closes from the close button and backdrop but not modal content', async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();
        const { container } = render(
            <ReviewModal product={product} onClose={onClose} onSubmit={vi.fn()} />
        );
        const backdrop = container.firstElementChild as HTMLElement;
        const content = screen.getByText('Reviews for Apple');

        await user.click(content);
        expect(onClose).not.toHaveBeenCalled();

        await user.click(screen.getByRole('button', { name: 'Close' }));
        expect(onClose).toHaveBeenCalledTimes(1);

        fireEvent.click(backdrop);
        expect(onClose).toHaveBeenCalledTimes(2);
    });
});
