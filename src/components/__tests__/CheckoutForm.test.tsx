import React from 'react';
import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock the toast wrapper
vi.mock('@/lib/toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    raw: vi.fn(),
  },
  default: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    raw: vi.fn(),
  },
}));

// Mock next/navigation to provide useRouter for components that call it
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

import CheckoutForm from '../CheckoutForm';
import { toast } from '@/lib/toast';

describe('CheckoutForm', () => {
  it('calls toast.error when required fields are missing', async () => {
    const user = userEvent.setup();

    // render with an empty snapshot
    render(<CheckoutForm snapshot={{ items: [] }} />);

    // Check the 'Place Order' button is present
    const placeBtn = screen.getByRole('button', { name: /place order/i });

    // Click without filling fields or checking the checkbox — but the checkbox must be checked to attempt place
    // So first click the checkbox to enable placement, then click place without filling required fields
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    await user.click(placeBtn);

    // toast.error should be called with validation message
    expect(toast.error).toHaveBeenCalledWith('Please fill name, phone and address');
  });
});
