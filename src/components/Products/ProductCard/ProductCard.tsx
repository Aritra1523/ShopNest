import Swal from "sweetalert2";
import type { Product } from "../../../../types/product/product";
import { useCart } from "../../../hooks/useCart";
import QuantityControl from "../../Common/QuantityControl";
import Rating from "../../Common/Rating";
import { CartIcon } from "../../Common/Icons";
import { formatPrice } from "../../../../utils/formatPrice";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const { cart, dispatch } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);
  const outOfStock = product.stock !== undefined && product.stock <= 0;
  const lowStock = product.stock !== undefined && product.stock > 0 && product.stock <= 10;

  const discount = product.discountPercentage ? Math.round(product.discountPercentage) : 0;
  const originalPrice = discount > 0 ? product.price / (1 - discount / 100) : null;

  const handleAddToCart = () => {
    dispatch({ type: "addToCart", payload: product });

    Swal.fire({
      title: "Added to Cart!",
      text: `${product.title} has been added to your cart.`,
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  };

  return (
    <article className="product-card">
      <button
        type="button"
        className="product-image-wrap"
        onClick={() => onViewDetails(product)}
        aria-label={`View details of ${product.title}`}
      >
        {discount > 0 && <span className="badge badge-discount">-{discount}%</span>}
        {outOfStock && <span className="badge badge-out">Sold out</span>}
        <img src={product.thumbnail} alt={product.title} className="product-image" loading="lazy" />
      </button>

      <div className="product-content">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title" onClick={() => onViewDetails(product)}>
          {product.title}
        </h3>

        {product.rating !== undefined && <Rating value={product.rating} />}

        <div className="price-row">
          <strong className="price">{formatPrice(product.price)}</strong>
          {originalPrice && <span className="price-old">{formatPrice(originalPrice)}</span>}
        </div>

        {lowStock && <span className="stock-warning">Only {product.stock} left</span>}

        <div className="product-actions">
          {cartItem ? (
            <QuantityControl
              quantity={cartItem.quantity}
              max={product.stock}
              onIncrement={() => dispatch({ type: "increment", payload: product.id })}
              onDecrement={() => dispatch({ type: "decrement", payload: product.id })}
            />
          ) : (
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={handleAddToCart}
              disabled={outOfStock}
            >
              <CartIcon width={16} height={16} />
              {outOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
