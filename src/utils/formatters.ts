import { Address, Link, Name, PhoneNumber } from "./types";

/**
 * Formats a Name to FullName
 */
export function formatFullName(name: Name): string {
    return [name.firstName, name.lastName].filter(Boolean).join(' ')
}

/** Format Link */
export function formatLink(link: Link): string {
    return link.url
}

/** Formats Phone Number */
export function formatPhoneNumber(
    phone: PhoneNumber,
    options?: {
        format?: 'international' | 'national';
        includeType?: boolean;
        showExtension?: boolean;
    }
): string {
    const defaultOptions = {
        format: 'international',
        includeType: false,
        showExtension: true,
        ...options
    };

    // Clean all non-digit characters
    const cleanedNumber = phone.number.replace(/\D/g, '');
    const cleanedCountryCode = phone.countryCode.replace(/\D/g, '');

    let formattedNumber: string;

    switch (defaultOptions.format) {

        case 'national':
            formattedNumber = formatNationalNumber(cleanedNumber, cleanedCountryCode);
            break;

        case 'international':
        default:
            const internationalNumber = cleanedNumber.startsWith(cleanedCountryCode)
                ? cleanedNumber.slice(cleanedCountryCode.length)
                : cleanedNumber;
            formattedNumber = `+${cleanedCountryCode} ${formatNationalNumber(internationalNumber, cleanedCountryCode).replace(/^0/, '')}`;
    }

    return formattedNumber;
}

function formatNationalNumber(number: string, countryCode: string): string {
    switch (countryCode) {
        case '353': // Ireland
            // Remove international prefix if present
            const localNumber = number.startsWith('353')
                ? number.slice(3)
                : number;

            // Add leading 0 and format
            const withZero = localNumber.startsWith('0')
                ? localNumber
                : `0${localNumber}`;

            // Irish mobile (08x) or landline format
            if (/^08\d/.test(withZero)) {
                return `${withZero.slice(0, 3)} ${withZero.slice(3, 6)} ${withZero.slice(6)}`;
            }
            return `${withZero.slice(0, 2)} ${withZero.slice(2, 5)} ${withZero.slice(5)}`;

        case '1': // US/Canada
            return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`;

        default:
            return number;
    }
}

/**
 * Formats an Irish address as a multi-line string
 */
export function formatAddressToString(address: Address, options?: {
    includeCountry?: boolean;
    eircodeUppercase?: boolean;
}): string {
    const lines = [
        address.line1,
        address.line2,
        address.line3,
        address.town,
        `Co. ${address.county}`,
        options?.eircodeUppercase ? address.eircode?.toUpperCase() : address.eircode,
        options?.includeCountry ? address.country || 'Ireland' : undefined
    ];

    return lines.filter(Boolean).join('\n');
}

/**
 * Single-line version for form autofill
 */
export function formatAddressSingleLine(address: Address): string {
    return [
        address.line1,
        address.line2,
        address.line3,
        address.town,
        `Co. ${address.county}`,
        address.eircode
    ].filter(Boolean).join(', ');
}