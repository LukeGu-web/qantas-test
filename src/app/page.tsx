'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HotelList } from '../components/HotelList';
import { Hotel } from '../types';
import hotelData from '../mock/data.json';

export default function Home() {
  const [hotels, setHotels] = useState<Hotel[]>(hotelData.results as Hotel[]);

  const handleSort = (sortType: 'price-asc' | 'price-desc') => {
    const sortedHotels = [...hotels].sort((a, b) => {
      const priceA = a.offer.displayPrice.amount;
      const priceB = b.offer.displayPrice.amount;
      return sortType === 'price-asc' ? priceA - priceB : priceB - priceA;
    });
    setHotels(sortedHotels);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <Image
            src="/qantas-logo.png"
            alt="Qantas Logo"
            width={120}
            height={32}
            priority
          />
        </div>
      </header>
      <HotelList hotels={hotels} onSort={handleSort} />
    </main>
  );
}
