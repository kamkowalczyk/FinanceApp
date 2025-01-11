import { act, render, screen, waitFor } from '@testing-library/react';
import ExchangeRates from '@/components/ExchangeRates';
import api from '@/services/api';

jest.mock('@/services/api');

describe('ExchangeRates component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state initially', () => {
    render(<ExchangeRates />);
    expect(screen.getByText('Loading exchange rates...')).toBeInTheDocument();
  });

  it('renders exchange rates after successful fetch', async () => {
    const mockData = [
      {
        id: 1,
        rate: 4.5,
        date: '2025-01-01',
        currency: { id: 1, code: 'EUR', name: 'Euro' },
      },
    ];
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    await act(async () => {
      render(<ExchangeRates />);
    });

    await waitFor(() =>
      expect(screen.queryByText('Loading exchange rates...')).not.toBeInTheDocument()
    );

    expect(screen.getByText(/EUR/)).toBeInTheDocument();
    expect(screen.getByText(/Euro/)).toBeInTheDocument();
    expect(screen.getByText(/4.5/)).toBeInTheDocument();
  });

  it('displays error message on fetch failure', async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'));

    render(<ExchangeRates />);

  });
});