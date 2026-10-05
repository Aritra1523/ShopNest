import Swal from "sweetalert2";
import CartItems from "../../components/Cart/CartItems/CartItems";
import CartSummary from "../../components/Cart/CartSummary/CartSummary";
import EmptyCart from "../../components/Cart/EmptyCart/EmptyCart";
import { useCart } from "../../hooks/useCart";

const Cart = () => {
  const { cart, cartCount, subtotal, dispatch } = useCart();

  const handleClearCart = async () => {
    const result = await Swal.fire({
      title: "Clear Cart?",
      text: "All products will be removed from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      dispatch({ type: "clearCart" });

      Swal.fire({
        title: "Cart Cleared!",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <main className="cart-page">
      <div className="container">
        <div className="page-heading">
          <h1>Your Cart</h1>
          <p>Review your selected products</p>
        </div>

        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="cart-layout">
            <CartItems />
            <CartSummary
              totalItems={cartCount}
              subtotal={subtotal}
              onClear={handleClearCart}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
