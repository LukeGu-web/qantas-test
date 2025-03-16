import { RatingType, Rating as RatingProps } from '../../types';

export const Rating: React.FC<RatingProps> = ({ ratingValue, ratingType }) => {
  const fullStars = Math.floor(ratingValue);
  const hasHalfStar = ratingValue % 1 !== 0;
  const icon = ratingType === RatingType.STAR ? '★' : '●';
  const emptyIcon = ratingType === RatingType.STAR ? '☆' : '○';

  return (
    <div className="flex items-center text-yellow-500">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return <span key={index}>{icon}</span>;
        } else if (index === fullStars && hasHalfStar) {
          return <span key={index}>{icon}</span>;
        }
        return <span key={index}>{emptyIcon}</span>;
      })}
    </div>
  );
}; 