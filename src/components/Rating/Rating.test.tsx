import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Rating } from './Rating';
import { RatingType } from '~/types/hotel';

describe('Rating Component', () => {
  it('renders full stars correctly', () => {
    render(<Rating ratingValue={4} ratingType={RatingType.STAR} />);
    const stars = screen.getAllByText('★');
    const fullStars = stars.filter(star => !star.classList.contains('text-gray-300'));
    expect(fullStars).toHaveLength(4);
  });

  it('renders half star correctly', () => {
    render(<Rating ratingValue={3.5} ratingType={RatingType.STAR} />);
    const halfStar = screen.getByTestId('half-star');
    expect(halfStar).toBeInTheDocument();
    const fullStars = screen.getAllByText('★').filter(star => 
      !star.classList.contains('text-gray-300') && !star.parentElement?.hasAttribute('data-testid')
    );
    expect(fullStars).toHaveLength(3);
  });

  it('renders circle icons for self rating', () => {
    render(<Rating ratingValue={4} ratingType={RatingType.SELF} />);
    const circles = screen.getAllByText('●');
    const fullCircles = circles.filter(circle => !circle.classList.contains('text-gray-300'));
    expect(fullCircles).toHaveLength(4);
    expect(circles[0]).toHaveClass('text-2xl');
  });

  it('renders gray empty stars for remaining rating', () => {
    render(<Rating ratingValue={3} ratingType={RatingType.STAR} />);
    const emptyStars = screen.getAllByText('★').filter(star => 
      star.classList.contains('text-gray-300')
    );
    expect(emptyStars).toHaveLength(2);
  });
}); 