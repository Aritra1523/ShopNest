import { formatPrice } from "../../../../utils/formatPrice";

interface PriceFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const PriceFilter = ({ min, max, value, onChange }: PriceFilterProps) => {
  const [low, high] = value;
  const span = Math.max(max - min, 1);
  const leftPercent = ((low - min) / span) * 100;
  const rightPercent = 100 - ((high - min) / span) * 100;

  return (
    <div className="price-filter">
      <div className="price-filter-header">
        <span>Price</span>
        <span>
          {formatPrice(low)} – {formatPrice(high)}
        </span>
      </div>

      <div className="range-slider">
        <div className="range-track" />
        <div
          className="range-selected"
          style={{ left: `${leftPercent}%`, right: `${rightPercent}%` }}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={low}
          aria-label="Minimum price"
          onChange={(e) => onChange([Math.min(Number(e.target.value), high), high])}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={high}
          aria-label="Maximum price"
          onChange={(e) => onChange([low, Math.max(Number(e.target.value), low)])}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
