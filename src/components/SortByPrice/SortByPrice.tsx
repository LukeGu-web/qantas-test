import { SortType } from '~/types/hotel';

interface SortByPriceProps {
  value: SortType;
  onChange: (value: SortType) => void;
}

export const SortByPrice: React.FC<SortByPriceProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center justify-end mb-4 text-black">
      <p className="mr-2 font-bold text-lg">Sort by</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortType)}
        className="py-1 pl-2 pr-4 border border-gray-400 rounded-md"
      >
        <option value="price-asc">Price low-high</option>
        <option value="price-desc">Price high-low</option>
      </select>
    </div>
  );
}; 