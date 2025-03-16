'use client';

import { useState } from 'react';
import { SortByPrice } from '../SortByPrice';
import { HotelCard } from '../HotelCard';
import { HotelListProps } from '../../types';

const HotelList: React.FC<HotelListProps> = ({ hotels, onSort }) => {
  const [sortType, setSortType] = useState<'price-asc' | 'price-desc'>('price-asc');

  const handleSort = (newSortType: 'price-asc' | 'price-desc') => {
    setSortType(newSortType);
    onSort(newSortType);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <SortByPrice value={sortType} onChange={handleSort} />
      <div className="grid gap-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelList; 