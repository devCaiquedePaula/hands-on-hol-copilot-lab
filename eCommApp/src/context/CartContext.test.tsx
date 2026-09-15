import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useContext } from 'react';
import { CartContext, CartProvider } from './CartContext';
import { Product } from '../types';

const product: Product = {
    id: '1',
    name: 'Apple',
    price: 0.5,
    image: 'apple.png',
    inStock: true,
    reviews: []
};

const CartConsumer = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('CartConsumer must be used within a CartProvider');
    }

    return (
        <div>
            <p data-testid="cart-state">
                {context.cartItems.map(item => `${item.name}:${item.quantity}`).join(',') || 'empty'}
            </p>
            <button onClick={() => context.addToCart(product)}>Add product</button>
            <button onClick={context.clearCart}>Clear cart</button>
        </div>
    );
};

describe('CartProvider', () => {
    it('adds a new product and increments its quantity when added again', async () => {
        const user = userEvent.setup();
        render(
            <CartProvider>
                <CartConsumer />
            </CartProvider>
        );

        expect(screen.getByTestId('cart-state')).toHaveTextContent('empty');
        await user.click(screen.getByRole('button', { name: 'Add product' }));
        expect(screen.getByTestId('cart-state')).toHaveTextContent('Apple:1');

        await user.click(screen.getByRole('button', { name: 'Add product' }));
        expect(screen.getByTestId('cart-state')).toHaveTextContent('Apple:2');
    });

    it('clears all products from the cart', async () => {
        const user = userEvent.setup();
        render(
            <CartProvider>
                <CartConsumer />
            </CartProvider>
        );

        await user.click(screen.getByRole('button', { name: 'Add product' }));
        await user.click(screen.getByRole('button', { name: 'Clear cart' }));

        expect(screen.getByTestId('cart-state')).toHaveTextContent('empty');
    });
});
