import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ }),
}));

describe('Navbar component', () => {
  it('renders navigation links and Get Insights button', () => {
    render(<Navbar />);

    expect(screen.getByText('WealthHub')).toBeInTheDocument();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Charts')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();

    expect(screen.getByText('Get Insights')).toBeInTheDocument();
  });
});
