import type { CartItem as CartItemType } from "../../../../types/product/product";
import QuantityControl from "../../Common/QuantityControl";
import { formatPrice } from "../../../../utils/formatPrice";

interface CartItemProps {
  item: CartItemType;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number, title: string) => void;
}

const CartItem = ({ item, onIncrement, onDecrement, onRemove }: CartItemProps) => (
  <div className="cart-item">
    <img src={item.thumbnail} alt={item.title} />

    <div className="cart-item-details">
      <h3>{item.title}</h3>
      <span className="product-category">{item.category}</span>
      <p>{formatPrice(item.price)}</p>

      <QuantityControl
        quantity={item.quantity}
        max={item.stock}
        onIncrement={() => onIncrement(item.id)}
        onDecrement={() => onDecrement(item.id)}
      />

      <p>
        Item Total: {formatPrice(item.price)} × {item.quantity} ={" "}
        <strong>{formatPrice(item.price * item.quantity)}</strong>
      </p>

      <button className="remove-btn" onClick={() => onRemove(item.id, item.title)}>
        Remove
      </button>
    </div>
  </div>
);

export default CartItem;
