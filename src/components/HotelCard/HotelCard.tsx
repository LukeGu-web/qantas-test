import Image from 'next/image';
import { Hotel, CancellationType } from '../../types';
import { Rating } from '../Rating/Rating';

interface HotelCardProps {
  hotel: Hotel;
}

const formatPrice = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <div className="flex border rounded-lg overflow-hidden shadow-md bg-white">
      {/* image section */}
      <div className="relative w-48 h-48">
        {hotel.offer.promotion && (
          <span className="absolute top-4 left-0 text-sm z-10 bg-white p-2 text-red-800">
            {hotel.offer.promotion.title}
          </span>
        )}
        <Image
          src={hotel.property.previewImage.url}
          alt={hotel.property.previewImage.caption}
          fill
          className="object-cover"
        />
      </div>
      {/* content section */}
      <div className="flex-1 p-4">
        <div className="flex h-full justify-between">
          {/* middle section */}
          <div className="w-2/3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-black max-w-1/2 truncate">{hotel.property.title}</h2>
                <Rating
                  ratingValue={hotel.property.rating.ratingValue}
                  ratingType={hotel.property.rating.ratingType}
                />
              </div>
              <address className="not-italic text-gray-500">
                {hotel.property.address.join(', ')}
              </address>
            </div>
            {
              hotel.offer.name && (
                <a className="text-sm text-red-600 underline">
                  {hotel.offer.name}
                </a>
              )
            }
            {hotel.offer.cancellationOption.cancellationType === CancellationType.FREE_CANCELLATION ? (
              <span className="text-green-600">Free cancellation</span>
            ) : (
              <span className=""></span>
            )}

          </div>

          {/* right section */}
          <div className="flex flex-col items-center justify-center gap-4 h-full">
            <div className='flex flex-col items-center justify-center'>
            <p className='text-sm text-gray-500'>
              1 night total ({hotel.offer.displayPrice.currency})
            </p>
            <p className="text-3xl font-medium text-black">
              {formatPrice(hotel.offer.displayPrice.amount, hotel.offer.displayPrice.currency)}
            </p>
            </div>
            {hotel.offer.savings && (
              <p className="text-lg text-red-600">
                Save {formatPrice(hotel.offer.savings.amount, hotel.offer.savings.currency)}~
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 