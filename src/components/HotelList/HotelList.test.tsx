import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import HotelList from './HotelList';
import { Hotel, RatingType, CancellationType, PromotionType } from '~/types/hotel';

// Mock child components
jest.mock('../HotelCard', () => ({
  HotelCard: ({ hotel }: { hotel: Hotel }) => <div data-testid={`hotel-${hotel.id}`}>{hotel.property.title}</div>
}));

jest.mock('../SortByPrice', () => ({
  SortByPrice: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <select data-testid="sort-select" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="price-asc">Low to High</option>
      <option value="price-desc">High to Low</option>
    </select>
  )
}));

const mockHotels: Hotel[] = [
    {
      id: 'hotel1',
      property: {
        propertyId: 'P1',
        title: 'Cheap Hotel',
        address: ['Address 1'],
        previewImage: {
          url: 'image1.jpg',
          caption: 'Image 1',
          imageType: 'PRIMARY'
        },
        rating: {
          ratingValue: 3,
          ratingType: RatingType.STAR
        }
      },
      offer: {
        promotion: {
          title: 'Special Deal',
          type: PromotionType.MEMBER
        },
        name: 'Basic Room',
        displayPrice: {
          amount: 100,
          currency: 'AUD'
        },
        cancellationOption: {
          cancellationType: CancellationType.FREE_CANCELLATION
        }
      }
    },
    {
      id: 'hotel2',
      property: {
        propertyId: 'P2',
        title: 'Expensive Hotel',
        address: ['Address 2'],
        previewImage: {
          url: 'image2.jpg',
          caption: 'Image 2',
          imageType: 'PRIMARY'
        },
        rating: {
          ratingValue: 5,
          ratingType: RatingType.STAR
        }
      },
      offer: {
        promotion: {
          title: 'Luxury Deal',
          type: PromotionType.CAMPAIGN
        },
        name: 'Luxury Suite',
        displayPrice: {
          amount: 300,
          currency: 'AUD'
        },
        cancellationOption: {
          cancellationType: CancellationType.NOT_REFUNDABLE
        }
      }
    }
  ];

describe('HotelList Component', () => {
  const mockOnSort = jest.fn();

  beforeEach(() => {
    mockOnSort.mockClear();
  });

  it('renders all hotels', () => {
    render(<HotelList hotels={mockHotels} onSort={mockOnSort} />);
    
    expect(screen.getByTestId('hotel-hotel1')).toBeInTheDocument();
    expect(screen.getByTestId('hotel-hotel2')).toBeInTheDocument();
  });

  it('displays correct number of hotels', () => {
    render(<HotelList hotels={mockHotels} onSort={mockOnSort} />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Sydney')).toBeInTheDocument();
  });

  it('calls onSort when sort option changes', () => {
    render(<HotelList hotels={mockHotels} onSort={mockOnSort} />);
    
    const sortSelect = screen.getByTestId('sort-select');
    fireEvent.change(sortSelect, { target: { value: 'price-desc' } });
    
    expect(mockOnSort).toHaveBeenCalledWith('price-desc');
  });

  it('maintains sort selection after sorting', () => {
    const { rerender } = render(<HotelList hotels={mockHotels} onSort={mockOnSort} />);
    
    const sortSelect = screen.getByTestId('sort-select');
    fireEvent.change(sortSelect, { target: { value: 'price-desc' } });
    
    rerender(<HotelList hotels={mockHotels} onSort={mockOnSort} />);
    expect(sortSelect).toHaveValue('price-desc');
  });
}); 