import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Reports from '@/components/Reports';
import api from '../services/api';

jest.mock('../services/api');

describe('Reports component', () => {
  it('fetches and shows reports list', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: [
        { id: 1, title: 'Report_2025_01', pdfUrl: '/pdfs/report1.pdf' },
        { id: 2, title: 'Report_2025_02', pdfUrl: '/pdfs/report2.pdf' },
      ],
    });

    render(<Reports />);
    expect(screen.getByText('Loading reports...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading reports...')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Report_2025_01')).toBeInTheDocument();
    expect(screen.getByText('Report_2025_02')).toBeInTheDocument();
  });

  it('handles generateReport click', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    (api.post as jest.Mock).mockResolvedValueOnce({});
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: [
        { id: 1, title: 'Report_2025_03', pdfUrl: '/pdfs/report3.pdf' },
      ],
    });

    render(<Reports />);

    await waitFor(() => {
      expect(screen.queryByText('Loading reports...')).not.toBeInTheDocument();
    });
    expect(screen.getByText('No reports available.')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Generate New Report/i));

    await waitFor(() => {
      expect(screen.getByText('Report_2025_03')).toBeInTheDocument();
    });
  });

  it('deletes a report', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: [{ id: 9, title: 'Test Report', pdfUrl: '/test.pdf' }],
    });
    render(<Reports />);

    await waitFor(() =>
      expect(screen.queryByText('Loading reports...')).not.toBeInTheDocument()
    );

    const deleteButton = screen.getByText('Delete');
    (api.delete as jest.Mock).mockResolvedValueOnce({});
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText('No reports available.')).toBeInTheDocument();
    });
  });
});