import { useCallback, useEffect, useMemo, useState } from "react";
import ProductList from "../../components/Products/ProductList/ProductList";
import ProductDetailsModal from "../../components/Products/ProductModal/ProductDetailsModal";
import PriceFilter from "../../components/Products/PriceFilter/PriceFilter";
import Filter, { SortSelect, type SortOption } from "../../components/Products/Filter/Filter";
import SearchBar from "../../components/Common/SearchBar";
import Pagination from "../../components/Common/Pagination";
import { TruckIcon, ShieldIcon, RefreshIcon, HeadsetIcon } from "../../components/Common/Icons";
import { getProducts } from "../../../api/services/productService";
import type { Product } from "../../../types/product/product";
import heroImg from "../../assets/hero.png";

const PAGE_SIZES = [8, 12, 24];

const sortProducts = (products: Product[], sort: SortOption): Product[] => {
  switch (sort) {
    case "price-asc":
      return [...products].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...products].sort((a, b) => b.price - a.price);
    case "name-asc":
      return [...products].sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return [...products].sort((a, b) => b.title.localeCompare(a.title));
    default:
      return products;
  }
};

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("default");
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await getProducts();
        if (!cancelled) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        if (!cancelled) setError("Something went wrong while loading products.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setReloadKey((key) => key + 1);
  };

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.category)))],
    [products],
  );

  const bounds = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 0 };
    const prices = products.map((p) => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [products]);

  // null = slider untouched, so show the full range
  const minPrice = priceRange ? priceRange[0] : bounds.min;
  const maxPrice = priceRange ? priceRange[1] : bounds.max;

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = category === "all" || product.category === category;
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    return sortProducts(filtered, sort);
  }, [products, search, category, minPrice, maxPrice, sort]);

  // Any change to the result set sends the user back to page 1
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const handleCategory = (value: string) => {
    setCategory(value);
    setPage(1);
  };
  const handleSort = (value: SortOption) => {
    setSort(value);
    setPage(1);
  };
  const handlePriceRange = (value: [number, number]) => {
    setPriceRange(value);
    setPage(1);
  };
  const handlePageSize = (value: number) => {
    setPageSize(value);
    setPage(1);
  };
  const handlePageChange = (value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedProducts = visibleProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const closeModal = useCallback(() => setSelectedProduct(null), []);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("default");
    setPriceRange(null);
    setPage(1);
  };

  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <span className="hero-tag">New season sale</span>
            <h1>Everything you love,<br />delivered to your door.</h1>
            <p>Discover thousands of products across electronics, fashion, home and more at unbeatable prices.</p>
            <a href="#products" className="btn btn-accent btn-lg">
              Shop Now
            </a>
          </div>
          <img src={heroImg} alt="" className="hero-img" />
        </div>
      </section>

      <section className="perks">
        <div className="perks-inner">
          <div className="perk"><TruckIcon /><div><strong>Free Delivery</strong><span>On every order</span></div></div>
          <div className="perk"><RefreshIcon /><div><strong>Easy Returns</strong><span>30-day policy</span></div></div>
          <div className="perk"><ShieldIcon /><div><strong>Secure Payment</strong><span>100% protected</span></div></div>
          <div className="perk"><HeadsetIcon /><div><strong>24/7 Support</strong><span>We're here to help</span></div></div>
        </div>
      </section>

      <div className="container" id="products">
        <div className="page-heading">
          <h2>All Products</h2>
          <p>Find your favorite products</p>
        </div>

        <div className="shop-layout">
          <aside className="sidebar">
            <Filter
              categories={categories}
              category={category}
              onCategoryChange={handleCategory}
            />

            {products.length > 0 && (
              <PriceFilter
                min={bounds.min}
                max={bounds.max}
                value={[minPrice, maxPrice]}
                onChange={handlePriceRange}
              />
            )}

            <button type="button" className="btn btn-outline btn-block" onClick={resetFilters}>
              Reset Filters
            </button>
          </aside>

          <section className="shop-main">
            <div className="toolbar">
              <SearchBar value={search} onChange={handleSearch} />
              <SortSelect sort={sort} onSortChange={handleSort} />
            </div>

            {!loading && !error && visibleProducts.length > 0 && (
              <div className="results-bar">
                <span>
                  Showing <strong>{(currentPage - 1) * pageSize + 1}–
                  {Math.min(currentPage * pageSize, visibleProducts.length)}</strong> of{" "}
                  <strong>{visibleProducts.length}</strong> products
                </span>

                <label>
                  Per page:{" "}
                  <select
                    value={pageSize}
                    onChange={(e) => handlePageSize(Number(e.target.value))}
                  >
                    {PAGE_SIZES.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            <ProductList
              products={paginatedProducts}
              loading={loading}
              error={error}
              onRetry={handleRetry}
              onViewDetails={setSelectedProduct}
            />

            {!loading && !error && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </section>
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailsModal product={selectedProduct} onClose={closeModal} />
      )}
    </main>
  );
};

export default Home;
