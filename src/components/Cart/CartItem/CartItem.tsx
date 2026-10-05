import type { CartItem as CartItemType } from "../../../../types/product/product";
import QuantityControl from "../../Common/QuantityControl";
import { TrashIcon } from "../../Common/Icons";
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
      <div className="cart-item-top">
        <div>
          <span className="product-category">{item.category}</span>
          <h3>{item.title}</h3>
          <p className="cart-item-unit">{formatPrice(item.price)} each</p>
        </div>
        <strong className="cart-item-total">{formatPrice(item.price * item.quantity)}</strong>
      </div>

      <div className="cart-item-bottom">
        <QuantityControl
          quantity={item.quantity}
          max={item.stock}
          onIncrement={() => onIncrement(item.id)}
          onDecrement={() => onDecrement(item.id)}
        />

        <button className="remove-btn" onClick={() => onRemove(item.id, item.title)}>
          <TrashIcon width={16} height={16} /> Remove
        </button>
      </div>
    </div>
  </div>
);

export default CartItem;
