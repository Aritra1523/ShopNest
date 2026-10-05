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
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const Filter = ({
  categories,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: FilterProps) => (
  <>
    <select
      value={category}
      aria-label="Filter by category"
      onChange={(e) => onCategoryChange(e.target.value)}
    >
      {categories.map((item) => (
        <option key={item} value={item}>
          {item === "all" ? "All Categories" : item}
        </option>
      ))}
    </select>

    <select
      value={sort}
      aria-label="Sort products"
      onChange={(e) => onSortChange(e.target.value as SortOption)}
    >
      <option value="default">Sort: Default</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name-asc">Name: A to Z</option>
      <option value="name-desc">Name: Z to A</option>
    </select>
  </>
);

export default Filter;
