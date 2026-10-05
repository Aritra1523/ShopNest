import { SearchIcon } from "./Icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="search-bar">
    <SearchIcon />
    <input
      type="text"
      placeholder="Search for products, brands and more..."
      aria-label="Search products"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default SearchBar;
