import { RatingType, Rating as RatingProps } from '../../types';

export const Rating: React.FC<RatingProps> = ({ ratingValue, ratingType }) => {
  const fullStars = Math.floor(ratingValue);
  const hasHalfStar = ratingValue % 1 !== 0;
  const icon = ratingType === RatingType.STAR ? '★' : '●';
  const selfIconClass = ratingType === RatingType.SELF && 'text-2xl';

  return (
    <div className="flex items-center text-yellow-300">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return <span className={`${selfIconClass}`} key={index}>{icon}</span>;
        } else if (index === fullStars && hasHalfStar) {
          return (
          <div className='relative'>
            <span className={`${selfIconClass} text-gray-300`} key={index}>{icon}</span>
            <span
              className={`${selfIconClass} absolute overflow-hidden w-1/2 left-0 top-0`}
            >
              {icon}
            </span>
          </div>)
        }
        return <span className={`${ratingType === RatingType.SELF && 'text-2xl'} text-gray-300`} key={index}>{icon}</span>;
      })}
    </div>
  );
}; 