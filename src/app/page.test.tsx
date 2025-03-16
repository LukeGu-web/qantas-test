import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './page';
import hotelData from '~/mock/data.json';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

// Mock HotelList component
jest.mock('~/components/HotelList/HotelList', () => ({
  HotelList: ({ hotels, onSort }: any) => (
    <div data-testid="hotel-list">
      <span data-testid="hotels-count">{hotels.length}</span>
      <button onClick={() => onSort('price-asc')} data-testid="sort-asc">Sort Asc</button>
      <button onClick={() => onSort('price-desc')} data-testid="sort-desc">Sort Desc</button>
    </div>
  )
}));

describe('Home Page', () => {
  it('renders the Qantas logo', () => {
    render(<Home />);
    const logo = screen.getByAltText('Qantas Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/qantas-logo.png');
  });

  it('renders HotelList with initial data', () => {
    render(<Home />);
    const hotelList = screen.getByTestId('hotel-list');
    const hotelsCount = screen.getByTestId('hotels-count');
    expect(hotelList).toBeInTheDocument();
    expect(hotelsCount.textContent).toBe(hotelData.results.length.toString());
  });

  it('sorts hotels by price ascending', () => {
    render(<Home />);
    const sortAscButton = screen.getByTestId('sort-asc');
    fireEvent.click(sortAscButton);
    
    const hotelsCount = screen.getByTestId('hotels-count');
    expect(hotelsCount.textContent).toBe(hotelData.results.length.toString());
  });

  it('sorts hotels by price descending', () => {
    render(<Home />);
    const sortDescButton = screen.getByTestId('sort-desc');
    fireEvent.click(sortDescButton);
    
    const hotelsCount = screen.getByTestId('hotels-count');
    expect(hotelsCount.textContent).toBe(hotelData.results.length.toString());
  });
}); 