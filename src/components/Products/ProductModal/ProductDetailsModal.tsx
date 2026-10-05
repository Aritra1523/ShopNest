import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { Product } from "../../../../types/product/product";
import { useCart } from "../../../hooks/useCart";
import QuantityControl from "../../Common/QuantityControl";
import Rating from "../../Common/Rating";
import { CartIcon, CloseIcon, TruckIcon, ShieldIcon } from "../../Common/Icons";
import { formatPrice } from "../../../../utils/formatPrice";

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailsModal = ({ product, onClose }: ProductDetailsModalProps) => {
  const { cart, dispatch } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);
  const images = product.images?.length ? product.images : [product.thumbnail];
  const [activeImage, setActiveImage] = useState(images[0]);
  const outOfStock = product.stock !== undefined && product.stock <= 0;

  const discount = product.discountPercentage ? Math.round(product.discountPercentage) : 0;
  const originalPrice = discount > 0 ? product.price / (1 - discount / 100) : null;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

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
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={product.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>

        <div className="modal-gallery">
          <div className="modal-main">
            <img src={activeImage} alt={product.title} className="modal-main-image" />
          </div>

          {images.length > 1 && (
            <div className="modal-thumbs">
              {images.map((img) => (
                <img
                  key={img}
                  src={img}
                  alt=""
                  className={img === activeImage ? "active" : ""}
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="modal-info">
          <span className="product-category">{product.category}</span>
          <h2>{product.title}</h2>

          {product.brand && <p className="modal-meta">by <strong>{product.brand}</strong></p>}
          {product.rating !== undefined && <Rating value={product.rating} />}

          <div className="price-row">
            <strong className="modal-price">{formatPrice(product.price)}</strong>
            {originalPrice && <span className="price-old">{formatPrice(originalPrice)}</span>}
            {discount > 0 && <span className="badge-inline">{discount}% off</span>}
          </div>

          {product.stock !== undefined && (
            <p className={outOfStock ? "stock-out" : "stock-in"}>
              {outOfStock ? "Out of stock" : `In stock (${product.stock} available)`}
            </p>
          )}

          <p className="modal-description">{product.description}</p>

          <div className="modal-perks">
            <span><TruckIcon width={18} height={18} /> Free delivery</span>
            <span><ShieldIcon width={18} height={18} /> Secure payment</span>
          </div>

          <div className="modal-actions">
            {cartItem ? (
              <QuantityControl
                quantity={cartItem.quantity}
                max={product.stock}
                onIncrement={() => dispatch({ type: "increment", payload: product.id })}
                onDecrement={() => dispatch({ type: "decrement", payload: product.id })}
              />
            ) : (
              <button
                className="btn btn-primary btn-lg"
                onClick={handleAddToCart}
                disabled={outOfStock}
              >
                <CartIcon width={18} height={18} />
                {outOfStock ? "Out of Stock" : "Add to Cart"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
