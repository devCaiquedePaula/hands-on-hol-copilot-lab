import { describe, expect, it } from 'vitest';
import { calculateTotal, formatPrice, validateEmail } from './helpers';

describe('shopping helpers', () => {
    it('formats prices as US currency', () => {
        expect(formatPrice(12.5)).toBe('$12.50');
        expect(formatPrice(0)).toBe('$0.00');
    });

    it('calculates the total for an empty cart', () => {
        expect(calculateTotal([])).toBe(0);
    });

    it('calculates the total using item quantities', () => {
        expect(calculateTotal([
            { price: 2.5, quantity: 2 },
            { price: 0.75, quantity: 1 }
        ])).toBe(5.75);
    });

    it('validates correctly formatted email addresses', () => {
        expect(validateEmail('developer@example.com')).toBe(true);
        expect(validateEmail('name+tag@example.co.uk')).toBe(true);
    });

    it('rejects malformed email addresses', () => {
        expect(validateEmail('missing-at-symbol')).toBe(false);
        expect(validateEmail('missing-domain@example')).toBe(false);
        expect(validateEmail('')).toBe(false);
    });
});
