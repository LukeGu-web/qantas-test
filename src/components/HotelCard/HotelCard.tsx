import Image from 'next/image';
import { Hotel, CancellationType } from '~/types/hotel';
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
    <div className="flex overflow-hidden bg-white ">
      {/* image section */}
      <div className="relative w-48 h-48">
        {hotel.offer.promotion && (
          <span className="absolute top-4 left-0 text-xs font-semibold z-10 bg-white py-2 px-4 text-red-700">
            {hotel.offer.promotion.title}
          </span>
        )}
        <Image
          src={hotel.property.previewImage.url}
          alt={hotel.property.previewImage.caption}
          fill
          className="object-cover p-2"
        />
      </div>
      {/* content section */}
      <div className="flex-1 py-4 ml-4 border-t border-gray-200">
        <div className="flex h-full justify-between">
          {/* middle section */}
          <div className="w-2/3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-medium text-black max-w-1/2 truncate">{hotel.property.title}</h2>
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
              <span></span>
            )}

          </div>

          {/* right section */}
          <div className="flex flex-col items-center justify-center gap-4 h-full">
            <div className='flex flex-col items-center justify-center'>
            <p className='text-sm text-gray-500'>
              <span className='font-bold text-gray-600'>1</span> night total ({hotel.offer.displayPrice.currency})
            </p>
            <p className="text-3xl font-medium text-black">
              {formatPrice(hotel.offer.displayPrice.amount, hotel.offer.displayPrice.currency)}
            </p>
            </div>
            {hotel.offer.savings && (
              <p className="text-lg text-red-700">
                Save {formatPrice(hotel.offer.savings.amount, hotel.offer.savings.currency)}~
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 