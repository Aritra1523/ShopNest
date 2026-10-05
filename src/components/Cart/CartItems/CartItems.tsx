import Swal from "sweetalert2";
import { useCart } from "../../../hooks/useCart";
import CartItem from "../CartItem/CartItem";

const CartItems = () => {
  const { cart, dispatch } = useCart();

  const handleRemove = (id: number, title: string) => {
    dispatch({ type: "remove", payload: id });

    Swal.fire({
      title: "Removed!",
      text: `${title} removed from cart.`,
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="cart-items">
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncrement={(id) => dispatch({ type: "increment", payload: id })}
          onDecrement={(id) => dispatch({ type: "decrement", payload: id })}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
};

export default CartItems;