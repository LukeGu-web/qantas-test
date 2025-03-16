import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { HotelCard } from './HotelCard';
import { Hotel, RatingType, PromotionType, CancellationType } from '~/types/hotel';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

const mockHotel: Hotel = {
  id: 'test-id',
  property: {
    propertyId: 'P1',
    title: 'Test Hotel',
    address: ['123 Test St', 'Test City'],
    previewImage: {
      url: 'test-image.jpg',
      caption: 'Test Image',
      imageType: 'PRIMARY'
    },
    rating: {
      ratingValue: 4.5,
      ratingType: RatingType.STAR
    }
  },
  offer: {
    promotion: {
      title: 'Special Offer',
      type: PromotionType.MEMBER
    },
    name: 'Deluxe Room',
    displayPrice: {
      amount: 199.99,
      currency: 'AUD'
    },
    savings: {
      amount: 50,
      currency: 'AUD'
    },
    cancellationOption: {
      cancellationType: CancellationType.FREE_CANCELLATION
    }
  }
};

describe('HotelCard Component', () => {
  it('renders hotel basic information', () => {
    render(<HotelCard hotel={mockHotel} />);
    
    expect(screen.getByText('Test Hotel')).toBeInTheDocument();
    expect(screen.getByText('123 Test St, Test City')).toBeInTheDocument();
    expect(screen.getByAltText('Test Image')).toBeInTheDocument();
  });

  it('renders price information correctly', () => {
    render(<HotelCard hotel={mockHotel} />);
    
    expect(screen.getByText('$200')).toBeInTheDocument();
    expect(screen.getByText('Save $50~')).toBeInTheDocument();
  });

  it('renders promotion badge when available', () => {
    render(<HotelCard hotel={mockHotel} />);
    expect(screen.getByText('Special Offer')).toBeInTheDocument();
  });

  it('renders cancellation policy', () => {
    render(<HotelCard hotel={mockHotel} />);
    expect(screen.getByText('Free cancellation')).toBeInTheDocument();
  });

  it('renders non-refundable text when cancellation is not free', () => {
    const nonRefundableHotel: Hotel = {
      ...mockHotel,
      offer: {
        ...mockHotel.offer,
        cancellationOption: {
          cancellationType: CancellationType.NOT_REFUNDABLE
        }
      }
    };
    
    render(<HotelCard hotel={nonRefundableHotel} />);
    expect(screen.queryByText('Free cancellation')).not.toBeInTheDocument();
  });
}); 