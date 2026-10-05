export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

interface FilterProps {
  categories: string[];
  category: string;
  onCategoryChange: (category: string) => void;
}

// Sidebar category list
const Filter = ({ categories, category, onCategoryChange }: FilterProps) => (
  <div className="filter-block">
    <h3 className="filter-title">Categories</h3>
    <ul className="category-list">
      {categories.map((item) => (
        <li key={item}>
          <button
            type="button"
            className={item === category ? "category-btn active" : "category-btn"}
            onClick={() => onCategoryChange(item)}
          >
            {item === "all" ? "All Categories" : item.replace(/-/g, " ")}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

interface SortSelectProps {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const SortSelect = ({ sort, onSortChange }: SortSelectProps) => (
  <select
    value={sort}
    aria-label="Sort products"
    onChange={(e) => onSortChange(e.target.value as SortOption)}
  >
    <option value="default">Sort: Featured</option>
    <option value="price-asc">Price: Low to High</option>
    <option value="price-desc">Price: High to Low</option>
    <option value="name-asc">Name: A to Z</option>
    <option value="name-desc">Name: Z to A</option>
  </select>
);

export default Filter;
