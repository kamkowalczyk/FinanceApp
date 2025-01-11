import { render, screen, waitFor } from '@testing-library/react';
import Currencies from '@/components/Currencies';
import api from '../services/api';

jest.mock('../services/api');

describe('Currencies component', () => {
  it('displays fetched currencies list', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: [
        { id: 1, code: 'EUR', name: 'Euro', rate: 45000 },
        { id: 2, code: 'USD', name: 'US Dollar', rate: 39000 },
      ],
    });

    render(<Currencies />);
    expect(screen.getByText('Loading currencies with rates...')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText('Loading currencies with rates...')).not.toBeInTheDocument()
    );

    const eurElements = screen.getAllByText(/EUR/i);
    expect(eurElements.length).toBeGreaterThan(0);
    expect(screen.getByText('(Euro)')).toBeInTheDocument();
    expect(screen.getByText('4.5000 PLN')).toBeInTheDocument();

    expect(screen.getByText(/USD/i)).toBeInTheDocument();
    expect(screen.getByText('(US Dollar)')).toBeInTheDocument();
    expect(screen.getByText('3.9000 PLN')).toBeInTheDocument();
  });

  it('displays error if fetch fails', async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error('Boom!'));

    render(<Currencies />);

  });
});
