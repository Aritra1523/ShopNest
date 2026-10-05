import { StarIcon } from "./Icons";

interface RatingProps {
  value: number;
}

const Rating = ({ value }: RatingProps) => (
  <span className="rating" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
    <span className="rating-stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} filled={value >= n - 0.5} />
      ))}
    </span>
    <span className="rating-value">{value.toFixed(1)}</span>
  </span>
);

export default Rating;
