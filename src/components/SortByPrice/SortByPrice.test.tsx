import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SortByPrice } from './SortByPrice';
import { SortType } from '~/types/hotel';

describe('SortByPrice Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with default value', () => {
    render(<SortByPrice value={SortType.PRICE_ASC} onChange={mockOnChange} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue(SortType.PRICE_ASC);
  });

  it('shows both sorting options', () => {
    render(<SortByPrice value={SortType.PRICE_ASC} onChange={mockOnChange} />);
    expect(screen.getByText('Price low-high')).toBeInTheDocument();
    expect(screen.getByText('Price high-low')).toBeInTheDocument();
  });

  it('calls onChange when selection changes', () => {
    render(<SortByPrice value={SortType.PRICE_ASC} onChange={mockOnChange} />);
    const select = screen.getByRole('combobox');
    
    fireEvent.change(select, { target: { value: SortType.PRICE_DESC } });
    expect(mockOnChange).toHaveBeenCalledWith(SortType.PRICE_DESC);
  });

  it('updates selected value when prop changes', () => {
    const { rerender } = render(
      <SortByPrice value={SortType.PRICE_ASC} onChange={mockOnChange} />
    );
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue(SortType.PRICE_ASC);

    rerender(<SortByPrice value={SortType.PRICE_DESC} onChange={mockOnChange} />);
    expect(select).toHaveValue(SortType.PRICE_DESC);
  });
}); 