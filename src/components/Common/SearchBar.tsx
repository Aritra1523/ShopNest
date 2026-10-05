interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <input
    type="text"
    className="search-bar"
    placeholder="Search Item..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default SearchBar;
