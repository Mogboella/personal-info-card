import { formatAddressSingleLine, formatAddressToString, formatFullName, formatPhoneNumber } from "../formatters";
import { Address } from "../types";


// Name Format Testing 

describe('formatFullName', () => {
    it('combines first and last name', () => {
        expect(formatFullName({ firstName: 'John', lastName: 'Doe' })).toBe('John Doe');
    });

    it('handles empty last name', () => {
        expect(formatFullName({ firstName: 'John', lastName: '' })).toBe('John');
    });
});

// Phone Number Format Testing

describe('formatPhoneNumber', () => {
    describe('International format', () => {
        it('formats Irish numbers correctly', () => {
            expect(formatPhoneNumber({ countryCode: '353', number: '831234567' }))
                .toBe('+353 83 123 4567');
        });

        it('formats US numbers correctly', () => {
            expect(formatPhoneNumber({ countryCode: '1', number: '5551234567' }))
                .toBe('+1 (555) 123-4567');
        });
    });

    describe('National format', () => {
        it('formats Irish numbers without country code', () => {
            expect(formatPhoneNumber(
                { countryCode: '353', number: '831234567' },
                { format: 'national' }
            )).toBe('083 123 4567');
        });
    });
});

// Address Format Testing 

describe('address formatting', () => {
    const testAddress = {
        line1: '123 Main St',
        line2: 'Apt 4B',
        town: 'Dublin',
        county: 'Dublin',
        eircode: 'd01 abcd'
    };

    test('multi-line format', () => {
        expect(formatAddressToString(testAddress)).toMatchSnapshot();
    });

    test('single-line format', () => {
        expect(formatAddressSingleLine(testAddress))
            .toBe('123 Main St, Apt 4B, Dublin, Co. Dublin, d01 abcd');
    });

    test('uppercase eircode', () => {
        expect(formatAddressToString(testAddress, { eircodeUppercase: true }))
            .toContain('D01 ABCD');
    });
});

it('handles empty address line2', () => {
    const minimalAddress = {
        line1: '123 Main St',
        town: 'Dublin',
        county: 'Dublin'
    };
    expect(formatAddressSingleLine(minimalAddress as Address))
        .toBe('123 Main St, Dublin, Co. Dublin');
});