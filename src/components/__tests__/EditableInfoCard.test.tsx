import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditableInfoCard } from '../EditableInfoCard';
import { Info } from '../../utils/types';

const mockInfo: Info = {
    name: { firstName: 'John', lastName: 'Doe' },
    email: 'john@example.com',
    number: { countryCode: '1', number: '5551234567' },
    address: {
        line1: '123 Main St',
        line2: 'Grow Rd',
        town: 'Springfield',
        county: 'Anycounty'
    },
    links: []
};

describe('EditableInfoCard', () => {
    it('renders in view mode by default', () => {
        render(<EditableInfoCard info={mockInfo} onSave={vi.fn()} />);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('switches to edit mode', async () => {
        render(<EditableInfoCard info={mockInfo} onSave={vi.fn()} />);
        await userEvent.click(screen.getByLabelText('edit'));
        expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    });
});