import { render, screen, waitFor, act } from '@testing-library/react';
import Cryptocurrencies from '../components/Cryptocurrencies';
import axios from 'axios';

jest.mock('axios');

describe('Cryptocurrencies component', () => {

  it('shows error if fetch fails', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    await act(async () => {
      render(<Cryptocurrencies />);
    });

    await waitFor(() => {
      expect(screen.getByText('Failed to load cryptos. Please try again later.')).toBeInTheDocument();
    });
  });
});
