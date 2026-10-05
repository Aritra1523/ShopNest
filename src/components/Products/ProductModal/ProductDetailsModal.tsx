import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { Product } from "../../../../types/product/product";
import { useCart } from "../../../hooks/useCart";
import QuantityControl from "../../Common/QuantityControl";
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
          ×
        </button>

        <div className="modal-gallery">
          <img src={activeImage} alt={product.title} className="modal-main-image" />

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

          {product.brand && <p className="modal-meta">Brand: {product.brand}</p>}
          {product.rating !== undefined && (
            <p className="modal-meta">Rating: ⭐ {product.rating.toFixed(1)} / 5</p>
          )}
          {product.stock !== undefined && (
            <p className="modal-meta">
              {product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"}
            </p>
          )}

          <p>{product.description}</p>

          <div className="product-bottom">
            <strong className="modal-price">{formatPrice(product.price)}</strong>

            {cartItem ? (
              <QuantityControl
                quantity={cartItem.quantity}
                max={product.stock}
                onIncrement={() => dispatch({ type: "increment", payload: product.id })}
                onDecrement={() => dispatch({ type: "decrement", payload: product.id })}
              />
            ) : (
              <button onClick={handleAddToCart} disabled={product.stock !== undefined && product.stock <= 0}>
                {product.stock !== undefined && product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
