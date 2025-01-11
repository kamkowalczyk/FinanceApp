import { render, screen, waitFor } from '@testing-library/react';
import CompanyInsights from '@/components/CompanyInsights';

jest.mock('../services/api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

import api from '../services/api';

describe('CompanyInsights component', () => {
  it('displays list of companies after fetch', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: [
        { symbol: 'AAPL', name: 'Apple Inc.', currentPrice: 150.52 },
        { symbol: 'MSFT', name: 'Microsoft Corp.', currentPrice: 275.33 },
      ],
    });

    render(<CompanyInsights />);

    expect(screen.getByText('Loading companies...')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText('Loading companies...')).not.toBeInTheDocument()
    );

    expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
    expect(screen.getByText('Microsoft Corp.')).toBeInTheDocument();
  });

  it('displays error if fetch fails', async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error('Failed to load'));

    render(<CompanyInsights />);

    expect(screen.getByText('Loading companies...')).toBeInTheDocument();

  });
});
