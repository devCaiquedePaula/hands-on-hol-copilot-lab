import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ProductsPage from './ProductsPage';
import { CartContext } from '../context/CartContext';
import { Product, Review } from '../types';

vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

vi.mock('./ReviewModal', () => ({
    default: ({ product, onClose, onSubmit }: {
        product: Product | null;
        onClose: () => void;
        onSubmit: (review: Review) => void;
    }) => product ? (
        <div data-testid="review-modal">
            <h2>Reviews for {product.name}</h2>
            <button onClick={onClose}>Close reviews</button>
            <button onClick={() => onSubmit({
                author: 'New Reviewer',
                comment: 'Fresh review',
                date: '2026-09-15T00:00:00.000Z'
            })}>
                Submit review
            </button>
            {product.reviews.map((review, index) => (
                <p key={`${review.author}-${index}`}>{review.comment}</p>
            ))}
        </div>
    ) : null
}));

const products: Product[] = [
    {
        id: '1',
        name: 'Apple',
        description: 'A juicy red apple',
        price: 0.5,
        image: 'apple.png',
        reviews: [],
        inStock: true
    },
    {
        id: '2',
        name: 'Grapes',
        description: 'A bunch of sweet grapes',
        price: 2.5,
        image: 'grapes.png',
        reviews: [],
        inStock: true
    },
    {
        id: '3',
        name: 'Orange',
        price: 0.75,
        image: 'orange.png',
        reviews: [],
        inStock: false
    },
    {
        id: '4',
        name: 'Pear',
        description: 'A sweet pear',
        price: 0.6,
        reviews: [],
        inStock: true
    }
];

const createCartContext = () => ({
    cartItems: [],
    addToCart: vi.fn(),
    clearCart: vi.fn()
});

const renderProductsPage = (cartContext = createCartContext()) => render(
    <CartContext.Provider value={cartContext}>
        <ProductsPage />
    </CartContext.Provider>
);

const mockSuccessfulFetch = () => {
    vi.stubGlobal('fetch', vi.fn((url: string) => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(products.find(product => url.includes(product.name.toLowerCase())) ?? products[0])
    })));
};

describe('ProductsPage', () => {
    beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it('renders the loading state while products are being fetched', () => {
        vi.stubGlobal('fetch', vi.fn(() => new Promise(() => undefined)));
        renderProductsPage();

        expect(screen.getByText('Loading products...')).toBeInTheDocument();
    });

    it('renders loaded products and stock states', async () => {
        mockSuccessfulFetch();
        renderProductsPage();

        expect(await screen.findByRole('heading', { name: 'Our Products' })).toBeInTheDocument();
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('A juicy red apple')).toBeInTheDocument();
        expect(screen.getByText('$0.50')).toBeInTheDocument();
        expect(screen.getByText('Orange')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Out of Stock' })).toBeDisabled();
        expect(screen.getAllByRole('button', { name: 'Add to Cart' })).toHaveLength(3);
        expect(screen.getByAltText('Apple')).toHaveAttribute('src', 'products/productImages/apple.png');
    });

    it('adds an in-stock product to the cart', async () => {
        const user = userEvent.setup();
        const cartContext = createCartContext();
        mockSuccessfulFetch();
        renderProductsPage(cartContext);

        await user.click((await screen.findAllByRole('button', { name: 'Add to Cart' }))[0]);

        expect(cartContext.addToCart).toHaveBeenCalledWith(products[0]);
    });

    it('opens and closes the review modal for a product image', async () => {
        const user = userEvent.setup();
        mockSuccessfulFetch();
        renderProductsPage();

        await user.click(await screen.findByAltText('Apple'));
        expect(screen.getByTestId('review-modal')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Reviews for Apple' })).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Close reviews' }));
        expect(screen.queryByTestId('review-modal')).not.toBeInTheDocument();
    });

    it('submits a review and updates the selected product', async () => {
        const user = userEvent.setup();
        mockSuccessfulFetch();
        renderProductsPage();

        await user.click(await screen.findByAltText('Apple'));
        await user.click(screen.getByRole('button', { name: 'Submit review' }));

        expect(screen.getByText('Fresh review')).toBeInTheDocument();
    });

    it('stops loading when product loading fails', async () => {
        vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: false })));
        renderProductsPage();

        await waitFor(() => expect(screen.queryByText('Loading products...')).not.toBeInTheDocument());
        expect(screen.getByRole('heading', { name: 'Our Products' })).toBeInTheDocument();
        expect(console.error).toHaveBeenCalledWith('Error loading products:', expect.any(Error));
    });

    it('throws when rendered without a CartProvider', () => {
        mockSuccessfulFetch();

        expect(() => render(<ProductsPage />)).toThrow(
            'CartContext must be used within a CartProvider'
        );
    });
});
