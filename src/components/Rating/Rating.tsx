interface RatingProps {
  value: number;
  type: 'star' | 'self';
}

export const Rating: React.FC<RatingProps> = ({ value, type }) => {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 !== 0;
  const icon = type === 'star' ? '★' : '●';
  const emptyIcon = type === 'star' ? '☆' : '○';

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