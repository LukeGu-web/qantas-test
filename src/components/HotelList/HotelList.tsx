'use client';

import { useState } from 'react';
import { SortByPrice } from '../SortByPrice/SortByPrice';
import { HotelCard } from '../HotelCard/HotelCard';
import { HotelListProps, SortType } from '~/types/hotel';

export const HotelList: React.FC<HotelListProps> = ({ hotels, onSort }) => {
  const [sortType, setSortType] = useState<SortType>(SortType.PRICE_ASC);

  const handleSort = (newSortType:SortType) => {
    setSortType(newSortType);
    onSort(newSortType);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className='flex justify-between items-center'>
        <p className='text-gray-500 italic text-lg ml-2'>
          <span className='font-bold text-black not-italic'>
            {hotels.length}
          </span> hotels in <span className='font-bold text-black not-italic'>
            Sydney
          </span>
        </p>
        <SortByPrice value={sortType} onChange={handleSort} />
      </div>
      <div>
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};